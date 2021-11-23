import Quiz from './Quiz.js';
import images from './images.js';
import { 
  ANSWER_COUNT,
  QUESTION_COUNT,
  getRandomNum,
  toggleModal,
  getResultButton,
  categoriesBtn,
  modalPicture,
  modalAuthor, 
  modalName, 
  modalYear } from './index.js';

class AuthorQuiz extends Quiz {
  constructor(categoryNum) {
    super(categoryNum);
    this.getQuestionInner = this.getQuestion();
  }

  getQuestion() {
    let questionNum = 0, categoryNum = this.categoryNum;
    return function() {
      questionNum++;

      const imageNum = (categoryNum - 1) * 10 + questionNum;
      let answers = [], count = 1;
      while (count <= ANSWER_COUNT) {
        let order = getRandomNum(1, 240);
        let value = images[order].author;
        while (value === images[imageNum].author) {
          order++;
          value = images[order].author;
        }
        answers.push(value);

        count++;
      }
      answers[getRandomNum(1, 4) - 1] = images[imageNum].author;

      return {
        questionOrder: questionNum,
        question: `https://raw.githubusercontent.com/kxzws/image-data/master/img/${imageNum}.jpg`,
        answers: answers,
        correctAnswer: images[imageNum].author,
        name: images[imageNum].name,
        year: images[imageNum].year
      };
    }
  }

  getQuestionView() {
    const question = this.getQuestionInner();

    if (question.questionOrder === QUESTION_COUNT + 1) {
      this.saveResult();
      if (document.getElementById(`res${this.categoryNum}`)) {
        const btn = document.getElementById(`res${this.categoryNum}`);
        btn.textContent = `${this.getResult()}/10`;
      } else {
        const btn = document.getElementById(`cat${this.categoryNum}`);
        btn.classList.add('played');
        btn.append(getResultButton(this.categoryNum, this.getResult()));
      }
      return this.getResultView();
    }

    const questionView = document.createElement('div');
    questionView.classList.add('quiz__question');

    const questionTitle = document.createElement('span');
    questionTitle.classList.add('quiz__title');
    questionTitle.textContent = 'Кто написал данную картину?';
    questionView.append(questionTitle);

    const questionPicture = document.createElement('img');
    questionPicture.classList.add('quiz__picture');
    const img = new Image();
    img.src = question.question;
    img.addEventListener('load', () => questionPicture.src = img.src);
    questionPicture.alt = 'picture: picture of question';
    questionView.append(questionPicture);

    const answersContainer = document.createElement('div');
    answersContainer.classList.add('quiz__answers-container');

    for (let value of question.answers) {
      const answer = document.createElement('button');
      answer.classList.add('quiz__answer');
      answer.textContent = value;

      answer.addEventListener('click', () => {
        modalPicture.src = question.question;
        modalAuthor.textContent = question.correctAnswer;
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

      const resultNextBtn = document.createElement('button');
      resultNextBtn.classList.add('result__btn');
      resultNextBtn.textContent = 'Продолжить';
      resultView.append(resultNextBtn);

      resultNextBtn.addEventListener('click', () => {
        let event = new Event('click');
        categoriesBtn.dispatchEvent(event);
      })
    });

    return resultView;
  }
}

export default AuthorQuiz;
