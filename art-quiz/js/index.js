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
const AuthorQuizBtn = document.getElementById('authorQuiz');
const PictureQuizBtn = document.getElementById('pictureQuiz');
const SettingsBtn = document.getElementById('settings');

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
  let count = 1;
  while (count <= SECTION_COUNT) {
    const category = document.createElement('button');
    category.id = 'cat' + count;
    category.classList.add('categories__category');
    category.classList.add(categoryType);
    
    const categoryNum = document.createElement('span');
    categoryNum.classList.add('categories__category-num');
    categoryNum.textContent = count;
    category.append(categoryNum);
   
    container.append(category);

    let quiz;
    switch (categoryType) {
      case 'category-author': quiz = new AuthorQuiz(count);
      break;
      case 'category-picture': quiz = new PictureQuiz(count);
      break;
    }
    category.addEventListener('click', () => {
      clearContainer(quizSection);
      quizSection.append(quiz.getQuestionView(1));
      showSection(quizSection);
    });

    count++;
  }
}

mainPageBtn.addEventListener('click', () => showSection(mainPage));
categoriesBtn.addEventListener('click', () => showSection(categoriesSection));
AuthorQuizBtn.addEventListener('click', () => {
  clearContainer(categoriesSection);
  createCategories(categoriesSection, 'category-author');
  showSection(categoriesSection);
});
PictureQuizBtn.addEventListener('click', () => {
  clearContainer(categoriesSection);
  createCategories(categoriesSection, 'category-picture');
  showSection(categoriesSection);
});
SettingsBtn.addEventListener('click', () => showSection(settingsSection));
