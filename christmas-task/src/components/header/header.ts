import './Header.css';

import ToysTab from '../ToysTab/ToysTab';
import TreeTab from '../TreeTab/TreeTab';
import { imageOption } from '../utils/interfaces';
import { IS_TOYS_TAB, CONTENT_TAB } from '../utils/constants';

class Header {
  private header: HTMLElement;
  private toysTabBtn: HTMLButtonElement;
  private treeTabBtn: HTMLButtonElement;
  private searchToys: HTMLInputElement;
  private toysTab: ToysTab;
  private treeTab: TreeTab;

  constructor() {
    this.toysTab = new ToysTab();
    this.treeTab = new TreeTab();

    this.header = document.createElement('header');
    this.header.classList.add('header');

    this.toysTabBtn = this.createTabBtn('Игрушки', this.toysTab, IS_TOYS_TAB);
    this.treeTabBtn = this.createTabBtn('Ёлка', this.treeTab);

    this.searchToys = document.createElement('input');
    this.searchToys.classList.add('search-form__input');
    this.searchToys.type = 'search';
    this.searchToys.placeholder = 'Поиск по названию';
  }

  render(): HTMLElement {
    const logo = this.createImage({ className: 'header__logo', src: '../../assets/images/tree.svg', alt: 'logo: christmas tree decoration' });
    const searchForm = document.createElement('div');

    searchForm.classList.add('search-form');
    this.searchToys.addEventListener('input', () => {
      this.toysTab.updateFilter();
      this.toysTab.updateToysList();
      this.toysTab.renderToysCont();
    });
    searchForm.append(this.searchToys);
    const searchIcon = this.createImage({ className: 'search-form__icon', src: '../../assets/images/loupe.svg', alt: 'icon: loupe' });
    searchForm.append(searchIcon);
    
    // hidden on the start page on on the tree tab
    searchForm.classList.add('hidden');

    this.header.append(logo);
    this.header.append(this.toysTabBtn);
    this.header.append(this.treeTabBtn);
    this.header.append(this.toysTab.renderSelected());
    this.header.append(searchForm);
    
    return this.header;
  }

  getToysTabButton(): HTMLButtonElement { // start tab gets this btn to dispatch click event by start btn
    return this.toysTabBtn;
  }

  private createImage(data: imageOption): HTMLElement {
    const img = document.createElement('img');
    img.classList.add(data.className);
    img.src = data.src;
    img.alt = data.alt;

    return img;
  }

  private createTabBtn(text: string, tab: ToysTab | TreeTab, isToysTab?: boolean): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.classList.add('header__tab-btn');
    btn.textContent = text;

    btn.addEventListener('click', () => {
      (CONTENT_TAB as HTMLElement).textContent = '';
      CONTENT_TAB?.append(tab.render());

      document.querySelectorAll('.header__tab-btn').forEach((tabBtn) => {
        if (tabBtn.classList.contains('tab-btn_active')) {
          tabBtn.classList.remove('tab-btn_active');
        }
      });
      btn.classList.add('tab-btn_active');

      this.toggleSearchForm(isToysTab);
      this.searchToys.focus();
    });

    return btn;
  }

  private toggleSearchForm(isToysTab?: boolean): void { // search form visible only on the toys tab
    const searchForm = document.querySelector('.search-form');
    if (isToysTab) {
      if (searchForm?.classList.contains('hidden')) searchForm?.classList.remove('hidden');
    } else {
      if (!searchForm?.classList.contains('hidden')) searchForm?.classList.add('hidden');
    }
  }
}

export default Header;
