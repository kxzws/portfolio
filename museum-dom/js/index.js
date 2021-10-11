console.log('Score: 60/150');
console.log('Выполненные пункты:');
console.log('Welcome:');
console.log('1) есть возможность перелистывания слайдов влево и вправо кликами по стрелкам');
console.log('2) есть возможность перелистывания слайдов кликами по буллетам');
console.log('3) перелистывание слайдов бесконечное (зацикленное)');
console.log('4) при перелистывании слайдов буллет активного слайда подсвечивается');
console.log('5) при перелистывании слайдов кликами или свайпами меняется номер активного слайда');
console.log('6) даже при частых кликах или свайпах нет ситуации');
console.log('Video player:');
console.log('7) при клике по кнопке "Play" слева внизу на панели видео начинается проигрывание видео');
console.log('8) при клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео');
console.log('9) прогресс-бар отображает прогресс проигрывания видео');
console.log('10) если прогресс-бар перетянуть до конца, видео останавливается');
console.log('11) при перемещении ползунка громкости звука изменяется громкость видео');
console.log('Explore:');
console.log('12) ползунок можно перетягивать мышкой по горизонтали');
console.log('13) ползунок никогда не выходит за границы картины');
console.log('14) при перемещении ползунка справа налево плавно появляется нижняя картина');
console.log('15) при перемещении ползунка слева направо плавно появляется верхняя картина');
console.log('16) при обновлении страницы ползунок возвращается в исходное положение');
console.log('Gallery:');
console.log('17) при прокрутке страницы вниз появление картин секции Galery сопровождается анимацией');
console.log('18) если прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется');
console.log('19) при обновлении страницы анимация картин повторяется');
console.log('Contacts:');
console.log('20) в секции Contacts добавлена интерактивная карта');
console.log('21) на карте отображаются маркеры, расположение и внешний вид маркеров соответствует макету');
console.log('22) стиль карты соответствует макету');

import startSlider from "./welcome.js";
startSlider();

import startMenu from "./header.js";
document.addEventListener("click", startMenu);

import initComparisons from "./explore.js";
initComparisons();

import { progressAnimation } from "./video.js";
const playProgress = document.querySelector(".play-progress"),
  volumeProgress = document.querySelector(".volume-progress");
playProgress.addEventListener("input", progressAnimation);
volumeProgress.addEventListener("input", progressAnimation);

// ####################################################################
const player = document.querySelector('.video__video-cont');
const video = player.querySelector('.video__video');
const progressBar = player.querySelector('.play-progress');
const playToggle = player.querySelectorAll('.video__btn-play');
const volToggle = player.querySelectorAll('.video__btn-volume');
const ranges = player.querySelectorAll('.video__progress');
const btns = player.querySelectorAll('.video__btn');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  if (this.paused) {
    if (!playToggle[1].classList.contains("btn-off")) playToggle[1].classList.add("btn-off");
    if (playToggle[0].classList.contains("btn-off")) playToggle[0].classList.remove("btn-off");
    player.querySelector('.video__btn-big-play').classList.remove("btn-off");
  } else {
    if (!playToggle[0].classList.contains("btn-off")) playToggle[0].classList.add("btn-off");
    if (playToggle[1].classList.contains("btn-off")) playToggle[1].classList.remove("btn-off");
    player.querySelector('.video__btn-big-play').classList.add("btn-off");
  }
}

function handleRangeUpdate() {
  if (this.name === 'volume') {
    video[this.name] = this.value / 100;
  } else { video[this.name] = this.value; }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.value = percent;
  progressBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #c4c4c4 ${percent}%, #c4c4c4 100%)`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function openFullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) { /* Firefox */
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { /* IE/Edge */
    video.msRequestFullscreen();
  }
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

btns[0].addEventListener('click', togglePlay);
player.querySelector('.video__btn-big-play').addEventListener('click', togglePlay);
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
// ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);
// ####################################################################

import { debounce, checkSlide } from "./gallery.js";
window.addEventListener('scroll', debounce(checkSlide));

import { createRipple } from "./bookingTickets.js";
const buttons = document.getElementsByClassName("modal-btn");
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}

//contacts map
mapboxgl.accessToken =
  "pk.eyJ1Ijoia3h6d3MiLCJhIjoiY2t1Y3F3NXNsMTBhejJ3bXh3bDkyOGRlZyJ9.G3CiV9AC0NrhMVhdMDgqBQ";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/light-v10", // style URL
  center: [2.3364, 48.86091], // starting position [lng, lat]
  zoom: 15.8, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

const marker1 = new mapboxgl.Marker({ color: "black" })
  .setLngLat([2.3364, 48.86091])
  .addTo(map);

const marker2 = new mapboxgl.Marker({ color: "grey" })
  .setLngLat([2.3333, 48.8602])
  .addTo(map);

const marker3 = new mapboxgl.Marker({ color: "grey" })
  .setLngLat([2.3397, 48.8607])
  .addTo(map);

const marker4 = new mapboxgl.Marker({ color: "grey" })
  .setLngLat([2.333, 48.8619])
  .addTo(map);

const marker5 = new mapboxgl.Marker({ color: "grey" })
  .setLngLat([2.3365, 48.8625])
  .addTo(map);
