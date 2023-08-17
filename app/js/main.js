const contactsForm = document.forms.contactForm,
  questionTabBtns = document.querySelectorAll(".question__plus"),
  questionTabAnswer = document.querySelectorAll(".question__answer"),
  productTabBtns = document.querySelectorAll(".product-tabs__btn"),
  productTabContent = document.querySelectorAll(".product-tabs__content"),
  productName = document.querySelector(".js-product__name"),
  breadCrumbsEl = document.querySelector(".js-breadcrumbs__title"),
  stars = document.querySelector(".product__stars"),
  productReviewsList = document.querySelector(".tab-reviews__wrapper"),
  bodyLock = document.querySelector("body"),
  cardBtns = document.querySelectorAll(".blog-cards__btn"),
  blogCardParent = document.querySelector(".blog-cards__list"),
  loadMoreBtn = document.getElementById("loadMore"),
  headerWrapper = document.querySelector(".header__top"),
  headerMenuBtn = document.querySelector(".header__mobile-btn"),
  headerMobMenu = document.querySelector(".mobile"),
  headerMenu = document.querySelector(".header__menu"),
  headerBtn = headerMenu.children;

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

///////////////////////////home-page {
//contact-form {
function addFormValidation(formName) {
  formName.addEventListener("input", (e) => {
    const target = e.target;
    switch (target.name) {
      case "formQuestion":
        checkFieldOnInput(
          target,
          patterns.textPattern,
          messages.errorText,
          ".contacts__form-group",
          ".contacts__form-msg"
        );
        break;
      case "firstName":
        checkFieldOnInput(
          target,
          patterns.namePattern,
          messages.errorName,
          ".contacts__form-group",
          ".contacts__form-msg"
        );
        break;
      case "phoneNumber":
        checkFieldOnInput(
          target,
          patterns.phonePattern,
          messages.errorPhone,
          ".contacts__form-group",
          ".contacts__form-msg"
        );
        break;
      default:
        break;
    }
  });
  for (const input of formName.elements) {
    if (input.type !== "submit") {
      input.addEventListener("focus", (e) => {
        checkFieldOnFocus(
          e.target,
          ".contacts__form-group",
          ".contacts__form-msg"
        );
      });
      input.addEventListener("blur", (e) => {
        checkFieldOnBlur(
          e.target,
          ".contacts__form-group",
          ".contacts__form-msg"
        );
      });
    }
  }
}

function checkFieldOnFocus(input, parentClassName, msgClassName) {
  if (input.value.length < 1) {
    input.closest(parentClassName).classList.add("error");
    input.closest(parentClassName).querySelector(msgClassName).textContent =
      messages.errorRequired;
  }
}

function checkFieldOnBlur(input, parentClassName, msgClassName) {
  if (input.closest(parentClassName).classList.contains("success")) {
    input.closest(parentClassName).querySelector(msgClassName).textContent = "";
  }
}

function checkFieldOnInput(
  input,
  pattern,
  message,
  parentClassName,
  msgClassName
) {
  const parentEl = input.closest(parentClassName);
  if (!input.value.match(pattern)) {
    parentEl.classList.remove("success");
    parentEl.classList.add("error");
    parentEl.querySelector(msgClassName).textContent = message;
  } else {
    parentEl.classList.remove("error");
    parentEl.classList.add("success");
    parentEl.querySelector(msgClassName).textContent = messages.correct;
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

if (contactsForm) {
  addFormValidation(contactsForm);
  checkButtonDisabled(contactsForm.contactsBtn);
}
// }

const InfoSwiper = new Swiper(".swiper-products", {
  direction: "horizontal",
  spaceBetween: 132,
  slidesPerView: 3,
  initialSlide: 1,
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
      initialSlide: 1,
      slidesPerView: 3,
    },
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
/////////////////////////// }

/////////////////////blog-page {
function renameHeroTitleBlogPage() {
  if (document.querySelector(".blog-cards")) {
    document.querySelector(".hero__name").textContent = "БудБлог";
  }
}
renameHeroTitleBlogPage();

let scrollDownHeight;
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

if (blogCardParent) {
  addBlogCardsOnLoad(blogCardParent.children);
  loadMoreBtn.addEventListener("click", function (e) {
    addCardsOnClick(e);
  });
}

cardBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.target;
    tabsAction(target);
    bodyLock.classList.add("lock");
  });
});
////////////// }

////////////////////////product-page {
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

function countReviews(reviewsList) {
  document.querySelectorAll(".js-reviews__count").forEach((item) => {
    item.textContent = reviewsList.length;
  });
}
if (productReviewsList) {
  countReviews(productReviewsList.children);
}

