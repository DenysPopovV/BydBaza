const contactsForm = document.forms.contactForm,
  questionTabBtns = document.querySelectorAll(".question__plus"),
  questionTabAnswer = document.querySelectorAll(".question__answer"),
  productTabBtns = document.querySelectorAll(".product-tabs__btn"),
  productTabContent = document.querySelectorAll(".product-tabs__content"),
  productName = document.querySelector(".js-product__name"),
  breadCrumbsEl = document.querySelector(".js-breadcrumbs__title");

const patterns = {
  textPattern: /[а-яА-ЯЁё]{2,}/,
  namePattern: /^[а-яА-ЯҐґЄєІіЇї'-]{2,}$/,
  phonePattern: /^0\d{9}$/,
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
};

const messages = {
  errorRequired: "Це поле обов'язкове. Не може бути порожнім",
  errorText: "Не менше двох символів, лише кирилиця",
  errorName: "Від двох символів, лише кирилиця, без пробілів",
  errorPhone: "Починайте з нуля, введіть 10 символів",
  errorMail: "Не менше 6 символів, знак @ та домен пошти",
  correct: "Все правильно, заповнюйте далі!",
};

function addFormValidation(formName) {
  formName.addEventListener("input", (e) => {
    const target = e.target;
    switch (target.name) {
      case "formQuestion":
        checkFieldOnInput(target, patterns.textPattern, messages.errorText, ".contacts__form-group", ".contacts__form-msg");
        break;
      case "firstName":
        checkFieldOnInput(target, patterns.namePattern, messages.errorName, ".contacts__form-group", ".contacts__form-msg");
        break;
      case "phoneNumber":
        checkFieldOnInput(target, patterns.phonePattern, messages.errorPhone, ".contacts__form-group", ".contacts__form-msg");
        break;
      default:
        break;
    }
  });
  for (const input of formName.elements) {
    if (input.type !== "submit") {
      input.addEventListener("focus", (e) => {
        checkFieldOnFocus(e.target, ".contacts__form-group", ".contacts__form-msg");
      });
      input.addEventListener("blur", (e) => {
        checkFieldOnBlur(e.target, ".contacts__form-group", ".contacts__form-msg");
      });
    }
  }
}

function checkFieldOnFocus(input, parentClassName, msgClassName) {
  if (input.value.length < 1) {
    input.closest(parentClassName).classList.add("error");
    input
      .closest(parentClassName)
      .querySelector(msgClassName).textContent =
      messages.errorRequired;
  }
}

function checkFieldOnBlur(input, parentClassName, msgClassName) {
  if (input.closest(parentClassName).classList.contains("success")) {
    input
      .closest(parentClassName)
      .querySelector(msgClassName).textContent = "";
  }
}

function checkFieldOnInput(input, pattern, message, parentClassName, msgClassName) {
  if (!input.value.match(pattern)) {
    input.closest(parentClassName).classList.remove("success");
    input.closest(parentClassName).classList.add("error");
    input
      .closest(parentClassName)
      .querySelector(msgClassName).textContent = message;
  } else {
    input.closest(parentClassName).classList.remove("error");
    input.closest(parentClassName).classList.add("success");
    input
      .closest(parentClassName)
      .querySelector(msgClassName).textContent = messages.correct;
  }
}

function checkFormSuccess(groupClass, formName) {
  const formGroup = formName.querySelectorAll(groupClass);

  for (const group of formGroup) {
    if (!group.classList.contains("success")) {
      return false;
    }
  }
  return true;
}

function checkButtonDisabled(btnName) {
  contactsForm.addEventListener("input", () => {
    if (checkFormSuccess(".contacts__form-group", contactsForm)) {
      btnName.removeAttribute("disabled");
      btnName.classList.add("success");
    } else {
      btnName.setAttribute("disabled", "disabled");
    }
  });
}

function removeInputValue(formName) {
  for (const input of formName.elements) {
    if (input.type !== "submit") {
      input.value = "";
    }
  }
}

function removeActiveGroupClass(groupClass) {
  const formGroup = contactsForm.querySelectorAll(groupClass);
  for (const group of formGroup) {
    if (group.classList.contains("success")) {
      group.classList.remove("success");
    }
  }
}

if (contactsForm != undefined) {
  addFormValidation(contactsForm);
  checkButtonDisabled(contactsForm.contactsBtn);
}

const InfoSwiper = new Swiper(".swiper-products", {
  direction: "horizontal",
  spaceBetween: 132,
  slidesPerView: 3,
  loop: false,
  freeMode: true,

  navigation: {
    nextEl: ".new-products__arrow-next",
    prevEl: ".new-products__arrow-prev",
  },

  breakpoints: {
    360: {
      slidesPerView: 1.5,
      centeredSlides: true,
      initialSlide: 1,
      spaceBetween: 20,
    },
    380: {
      slidesPerView: 1.8,
      spaceBetween: 20,
      centeredSlides: true,
      initialSlide: 1,
    },
    460: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    560: {
      slidesPerView: 2.2,
      spaceBetween: 30,
    },
    660: {
      slidesPerView: 2.5,
      spaceBetween: 50,
    },
    768: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 2.5,
      spaceBetween: 60,
    },
    900: {
      slidesPerView: 3,
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 60,
    },
    1200: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 3,
    },
  },
});

