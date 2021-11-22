import Quiz from './Quiz.js';
import PictureQuiz from './PictureQuiz.js';
import AuthorQuiz from './AuthorQuiz.js';

const SECTION_COUNT = 12;

//sections
const mainPage = document.querySelector('.main-page');
const categoriesSection = document.querySelector('.categories');
const quizSection = document.querySelector('.quiz');
const settingsSection = document.querySelector('.settings');

//buttons
const mainPageBtn = document.getElementById('mainPage');
const categoriesBtn = document.getElementById('categories');
//main-page buttons
const authorQuizBtn = document.getElementById('authorQuiz');
const pictureQuizBtn = document.getElementById('pictureQuiz');
const settingsBtn = document.getElementById('settings');

//modal fields 
const modalPicture = document.querySelector('.modal__pic');
const modalAuthor = document.getElementById('modalAuthor');
const modalName = document.getElementById('modalName');
const modalYear = document.getElementById('modalYear');

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toggleModal(isCorrect) {
  const overlay = document.querySelector('.overlay');
  const modal = document.querySelector('.modal');
  const symbolTrue = document.querySelector('.symbol-true');
  const symbolFalse = document.querySelector('.symbol-false');
  
  if (isCorrect) {
    if (!symbolFalse.classList.contains('hide')) symbolFalse.classList.add('hide');
    if (symbolTrue.classList.contains('hide')) symbolTrue.classList.remove('hide');
  } else {
    if (symbolFalse.classList.contains('hide')) symbolFalse.classList.remove('hide');
    if (!symbolTrue.classList.contains('hide')) symbolTrue.classList.add('hide');
  }

  overlay.addEventListener('click', () => {
    overlay.classList.add('hide');
    modal.classList.remove('open');
  })

  overlay.classList.toggle('hide');
  modal.classList.toggle('open');
}

function showSection(sectionShow) {
  const sections = document.querySelectorAll('section');
  for (let section of sections) {
    if (!section.classList.contains('hide')) section.classList.add('hide');
  }
  sectionShow.classList.remove('hide');
}

function clearContainer(container) {
  container.textContent = '';
}

function createCategories(container, categoryType) {
  for (let count = 1; count <= SECTION_COUNT; count++) {
    const category = document.createElement('button');
    category.id = 'cat' + count;
    category.classList.add('categories__category');
    category.classList.add(categoryType);
    
    const categoryNum = document.createElement('span');
    categoryNum.classList.add('categories__category-num');
    categoryNum.textContent = count;
    category.append(categoryNum);
   
    container.append(category);

    category.addEventListener('click', () => {
      let quiz;
      switch (categoryType) {
        case 'category-author': quiz = new AuthorQuiz(count);
        break;
        case 'category-picture': quiz = new PictureQuiz(count);
        break;
      }
      clearContainer(quizSection);
      quizSection.append(quiz.getQuestionView());
      showSection(quizSection);

      const next = document.createElement('button');
      next.classList.add('modal__btn');
      next.textContent = 'Продолжить';
      document.querySelector('.here-is-button').textContent = '';
      document.querySelector('.here-is-button').append(next);
      next.addEventListener('click', () => {
        clearContainer(quizSection);
        quizSection.append(quiz.getQuestionView());
        toggleModal(true);
      });
    });
  }
}

mainPageBtn.addEventListener('click', () => showSection(mainPage));
categoriesBtn.addEventListener('click', () => showSection(categoriesSection));
authorQuizBtn.addEventListener('click', () => {
  clearContainer(categoriesSection);
  createCategories(categoriesSection, 'category-author');
  showSection(categoriesSection);
});
pictureQuizBtn.addEventListener('click', () => {
  clearContainer(categoriesSection);
  createCategories(categoriesSection, 'category-picture');
  showSection(categoriesSection);
});
settingsBtn.addEventListener('click', () => showSection(settingsSection));

export { 
  getRandomNum,
  toggleModal,
  modalPicture,
  modalAuthor,
  modalName,
  modalYear
};
