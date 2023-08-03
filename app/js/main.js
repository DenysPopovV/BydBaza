const InfoSwiper = new Swiper('.swiper-products', {
    direction: 'horizontal',
    spaceBetween: 132,
    slidesPerView: 3,
    loop: false,
    freeMode: true,
  
    navigation: {
      nextEl: '.new-products__arrow-next',
      prevEl: '.new-products__arrow-prev',
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
        slidesPerView: 2.3,
        spaceBetween: 30,
      },
      560: {
        slidesPerView: 2.2,
        spaceBetween: 30,
      },
      660: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 60,
      },
      800: {
        slidesPerView: 2.2,
        spaceBetween: 60,
      },
      900: {
        slidesPerView: 2.5,
        spaceBetween: 60,
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      1200: {
        slidesPerView: 3,
      }
    }
  });