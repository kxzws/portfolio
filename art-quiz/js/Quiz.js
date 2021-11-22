import images from './images.js';
import { 
  getRandomNum,
  toggleModal,
  modalPicture,
  modalAuthor, 
  modalName, 
  modalYear } from './index.js';

class Quiz {
  constructor(categoryNum) {
    this.categoryNum = categoryNum;
    this.result = Array(10).fill(0);
  }

  getQuestion() {
    return 0;
  }

  getResult() {
    return this.result.reduce((acc, curr) => acc += curr);
  }

  setResult(questionOrder, isCorrect) {
    this.result[questionOrder - 1] = isCorrect;
  }

  saveResult() {
    const categoryNum = this.categoryNum;
    const result = this.result;

    function setLocalStorage() {
      localStorage.setItem(`result${categoryNum}`, result);
    }
    window.addEventListener('beforeunload', setLocalStorage)
  }

  getResultView() {
    const results = this.getResult();
    const categoryNum = this.categoryNum;

    const resultView = document.createElement('div');
    resultView.classList.add('result');

    const resultTitle = document.createElement('p');
    resultTitle.classList.add('result__title');
    resultTitle.textContent = `Категория ${categoryNum}. Раунд завершён`;
    resultView.append(resultTitle);

    const resultBtn = document.createElement('button');
    resultBtn.classList.add('result__btn');
    resultBtn.textContent = 'Результаты';
    resultView.append(resultBtn);

    resultBtn.addEventListener('click', () => {
      resultView.textContent = '';

      const resultTitle = document.createElement('p');
      resultTitle.classList.add('result__title');
      resultTitle.textContent = `Результат: ${results}/10`;
      resultView.append(resultTitle);

      const resultCont = document.createElement('div');
      resultCont.classList.add('result__cont');

      this.result.forEach((isCorrect, ind) => {
        let imageNum = (categoryNum - 1) * 10 + ind;

        const resultPicture = document.createElement('img');
        resultPicture.classList.add('result__item');
        resultPicture.src = `https://raw.githubusercontent.com/kxzws/image-data/master/img/${imageNum}.jpg`;
        resultPicture.alt = 'picture: quiz answers';

        if (!isCorrect) resultPicture.classList.add('incorrect');

        resultPicture.addEventListener('click', () => {
          modalPicture.src = `https://raw.githubusercontent.com/kxzws/image-data/master/img/${imageNum}.jpg`;
          modalAuthor.textContent = images[imageNum].author;
          modalName.textContent = images[imageNum].name;
          modalYear.textContent = images[imageNum].year;
          toggleModal(isCorrect);
          document.querySelector('.here-is-button').textContent = '';
        })
        
        resultCont.append(resultPicture);
      });
      resultView.append(resultCont);
    });

    return resultView;
  }
}

export default Quiz;
