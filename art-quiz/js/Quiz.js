class Quiz {
  constructor(categoryNum) {
    this.categoryNum = categoryNum;
    this.result = Array(10).fill(0);
  }

  getResult() {
    return this.result.reduce((acc, curr) => acc += curr);
  }

  setResult(questionOrder, isCorrect) {
    this.result[questionOrder - 1] = isCorrect;
  }
}

export default Quiz;
