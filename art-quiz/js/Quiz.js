class Quiz {
  constructor(categoryNum) {
    this.categoryNum = categoryNum;
    this.result = Array(12).fill(0);
  }

  getQuestion() {
    return 0;
  }

  setResult(questionNum, isCorrect) {
    this.result[questionNum] = isCorrect;
  }
}

export default Quiz;
