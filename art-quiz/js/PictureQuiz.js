import Quiz from './Quiz.js';
import images from './images.js';

const ANSWER_COUNT = 4;

class PictureQuiz extends Quiz {
  getQuestion(questionNum) {
    function getRandomNum(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const imageNum = ((this.categoryNum - 1) * 10 + questionNum) * 2;
    let answers = [], count = 1;
    while (count <= ANSWER_COUNT) {
      const value = `https://raw.githubusercontent.com/kxzws/image-data/master/full/${getRandomNum(1, 240)}full.jpg`;
      answers.push(value);

      count++;
    }
    answers[getRandomNum(1, 4) - 1] = `https://raw.githubusercontent.com/kxzws/image-data/master/full/${imageNum}full.jpg`;

    return {
      question: images[imageNum].author,
      answers: answers,
      correctAnswer: `https://raw.githubusercontent.com/kxzws/image-data/master/full/${imageNum}full.jpg`
    };
  }

  getQuestionView(questionNum) {
    const question = this.getQuestion(questionNum);

    const questionView = document.createElement('div');
    questionView.classList.add('quiz__question');

    const questionTitle = document.createElement('span');
    questionTitle.classList.add('quiz__title');
    questionTitle.textContent = 'Какую картину написал данный автор?';
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
      answersContainer.append(answer);
    }
    questionView.append(answersContainer);

    return questionView;
  }
}

export default PictureQuiz;