function breadCrumbs(productName, breadCrumbsEl) {
  if (productName !== null && breadCrumbsEl !== null) {
    breadCrumbsEl.textContent = productName.textContent;
  }
}
breadCrumbs(productName, breadCrumbsEl);

const productSwiper = new Swiper(".tab-reviews__swiper", {
  direction: "horizontal",
  spaceBetween: 10,
  slidesPerView: 1,
  loop: false,
  freeMode: true,

  navigation: {
    nextEl: ".tab-reviews__arrow-next",
    prevEl: ".tab-reviews__arrow-prev",
  },
});

function tabsAction(target) {
  const answerEl = document.querySelector(`div#${target.id}`);
  if (target.id === answerEl.id) {
    if (answerEl.classList.contains("active")) {
      answerEl.classList.remove("active");
      target.classList.remove("active");
    } else {
      questionTabAnswer.forEach((answer) => {
        answer.classList.remove("active");
      });
      questionTabBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      answerEl.classList.add("active");
      target.classList.add("active");
    }
  }
}

questionTabBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.target;
    tabsAction(target);
  });
});

const blogCardParent = document.querySelector(".blog-cards__list");
const loadMoreBtn = document.getElementById("loadMore");
let scrollDownHeight;

if (blogCardParent !== null) {
  addBlogCardsOnLoad(blogCardParent.children);
}

function addBlogCardsOnLoad(item) {
  for (let i = 0; i < 3; i++) {
    item[i].classList.add("active");
  }
  scrollDownHeight = document.querySelector(".blog-cards").offsetHeight;
}

function addCardsOnClick() {
  const hiddenItems = Array.from(blogCardParent.children).filter(
    (item) => !item.classList.contains("active")
  );

  if (hiddenItems.length > 0) {
    for (let i = 0; i < 3; i++) {
      if (hiddenItems[i]) {
        hiddenItems[i].classList.add("active");
        window.scrollTo({
          top: scrollDownHeight * 3,
          behavior: "smooth",
        });
      } else {
        loadMoreBtn.textContent = "Очікуйте згодом";
      }
    }
  }
}

if (loadMoreBtn !== null) {
  loadMoreBtn.addEventListener("click", function (e) {
    addCardsOnClick(e);
  });
}

const cardBtns = document.querySelectorAll(".blog-cards__btn");

cardBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.target;
    tabsAction(target);
  });
});

function productTabs(target) {
  const contentEl = document.querySelector(`div#${target.id}`);
  if (!target.classList.contains("active")) {
    productTabBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    productTabContent.forEach((item) => {
      item.classList.remove("active");
    });
    target.classList.add("active");
    contentEl.classList.add("active");
  }
}

productTabBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.target;
    productTabs(target);
  });
});

const productReviewsList = document.querySelector(".tab-reviews__wrapper");
function countReviews(reviewsList) {
  document.querySelectorAll(".js-reviews__count").forEach((item) => {
    item.textContent = reviewsList.length;
  });
}
if (productReviewsList !== null) {
  countReviews(productReviewsList.children);
}

function ratingStar(stars) {
  [...stars].forEach((star, index) => {
    star.addEventListener("click", (e) => {
      [...stars].forEach((star, index1) => {
        index >= index1
          ? star.classList.add("active")
          : star.classList.remove("active");
      });
    });
  });
}
const stars = document.querySelector(".product__stars");
if (stars !== null) {
  ratingStar(stars.children);
}

