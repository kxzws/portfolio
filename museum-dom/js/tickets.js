let radios = document.querySelectorAll('input[name="ttype"]');

radios.addEventListener("click", function () {
  for (let radio of radios) {
    if (radio.checked) {
      console.log(radio.value);
    }
  }
});
