const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
let randomNum;

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getQuotes() {  
  const quotes = 'js/data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  
  getRandomNum(1, 10);
  quote.textContent = `"${data[randomNum - 1].text}"`;
  author.textContent = `${data[randomNum - 1].author}`;
}
getQuotes();

export  { getQuotes };