const relatedSwiper = new Swiper(".related__swiper", {
  direction: "horizontal",
  spaceBetween: 132,
  slidesPerView: 3,
  loop: false,
  freeMode: true,

  navigation: {
    nextEl: ".related__arrow-next",
    prevEl: ".related__arrow-prev",
  },

  breakpoints: {
    360: {
      slidesPerView: 1.5,
      centeredSlides: true,
      initialSlide: 1,
      spaceBetween: 20,
    },
    380: {
      slidesPerView: 1.8,
      spaceBetween: 20,
      centeredSlides: true,
      initialSlide: 1,
    },
    460: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    560: {
      slidesPerView: 2.2,
      spaceBetween: 30,
    },
    660: {
      slidesPerView: 2.5,
      spaceBetween: 50,
    },
    768: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 2.5,
      spaceBetween: 60,
    },
    900: {
      slidesPerView: 3,
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 60,
    },
    1200: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 3,
    },
  },
});

function changeHeaderTextColor() {
  if (document.querySelector(".breadcrumbs") !== null) {
    document.querySelector(".header").classList.add("black-color");
  }
}
changeHeaderTextColor();

/////form-order
function openFormOrder(parentElClassName) {
  document.querySelector(parentElClassName).classList.add("show");
}
function closeFormOrder(parentElClassName) {
  document.querySelector(parentElClassName).classList.remove("show");
}

function validationLocationInput(target) {
  if(target.value.length < 1) {
    document.querySelector('.second-stage__msg-input').textContent = 'Від двох символів і більше!';
    target.closest('.second-stage__group').classList.remove('success')
    target.closest('.second-stage__group').classList.add('error')
  } else {
    document.querySelector('.second-stage__msg-input').textContent = messages.correct;
    target.closest('.second-stage__group').classList.remove('error')
    target.closest('.second-stage__group').classList.add('success')
  }
}

function orderFormValidation(formName) {
  formName.addEventListener("input", (e) => {
    const target = e.target;
    switch (target.name) {
      case "firstName":
        checkFieldOnInput(target, patterns.textPattern, messages.errorName, ".first-stage__group", ".first-stage__msg");
        break;
      case "lastName":
        checkFieldOnInput(target, patterns.namePattern, messages.errorName, ".first-stage__group", ".first-stage__msg");
        break;
      case "phoneNumber":
        checkFieldOnInput(target, patterns.phonePattern, messages.errorPhone, ".first-stage__group", ".first-stage__msg");
        break;
      case "email":
        checkFieldOnInput(target, patterns.emailPattern, messages.errorMail, ".first-stage__group", ".first-stage__msg");
        break;
      case 'location':
        // validationLocationInput(target)
      break;
    }

    if(checkFormSuccess('.first-stage__group', document.forms.orderForm)) {
      closeFormOrder('.first-stage')
      openFormOrder('.second-stage')
      document.querySelector('.product-form__stages').children[0].classList.add('success')
    }

    if(target.classList.contains('second-stage__checkbox')) {
      target.closest('.second-stage__group').classList.add('success')
    }
    if(checkFormSuccess('.second-stage__group', document.forms.orderForm)){
      closeFormOrder('.second-stage')
      openFormOrder('.last-stage')
      document.querySelector('.product-form__stages').children[1].classList.add('success');
    }
  });

  for (const input of formName.elements) {
    if (input.type !== "radio" && !input.classList.contains('second-stage__input')) {
        input.addEventListener("focus", (e) => {
          checkFieldOnFocus(e.target, ".first-stage__group", ".first-stage__msg");
        });
        input.addEventListener("blur", (e) => {
          checkFieldOnBlur(e.target, ".first-stage__group", ".first-stage__msg");
        });
      } 
    }
  }
  


document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("contacts__form-btn")) {
    e.preventDefault();
    target.setAttribute("disabled", "disabled");
    target.classList.remove("success");
    removeActiveGroupClass(".contacts__form-group");
    removeInputValue(contactsForm);
  }
  if (target.classList.contains("blog-cards__popup-close")) {
    target.closest(".blog-cards__popup-bg").classList.remove("active");
  }

  if (target.classList.contains("js-popup__form")) {
    openFormOrder(".product-form");
    orderFormValidation(document.forms.orderForm)
  }
  if (target.classList.contains("close-popup-form")) {
    closeFormOrder(".product-form");
  }
});
