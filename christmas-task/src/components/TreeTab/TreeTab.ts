import './TreeTab.css';

import data from '../../assets/data';

import ToysTab from '../ToysTab/ToysTab';
import { toy, ITreeSettings } from '../utils/interfaces';
import { 
  DEFAULT_TOYS_NUMBER, 
  TREE_AMOUNT, 
  THEME_AMOUNT, 
  DEFAULT_TREE_SETTINGS, 
  AREA_COORDS } from '../utils/constants';

class TreeTab {
  private tab: HTMLElement;
  private toysTab: ToysTab;
  private selectedToys: toy[];
  private treeCont: HTMLElement;

  private settings: ITreeSettings;

  constructor(toysTab: ToysTab) {
    this.tab = document.createElement('div');
    this.tab.classList.add('tree-tab');

    this.toysTab = toysTab;
    this.selectedToys = [];

    this.treeCont = document.createElement('div');
    this.treeCont.classList.add('tree-tab__tree-cont');

    this.settings = DEFAULT_TREE_SETTINGS;
  }

  render(): HTMLElement {
    this.tab.textContent = '';

    const settingsCont = this.createSettingsCont();
    this.renderTreeCont();
    const selectedToysCont = this.createSelectedToysCont();

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
    title.textContent = 'Настройки:';

    const volumeBtn = this.createSettingsBtn('volume', '../../assets/images/volume.svg');
    const snowBtn = this.createSettingsBtn('snow', '../../assets/images/filter-svg/snowflake.svg');

    const treeChooseCont = this.createTreeChooseCont();
    const themeChooseCont = this.createThemeChooseCont();
    const garlandChooseCont = this.createGarlandChooseCont();

    container.append(title);
    container.append(volumeBtn);
    container.append(snowBtn);
    container.append(treeChooseCont);
    container.append(themeChooseCont);
    container.append(garlandChooseCont);

    return container;
  }

  private createSettingsBtn(type: string, src: string): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.classList.add('tree-tab__settings-btn');

