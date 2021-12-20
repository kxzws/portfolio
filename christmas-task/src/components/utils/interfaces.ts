type imageOption = {
  className: string,
  src: string,
  alt: string
};

interface IValue {
  shape: Array<string>, // 'шар' | 'колокольчик' | 'шишка' | 'снежинка' | 'фигурка'
  color: Array<string>, // 'белый' | 'желтый' | 'красный' | 'синий' | 'зелёный'
  size: Array<string>, // 'большой' | 'средний' | 'малый'
  favourite: boolean
}

interface IRange {
  amount: [number, number],
  year: [number, number]
}

interface IFilter {
  value: IValue,
  range: IRange,
  sort: string, // 'increasing' | 'decreasing' | 'increasingAmount' | 'decreasingAmount'
  searchInp: string | null
}

type toy = {
  num: string,
  name: string,
  count: string,
  year: string,
  shape: string,
  color: string,
  size: string,
  favorite: boolean,
};

type svgOption = {
  filter: string,
  src: string
};

type colorOption = {
  filter: string,
  color: string
};

type ballOption = {
  filter: string,
  src: string,
  addClass: string
};

export {
  imageOption,
  IFilter,
  toy,
  svgOption,
  colorOption,
  ballOption
};
