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
  headerBtn = headerMenu.children,
  allProductsInBasket =
    JSON.parse(localStorage.getItem("productsInBasket")) || [],
  headerBasketBtn = document.querySelector(".media__btn--basket"),
  basketList = document.querySelector(".basket__list"),
  orderForm = document.forms.orderForm,
  popupLink = document.querySelector(".popup-link");

const patterns = {
  adressPattern: /[\p{L}\d\s.,\-]{2,}/,
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
  errorAdress:"Не менше 2 символів",
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
        [...stars.children].forEach((star, index1) => {
          index >= index1
            ? star.classList.add("active")
            : star.classList.remove("active");
        });
      });
    });
  }
}
ratingStar(stars);

function closePopup(parentElClassName) {
  document.querySelector(parentElClassName).classList.remove("show");
}

// ----------------------- Order Form --------------------------------

function formOrderInput(target) {
  switch (target.name) {
    case "firstName":
      checkFieldOnInput(
        target,
        patterns.textPattern,
        messages.errorName,
        ".basket__input-group",
        ".basket__validation-msg"
      );
      break;
    case "lastName":
      checkFieldOnInput(
        target,
        patterns.namePattern,
        messages.errorName,
        ".basket__input-group",
        ".basket__validation-msg"
      );
      break;
    case "phoneNumber":
      checkFieldOnInput(
        target,
        patterns.phonePattern,
        messages.errorPhone,
        ".basket__input-group",
        ".basket__validation-msg"
      );
      break;
    case "email":
      checkFieldOnInput(
        target,
        patterns.emailPattern,
        messages.errorMail,
        ".basket__input-group",
        ".basket__validation-msg"
      );
      break;
    case "baseLocation":
      checkFieldOnInput(
        target,
        patterns.textPattern,
        messages.errorName,
        ".basket__input-group",
        ".basket__validation-msg"
      );
      break;
    case "postAdres":
      checkFieldOnInput(
        target,
        patterns.adressPattern,
        messages.errorAdress,
        ".basket__input-group",
        ".basket__validation-msg"
      );
      break;
  }
}

function focusAndBlurEvent(input) {
  input.addEventListener("focus", (e) => {
    checkFieldOnFocus(
      e.target,
      ".basket__input-group",
      ".basket__validation-msg"
    );
  });
  input.addEventListener("blur", (e) => {
    checkFieldOnBlur(
      e.target,
      ".basket__input-group",
      ".basket__validation-msg"
    );
  });
}

function onLoadCheckFocusBlur() {
  for (const input of orderForm.elements) {
    const deliveryType = document.querySelectorAll(".basket__radio");
    const locationItems = document.querySelectorAll(".location-js");
    if (
      input.name !== "individualCount" &&
      input.name !== "productCount" &&
      input.name !== "sumOrder" &&
      input.name !== "deleteIndividualCart"
    )
      deliveryType.forEach((item) => {
        if (item.checked && item.classList.contains("delivery-js")) {
          document
            .querySelector(".basket__location-info")
            .classList.remove("hide");
          checkOrderButtonDisabled(orderForm.orderFormBtn);
          if (input.type !== "radio" && input.type !== "submit") {
            focusAndBlurEvent(input);
          }
          locationItems.forEach((item) => {
            item.removeAttribute("disabled");
            item.nextElementSibling.style.display = "block";
            if (item.value === "") {
              item.parentElement.classList.remove("success");
              orderForm.orderFormBtn.classList.remove("success");
            }
          });
        } else if (item.checked && item.classList.contains("pickup-js")) {
          checkOrderButtonDisabled(orderForm.orderFormBtn);
          document
            .querySelector(".basket__location-info")
            .classList.add("hide");
          if (
            input.type !== "radio" &&
            input.type !== "submit" &&
            input.name !== "baseLocation" &&
            input.name !== "postAdres"
          ) {
            focusAndBlurEvent(input);
          }
          locationItems.forEach((item) => {
            item.value = "";
            item.setAttribute("disabled", "disabled");
            item.parentElement.classList.remove("error");
            item.parentElement.classList.add("success");
            item.nextElementSibling.style.display = "none";
          });
        }
      });
  }
}

function checkOrderButtonDisabled(btnName) {
  if (checkFormSuccess(".basket__input-group", orderForm)) {
    btnName.removeAttribute("disabled");
    btnName.classList.add("success");
  } else {
    btnName.setAttribute("disabled", "disabled");
  }
}

function orderFormValidation(formName) {
  formName.addEventListener("input", (e) => {
    const target = e.target;
    formOrderInput(target);
    checkOrderButtonDisabled(orderForm.orderFormBtn);
    onLoadCheckFocusBlur();
  });
  onLoadCheckFocusBlur();
}

