function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.scrollY,
    left: box.left + window.scrollX,
  };
}

const sliderImages = document.querySelectorAll('.slide-up');

function checkSlide() {
  sliderImages.forEach((sliderImage) => {
    // half way through the image
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.offsetHeight / 3;
    // bottom of the image
    const imageBottom =
      getCoords(sliderImage).top +
      sliderImage.offsetTop +
      sliderImage.offsetHeight;
    const isHalfShown = slideInAt > getCoords(sliderImage).top;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add("slide-up-active");
    } else {
      sliderImage.classList.remove("slide-up-active");
    }
  });
}

export {
    debounce, checkSlide
};
