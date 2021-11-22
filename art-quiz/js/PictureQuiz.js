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

class PictureQuiz extends Quiz {
  constructor(categoryNum) {
    super(categoryNum);
    this.getQuestionInner = this.getQuestion();
  }

  getQuestion() {
    let questionNum = 0, categoryNum = this.categoryNum;
    return function() {
      questionNum++;
      console.log(questionNum);//##############################################
      const imageNum = ((this.categoryNum - 1) * 10 + questionNum) * 2;
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
      answerPicture.src = value;
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
}

export default PictureQuiz;