function removeSuccessGroup(groupName) {
  document.querySelectorAll(groupName).forEach((group) => {
    group.classList.remove("success");
  });
}

function makeOrderInfo() {
  [...orderForm.elements].forEach((element) => {
    if (element.tagName === "INPUT") {
      if (element.type === "radio" && element.checked) {
        const label = orderForm.querySelector(
          "label[for='" + element.id + "']"
        );
        if (label) {
          console.log(label.textContent);
        }
      } else if (element.type !== "radio" && element.type !== "checkbox") {
        if (element.type === "checkbox") {
          console.log(element.checked ? label.textContent : "");
        } else {
          console.log(element.value);
        }
      }
    }
  });
}

if (orderForm) {
  orderFormValidation(orderForm);
  checkOrderButtonDisabled(orderForm.orderFormBtn);
}

// ----------------------- Related Product Slider --------------------------------

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
//////////////////////////////////// basket-page {
function makeObjProductInfo() {
  const productInfo = {
    id: Math.floor(Math.random() * 1000),
    name: document.querySelector(".js-product__name").textContent,
    price: document.querySelector(".product__price").textContent,
    img: document.querySelector(".product__img").getAttribute("src"),
  };
  return productInfo;
}

function checkAndPushObjInStore(objWithInfo) {
  let flag = true;
  if (allProductsInBasket.length > 0) {
    allProductsInBasket.forEach((product) => {
      for (key in product) {
        if (
          product.name === objWithInfo.name &&
          product.price === objWithInfo.price
        ) {
          flag = false;
        }
      }
    });
  }
  if (flag === true) {
    allProductsInBasket.push(objWithInfo);
    updateLocalStorage(allProductsInBasket, "productsInBasket");
    addClassAnimationOnTimer(headerBasketBtn);
    bodyLock.classList.add("lock");
    document.querySelector(".popup-msg").classList.add("show");
  }
}
/////////////////////////////////////////////////}

/////////////////////breadcrumbs{
const servicesBreadCrumbs = document.querySelector(
  ".breadcrumbs-services-title"
);

const basketBreadCrumbs = document.querySelector(".basket__title");

function breadCrumbsProductName(productName, breadCrumbsEl) {
  if (productName && breadCrumbsEl) {
    breadCrumbsEl.textContent = productName.textContent;
  }
}
breadCrumbsProductName(productName, breadCrumbsEl);
breadCrumbsProductName(servicesBreadCrumbs, breadCrumbsEl);
breadCrumbsProductName(basketBreadCrumbs, breadCrumbsEl);
////////////////////////////////}

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

function changeHeaderTextColorWhite(className) {
  const productPageHeader = document.querySelectorAll(className);
  [...productPageHeader].forEach((btn) => btn.classList.remove("style"));
}

function changeHeaderTextColorBlack(className) {
  const changeColor = document.querySelectorAll(className);
  [...changeColor].forEach((btn) => btn.classList.add("style"));
}

if (document.querySelector(".breadcrumbs") !== null) {
  changeHeaderTextColorBlack(".header__btn");
  changeHeaderTextColorBlack(".header__pages-btn");
}

function updateLocalStorage(items, localArrName) {
  localStorage.setItem(localArrName, JSON.stringify(items));
}

function countForLikeOrBasket(className) {
  document.querySelectorAll(className).forEach((count) => {
    count.textContent = allProductsInBasket.length;
  });
}

function addClassAnimationOnTimer(countBtn) {
  countBtn.classList.add("animation");
  setTimeout(function () {
    removeClassAnimation(countBtn);
  }, 3000);
}

function removeClassAnimation(countBtn) {
  countBtn.classList.remove("animation");
}

function deleteEmptyLocalArr(arrName) {
  localStorage.removeItem(arrName);
}

function upDateBasketInfo() {
  countForLikeOrBasket(".js-basket__count");
  addClassAnimationOnTimer(headerBasketBtn);
  document.querySelector(".js-list__count").textContent =
    allProductsInBasket.length;
  if (basketList.children.length === 0) {
    deleteEmptyLocalArr("productsInBasket");
    document.querySelector(".basket__msg").classList.add("show");
    document.querySelector(".basket__table").classList.remove("show");
  }
  countSumAllMoney();
}

