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
  popupLink = document.querySelector(".popup-link"),
  allProductsInCatalog = [];

const patterns = {
  adressPattern: /[а-яА-ЯЁё0-9\s.,\-]{2,}/,
  textPattern: /[а-яА-ЯЁё]{2,}/,
  namePattern: /^[а-яА-ЯҐґЄєІіЇї' -]{2,}$/,
  phonePattern: /^0\d{9}$/,
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
};

const messages = {
  errorRequired: "Це поле обов'язкове. Не може бути порожнім",
  errorText: "Не менше двох символів, лише кирилиця",
  errorName: "Від двох символів, лише кирилиця, без пробілів",
  errorPhone: "Починайте з нуля, введіть 10 символів",
  errorMail: "Не менше 6 символів, знак @ та домен пошти",
  errorAdress: "Не менше двох символів",
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

// ------------------------------- Blog Page -------------------------------------

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
  } else {
    loadMoreBtn.textContent = "Очікуйте згодом";
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

// ------------------------------- Product Page ------------------------------------

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

function hideArrow() {
  if (productReviewsList) {
    if (productReviewsList.children.length === 0) {
      document.querySelector(".tab-reviews__arrows").classList.add("hide");
    } else {
      document.querySelector(".tab-reviews__arrows").classList.remove("hide");
    }
  }
}
hideArrow();

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

// ----------------------------- Order Form --------------------------------

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

// ----------------------------- Breadcrumbs ----------------------------------

const titleBreadCrumbs = document.querySelector(".title");
function breadCrumbsProductName(productName, breadCrumbsEl) {
  if (productName && breadCrumbsEl) {
    breadCrumbsEl.textContent = productName.textContent;
  } else if (document.querySelector(".like")) {
    breadCrumbsEl.textContent = "Вподобані товари";
  } else if (document.querySelector(".privecy")) {
    breadCrumbsEl.textContent = "Політика конфіденційності";
  }
}
breadCrumbsProductName(titleBreadCrumbs, breadCrumbsEl);

// ------------------------------- Basket Page --------------------------------

function makeObjProductInfo() {
  const productInfo = {
    id: Math.floor(Math.random() * 1000),
    name: document.querySelector(".js-product__name").textContent,
    price: document.querySelector(".product__price").textContent,
    img: document.querySelector(".product__img").getAttribute("src"),
    link: window.location.href,
    art: document.querySelector(".product__art").textContent,
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

function addCardOnBasketPage(parentList, productObj) {
  parentList.insertAdjacentHTML(
    "beforeend",
    ` 
  <div class="basket__card" id='${productObj.id}'>
    <div class="basket__card-top">
      <a class='basket__link' href="${productObj.link}">
        <img class="basket__card-photo js-product__img" src="${productObj.img}" alt="фото товару">
      </a>  
      <div class="basket__card-info">
          <input class="basket__card-name js-product__name" type='text' value='${productObj.name}' name='individualCount' readonly>
          <span><input class="basket__card-count js-amount__product" type="number" name="productCount" value="1" min="1">шт.</span>
          <input class="basket__card-name js-product__name" type='text' value='${productObj.art}' name='' readonly>
      </div>
    </div>
    <div class="basket__card-bottom">
        <span class="basket__card-price"><input class="js-price__value" type='text' value='${productObj.price}' name='sumOrder' readonly></span>
        <button class="basket__card-delete" type="button" name='deleteIndividualCart'>
          <span class="sr-only">Кнопка для видалення товару з корзини</span>
        </button>
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

// ---------------------------- Catalog Page --------------------------------

const mobBtnCategories = document.querySelector(".catalog-btn-js");
const mobBtnSort = document.querySelector(".sort-btn-js");
const allCategoriesBtns = document.querySelectorAll(".catalog__filter-btn");
const allSortBtns = document.querySelectorAll(".catalog__sort-btn");

function addActiveClassOnFiltersCategorise(itemsArr, className) {
  itemsArr.forEach((item) => {
    item.addEventListener("click", (e) => {
      item.closest(className).classList.remove("hide");
      if (!e.target.classList.contains("active")) {
        for (let item of itemsArr) {
          item.classList.remove("active");
        }
        e.target.classList.add("active");
      }
    });
  });
}

function addActiveOnParenBtnList(btn) {
  if (!btn.nextElementSibling.classList.contains("hide")) {
    btn.nextElementSibling.classList.add("hide");
  } else {
    btn.nextElementSibling.classList.remove("hide");
  }
}

function makeCardObj(card) {
  const cardInfo = {
    id: card.id,
    statusLike: "off",
    name: card.querySelector(".artical__card-name").textContent,
    price: +card.querySelector(".js-card-price").textContent,
    instock: card.querySelector(".artical__card-instock").textContent,
    popular: card.querySelector(".artical__card-popular").textContent,
    link: card.querySelector(".artical__card-link").getAttribute("href"),
    img: card.querySelector(".artical__card-img").getAttribute("src"),
  };
  return cardInfo;
}

function makeCardObjInArr() {
  const cardsChildrens = document.querySelector(".catalog__card-list").children;

  [...cardsChildrens].forEach((card) => {
    allProductsInCatalog.push(makeCardObj(card));
  });
  updateLocalStorage(allProductsInCatalog, "cardsInCatalog");
}

function makeCard(cardObj) {
  const cardsParentEl = document.querySelector(".catalog__card-list");
  let like = cardObj.statusLike === "on" ? "like-card" : "";

  cardsParentEl.insertAdjacentHTML(
    "beforeend",
    `
  <div class="artical catalog__card  ${like}" id="${cardObj.id}">
    <div class="artical__card-absolute catalog__card-absolute">
        <button class="artical__card-like catalog__card-like">
            <span class="sr-only">кнопка для вподобання товару</span>
        </button>
    </div>
    <a class="artical__card-link catalog__card-link" href="${cardObj.link}">
        <div class="artical__card-info catalog__card-info">
            <img class="artical__card-img catalog__card-img" src="${cardObj.img}" alt="фото товара">
            <span class="artical__card-instock catalog__card-instock">${cardObj.instock}</span>
        </div>
        <div class="artical__card-flex catalog__card-flex">
            <span class="artical__card-name catalog__card-name">${cardObj.name}</span>
            <span class="artical__card-description catalog__card-description">Опис</span>
            <span class="artical__card-popular catalog__card-popular sr-only">${cardObj.popular}</span>
        </div>
        <span class="artical__card-price catalog__card-price"><span class="js-card-price">${cardObj.price}</span>грн</span>
    </a>
  </div>
  `
  );
}

function makeFilter() {
  allCategoriesBtns.forEach((item) => {
    item.addEventListener("click", (e) => {
      const target = e.target;
      let targetFilter = target.dataset.filter;
      let filteredArr = allProductsInCatalog;
      document.querySelector(".catalog__card-list").innerHTML = "";
      [...allSortBtns].forEach((btn) => {
        if (
          btn.classList.contains("active") &&
          btn.dataset.filter === "cheap"
        ) {
          filteredArr = allProductsInCatalog.sort(
            (current, next) => current.price - next.price
          );
        }
        if (
          btn.classList.contains("active") &&
          btn.dataset.filter === "expensive"
        ) {
          filteredArr = allProductsInCatalog.sort(
            (current, next) => next.price - current.price
          );
        }
        if (
          btn.classList.contains("active") &&
          btn.dataset.filter === "popular"
        ) {
          filteredArr = allProductsInCatalog.sort(
            (current, next) => next.popular - current.popular
          );
        }
      });

      if (targetFilter === "Усі") {
        let countOfEnd = filteredArr.length < 12 ? filteredArr.length : 12;
        for (let i = 0; i < countOfEnd; i++) {
          makeCard(filteredArr[i]);
        }
        startPagination(filteredArr);
        updateLocalStorage(allProductsInCatalog, "filteredArr");
        document
          .querySelectorAll(".pagination__btn")[0]
          .classList.add("active");
      } else {
        filteredArr = [...filteredArr].filter(
          (task) => task.id === targetFilter
        );
        countOfEnd = filteredArr.length < 12 ? filteredArr.length : 12;
        for (let i = 0; i < countOfEnd; i++) {
          makeCard(filteredArr[i]);
        }
        startPagination(filteredArr);
        updateLocalStorage(filteredArr, "filteredArr");
      }
      const paginationBtn = document.querySelectorAll(".pagination__btn");
      if (paginationBtn[0]) {
        paginationBtn[0].classList.add("active");
      }
    });
  });
}

function makeSortingCheapDear() {
  [...allSortBtns].forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelector(".catalog__card-list").innerHTML = "";
      let sortResultNum = [];
      const target = e.target;
      let targetFilter = target.dataset.filter;
      allFilteredCards =
        JSON.parse(localStorage.getItem("filteredArr")) || allProductsInCatalog;
      if (targetFilter === "cheap") {
        sortResultNum = allFilteredCards.sort(
          (current, next) => current.price - next.price
        );
      }
      if (targetFilter === "expensive") {
        sortResultNum = allFilteredCards.sort(
          (current, next) => next.price - current.price
        );
      }
      if (targetFilter === "popular") {
        sortResultNum = allFilteredCards.sort(
          (current, next) => next.popular - current.popular
        );
      }
      let countOfEnd = sortResultNum.length < 12 ? sortResultNum.length : 12;
      for (let i = 0; i < countOfEnd; i++) {
        makeCard(sortResultNum[i]);
      }
      updateLocalStorage(sortResultNum, "filteredArr");
    });
  });
}

if (document.querySelector(".catalog")) {
  makeFilter();
  makeCardObjInArr();
  addActiveClassOnFiltersCategorise(allCategoriesBtns, ".catalog__filter-list");
  addActiveClassOnFiltersCategorise(allSortBtns, ".catalog__sort-list");
  makeSortingCheapDear();
}

//---------------------------- Gallery Page ----------------------------------------------

const gallerySwiper = new Swiper(".gallery__slider", {
  direction: "horizontal",
  initialSlide: 1,
  navigation: {
    nextEl: ".gallery__arrow-next",
    prevEl: ".gallery__arrow-prev",
  },
});

//---------------------------- Like Page --------------------------------

const allProductsInLiked =
  JSON.parse(localStorage.getItem("likedProductsArr")) || [];

function msgShow() {
  if (allProductsInLiked.length === 0) {
    document.querySelector(".like__msg").textContent =
      "У вас немає доданих товарів...";
  } else {
    document.querySelector(".like__msg").textContent = "";
  }
}

function makeLikeProductObj(card) {
  const cardInfo = {
    name: card.querySelector(".artical__card-name").textContent,
    price: +card.querySelector(".js-card-price").textContent,
    instock: card.querySelector(".artical__card-instock").textContent,
    link: card.querySelector(".artical__card-link").getAttribute("href"),
    img: card.querySelector(".artical__card-img").getAttribute("src"),
  };
  return cardInfo;
}

function addClassLikeCardOnLoad() {
  allProductsInCatalog.forEach((card, index) => {
    allProductsInLiked.forEach((obj) => {
      let count = 0;
      for (key in obj) {
        if (obj[key] === card[key]) {
          count++;
        }
        if (count === 4) {
          card.statusLike = "on";
          document
            .querySelector(".catalog__card-list")
            .children[index].classList.add("like-card");
        }
      }
    });
    updateLocalStorage(allProductsInCatalog, "cardsInCatalog");
    updateLocalStorage(allProductsInLiked, "likedProductsArr");
  });
}

function giveKeyOnOffForLikeStatus(arr, objProduct, status) {
  arr.forEach((card, index) => {
    let count = 0;
    for (key in card) {
      if (card[key] === objProduct[key]) {
        count++;
      }
      if (count === 4) {
        allProductsInCatalog[index].statusLike = status;
      }
    }
  });
}

function makeLikedCards(productObj) {
  const likeParent = document.querySelector(".like__table");
  likeParent.insertAdjacentHTML(
    "beforeend",
    `
          <div class="artical like__card like-card" id="${productObj.id}">
            <div class="artical__card-absolute like__card-absolute">
              <button class="artical__card-like like__card-like">
                  <span class="sr-only">кнопка для вподобання товару</span>
              </button>
            </div>
            <a class="artical__card-link like__card-link" href="${productObj.link}">
                <div class="artical__card-info like__card-info">
                    <img class="artical__card-img like__card-img" src="${productObj.img}" alt="фото товара">
                    <span class="artical__card-instock like__card-instock">${productObj.instock}</span>
                </div>
                <div class="artical__card-flex like__card-flex">
                    <span class="artical__card-name like__card-name">${productObj.name}</span>
                    <span class="artical__card-description like__card-description">Опис</span>
                    <span class="artical__card-popular like__card-popular sr-only">${productObj.popular}</span>
                </div>
                <span class="artical__card-price like__card-price"><span class="js-card-price">${productObj.price}</span>грн</span>
            </a>
          </div> 
      `
  );
}

function removeObjFromLocalStorage(target, arrWithAllProducts) {
  arrWithAllProducts.forEach((card, index) => {
    let count = 0;
    const targetCardObj = makeCardObj(target.closest(".artical"));
    for (key in card) {
      if (card[key] === targetCardObj[key]) {
        count++;
      }
      if (count === 4) {
        allProductsInLiked.splice(index, 1);
      }
    }
  });
}

function btnLikeHandler(target) {
  if (target.classList.contains("artical__card-like")) {
    let objLikedProject = makeLikeProductObj(target.closest(".artical"));
    if (!target.closest(".artical").classList.contains("like-card")) {
      allProductsInLiked.push(objLikedProject);
      updateLocalStorage(allProductsInLiked, "likedProductsArr");
      target.classList.add("active");
      target.closest(".artical").classList.add("like-card");
      giveKeyOnOffForLikeStatus(allProductsInCatalog, objLikedProject, "on");
      updateLocalStorage(allProductsInCatalog, "cardsInCatalog");
    } else {
      removeObjFromLocalStorage(target, allProductsInLiked);
      giveKeyOnOffForLikeStatus(allProductsInCatalog, objLikedProject, "off");
      target.classList.remove("active");
      target.closest(".artical").classList.remove("like-card");
      updateLocalStorage(allProductsInCatalog, "cardsInCatalog");
      updateLocalStorage(allProductsInLiked, "likedProductsArr");
    }
    countForLikeOrBasket(".js-like__count", allProductsInLiked);
  }
}

function addClassLikeOnButton() {
  if (
    document
      .querySelector(".product__like-btn")
      .classList.contains("like-color")
  ) {
    document.querySelector(".product__like-btn").classList.remove("like-color");
  } else {
    document.querySelector(".product__like-btn").classList.add("like-color");
  }
}

function likeBtnHandler(target) {
  const likeProductObj = makeObjProductInfo();
  delete likeProductObj.id;
  likeProductObj.price = +likeProductObj.price.replace("грн", "");
  likeProductObj.instock =
    document.querySelector(".product__stock").textContent;
  addClassLikeOnButton();
  if (!target.classList.contains("like-color")) {
    allProductsInLiked.forEach((obj, index) => {
      let count = 0;
      for (let key in obj) {
        if (obj[key] === likeProductObj[key]) {
          count++;
        }
      }
      if (count > 3) {
        allProductsInLiked.splice(index, 1);
        countForLikeOrBasket(".js-like__count", allProductsInLiked);
        updateLocalStorage(allProductsInLiked, "likedProductsArr");
      }
    });
  } else {
    allProductsInLiked.push(likeProductObj);
    updateLocalStorage(allProductsInLiked, "likedProductsArr");
    countForLikeOrBasket(".js-like__count", allProductsInLiked);
  }
}

if (document.querySelector(".catalog")) {
  document
    .querySelector(".catalog__card-list")
    .addEventListener("click", (e) => {
      const target = e.target;
      btnLikeHandler(target);
    });

  window.addEventListener("load", () => {
    addClassLikeCardOnLoad();
  });
}

if (document.querySelector(".like")) {
  document.querySelector(".like__table").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("artical__card-like")) {
      removeObjFromLocalStorage(target, allProductsInLiked);
      countForLikeOrBasket(".js-like__count", allProductsInLiked);
      giveKeyOnOffForLikeStatus(
        allProductsInCatalog,
        makeCardObj(target.closest(".artical")),
        "off"
      );
      updateLocalStorage(allProductsInLiked, "likedProductsArr");
      updateLocalStorage(allProductsInCatalog, "cardsInCatalog");
      target.closest(".artical").remove();
      msgShow();
    }
  });
}

if (document.querySelector(".product")) {
  document
    .querySelector(".product__like-btn ")
    .addEventListener("click", (e) => {
      const target = e.target;
      likeBtnHandler(target);
    });
}

// --------------------------- Global Events ---------------------------------------

function headerFixed() {
  const scrollTop = document.documentElement.scrollTop;
  headerWrapper.classList.toggle("sticky", scrollTop >= 50);
  headerWrapper.classList.toggle("animation", scrollTop >= 100);
  headerWrapper.classList.toggle("opacity", scrollTop >= 175);

  if (document.querySelector(".inner-page") !== null) {
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

if (document.querySelector(".inner-page") !== null) {
  changeHeaderTextColorBlack(".header__btn");
  changeHeaderTextColorBlack(".header__pages-btn");
}

function updateLocalStorage(items, localArrName) {
  localStorage.setItem(localArrName, JSON.stringify(items));
}

function countForLikeOrBasket(className, arr) {
  document.querySelectorAll(className).forEach((element) => {
    element.textContent = arr.length;
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
  countForLikeOrBasket(".js-basket__count", allProductsInBasket);
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
    countForLikeOrBasket(".js-basket__count", allProductsInBasket);
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
    countForLikeOrBasket(".js-basket__count", allProductsInBasket);
    if (allProductsInBasket.length === 0) {
      deleteEmptyLocalArr("productsInBasket");
      document.querySelector(".basket__msg").classList.add("show");
      document.querySelector(".basket__table").classList.remove("show");
    }
  }

  if (target.classList.contains("catalog-btn-js")) {
    addActiveOnParenBtnList(target);
  }

  if (target.classList.contains("sort-btn-js")) {
    addActiveOnParenBtnList(target);
  }

  if (target.classList.contains("js-pagination__btn")) {
    const allFilteredCards =
      JSON.parse(localStorage.getItem("filteredArr")) || allProductsInCatalog;

    addPaginationToCatalog(allFilteredCards, target);
  }
}

function addActiveBtn(btnText, btnList) {
  let findBtn = [...btnList].find(
    (item) =>
      item.textContent.toLowerCase().toString() ===
      btnText.toLowerCase().toString()
  );
  findBtn.classList.add("active");
}

function addActiveOnScroll(section, btn) {
  let pixelsScrolled = window.scrollY;
  let endOfSection = section.offsetTop + section.offsetHeight;
  let startOfSection = section.offsetTop - section.offsetHeight;

  if (pixelsScrolled >= startOfSection && pixelsScrolled <= endOfSection) {
    btn.classList.add("active");
  } else {
    btn.classList.remove("active");
  }
}

function headerBtnActiveOnScrollHandler() {
  addActiveOnScroll(
    document.querySelector(".new-products"),
    document.querySelector(".copy__btn--catalog")
  );
  addActiveOnScroll(
    document.querySelector(".contacts"),
    document.querySelector(".js-contacts-btn")
  );
}

function addActiveOnHeaderMenu(btnList) {
  const page =
    document.querySelector(".hero") ||
    document.querySelector(".catalog") ||
    document.querySelector(".services") ||
    document.querySelector(".blog-cards") ||
    document.querySelector(".gallery") ||
    "";
  if (page) {
    switch (page.className.split(" ")[0]) {
      case "hero":
        window.addEventListener("scroll", () => {
          headerBtnActiveOnScrollHandler();
        });
        break;
      case "catalog":
        addActiveBtn("каталог", btnList);
        break;
      case "services":
        addActiveBtn("сервіси", btnList);
        break;
      case "blog-cards":
        addActiveBtn("блог", btnList);
        break;
      case "gallery":
        addActiveBtn("галерея", btnList);
        break;
    }
  }
}

addActiveOnHeaderMenu(document.querySelectorAll(".header__btn"));

document.addEventListener("click", (e) => {
  clickHandler(e);
});

document.addEventListener("DOMContentLoaded", function () {
  const headerBox = document.querySelector(".header__top");
  const headerHeight = headerBox.offsetHeight;
  const scrollLinks = document.querySelectorAll(".scroll");
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

// ---------------------------- Window Events --------------------------------

function addDisabledStock() {
  const stock = document.querySelector(".product__stock");
  console.log(stock.textContent.toLowerCase());
  if (stock.textContent.toLowerCase() === "немає в наявності") {
    document.querySelector(".js-popup__form").setAttribute("disabled", "");
    document.querySelector(".js-popup__form").classList.add("disabled");
  }
}

window.addEventListener("load", () => {
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

  if (document.querySelector(".catalog")) {
    localStorage.removeItem("filteredArr");
  }

  if (document.querySelector(".like")) {
    allProductsInLiked.forEach((product) => {
      makeLikedCards(product);
    });
    msgShow();
  }

  if (document.querySelector(".product")) {
    const likeProductObj = makeObjProductInfo();
    delete likeProductObj.id;
    likeProductObj.price = +likeProductObj.price.replace("грн", "");
    likeProductObj.instock =
      document.querySelector(".product__stock").textContent;

    allProductsInLiked.forEach((obj, index) => {
      let count = 0;
      for (let key in obj) {
        if (obj[key] === likeProductObj[key]) {
          count++;
        }
        if (count > 3) {
          document
            .querySelector(".product__like-btn")
            .classList.add("like-color");
        }
      }
    });

    addDisabledStock();
  }
  countForLikeOrBasket(".js-basket__count", allProductsInBasket);
  countForLikeOrBasket(".js-like__count", allProductsInLiked);
});

window.addEventListener("scroll", headerFixed);

window.addEventListener("pageshow", function (e) {
  if (e.persisted) {
    window.location.reload();
  }
});

const paginationBtnsParent = document.querySelector(".pagination__box");
const catalogList = document.querySelector(".catalog__card-list");

function startPagination(products, centerDot) {
  let countBtn = Math.ceil(products.length / 12);
  paginationBtnsParent.innerHTML = "";
  if (countBtn > 1) {
    if (countBtn <= 5) {
      for (let i = 0; i < countBtn; i++) {
        paginationBtnsParent.insertAdjacentHTML(
          "beforeend",
          `
          <button class="pagination__btn js-pagination__btn">${i + 1}</button>
        `
        );
      }
    } else {
      for (let i = 0; i < 5; i++) {
        paginationBtnsParent.insertAdjacentHTML(
          "beforeend",
          `
          <button class="pagination__btn js-pagination__btn">${i + 1}</button>
        `
        );
      }
      paginationBtnsParent.insertAdjacentHTML(
        "beforeend",
        `
        <button class="pagination__btn js-pagination__btn right">...</button>
        <button class="pagination__btn js-pagination__btn">${countBtn}</button>
      `
      );
    }
  }

  document.querySelectorAll(".pagination__btn").forEach((dot) => {
    if (+dot.textContent === centerDot) {
      dot.classList.add("active");
    }
  });
}

function centerPagination(start, end, centerDot, products) {
  paginationBtnsParent.innerHTML = "";
  let countBtn = Math.ceil(products.length / 12);

  paginationBtnsParent.insertAdjacentHTML(
    "beforeend",
    `
    <button class="pagination__btn js-pagination__btn">${1}</button>
    <button class="pagination__btn js-pagination__btn left">...</button>
  `
  );
  for (let i = start; i <= end; i++) {
    paginationBtnsParent.insertAdjacentHTML(
      "beforeend",
      `
      <button class="pagination__btn js-pagination__btn">${i}</button>
    `
    );
  }
  paginationBtnsParent.insertAdjacentHTML(
    "beforeend",
    `
    <button class="pagination__btn js-pagination__btn right">...</button>
    <button class="pagination__btn js-pagination__btn">${countBtn}</button>
  `
  );
  document.querySelectorAll(".pagination__btn").forEach((dot) => {
    if (+dot.textContent === centerDot) {
      dot.classList.add("active");
    }
  });
}

function endPagination(start, end, centerDot) {
  paginationBtnsParent.innerHTML = "";
  paginationBtnsParent.insertAdjacentHTML(
    "beforeend",
    `
    <button class="pagination__btn js-pagination__btn">1</button>
    <button class="pagination__btn js-pagination__btn left">...</button>
  `
  );
  for (let i = start; i < end; i++) {
    paginationBtnsParent.insertAdjacentHTML(
      "beforeend",
      `
      <button class="pagination__btn js-pagination__btn">${i + 1}</button>
    `
    );
  }
  document.querySelectorAll(".pagination__btn").forEach((dot) => {
    if (+dot.textContent === centerDot) {
      dot.classList.add("active");
    }
  });
}

function addPaginationOnLoad(products) {
  if (products.length > 12) {
    catalogList.innerHTML = "";
    for (let i = 0; i < 12; i++) {
      makeCard(allProductsInCatalog[i]);
    }
    startPagination(allProductsInCatalog);
    const paginationBtn = document.querySelectorAll(".pagination__btn");
    paginationBtn[0].classList.add("active");
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" }); // "smooth" робить прокрутку плавною
}

function scrollProducts(products, target) {
  let countBtn = Math.ceil(products.length / 12);
  const activeDots =
    countBtn > 5 ? document.querySelector(".pagination__btn.active") : target;
  if (target === activeDots) {
    document.querySelectorAll(".pagination__btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    target.classList.add("active");
  }
  let start = +activeDots.textContent * 12 - 12;
  let end =
    products.length < +activeDots.textContent * 12
      ? products.length
      : +activeDots.textContent * 12;
  catalogList.innerHTML = "";
  for (let i = start; i < end; i++) {
    makeCard(products[i]);
  }
}

function addPaginationToCatalog(products, target) {
  let countBtn = Math.ceil(products.length / 12);
  const activeDots = document.querySelector(".pagination__btn.active");
  if (countBtn > 5) {
    if (target.textContent === "...") {
      if (target.classList.contains("left")) {
        if (+activeDots.textContent - 3 <= 4) {
          let centerDot = +activeDots.textContent - 3;
          startPagination(products, centerDot);
        } else {
          let start = +activeDots.textContent - 4;
          let end = +activeDots.textContent - 2;
          let centerDot = +activeDots.textContent - 3;
          centerPagination(start, end, centerDot, products);
        }
      }

      if (target.classList.contains("right")) {
        if (+activeDots.textContent < 4) {
          let start = 4;
          let end = 6;
          let centerDot = 5;
          centerPagination(start, end, centerDot, products);
        } else if (+activeDots.textContent + 2 >= countBtn - 5) {
          let start = countBtn - 5;
          let end = countBtn;
          let centerDot = +activeDots.textContent + 3;
          endPagination(start, end, centerDot);
        } else {
          let start = +activeDots.textContent + 2;
          let end = +activeDots.textContent + 4;
          let centerDot = +activeDots.textContent + 3;
          centerPagination(start, end, centerDot, products);
        }
      }
    } else {
      if (+target.textContent >= 5 && +target.textContent <= countBtn - 4) {
        let start = +target.textContent - 1;
        let end = +target.textContent + 1;
        let centerDot = +target.textContent;
        centerPagination(start, end, centerDot, products);
      } else if (+target.textContent >= countBtn - 4) {
        let start = countBtn - 5;
        let end = countBtn;
        let centerDot = +target.textContent;
        endPagination(start, end, centerDot);
      } else {
        let centerDot = +target.textContent;
        startPagination(products, centerDot);
      }
    }
  }
  scrollProducts(products, target);
  scrollToTop();
}

addPaginationOnLoad(allProductsInCatalog);

//search

const searchInput = document.querySelector(".js-catalogSearch");
const searchBox = document.querySelector(".catalog__info-list");
function catalogSearch(e) {
  const allProducts = JSON.parse(localStorage.getItem("cardsInCatalog"));
  let filteredSearch = allProducts.filter(
    (product) =>
      product.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
  );
  if (filteredSearch.length > 0 && e.target.value.length > 0) {
    searchBox.style.opacity = "1";
    searchBox.innerHTML = "";
    filteredSearch.forEach((item) => {
      searchBox.insertAdjacentHTML(
        "beforeend",
        `
        <li >
          <a class="catalog__info-item" href=${item.link}">
            ${item.name}
          </a>
        </li>
      `
      );

      console.log(item.link)
    });
  } else {
    searchBox.style.opacity = "0";
  }

  document.querySelectorAll(".catalog__info-item").forEach((elem) => {
    let str = elem.innerText;
    elem.innerHTML = makeBoltOnText(
      str,
      elem.innerText.toLowerCase().search(e.target.value.toLowerCase()),
      e.target.value.length
    );
  });
}

function makeBoltOnText(string, pos, len) {
  return (
    string.slice(0, pos) +
    "<b>" +
    string.slice(pos, pos + len) +
    "</b>" +
    string.slice(pos + len)
  );
}

searchInput.addEventListener("input", catalogSearch);
