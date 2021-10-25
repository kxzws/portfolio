import playList from "./playList.js";

const playBtn = document.querySelector(".play");
const playUl = document.querySelector(".play-list");
const audio = new Audio();
let isPlay = false,
  playNum = 0,
  playListCount = playList.length;

function createPlayList() {
  playList.forEach((el) => {
    const playLi = document.createElement("li");
    playLi.classList.add("play-item");
    playLi.textContent = el.title;
    playUl.append(playLi);
  });
  const audios = document.querySelectorAll(".play-item");
  audios[0].classList.add("item-active");
}

function toggleBtn() {
  if (isPlay) {
    playBtn.classList.add("pause");
  } else {
    playBtn.classList.remove("pause");
  }
}

function playAudio() {
  if (isPlay) {
    audio.pause();
    isPlay = false;
    toggleBtn();
  } else {
    audio.src = playList[playNum].src;
    audio.play();
    isPlay = true;
    toggleBtn();
  }
}

function playNext() {
  const audios = document.querySelectorAll(".play-item");
  audios[playNum].classList.remove("item-active");

  if (playNum < playListCount - 1) playNum++;
  else playNum = 0;

  audios[playNum].classList.add("item-active");

  isPlay = false;
  playAudio();
}

function playPrev() {
  const audios = document.querySelectorAll(".play-item");
  audios[playNum].classList.remove("item-active");

  if (playNum > 0) playNum--;
  else playNum = playListCount - 1;

  audios[playNum].classList.add("item-active");

  isPlay = false;
  playAudio();
}

export { playAudio, playNext, playPrev, playBtn, createPlayList, audio };
