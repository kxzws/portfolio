import './ToysTab.css';

import data from '../../assets/data';

import { IFilter, toy, svgOption, colorOption, ballOption } from '../utils/interfaces';
import { DEFAULT_FILTER, SHAPE_OPTION, COLOR_OPTION, SIZE_OPTION } from '../utils/constants';

class ToysTab {
  private tab: HTMLElement;
  private filter: IFilter;
  private toys: toy[];
  private toysContainer: HTMLElement;

  constructor() {
    this.tab = document.createElement('div');
    this.tab.classList.add('toy-tab');

    this.filter = DEFAULT_FILTER;
    this.toys = data;

    this.toysContainer = document.createElement('div');
  }

  render(): HTMLElement {
    this.tab.textContent = '';

    const valueForm = this.createValueFilterForm();
    const rangeForm = this.createRangeFilterForm();
    const sortForm = this.createSortForm();

    this.tab.append(valueForm);
    this.tab.append(rangeForm);
    this.tab.append(sortForm);
    this.renderToysCont();
    this.tab.append(this.toysContainer);

    return this.tab;
  }

  renderToysCont(): void {
    this.toysContainer.textContent = '';
    this.toysContainer.append(this.createToysContainer());
  }

  updateFilter() {
    // data from search form
    const search = (document.querySelector('.search-form__input') as HTMLInputElement).value;
    if (search) { // add new value
      this.filter.searchInp = search;
    } else { // delete removed value
      this.filter.searchInp = null;
    }

    // data from value filter
    document.querySelectorAll('.form__icon').forEach((icon) => {
      const iconName = (icon as HTMLButtonElement).dataset.name;
      const iconFilter = String((icon as HTMLButtonElement).dataset.filter);

      if (icon.classList.contains('icon-active')) { // add new values
        switch (iconName) {
          case 'форма':
            if (this.filter.value.shape.indexOf(iconFilter) === -1) {
              this.filter.value.shape.push(iconFilter);
            }
            break;
          case 'цвет':
            if (this.filter.value.color.indexOf(iconFilter) === -1) {
              this.filter.value.color.push(iconFilter);
            }
            break;
          case 'размер':
            if (this.filter.value.size.indexOf(iconFilter) === -1) {
              this.filter.value.size.push(iconFilter);
            }
            break;
        }
      } else { // delete removed values
        switch (iconName) {
          case 'форма':
            if (this.filter.value.shape.indexOf(iconFilter) > -1) {
              const index = this.filter.value.shape.indexOf(iconFilter);
              this.filter.value.shape.splice(index, 1);
            }
            break;
          case 'цвет':
            if (this.filter.value.color.indexOf(iconFilter) > -1) {
              const index = this.filter.value.color.indexOf(iconFilter);
              this.filter.value.color.splice(index, 1);
            }
            break;
          case 'размер':
            if (this.filter.value.size.indexOf(iconFilter) > -1) {
              const index = this.filter.value.size.indexOf(iconFilter);
              this.filter.value.size.splice(index, 1);
            }
            break;
        }
      }
    });
    if ((document.getElementById('favourite') as HTMLInputElement).checked) {
      this.filter.value.favourite = true;
    } else {
      this.filter.value.favourite = false;
    }
    //#####################################################################
    //#####################################################################
    //console.log(this.filter);

    // data from range filer
    // data from sort filter
  }

  updateToysList() {
    this.toys = [];
    data.forEach((unit) => {
      const isShapeCorrect = this.filter.value.shape.includes(unit.shape) || this.filter.value.shape.length === 0;
      const isColorCorrect = this.filter.value.color.includes(unit.color) || this.filter.value.color.length === 0;
      const isSizeCorrect = this.filter.value.size.includes(unit.size) || this.filter.value.size.length === 0;
      const isFavourite = !this.filter.value.favourite || this.filter.value.favourite === unit.favorite;
      const isValueFilterCorrect = isShapeCorrect && isColorCorrect && isSizeCorrect && isFavourite;

      const isAmountCorrect = Number(unit.count) >= this.filter.range.amount[0] && Number(unit.count) <= this.filter.range.amount[1];
      const isYearCorrect = Number(unit.year) >= this.filter.range.year[0] && Number(unit.year) <= this.filter.range.year[1];
      const isRangeFilterCorrect = isAmountCorrect && isYearCorrect;

      const isSearchCorrect = this.filter.searchInp?.toLowerCase() === unit.name.toLowerCase() || !this.filter.searchInp;
      if (isValueFilterCorrect && isRangeFilterCorrect && isSearchCorrect) {
        this.toys.push(unit);
      }

      // sort
    });
  }

