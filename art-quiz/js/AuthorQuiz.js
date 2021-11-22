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

class AuthorQuiz extends Quiz {
  constructor(categoryNum) {
    super(categoryNum);
    this.getQuestionInner = this.getQuestion();
  }

  getQuestion() {
    let questionNum = 0, categoryNum = this.categoryNum;
    return function() {
      questionNum++;
      console.log(questionNum);//##############################################
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

    const questionView = document.createElement('div');
    questionView.classList.add('quiz__question');

    const questionTitle = document.createElement('span');
    questionTitle.classList.add('quiz__title');
    questionTitle.textContent = 'Кто написал данную картину?';
    questionView.append(questionTitle);

    const questionPicture = document.createElement('img');
    questionPicture.classList.add('quiz__picture');
    questionPicture.src = question.question;
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
}

export default AuthorQuiz;
