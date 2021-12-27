import './TreeTab.css';

import data from '../../assets/data';

import ToysTab from '../ToysTab/ToysTab';
import { toy } from '../utils/interfaces';
import { DEFAULT_TOYS_NUMBER } from '../utils/constants';

class TreeTab {
  private tab: HTMLElement;
  private toysTab: ToysTab;
  private selectedToys: toy[];
  private treeCont: HTMLElement;

  private audio: HTMLAudioElement;
  private snowInterval: NodeJS.Timer | null;
  private isSnowFall: boolean;

  constructor(toysTab: ToysTab) {
    this.tab = document.createElement('div');
    this.tab.classList.add('tree-tab');

    this.toysTab = toysTab;
    this.selectedToys = [];

    this.treeCont = document.createElement('div');
    this.treeCont.classList.add('tree-tab__tree-cont');

    this.audio = new Audio('../../assets/audio/audio.mp3');
    this.snowInterval = null;
    this.isSnowFall = false;
  }

  render(): HTMLElement {
    this.tab.textContent = '';

    const settingsCont = this.createSettingsCont();
    this.renderTreeCont();
    const selectedToysCont = this.createSelectedToysCont();

    this.updateSelectedToys(); //спрятать в метод рендера выбранных

    this.tab.append(settingsCont);
    this.tab.append(this.treeCont);
    this.tab.append(selectedToysCont);

    return this.tab;
  }

  private createSettingsCont(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('tree-tab__wrap');

    const title = document.createElement('h3');
    title.classList.add('tree-tab__title');

    const volumeBtn = this.createSettingsBtn('volume', '../../assets/images/volume.svg');
    const snowBtn = this.createSettingsBtn('snow', '../../assets/images/filter-svg/snowflake.svg');

    container.append(volumeBtn);
    container.append(snowBtn);

    return container;
  }

  private createSettingsBtn(type: string, src: string): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.classList.add('tree-tab__settings-btn');

    btn.style.background = `center / contain no-repeat url(${src})`;
    switch (type) {
      case 'volume':
        if (!this.audio.paused) { // keep 'active' state while switching tabs
          btn.classList.add('settings-btn_active')
        }

        btn.addEventListener('click', () => {
          btn.classList.toggle('settings-btn_active');
          this.toggleAudio();
        });
        break;
      case 'snow':
        if (this.isSnowFall) { // keep 'active' state while switching tabs
          btn.classList.add('settings-btn_active')
        }

        btn.addEventListener('click', () => {
          btn.classList.toggle('settings-btn_active');
          this.toggleSnow(btn);
        });
        break;
    }

    return btn;
  }

  private toggleAudio(): void {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  private createSnowflakes(): void {
    const snowflake = document.createElement('i');
    snowflake.classList.add('fa-snowflake');
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // between 2 - 5 seconds
    snowflake.style.opacity = `${Math.random()}`;
    const size = Math.random() * 10 + 10 + 'px';
    snowflake.style.height = size;
    snowflake.style.width = size;
    
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
      snowflake.remove();
    }, 5000);
  }

  toggleSnow(button: HTMLButtonElement): void {
    if (button.classList.contains('settings-btn_active')) {
      this.isSnowFall = true;
      this.snowInterval = setInterval(this.createSnowflakes, 50);
    } else {
      this.isSnowFall = false;
      clearInterval(this.snowInterval as NodeJS.Timer);
    }
  }

  private renderTreeCont(): void {
    
  }

  private createSelectedToysCont(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('tree-tab__wrap');

    return container;
  }

  private updateSelectedToys(): void {
    const toys = this.toysTab.getSelectedToys();

    if (toys.length > 0) {
      this.selectedToys = toys;
    } else {
      data.forEach((toy, index) => {
        if (index > DEFAULT_TOYS_NUMBER) {
          return false;
        }

        this.selectedToys.push(toy);
        return true;
      });
    }
  }
}

export default TreeTab;