  // interface IFilter {
  //   value: {
  //     shape: Array<string>, // 'шар' | 'колокольчик' | 'шишка' | 'снежинка' | 'фигурка'
  //     color: Array<string>, // 'белый' | 'желтый' | 'красный' | 'синий' | 'зелёный'
  //     size: Array<string>, // 'большой' | 'средний' | 'малый'
  //     favourite: boolean
  //   },
  //   range: {
  //     amount: [number, number],
  //     year: [number, number]
  //   },
  //   sort: string, // 'increasing' | 'decreasing' | 'increasingAmount' | 'decreasingAmount'
  //   searchInp: string | null
  // }

  private createValueFilterForm(): HTMLElement {
    const form = document.createElement('div');
    form.classList.add('form');

    const title = document.createElement('h3');
    title.classList.add('form__title');
    title.textContent = 'Фильтры по значению:';

    const container = document.createElement('div');
    container.classList.add('form__cont');

    const subtitle = document.createElement('h4');
    subtitle.classList.add('form__subtitle');
    subtitle.textContent = 'только любимые';
    container.append(subtitle);

    const checkbox = document.createElement('input');
    checkbox.classList.add('form__checkbox');
    checkbox.id = 'favourite';
    checkbox.type = 'checkbox';
    container.append(checkbox);

    checkbox.addEventListener('change', () => {
      this.updateFilter();
      this.updateToysList();
      this.renderToysCont();
    });

    form.append(title);
    form.append(this.createFilterCont('форма', SHAPE_OPTION));
    form.append(this.createFilterCont('цвет', COLOR_OPTION));
    form.append(this.createFilterCont('размер', SIZE_OPTION));
    form.append(container);

    return form;
  }

  private createFilterCont(sub: string, options: svgOption[] | colorOption[] | ballOption[]): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('form__cont');

    const subtitle = document.createElement('h4');
    subtitle.classList.add('form__subtitle');
    subtitle.textContent = sub;
    container.append(subtitle);

    options.forEach((option: svgOption | colorOption | ballOption) => {
      const icon = document.createElement('button');
      icon.classList.add('form__icon');
      icon.dataset.name = sub;
      icon.dataset.filter = option.filter;
      
      if (sub === 'форма' || sub === 'размер') {
        icon.style.background = `center / contain no-repeat url(${(option as svgOption | ballOption).src})`;
      }

      if (sub === 'цвет') {
        icon.style.backgroundColor = (option as colorOption).color;
      }

      if (sub === 'размер') {
        icon.classList.add((option as ballOption).addClass);
      }

      icon.addEventListener('click', () => {
        icon.classList.toggle('icon-active');
        this.updateFilter();
        this.updateToysList();
        this.renderToysCont();
      });

      container.append(icon);
    });   
    
    return container;
  }

  private createRangeFilterForm(): HTMLElement {
    const form = document.createElement('div');
    form.classList.add('form');

    const title = document.createElement('h3');
    title.classList.add('form__title');
    title.textContent = 'Фильтры по диапазону:';
    
    return form;
  }

  private createSortForm(): HTMLElement {
    const form = document.createElement('div');
    form.classList.add('form');

    const title = document.createElement('h3');
    title.classList.add('form__title');
    title.textContent = 'Сортировка:';
    
    return form;
  }

  private createResetBtn(): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.classList.add('toy-tab__reset-btn');

    btn.addEventListener('click', () => this.resetFilter());
    
    return btn;
  }

  private resetFilter(): void {
    this.filter = DEFAULT_FILTER;
  }

  private createToysContainer(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('toy-cont');

    this.toys.forEach((toy) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const title = document.createElement('h4');
      title.classList.add('card__title');
      title.textContent = toy.name;
      card.append(title);

      const image = document.createElement('img');
      image.classList.add('card__img');
      image.src = `../../assets/toys/${toy.num}.png`;
      image.alt = 'pic: christmas tree toy picture';
      card.append(image);

      const countSub = document.createElement('h3');
      countSub.classList.add('card__subtitle');
      countSub.textContent = `Количество: ${toy.count}`;
      card.append(countSub);

      const yearSub = document.createElement('h3');
      yearSub.classList.add('card__subtitle');
      yearSub.textContent = `Год покупки: ${toy.year}`;
      card.append(yearSub);

      const shapeSub = document.createElement('h3');
      shapeSub.classList.add('card__subtitle');
      shapeSub.textContent = `Форма: ${toy.shape}`;
      card.append(shapeSub);

      const colorSub = document.createElement('h3');
      colorSub.classList.add('card__subtitle');
      colorSub.textContent = `Цвет: ${toy.color}`;
      card.append(colorSub);

      const sizeSub = document.createElement('h3');
      sizeSub.classList.add('card__subtitle');
      sizeSub.textContent = `Размер: ${toy.size}`;
      card.append(sizeSub);

      const favouriteSub = document.createElement('h3');
      favouriteSub.classList.add('card__subtitle');
      favouriteSub.textContent = `Любимая: ${toy.favorite ? 'да' : 'нет'}`;
      card.append(favouriteSub);

      container.append(card);
    });

    return container;
  }
}

export default ToysTab;
