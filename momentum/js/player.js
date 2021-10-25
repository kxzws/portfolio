import playList from "./playList.js";

const playBtn = document.querySelector(".play");
const playUl = document.querySelector(".play-list");
const progressBar = document.querySelector(".progress-bar");
const audio = new Audio();
let isPlay = false,
  playNum = 0,
  playListCount = playList.length;
const currentSong = document.querySelector(".current-song");
const currentTime = document.querySelector(".current-time");
const durationTime = document.querySelector(".duration-time");
const volBtn = document.querySelector(".volume");
const progressVol = document.querySelector(".progress-vol");

function createPlayList() {
  playList.forEach((el) => {
    const playLi = document.createElement("li");
    playLi.classList.add("play-item");
    playLi.textContent = el.title;
    playUl.append(playLi);
  });
  const audios = document.querySelectorAll(".play-item");
  audios[0].classList.add("item-active");
  currentSong.textContent = audios[0].textContent;
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
  setInterval(updateProgressValue, 500);
}

function playNext() {
  const audios = document.querySelectorAll(".play-item");
  audios[playNum].classList.remove("item-active");

  if (playNum < playListCount - 1) playNum++;
  else playNum = 0;

  audios[playNum].classList.add("item-active");
  currentSong.textContent = audios[playNum].textContent;

  isPlay = false;
  playAudio();
}

function playPrev() {
  const audios = document.querySelectorAll(".play-item");
  audios[playNum].classList.remove("item-active");

  if (playNum > 0) playNum--;
  else playNum = playListCount - 1;

  audios[playNum].classList.add("item-active");
  currentSong.textContent = audios[playNum].textContent;

  isPlay = false;
  playAudio();
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

function updateProgressValue() {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  const value = (audio.currentTime / audio.duration) * 100;
  progressBar.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${value}%,
     #fff ${value}%, white 100%)`;
  currentTime.textContent = formatTime(Math.floor(audio.currentTime));
  if (durationTime.textContent === "NaN:NaN") {
    durationTime.textContent = "0:00";
  } else {
    durationTime.textContent = formatTime(Math.floor(audio.duration));
  }
}

progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});
volBtn.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    volBtn.classList.remove("volume-off");
    progressVol.value = audio.volume * 100;
    progressVol.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${progressVol.value}%,
      #fff ${progressVol.value}%, white 100%)`;
  } else {
    audio.muted = true;
    volBtn.classList.add("volume-off");
    progressVol.value = 0;
    progressVol.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 0%,
      #fff 0%, white 100%)`;
  }
});
progressVol.addEventListener("input", () => {
  audio.volume = progressVol.value / 100;
  progressVol.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${progressVol.value}%,
    #fff ${progressVol.value}%, white 100%)`;
  if (audio.volume === 0) volBtn.classList.add("volume-off");
  else volBtn.classList.remove("volume-off");
});

export { playAudio, playNext, playPrev, playBtn, createPlayList, audio };
