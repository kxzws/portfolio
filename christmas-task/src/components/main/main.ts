import './Main.css';

class Main {
  private main: HTMLElement;
  private toysBtn: HTMLButtonElement;

  constructor(btn: HTMLButtonElement) {
    this.main = document.createElement('main');
    this.main.classList.add('main');

    this.toysBtn = btn;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    const title = document.createElement('h1');
    const startBtn = this.createStartBtn();

    container.classList.add('start-container');

    title.classList.add('main__title');
    title.textContent = 'Помоги бабушке нарядить ёлку';

    container.append(title);
    container.append(startBtn);
    this.main.append(container);

    return this.main;
  }

  private createStartBtn(): HTMLElement {
    const btn = document.createElement('button');
    btn.classList.add('main__start-btn');
    btn.textContent = 'Начать';

    // click on start button dispatch event on toys tab button
    btn.addEventListener('click', () => this.dispatchClickOnToysTab());

    return btn;
  }

  private dispatchClickOnToysTab() {
    let event = new Event('click');
    this.toysBtn.dispatchEvent(event);
    this.main.textContent = '';
  }
}

export default Main;
