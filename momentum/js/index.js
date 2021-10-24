import showTime from "./clock.js";
import { getTimeOfDay } from "./greeting.js";
import { getSlideNext, getSlidePrev, getRandomNum, setBg, randomNum } from "./slider.js";


const dateObj = new Date();
const hours = dateObj.getHours();
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

showTime();
setBg(getTimeOfDay(hours), String(randomNum).padStart(2, "0"));

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