function ratingStar(stars) {
  if (document.querySelector(".product__stars")) {
    [...stars.children].forEach((star, index) => {
      star.addEventListener("click", (e) => {
        [...stars].forEach((star, index1) => {
          index >= index1
            ? star.classList.add("active")
            : star.classList.remove("active");
        });
      });
    });
  }
}
ratingStar(stars);

//form-order {
function openFormOrder(parentElClassName) {
  document.querySelector(parentElClassName).classList.add("show");
}
function closeFormOrder(parentElClassName) {
  document.querySelector(parentElClassName).classList.remove("show");
}

function showLastStageAddInfo() {
  const dotsInFormStages = document.querySelector(".product-form__stages"),
    lastStageNameProduct = document.querySelector(".last-stage__name"),
    productName = document.querySelector(".js-product__name"),
    priceProduct = document.querySelector(".product__price"),
    priceOfOrderProduct = document.querySelectorAll(".last-stage__price"),
    countOfProductsOrder = document.querySelector(".last-stage__count");

  if (checkFormSuccess(".second-stage__group", document.forms.orderForm)) {
    closeFormOrder(".second-stage");
    openFormOrder(".last-stage");
    dotsInFormStages.children[1].classList.add("success");
    lastStageNameProduct.textContent = productName.textContent;
    priceOfOrderProduct[0].textContent = priceProduct.textContent;
    priceOfOrderProduct[1].textContent =
      +priceProduct.textContent.split("г")[0] * +countOfProductsOrder.value +
      "грн";
  }
}

function formOrderHandler(target) {
  switch (target.name) {
    case "firstName":
      checkFieldOnInput(
        target,
        patterns.textPattern,
        messages.errorName,
        ".first-stage__group",
        ".first-stage__msg"
      );
      break;
    case "lastName":
      checkFieldOnInput(
        target,
        patterns.namePattern,
        messages.errorName,
        ".first-stage__group",
        ".first-stage__msg"
      );
      break;
    case "phoneNumber":
      checkFieldOnInput(
        target,
        patterns.phonePattern,
        messages.errorPhone,
        ".first-stage__group",
        ".first-stage__msg"
      );
      break;
    case "email":
      checkFieldOnInput(
        target,
        patterns.emailPattern,
        messages.errorMail,
        ".first-stage__group",
        ".first-stage__msg"
      );
      break;
    case "location":
      target.nextElementSibling.textContent = "";
      target.addEventListener("blur", (e) => {
        if (target.value.length > 3) {
          target.closest(".second-stage__group").classList.add("success");
          target.nextElementSibling.textContent = "";
          showLastStageAddInfo(target);
        }
      });
      break;
  }

  if (checkFormSuccess(".first-stage__group", document.forms.orderForm)) {
    closeFormOrder(".first-stage");
    openFormOrder(".second-stage");
    document
      .querySelector(".product-form__stages")
      .children[0].classList.add("success");
  }

  if (target.classList.contains("second-stage__checkbox")) {
    target.closest(".second-stage__group").classList.add("success");
  }
  showLastStageAddInfo(target);
}

function orderFormValidation(formName) {
  formName.addEventListener("input", (e) => {
    const target = e.target;
    formOrderHandler(target);
  });

  for (const input of formName.elements) {
    if (
      input.type !== "radio" &&
      !input.classList.contains("second-stage__input") &&
      !input.classList.contains("js-form__submit") &&
      !input.classList.contains("last-stage__count")
    ) {
      input.addEventListener("focus", (e) => {
        checkFieldOnFocus(e.target, ".first-stage__group", ".first-stage__msg");
      });
      input.addEventListener("blur", (e) => {
        checkFieldOnBlur(e.target, ".first-stage__group", ".first-stage__msg");
      });
    }
  }
}

function removeSuccessGroup(groupName) {
  document.querySelectorAll(groupName).forEach((group) => {
    group.classList.remove("success");
  });
}
function resetForm() {
  document.forms.orderForm.reset();
  removeSuccessGroup(".product-form__stage");
  removeSuccessGroup(".second-stage__group");
  removeSuccessGroup(".first-stage__group");
  document.querySelectorAll(".first-stage__msg").forEach((msg) => {
    msg.textContent = messages.errorRequired;
  });
  document.querySelectorAll(".form-order__stage").forEach((stage) => {
    stage.classList.remove("show");
  });
  document.querySelector(".first-stage").classList.add("show");
  document.querySelector(".second-stage__msg-input").textContent =
    messages.errorRequired;
  closeFormOrder(".product-form");
  closeFormOrder(".last-stage");
  openFormOrder(".first-stage");
}
// }

