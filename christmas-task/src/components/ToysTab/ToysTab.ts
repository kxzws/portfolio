import './ToysTab.css';

import data from '../../assets/data';

import { IFilter, toy, svgOption, colorOption, ballOption } from '../utils/interfaces';
import { 
  DEFAULT_FILTER,
  SHAPE_OPTION,
  COLOR_OPTION,
  SIZE_OPTION,
  MIN_AMOUNT,
  MAX_AMOUNT,
  MIN_YEAR,
  MAX_YEAR } from '../utils/constants';

import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

class ToysTab {
  private tab: HTMLElement;
  private filter: IFilter;
  private toys: toy[];
  private toysContainer: HTMLElement;
  private selectedToys: toy[];

  private yearMin: number;
  private yearMax: number;
  private countMin: number;
  private countMax: number;

  private sliders: noUiSlider.API[];

  constructor() {
    this.tab = document.createElement('div');
    this.tab.classList.add('toy-tab');

    this.filter = DEFAULT_FILTER;
    this.toys = data;

    this.toysContainer = document.createElement('div');
    this.selectedToys = [];

    this.yearMin = MIN_YEAR;
    this.yearMax = MAX_YEAR;
    this.countMin = MIN_AMOUNT;
    this.countMax = MAX_AMOUNT;

    this.sliders = [];
  }

  render(): HTMLElement {
    //################################################
    //################################################
    //TODO: keep classes on filters and selected toys for go through the tabs
    this.tab.textContent = '';

    const valueForm = this.createValueFilterForm();
    const rangeForm = this.createRangeFilterForm();
    const sortForm = this.createSortForm();

    const forms = document.createElement('div');
    forms.classList.add('toy-tab__forms');
    forms.append(valueForm);
    forms.append(rangeForm);
    forms.append(sortForm);

    this.tab.append(forms);
    this.updateToysList();
    this.renderToysCont();
    this.tab.append(this.toysContainer);

    return this.tab;
  }

  renderToysCont(): void {
    //################################################
    //################################################
    //TODO: keep classes on filters and selected toys for go through the tabs
    this.toysContainer.textContent = '';
    this.toysContainer.append(this.createToysContainer());
  }

  renderSelected(): HTMLElement {
    const container = document.createElement('span');
    container.classList.add('header__selected-toys');
    container.id = 'selectedToys';
    container.textContent = String(this.selectedToys.length);

    return container;
  }

  updateFilter(): void {
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

    // data from range filer
    if (this.filter.range.amount !== [this.countMin, this.countMax]) {
      this.filter.range.amount = [this.countMin, this.countMax];
    }
    if (this.filter.range.year !== [this.yearMin, this.yearMax]) {
      this.filter.range.year = [this.yearMin, this.yearMax];
    }

    // data from sort filter
    const sortValue = (document.getElementById('sort') as HTMLSelectElement).value;
    this.filter.sort = sortValue;
  }

