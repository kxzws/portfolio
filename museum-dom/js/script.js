//responsive menu in header-nav
const burgerMenu = document.querySelector(".header__nav");
const closeMenu = document.querySelector(".header__close");
const welcomeSideBar = document.querySelector(".welcome__side-bar");
const welcomeCarousel = document.querySelector(".carousel");
const welcomeCarouselPanel = document.querySelector(".carousel__control-panel");

const firstLine = document.querySelector(".line-first");
const secondLine = document.querySelector(".line-second");
const thirdLine = document.querySelector(".line-third");

function toggleMenu() {
  burgerMenu.classList.toggle("open");
  welcomeSideBar.classList.toggle("side-bar-unvis");
  welcomeCarousel.classList.toggle("carousel-unvis");
  welcomeCarouselPanel.classList.toggle("carousel-unvis");
  firstLine.classList.toggle("line-first-close");
  secondLine.classList.toggle("line-second-close");
  thirdLine.classList.toggle("line-third-close");
}
closeMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu();
});

document.addEventListener("click", (e) => {
  let target = e.target;
  let its_menu = target == burgerMenu || burgerMenu.contains(target);
  let its_hamburger = target == closeMenu;
  let menu_is_active = burgerMenu.classList.contains("open");

  if (!its_menu && !its_hamburger && menu_is_active) {
    toggleMenu();
  }
});

//slider in welcome
const prev = document.getElementById("btn-prev"),
  next = document.getElementById("btn-next"),
  slides = document.querySelectorAll(".carousel__item"),
  dots = document.querySelectorAll(".carousel__check"),
  order = document.querySelector(".carousel__order-digit");

let index = 0; // текущий активный слайд

const activeSlide = (n) => {
  for (let slide of slides) {
    slide.classList.remove("item-active");
  }
  slides[n].classList.add("item-active");
  order.textContent = `0${n + 1}`;
};
const activeDot = (n) => {
  for (let dot of dots) {
    dot.classList.remove("check-active");
  }
  dots[n].classList.add("check-active");
};
const prepareCurrentSlide = (ind) => {
  activeSlide(ind);
  activeDot(ind);
};
const nextSlide = () => {
  if (index === slides.length - 1) {
    index = 0;
    prepareCurrentSlide(index);
  } else {
    index++;
    prepareCurrentSlide(index);
  }
};
const prevSlide = () => {
  if (index === 0) {
    index = slides.length - 1;
    prepareCurrentSlide(index);
  } else {
    index--;
    prepareCurrentSlide(index);
  }
};

dots.forEach((item, indexDot) => {
  item.addEventListener("click", () => {
    index = indexDot;
    prepareCurrentSlide(index);
  });
});

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

setInterval(nextSlide, 10000);

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
