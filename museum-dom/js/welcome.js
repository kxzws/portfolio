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

const startSlider = () => {
  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);
  setInterval(nextSlide, 10000);
};

export default startSlider;
