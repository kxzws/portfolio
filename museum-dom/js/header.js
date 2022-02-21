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

function startMenu(e) {
  let target = e.target;
  let its_menu = target == burgerMenu || burgerMenu.contains(target);
  let its_hamburger = target == closeMenu;
  let menu_is_active = burgerMenu.classList.contains("open");

  if (!its_menu && !its_hamburger && menu_is_active) {
    toggleMenu();
  }
}

export default startMenu;
