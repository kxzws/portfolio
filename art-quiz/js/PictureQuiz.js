import Quiz from './Quiz.js';
import images from './images.js';
import { 
  getRandomNum, 
  toggleModal, 
  modalPicture, 
  modalAuthor, 
  modalName, 
  modalYear } from './index.js';

const ANSWER_COUNT = 4;
const QUESTION_COUNT = 10;
const CATEGORY_COUNT = 12;

class PictureQuiz extends Quiz {
  constructor(categoryNum) {
    super(categoryNum);
    this.getQuestionInner = this.getQuestion();

    function getLocalStorage() {
      if(localStorage.getItem(`result${categoryNum + CATEGORY_COUNT}`)) {
        this.result = localStorage.getItem(`result${categoryNum + CATEGORY_COUNT}`);
      }
    }
    window.addEventListener('load', getLocalStorage)
  }

  getQuestion() {
    let questionNum = 0, categoryNum = this.categoryNum;
    return function() {
      questionNum++;

      const imageNum = (categoryNum + CATEGORY_COUNT - 1) * 10 + questionNum;
      let answers = [], count = 1;
      while (count <= ANSWER_COUNT) {
        let order = getRandomNum(1, 240);
        let value = `https://raw.githubusercontent.com/kxzws/image-data/master/img/${order}.jpg`;
        while (value === `https://raw.githubusercontent.com/kxzws/image-data/master/img/${imageNum}.jpg`) {
          order++;
          value = `https://raw.githubusercontent.com/kxzws/image-data/master/img/${order}.jpg`;
        }
        answers.push(value);

        count++;
      }
      answers[getRandomNum(1, 4) - 1] = `https://raw.githubusercontent.com/kxzws/image-data/master/img/${imageNum}.jpg`;

      return {
        questionOrder: questionNum,
        question: images[imageNum].author,
        answers: answers,
        correctAnswer: `https://raw.githubusercontent.com/kxzws/image-data/master/img/${imageNum}.jpg`,
        name: images[imageNum].name,
        year: images[imageNum].year
      };
    }
  }

  getQuestionView() {
    const question = this.getQuestionInner();

    if (question.questionOrder === QUESTION_COUNT + 1) {
      this.saveResult();
      return this.getResultView();
    }

    const questionView = document.createElement('div');
    questionView.classList.add('quiz__question');

    const questionTitle = document.createElement('span');
    questionTitle.classList.add('quiz__title');
    questionTitle.textContent = `Какую картину написал автор ${question.question}?`;
    questionView.append(questionTitle);

    const answersContainer = document.createElement('div');
    answersContainer.classList.add('quiz__answers-container');

    for (let value of question.answers) {
      const answer = document.createElement('button');
      answer.classList.add('quiz__answer-cont');

      const answerPicture = document.createElement('img');
      answerPicture.classList.add('quiz__answer-pic');
      const img = new Image();
      img.src = value;
      img.addEventListener('load', () => answerPicture.src = img.src);
      answerPicture.alt = 'picture: picture of question';
      answer.append(answerPicture);

      answer.addEventListener('click', () => {
        modalPicture.src = question.correctAnswer;
        modalAuthor.textContent = question.question;
        modalName.textContent = question.name;
        modalYear.textContent = question.year;
        if (value === question.correctAnswer) {
          this.setResult(question.questionOrder, 1);
          toggleModal(true);
        } else toggleModal(false);
      });

      answersContainer.append(answer);
    }
    questionView.append(answersContainer);

    return questionView;
  }

  saveResult() {
    const categoryNum = this.categoryNum + CATEGORY_COUNT;
    const result = this.result;

    function setLocalStorage() {
      localStorage.setItem(`result${categoryNum}`, result);
    }
    window.addEventListener('beforeunload', setLocalStorage)
  }

  getResultView() {
    const results = this.getResult();
    const categoryNum = this.categoryNum + CATEGORY_COUNT;

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
        let imageNum = (categoryNum - 1) * 10 + (ind + 1);

        const resultPicture = document.createElement('img');
        resultPicture.classList.add('result__item');
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/kxzws/image-data/master/img/${imageNum}.jpg`;
        img.addEventListener('load', () => resultPicture.src = img.src);
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

export default PictureQuiz;