const relatedSwiper = new Swiper(".related__swiper", {
  direction: "horizontal",
  spaceBetween: 132,
  slidesPerView: 3,
  initialSlide: 1,
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
//////////////////////////// }

//////////////////////////////////Global

function headerFixed() {
  const scrollTop = document.documentElement.scrollTop;
  headerWrapper.classList.toggle("sticky", scrollTop >= 100);
  headerWrapper.classList.toggle("animation", scrollTop >= 200);
  headerWrapper.classList.toggle("opacity", scrollTop >= 350);

  if (document.querySelector(".breadcrumbs") !== null) {
    if (scrollTop >= 100) {
      changeHeaderTextColorWhite(".header__btn");
      changeHeaderTextColorWhite(".header__pages-btn");
    } else if (scrollTop <= 100) {
      changeHeaderTextColorBlack(".header__btn");
      changeHeaderTextColorBlack(".header__pages-btn");
    }
  }
}
window.addEventListener("scroll", headerFixed);

function changeHeaderTextColorWhite(className) {
  const productPageHeader = document.querySelectorAll(className);
  Array.from(productPageHeader).forEach((btn) => btn.classList.remove('style'));
}

function changeHeaderTextColorBlack(className) {
  const changeColor = document.querySelectorAll(className);
  Array.from(changeColor).forEach((btn) => btn.classList.add('style'));
}

if (document.querySelector(".breadcrumbs") !== null) {
  changeHeaderTextColorBlack(".header__btn");
  changeHeaderTextColorBlack(".header__pages-btn");
}

const servicesBreadCrumbs = document.querySelector(
  ".breadcrumbs-services-title"
);

const basketBreadCrumbs = document.querySelector(
  ".basket__title"
);

function breadCrumbsProductName(productName, breadCrumbsEl) {
  if (productName && breadCrumbsEl) {
    breadCrumbsEl.textContent = productName.textContent;
  }
}
breadCrumbsProductName(productName, breadCrumbsEl);
breadCrumbsProductName(servicesBreadCrumbs, breadCrumbsEl);
breadCrumbsProductName(basketBreadCrumbs, breadCrumbsEl);

function clickHandler(target) {
  if (target.classList.contains("contacts__form-btn")) {
    e.preventDefault();
    target.setAttribute("disabled", "disabled");
    target.classList.remove("success");
    removeActiveGroupClass(".contacts__form-group");
    removeInputValue(contactsForm);
  }
  if (target.classList.contains("blog-cards__popup-close")) {
    bodyLock.classList.remove("lock");
    target.closest(".blog-cards__popup").classList.remove("active");
  }

  if (target.classList.contains("js-popup__form")) {
    bodyLock.classList.add("lock");
    openFormOrder(".product-form");
    orderFormValidation(document.forms.orderForm);
  }
  if (target.classList.contains("close-popup-form")) {
    bodyLock.classList.remove("lock");
    closeFormOrder(".product-form");
    resetForm();
  }

  if (target.classList.contains("js-form__submit")) {
    e.preventDefault();
    bodyLock.classList.remove("lock");
    resetForm();
  }

  if (target.classList.contains("close-js")) {
    headerMobMenu.classList.remove("active");
    bodyLock.classList.remove("lock");
    headerMenuBtn.classList.remove("active");
  }

  if (target.classList.contains("header__mobile-btn")) {
    bodyLock.classList.toggle("lock");
    target.classList.toggle("active");
    headerMobMenu.classList.toggle("active");
  }
}

document.addEventListener("click", (e) => {
  const target = e.target;
  clickHandler(target);
});

document.addEventListener("DOMContentLoaded", function () {
  const headerBox = document.querySelector(".header__top");
  const headerHeight = headerBox.offsetHeight;
  const scrollLinks = document.querySelectorAll(".scroll");

  // const bodyStyles = window.getComputedStyle(document.body);
  // const zoomValue = parseFloat(bodyStyles.zoom);
  scrollLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const scrollAnchor = this.getAttribute("href");
      const scrollTarget = document.querySelector(scrollAnchor);
      if (scrollTarget) {
        const scrollPoint =
          scrollTarget.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;
        let additionalOffset = 0;
        window.scrollTo({
          top: scrollPoint + additionalOffset,
          behavior: "smooth",
        });
      }
      return false;
    });
  });
});

window.addEventListener("scroll", headerFixed);
