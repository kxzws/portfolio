import Quiz from './Quiz.js';
import images from './images.js';
import { 
  toggleModal, 
  getResultButton,
  categoriesBtn,
  modalPicture, 
  modalAuthor, 
  modalName, 
  modalYear,
  setting } from './index.js';
import { getRandomNum } from './helpers.js';
import { 
  ANSWER_COUNT,
  CATEGORY_COUNT,
  QUESTION_COUNT
} from './constants.js';

class PictureQuiz extends Quiz {
  constructor(categoryNum) {
    super(categoryNum);
    this.getQuestionInner = this.getQuestion();
  }

  getQuestion() {
    let questionNum = 0, categoryNum = this.categoryNum;
    return function() {
      questionNum++;
      
      const imageNum = (categoryNum + CATEGORY_COUNT - 1) * 10 + questionNum;
      
      if (imageNum > 240) return {
        questionOrder: questionNum
      }; //bug with 241

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

    // verify if it's the finish
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
      setting.playAudio('finish');
      return this.getResultView();
    }

    const questionView = document.createElement('div');
    questionView.classList.add('quiz__question');

    const questionTitle = document.createElement('span');
    questionTitle.classList.add('quiz__title');
    questionTitle.textContent = `Какую картину написал автор ${question.question}?`;
    questionView.append(questionTitle);

    const answersContainer = this.getAnswersView(question);
    questionView.append(answersContainer);

    return questionView;
  }

  getAnswersView(question) {
    const answersContainer = document.createElement('div');
    answersContainer.classList.add('quiz__answers-container');

    question.answers.forEach((value) => {
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
          setting.playAudio('correct');
        } else {
          toggleModal(false);
          setting.playAudio('wrong');
        }
      });

      answersContainer.append(answer);
    });
    return answersContainer;
  }

  saveResult() {
    const categoryNum = this.categoryNum + CATEGORY_COUNT;
    const result = this.result;

    localStorage.setItem(`result${categoryNum}`, result);
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

        if (!isCorrect) {
        resultPicture.classList.add('incorrect');
        }

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

export default PictureQuiz;
