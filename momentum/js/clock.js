import { showGreeting } from "./greeting.js";

const time = document.querySelector(".time");
const date = document.querySelector(".date");
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
};

function showTime() {
  const dateObj = new Date();
  const currentTime = dateObj.toLocaleTimeString();

  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}

function showDate() {
  const dateObj = new Date();
  const currentDate = dateObj.toLocaleDateString("en-US", options);
  date.textContent = currentDate;
}

export default showTime;