function clickHandler(e) {
  const target = e.target;
  if (target.classList.contains("contacts__form-btn")) {
    e.preventDefault();
    target.setAttribute("disabled", "disabled");
    target.classList.remove("success");
    removeActiveGroupClass(".contacts__form-group");
    removeInputValue(contactsForm);
    bodyLock.classList.add("lock");
    document.querySelector(".popup-msg").classList.add("show");
  }

  if (target.classList.contains("blog-cards__popup-close")) {
    bodyLock.classList.remove("lock");
    target.closest(".blog-cards__popup").classList.remove("active");
  }

  if (target.classList.contains("close-popup")) {
    bodyLock.classList.remove("lock");
    closePopup(".popup-msg");
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

  if (target.classList.contains("js-popup__form")) {
    const objProductInfo = makeObjProductInfo();
    checkAndPushObjInStore(objProductInfo);
    countForLikeOrBasket(".js-basket__count");
  }

  if (target.classList.contains("product__like-btn")) {
    const headerLikeBtn = document.querySelector(".media__btn--likes");
    addClassAnimationOnTimer(headerLikeBtn);
  }

  if (target.classList.contains("basket__card-delete")) {
    for (let i = 0; i < allProductsInBasket.length; i++) {
      if (allProductsInBasket[i].id === +target.closest(".basket__card").id) {
        target.closest(".basket__card").remove();
        allProductsInBasket.splice(i, 1);
        updateLocalStorage(allProductsInBasket, "productsInBasket");
      }
    }
    upDateBasketInfo();
  }

  if (target.classList.contains("basket__submit")) {
    e.preventDefault();
    target.setAttribute("disabled", "disabled");
    target.classList.remove("success");
    const locationItems = document.querySelectorAll(".location-js");
    locationItems.forEach((item) => {
      item.classList.remove("success");
      item.removeAttribute("disabled");
    });
    document.querySelector(".basket__location-info").classList.remove("hide");
    bodyLock.classList.add("lock");
    document.querySelector(".popup-msg").classList.add("show");
    makeOrderInfo();
    orderForm.reset();
    allProductsInBasket.length = 0;
    updateLocalStorage(allProductsInBasket, "productsInBasket");
    countForLikeOrBasket(".js-basket__count");
    if (allProductsInBasket.length === 0) {
      deleteEmptyLocalArr("productsInBasket");
      document.querySelector(".basket__msg").classList.add("show");
      document.querySelector(".basket__table").classList.remove("show");
    }
  }
}

document.addEventListener("click", (e) => {
  clickHandler(e);
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

function addCardOnBasketPage(parentList, productObj) {
  parentList.insertAdjacentHTML(
    "beforeend",
    `
  <div class="basket__card" id='${productObj.id}'>
    <div class="basket__card-top">
        <img class="basket__card-photo js-product__img" src="${productObj.img}" alt="фото товару">
        <div class="basket__card-info">
            <input class="basket__card-name js-product__name" type='text' value='${productObj.name}' name='individualCount' readonly>
            <span><input class="basket__card-count js-amount__product" type="number" name="productCount" value="1" min="1">шт.</span>
        </div>
    </div>
    <div class="basket__card-bottom">
        <span class="basket__card-price"><input class="js-price__value" type='text' value='${productObj.price}' name='sumOrder' readonly></span>
        <button class="basket__card-delete" type="button" name='deleteIndividualCart'></button>
    </div>
  </div>
  `
  );
}

function countSumAllMoney() {
  let allMoney = 0;
  document.querySelectorAll(".js-price__value").forEach((priceValue) => {
    allMoney += +priceValue.value.replace("грн", "");
  });
  document.querySelector(".js-all__money").value = allMoney + "грн";
}

function basketCalculation() {
  const allInputsCount = document.querySelectorAll(".js-amount__product");
  allInputsCount.forEach((input) => {
    input.addEventListener("input", (e) => {
      const target = e.target;
      allProductsInBasket.forEach((product) => {
        if (product.id === +target.closest(".basket__card").id) {
          let price = product.price.replace("грн", "");
          target
            .closest(".basket__card")
            .querySelector(".js-price__value").value =
            +target.value * +price + "грн";
        }
      });
      countSumAllMoney();
    });
  });
  countSumAllMoney();
}

window.addEventListener("load", () => {
  countForLikeOrBasket(".js-basket__count");
  if (document.querySelector(".basket")) {
    if (allProductsInBasket.length > 0) {
      document.querySelector(".basket__table").classList.add("show");
      document.querySelector(".js-list__count").textContent =
        allProductsInBasket.length;

      allProductsInBasket.forEach((product) => {
        addCardOnBasketPage(basketList, product);
      });
    } else {
      document.querySelector(".basket__msg").classList.add("show");
    }
    basketCalculation();
  }
});

window.addEventListener("scroll", headerFixed);

window.addEventListener("pageshow", function (e) {
  if (e.persisted) {
    window.location.reload();
  }
});
