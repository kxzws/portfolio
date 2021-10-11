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
