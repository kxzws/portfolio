import { getTimeOfDay } from "./greeting.js";

const body = document.querySelector("body");
let randomNum;

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNum(1, 20);

function getSlideNext() {
  if (randomNum < 20) randomNum++;
  else randomNum = 1;
  const dateObj = new Date();
  const hours = dateObj.getHours();
  setBg(getTimeOfDay(hours), String(randomNum).padStart(2, "0"));
}
function getSlidePrev() {
  if (randomNum > 1) randomNum--;
  else randomNum = 20;
  const dateObj = new Date();
  const hours = dateObj.getHours();
  setBg(getTimeOfDay(hours), String(randomNum).padStart(2, "0"));
}

function setBg(timeOfDay, bgNum) {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/kxzws/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`; 
  img.onload = () => {      
    body.style.backgroundImage = `url('${img.src}')`
  };
}

export { getSlideNext, getSlidePrev, setBg, randomNum };
