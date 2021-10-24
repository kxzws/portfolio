import showTime from "./clock.js";
import { getTimeOfDay } from "./greeting.js";
import { getSlideNext, getSlidePrev, setBg, randomNum } from "./slider.js";
import { getWeather, city } from "./weather.js";
import { getQuotes } from "./quote.js";


const dateObj = new Date();
const hours = dateObj.getHours();
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const changeQuote = document.querySelector('.change-quote');

showTime();
setBg(getTimeOfDay(hours), String(randomNum).padStart(2, "0"));

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
city.addEventListener('change', getWeather);
changeQuote.addEventListener('click', getQuotes);
