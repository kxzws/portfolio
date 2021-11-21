import Quiz from './Quiz.js';

class AuthorQuiz extends Quiz {
  getQuestion(questionNum) {
    return {
      question: 'https://raw.githubusercontent.com/kxzws/image-data/master/full/0full.jpg',
      answers: ['1', '2', '3', 'Павел Федотов'],
      correctAnswer: 'Павел Федотов'
    };
  }

  getQuestionView(questionNum) {
    const question = this.getQuestion(questionNum);

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

    for (let value in question.answers) {
      const answer = document.createElement('button');
      answer.classList.add('quiz__answer');
      answer.textContent = value;
      answersContainer.append(answer);
    }
    questionView.append(answersContainer);

    return questionView;
  }
}

export default AuthorQuiz;
