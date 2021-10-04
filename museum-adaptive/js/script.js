//responsive menu in header-nav
const burgerMenu = document.querySelector(".header__nav");
const closeMenu = document.querySelector(".header__close");
const welcomeSideBar = document.querySelector(".welcome__side-bar");
const welcomeCarousel = document.querySelector(".carousel");
const welcomeCarouselPanel = document.querySelector(".carousel__control-panel");

const firstLine = document.querySelector(".line-first");
const secondLine = document.querySelector(".line-second");
const thirdLine = document.querySelector(".line-third");

closeMenu.addEventListener('click', function() {
  burgerMenu.classList.toggle('open');
  welcomeSideBar.classList.toggle('side-bar-unvis');
  welcomeCarousel.classList.toggle('carousel-unvis');
  welcomeCarouselPanel.classList.toggle('carousel-unvis');
  firstLine.classList.toggle('line-first-close');
  secondLine.classList.toggle('line-second-close');
  thirdLine.classList.toggle('line-third-close');
});

//progress-bar in video
const playProgress = document.querySelector(".play-progress");

playProgress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
});

const volumeProgress = document.querySelector(".volume-progress");

volumeProgress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
});

//ripple-effect in tickets
function createRipple(event) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const buttons = document.getElementsByClassName("modal-btn");
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}
