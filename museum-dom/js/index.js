import startSlider from "./welcome.js";
startSlider();

import startMenu from "./header.js";
document.addEventListener("click", startMenu);

import { progressAnimation } from "./video.js";
const playProgress = document.querySelector(".play-progress"),
  volumeProgress = document.querySelector(".volume-progress");
playProgress.addEventListener("input", progressAnimation);
volumeProgress.addEventListener("input", progressAnimation);

import { createRipple } from "./tickets.js";
const buttons = document.getElementsByClassName("modal-btn");
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}

import initComparisons from "./explore.js";
initComparisons();