  updateToysList(): void {
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

      const isSearchCorrect = !this.filter.searchInp || unit.name.toLowerCase().indexOf(this.filter.searchInp.toLowerCase()) > -1;
      if (isValueFilterCorrect && isRangeFilterCorrect && isSearchCorrect) {
        this.toys.push(unit);
      } 
      
      // sort
      switch (this.filter.sort) {
        case 'increasing':
          this.toys.sort((prev, next) => {
            return prev.name >= next.name ? (prev.name === next.name ? 0 : 1) : -1;
          }); 
          break;
        case 'decreasing': 
          this.toys.sort((prev, next) => {
            return prev.name >= next.name ? (prev.name === next.name ? 0 : -1) : 1;
          });
          break;
        case 'increasingAmount': 
          this.toys.sort((prev, next) => {
            return (+prev.year) - (+next.year);
          });
          break;
        case 'decreasingAmount': 
          this.toys.sort((prev, next) => {
            return (+next.year) - (+prev.year);
          });
          break;
      }
    });
  }

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
    form.append(this.createValueFilterCont('форма', SHAPE_OPTION));
    form.append(this.createValueFilterCont('цвет', COLOR_OPTION));
    form.append(this.createValueFilterCont('размер', SIZE_OPTION));
    form.append(container);

    return form;
  }

  private createValueFilterCont(sub: string, options: svgOption[] | colorOption[] | ballOption[]): HTMLElement {
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

    form.append(title);
    form.append(this.createRangeFilterCont('количество', 1, 12));
    form.append(this.createRangeFilterCont('год приобретения', 1940, 2020));
    
    return form;
  }

  private createRangeFilterCont(sub: string, min: number, max: number): HTMLElement {
    const container = document.createElement('div');

    const subtitle = document.createElement('h4');
    subtitle.classList.add('form__subtitle');
    subtitle.textContent = sub;
    container.append(subtitle);
    
    const slider = document.createElement('div');
    slider.classList.add('form__slider');
    const workSlider = noUiSlider.create(slider, {
      start: [min, max],
      connect: true,
      tooltips: true,
      range: {
          'min': min,
          'max': max
      },
      step: 1,
    });
    this.sliders.push(workSlider);

    container.append(slider);

    workSlider.on('update', (values, handle) => {
      switch (sub) {
        case 'количество':
          this.countMin = Math.round(Number(values[0]));
          this.countMax = Math.round(Number(values[1]));
          break;
        case 'год приобретения':
          this.yearMin = Math.round(Number(values[0]));
          this.yearMax = Math.round(Number(values[1]));
          break;
      }
    });
    slider.addEventListener('click', () => {
      this.updateFilter();
      this.updateToysList();
      this.renderToysCont();
    });
    
    return container;
  }

  private createSortForm(): HTMLElement {
    const form = document.createElement('div');
    form.classList.add('form');

    const title = document.createElement('h3');
    title.classList.add('form__title');
    title.textContent = 'Сортировка:';

    const sort = this.createSortSelect();
    const resetBtn = this.createResetBtn();

    form.append(title);
    form.append(sort);
    form.append(resetBtn);
    
    return form;
  }

  private createSortSelect(): HTMLSelectElement {
    const select = document.createElement('select');
    select.classList.add('form__select-sort');
    select.id = 'sort';

    const increasing = this.createOption('increasing', 'название от А до Я');
    const decreasing = this.createOption('decreasing', 'название от Я до А');
    const increasingAmount = this.createOption('increasingAmount', 'по возрастанию года');
    const decreasingAmount = this.createOption('decreasingAmount', 'по убыванию года');

    select.append(increasing);
    select.append(decreasing);
    select.append(increasingAmount);
    select.append(decreasingAmount);

    select.addEventListener('change', () => {
      this.updateFilter();
      this.updateToysList();
      this.renderToysCont();
    });

    return select;
  }

  private createOption(value: string, title: string): HTMLOptionElement {
    const option = document.createElement('option');
    option.classList.add('form__option-sort');
    option.textContent = title;
    option.value = value;

    return option;
  }

  private createResetBtn(): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.classList.add('toy-tab__reset-btn');
    btn.textContent = 'Сброс фильтров';

    btn.addEventListener('click', () => this.resetFilter());
    
    return btn;
  }

  private resetFilter(): void {
    const search = document.querySelector('.search-form__input') as HTMLInputElement;
    if (search.value) { // add new value
      search.value = '';
    }

    document.querySelectorAll('.form__icon').forEach((icon) => {
      if (icon.classList.contains('icon-active')) {
        icon.classList.remove('icon-active');
      }
    });

    const checkbox = document.getElementById('favourite') as HTMLInputElement;
    if (checkbox.checked) {
      checkbox.checked = false;
    }

    this.sliders.forEach((slider) => {
      const values = slider.get(true);
      if (values[0] >= MIN_AMOUNT && values[1] <= MAX_AMOUNT) {
        slider.set([MIN_AMOUNT, MAX_AMOUNT]);
      } else if (values[0] >= MIN_YEAR && values[1] <= MAX_YEAR) {
        slider.set([MIN_YEAR, MAX_YEAR]);
      }
    });

    this.updateFilter();
    this.updateToysList();
    this.renderToysCont();
  }

  private createToysContainer(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('toy-cont');

    if (!this.toys.length) {
      const errorMsg = document.createElement('h2');
      errorMsg.classList.add('toy-tab__error');
      errorMsg.textContent = 'Извините, игрушек не найдено';
      container.append(errorMsg);

      return container;
    }

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

      card.addEventListener('click', () => {
        this.toggleSelectedToy(toy, card);
      });

      container.append(card);
    });

    return container;
  }

  private toggleSelectedToy(unit: toy, container: HTMLElement): void {
    if (this.selectedToys.length === 20 && !container.classList.contains('card_selected')) {
      this.showModalError();
      return;
    }

    container.classList.toggle('card_selected');
    if (container.classList.contains('card_selected')) {
      this.selectedToys.push(unit);
    } else {
      const index = this.selectedToys.indexOf(unit);
      this.selectedToys.splice(index, 1);
    }
    
    (document.getElementById('selectedToys') as HTMLElement).textContent = String(this.selectedToys.length);
  }

  private showModalError(): void {
    const modal = document.querySelector('.modal') as HTMLElement;
    modal.classList.add('modal_open');

    const overlay = document.querySelector('.overlay') as HTMLElement;
    overlay.classList.add('overlay_visible');

    modal.textContent = 'Извините, нельзя добавить больше 20-ти игрушек';

    this.addListenerhideModal(modal, modal, overlay);
    this.addListenerhideModal(overlay, modal, overlay);
  }

  private addListenerhideModal(element: HTMLElement, modal: HTMLElement, overlay: HTMLElement): void {
    element.addEventListener('click', () => {
      modal.classList.remove('modal_open');
      overlay.classList.remove('overlay_visible');
    });
  }
}

export default ToysTab;
