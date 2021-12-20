import './Header.css';

import ToysTab from '../main/ToysTab/ToysTab';
import TreeTab from '../main/TreeTab/TreeTab';

class Header {
  private header: HTMLElement;
  private searchToys: HTMLInputElement;

  constructor() {
    this.header = document.createElement('header');
    this.header.classList.add('header');

    this.searchToys = document.createElement('input');
    this.searchToys.classList.add('search-form__input');
    this.searchToys.type = 'search';
  }

  render(): HTMLElement {
    const logo = this.createImage('header__logo', '../../assets/images/tree.svg', 'logo: christmas tree decoration');
    const toysTabBtn = this.createTabBtn('Игрушки', new ToysTab());
    const treeTabBtn = this.createTabBtn('Ёлка', new TreeTab());
    const searchForm = document.createElement('div');

    searchForm.classList.add('search-form');
    searchForm.append(this.searchToys);
    const searchIcon = this.createImage('search-form__icon', '../../assets/images/loupe.svg', 'icon: loupe');
    searchForm.append(searchIcon);

    this.header.append(logo);
    this.header.append(toysTabBtn);
    this.header.append(treeTabBtn);
    this.header.append(searchForm);
    
    return this.header;
  }

  getSearchValue(): string {
    return this.searchToys.value;
  }

  private createImage(className: string, src: string, alt: string): HTMLElement {
    const img = document.createElement('img');
    img.classList.add(className);
    img.src = src;
    img.alt = alt;

    return img;
  }

  private createTabBtn(text: string, tab: ToysTab | TreeTab): HTMLElement {
    const btn = document.createElement('button');
    btn.classList.add('header__tab-btn');
    btn.textContent = text;

    btn.addEventListener('click', () => {
      //tab.render();
      document.querySelectorAll('.header__tab-btn').forEach((tabBtn) => {
        if (tabBtn.classList.contains('tab-btn_active')) {
          tabBtn.classList.remove('tab-btn_active');
        }
      });
      btn.classList.add('tab-btn_active');
    });

    return btn;
  }
}

export default Header;
