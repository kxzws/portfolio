const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");

function showGreeting() {
  const dateObj = new Date();
  const hours = dateObj.getHours();
  const timeOfDay = getTimeOfDay(hours);
  const greetingText = `Good ${timeOfDay},`;

  greeting.textContent = greetingText;
}

function getTimeOfDay(hour) {
  switch (hour) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return "night";
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      return "morning";
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      return "afternoon";
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
      return "evening";
    default:
      return "errorTimeOfTheDay";
  }
}

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

export { showGreeting };
