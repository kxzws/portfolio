console.log("Score: 102/150");
console.log("Невыполненные пункты:");
console.log("1. можно управлять проигрыванием трека кнопкой рядом с треком в плейлисте");
console.log("2. перевод приложения (полностью)");
console.log("3. подключение изображений через API (полностью)");
console.log("4. настройки приложения (полностью)");
console.log("5. доп-й функционал");

import showTime from "./clock.js";
import { getTimeOfDay } from "./greeting.js";
import { getSlideNext, getSlidePrev, setBg, randomNum } from "./slider.js";
import { getWeather, city } from "./weather.js";
import { getQuotes } from "./quote.js";
import {
  playAudio,
  playNext,
  playPrev,
  playBtn,
  createPlayList,
  audio
} from "./player.js";

const dateObj = new Date();
const hours = dateObj.getHours();
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const changeQuote = document.querySelector(".change-quote");
const playNextBtn = document.querySelector(".play-next");
const playPrevBtn = document.querySelector(".play-prev");

showTime();
setBg(getTimeOfDay(hours), String(randomNum).padStart(2, "0"));
createPlayList();

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);
city.addEventListener("change", getWeather);
changeQuote.addEventListener("click", getQuotes);
playBtn.addEventListener("click", playAudio);
playNextBtn.addEventListener("click", playNext);
playPrevBtn.addEventListener("click", playPrev);
audio.addEventListener("ended", playNext);
