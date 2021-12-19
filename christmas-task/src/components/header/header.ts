import './Header.css';

import ToysSearch from './ToysSearch/ToysSearch';
import ToysTab from '../main/ToysTab/ToysTab';
import TreeTab from '../main/TreeTab/TreeTab';

class Header {
  private header: HTMLElement;
  //private searchInput: HTMLElement;

  constructor() {
    this.header = document.createElement('header');
    this.header.classList.add('header');
  }

  render(): HTMLElement {
    const logo = this.createLogo();
    // const toysTabBtn = this.createTabBtn(new ToysTab());
    // const treeTabBtn = this.createTabBtn(new TreeTab());

    this.header.append(logo);
    // this.header.append(toysTabBtn);
    // this.header.append(treeTabBtn);
    
    return this.header;
  }

  private createLogo(): HTMLElement {
    const logo = document.createElement('img');
    logo.classList.add('header__logo');
    logo.src = '../../assets/images/tree.svg';
    logo.alt = 'logo: christmas tree decoration';

    return logo;
  }

  private createTabBtn(tab: ToysTab | TreeTab): HTMLElement {
    const btn = document.createElement('button');
    btn.classList.add('header__tab-btn');

    btn.addEventListener('click', () => tab.render());

    return btn;
  }
}

export default Header;