    btn.style.background = `center / contain no-repeat url(${src})`;
    const isAudioPlay = !this.settings.audio.paused;
    const isSnowFall = this.settings.isSnowFall;
    switch (type) {
      case 'volume':
        if (isAudioPlay) { // keep 'active' state while switching tabs
          btn.classList.add('settings-btn_active')
        }

        btn.addEventListener('click', () => {
          btn.classList.toggle('settings-btn_active');
          this.toggleAudio();
        });
        break;
      case 'snow':
        if (isSnowFall) { // keep 'active' state while switching tabs
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
    const isAudioPause = this.settings.audio.paused;
    if (isAudioPause) {
      this.settings.audio.play();
    } else {
      this.settings.audio.pause();
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

  private toggleSnow(button: HTMLButtonElement): void {
    if (button.classList.contains('settings-btn_active')) {
      this.settings.isSnowFall = true;
      this.settings.snowInterval = setInterval(this.createSnowflakes, 50);
    } else {
      this.settings.isSnowFall = false;
      clearInterval(this.settings.snowInterval as NodeJS.Timer);
    }
  }

  private createTreeChooseCont(): HTMLElement {
    const container = document.createElement('div');

    const subtitle = document.createElement('h4');
    subtitle.classList.add('tree-tab__subtitle')
    subtitle.textContent = 'выбери ёлку';

    const flexCont = document.createElement('div');
    flexCont.classList.add('tree-tab__flex-cont');

    for (let num = 0; num < TREE_AMOUNT; num++) {
      const treeCard = document.createElement('div');
      treeCard.classList.add('tree-tab__card');
      treeCard.classList.add('tree-card');

      const icon = document.createElement('img');
      icon.classList.add('tree-tab__card-img');
      icon.src = `../../assets/tree/${num}.png`;
      icon.alt = 'icon: christmas tree choice';

      treeCard.append(icon);

      treeCard.addEventListener('click', () => {
        const tree = this.treeCont.querySelector('.tree-tab__tree') as HTMLImageElement;
        tree.src = `../../assets/tree/${num}.png`;
        this.settings.choosedTree = num;
      });

      flexCont.append(treeCard);
    }
    
    container.append(subtitle);
    container.append(flexCont);

    return container;
  }

  private createThemeChooseCont(): HTMLElement {
    const container = document.createElement('div');

    const subtitle = document.createElement('h4');
    subtitle.classList.add('tree-tab__subtitle')
    subtitle.textContent = 'выбери фон';

    const flexCont = document.createElement('div');
    flexCont.classList.add('tree-tab__flex-cont');

    for (let num = 0; num < THEME_AMOUNT; num++) {
      const themeCard = document.createElement('div');
      themeCard.classList.add('tree-tab__card');
      themeCard.classList.add('theme-card');

      const icon = document.createElement('img');
      icon.classList.add('tree-tab__card-img');
      icon.src = `../../assets/theme/${num}.jpg`;
      icon.alt = 'icon: christmas theme choice';

      themeCard.append(icon);

      themeCard.addEventListener('click', () => {
        this.treeCont.style.backgroundImage = `url('../../assets/theme/${num}.jpg')`;
        this.settings.choosedTheme = num;
      });

      flexCont.append(themeCard);
    }

    container.append(subtitle);
    container.append(flexCont);

    return container;
  }

  private createGarlandChooseCont(): HTMLElement {
    const container = document.createElement('div');

    const subtitle = document.createElement('h4');
    subtitle.classList.add('tree-tab__subtitle')
    subtitle.textContent = 'выбери гирлянду';

    const flexCont = document.createElement('div');
    flexCont.classList.add('tree-tab__flex-cont');

    container.append(subtitle);
    container.append(flexCont);

    return container;
  }

  private renderTreeCont(): void {
    this.treeCont.textContent = '';
    this.treeCont.style.background = `center / cover no-repeat url('../../assets/theme/${this.settings.choosedTheme}.jpg')`;

    const tree = document.createElement('img');
    tree.classList.add('tree-tab__tree');
    tree.src = `../../assets/tree/${this.settings.choosedTree}.png`;
    tree.alt = 'picture: christmas tree';
    tree.useMap = '#tree-map';

    const map = document.createElement('map');
    map.name = 'tree-map';
    const area = document.createElement('area');
    area.id = 'tree-map';
    area.coords = AREA_COORDS;
    area.shape = 'poly';
    map.append(area);

    this.treeCont.append(map);
    this.treeCont.append(tree);
  }

  private createSelectedToysCont(): HTMLElement {
    this.updateSelectedToys(); 

    const container = document.createElement('div');
    container.classList.add('tree-tab__wrap');

    const title = document.createElement('h3');
    title.classList.add('tree-tab__title');
    title.textContent = 'Игрушки:';

    const flexCont = document.createElement('div');
    flexCont.classList.add('tree-tab__flex-cont');
    flexCont.classList.add('toy-flex-cont');

    this.selectedToys.forEach((toy) => {
      const toyCard = document.createElement('div');
      toyCard.classList.add('tree-tab__card');
      toyCard.classList.add('toy-card');

      // create as many imgs as many toys there are for drag'n'drop
      for(let i = 1; i <= Number(toy.count); i++) {
        const icon = document.createElement('img');
        icon.classList.add('tree-tab__card-img');
        icon.classList.add('toy-card-img');
        icon.src = `../../assets/toys/${toy.num}.png`;
        icon.alt = 'icon: christmas toy';

        toyCard.append(icon);

        this.addDragNDropListener(toyCard, icon);
      }

      const count = document.createElement('span');
      count.classList.add('tree-tab__card-count');
      count.id = 'count';
      count.textContent = toy.count;

      toyCard.append(count);

      flexCont.append(toyCard);
    });

    container.append(title);
    container.append(flexCont);

    return container;
  }

  private addDragNDropListener(toyCard: HTMLElement, icon: HTMLImageElement): void {
    icon.ondragstart = (): boolean => {
      return false;
    };

    icon.onmousedown = (): void => {
      const treeArea = document.getElementById('tree-map');

      document.body.append(icon);

      let isTreeArea = false;
      const onMouseMove = (event: MouseEvent): void => {
        icon.style.left = event.pageX - icon.offsetWidth / 2 + 'px';
        icon.style.top = event.pageY - icon.offsetHeight / 2 + 'px';

        icon.hidden = true;
        let areaBelow = document.elementFromPoint(event.clientX, event.clientY);
        icon.hidden = false;

        if (!areaBelow) { // if the toy is outside of the window
          this.returnToContainer(toyCard, icon);
          icon.dispatchEvent(new Event('mouseup')); // remove all listeners
          return;
        }

        if (areaBelow !== treeArea) { // if the toy is on the tree map
          isTreeArea = false;
        } else {
          isTreeArea = true;
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      icon.onmouseup = (): void => {
        const treeArea = document.getElementById('tree-map');
        const count = toyCard.querySelector('#count');
        let num = Number(count?.textContent);

        if (isTreeArea) {
          treeArea?.append(icon);
          (count as HTMLSpanElement).textContent = String(--num);
        } else {
          this.returnToContainer(toyCard, icon);
          (count as HTMLSpanElement).textContent = String(++num);
        }

        document.removeEventListener('mousemove', onMouseMove);
        icon.onmouseup = null;
      };
    };
  }

  private returnToContainer(cont: HTMLElement, object: HTMLImageElement): void {
    cont.prepend(object);
    object.style.top = 'initial';
    object.style.left = 'initial';
  }

  private updateSelectedToys(): void {
    const toys = this.toysTab.getSelectedToys();
    this.selectedToys = [];

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
