$(document).ready(function (){
    // Swiper Timeline
    var swiperTimeline = new Swiper('.swiper-timeline', {
        slidesPerView: 1,
        spaceBetween: 1,
        autoplay: {
            delay: 7500,
        },
        navigation: {
            prevEl: '.timeline .swiper-button-prev',
            nextEl: '.timeline .swiper-button-next',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 1,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 1,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 1,
            }
        }
    });
});