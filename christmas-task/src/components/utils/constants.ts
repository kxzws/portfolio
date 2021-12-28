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
  choosedTree: 2,
  choosedTheme: 6,
  choosedGarland: null
};
const AREA_COORDS = '237,3,221,14,223,44,203,54,211,80,179,115,192,145,169,150,154,180,150,219,156,231,143,237,129,256,132,275,111,309,107,339,87,375,73,402,64,449,42,488,49,504,38,534,34,555,18,568,19,597,5,612,15,624,19,645,43,663,59,679,91,679,114,680,129,680,129,696,143,712,160,700,174,693,185,702,203,691,227,701,257,688,285,697,316,713,339,693,379,676,392,658,407,675,433,678,447,664,479,665,483,634,465,617,486,612,493,590,467,520,449,503,465,491,452,470,453,451,428,447,443,410,418,399,427,382,409,339,389,334,399,314,386,298,383,268,378,245,365,240,347,219,357,200,336,183,344,155,329,138,327,115,311,109,306,89,291,82,302,55,280,41,264,42,255,11';

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
  DEFAULT_TREE_SETTINGS,
  AREA_COORDS
};
