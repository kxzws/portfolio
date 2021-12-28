import { IFilter } from '../utils/interfaces';

const IS_TOYS_TAB = true;

const CONTENT_TAB = document.getElementById('content');

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 12;
const MIN_YEAR = 1940;
const MAX_YEAR = 2020;
const DEFAULT_FILTER = {
  value: {
    shape: [],
    color: [],
    size: [],
    favourite: false
  },
  range: {
    amount: [MIN_AMOUNT, MAX_AMOUNT],
    year: [MIN_YEAR, MAX_YEAR]
  },
  sort: 'increasing',
  searchInp: null
} as IFilter;

const SHAPE_OPTION = [
  {
    filter: 'шар',
    src: '../../assets/images/filter-svg/ball.svg'
  },
  {
    filter: 'колокольчик',
    src: '../../assets/images/filter-svg/bell.svg'
  },
  {
    filter: 'шишка',
    src: '../../assets/images/filter-svg/cone.svg'
  },
  {
    filter: 'снежинка',
    src: '../../assets/images/filter-svg/snowflake.svg'
  },
  {
    filter: 'фигурка',
    src: '../../assets/images/filter-svg/toy.svg'
  }
];
const COLOR_OPTION = [
  {
    filter: 'белый',
    color: 'white'
  },
  {
    filter: 'желтый',
    color: 'yellow'
  },
  {
    filter: 'красный',
    color: 'red'
  },
  {
    filter: 'синий',
    color: 'blue'
  },
  {
    filter: 'зелёный',
    color: 'green'
  }
];
const SIZE_OPTION = [
  {
    filter: 'большой',
    src: '../../assets/images/filter-svg/ball.svg',
    addClass: 'ball-big'
  },
  {
    filter: 'средний',
    src: '../../assets/images/filter-svg/ball.svg',
    addClass: 'ball-med'
  },
  {
    filter: 'малый',
    src: '../../assets/images/filter-svg/ball.svg',
    addClass: 'ball-small'
  }
];

const DEFAULT_TOYS_NUMBER = 19;
const TREE_AMOUNT = 6;
const THEME_AMOUNT = 10;
const DEFAULT_TREE_SETTINGS = {
  audio: new Audio('../../assets/audio/audio.mp3'),
  isSnowFall: false,
  snowInterval: null,
  choosedTree: 0,
  choosedTheme: 6,
  choosedGarland: null
};

export {
  IS_TOYS_TAB,
  CONTENT_TAB,
  DEFAULT_FILTER,
  SHAPE_OPTION,
  COLOR_OPTION,
  SIZE_OPTION,
  MIN_AMOUNT,
  MAX_AMOUNT,
  MIN_YEAR,
  MAX_YEAR,
  DEFAULT_TOYS_NUMBER,
  TREE_AMOUNT,
  THEME_AMOUNT,
  DEFAULT_TREE_SETTINGS
};
