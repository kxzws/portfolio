import './ToysTab.css';

import data from '../../assets/data';

import { IFilter, toy, svgOption, colorOption, ballOption } from '../utils/interfaces';
import { DEFAULT_FILTER, SHAPE_OPTION, COLOR_OPTION, SIZE_OPTION } from '../utils/constants';

class ToysTab {
  private tab: HTMLElement;
  private filter: IFilter;
  private toys: toy[];

  constructor() {
    this.tab = document.createElement('div');
    this.tab.classList.add('toy-tab');

    this.filter = DEFAULT_FILTER;
    this.toys = [];
  }

  render(): HTMLElement {
    this.tab.textContent = '';

    const valueForm = this.createValueFilterForm();
    const rangeForm = this.createRangeFilterForm();
    const sortForm = this.createSortForm();
    const toysCont = this.createToysContainer();

    this.tab.append(valueForm);
    this.tab.append(rangeForm);
    this.tab.append(sortForm);
    this.tab.append(toysCont);

    return this.tab;
  }

  private updateFilter() {

  }

  private updateToysList() {

  }

  private createValueFilterForm(): HTMLElement {
    const form = document.createElement('div');
    form.classList.add('form');

    const title = document.createElement('h3');
    title.classList.add('form__title');
    title.textContent = 'Фильтры по значению:';

    form.append(title);
    form.append(this.createFilterCont('Форма', SHAPE_OPTION));
    form.append(this.createFilterCont('Цвет', COLOR_OPTION));
    form.append(this.createFilterCont('Размер', SIZE_OPTION));

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
      icon.dataset.filter = option.filter;
      
      if (sub === 'Форма' || sub === 'Размер') {
        icon.style.background = `center / contain no-repeat url(${(option as svgOption | ballOption).src})`;
      }

      if (sub === 'Цвет') {
        icon.style.backgroundColor = (option as colorOption).color;
      }

      if (sub === 'Размер') {
        icon.classList.add((option as ballOption).addClass);
      }

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
