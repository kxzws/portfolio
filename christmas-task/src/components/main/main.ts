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
    const title = document.createElement('div');
    const startBtn = this.createStartBtn();

    title.classList.add('main__title');
    title.textContent = 'Помоги бабушке нарядить ёлку';

    this.main.append(title);
    this.main.append(startBtn);

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
  }
}

export default Main;
