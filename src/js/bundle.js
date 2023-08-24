import Swiper from 'swiper';
import { FreeMode, Mousewheel } from 'swiper/modules';

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    if(document.body.clientWidth >= 992){
        document.querySelectorAll('.slider').forEach((n, i) => {
            window[`slider${i+1}`] = new Swiper(n, {
                modules: [FreeMode, Mousewheel],
                freeMode: true,
                centeredSlides: true,
                direction: 'vertical',
                mousewheel: true,
                slidesPerView: 1.75,
                slidesOffsetBefore: -125 // чтобы слайды были повыше
            })
        });
        bindSwipers(slider1, slider2, slider3, slider4); // свяжем множество слайдеров
    }

});

// for multiple sliders
function bindSwipers(...swiperList) {
    for (const swiper of swiperList) {
        swiper.setTranslate = function(translate, byController, doNotPropagate) {
            if (doNotPropagate) {
                Swiper.prototype.setTranslate.apply(this, arguments)
            } else {
                for (const swiper of swiperList) {
                    swiper.setTranslate(translate, byController, true)
                }
            }
        }
        swiper.setTransition = function(duration, byController, doNotPropagate) {
            if (doNotPropagate) {
                Swiper.prototype.setTransition.apply(this, arguments)
            } else {
                for (const swiper of swiperList) {
                    swiper.setTransition(duration, byController, true)
                }
            }
        }
    }
}