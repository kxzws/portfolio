import './TreeTab.css';

class TreeTab {
  private tab: HTMLElement;

  constructor() {
    this.tab = document.createElement('div');
    this.tab.textContent = 'hello, i\'m a tree tab';
  }

  render(): HTMLElement {
    return this.tab;
  }
}

export default TreeTab;
