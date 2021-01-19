import './portfolio';
import './comments';
import './header';
import './form';
import Swiper, { Navigation, Pagination, Autoplay, Controller, A11y } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Controller, A11y]);

new Swiper('.client_reviews_slider', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.reviews_btn_next',
        prevEl: '.reviews_btn_prev',
    },
    loop: true,

    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    }
});

new Swiper('.popup_slider', {
    loop: true,
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
});

let imageSlide = new Swiper('.image_slider', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.btn_next',
        prevEl: '.btn-prev',
    },
    pagination: {
        el: '.slider_pagination',
        type: 'fraction',
    },
    loop: true,

    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
});

let textSlide = new Swiper('.text_slider', {
    slidesPerView: 1,
    loop: true,
    simulateTouch: false,
});
imageSlide.controller.control = textSlide;
textSlide.controller.control = imageSlide;