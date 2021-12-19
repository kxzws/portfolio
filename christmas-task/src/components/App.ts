import Header from './Header/Header';
//import Main from './main/Main';
//import Footer from './Footer/Footer';

class App {
  private header: Header;
  //private main: Main;
  //private footer: Footer;

  constructor() {
    this.header = new Header();
    //this.main = new Main();
    //this.footer = new Footer();
  }

  start(): void {
    const _header = document.querySelector('.header') as HTMLElement;
    //const _main = document.querySelector('.main') as HTMLElement;
    //const _footer = document.querySelector('.footer') as HTMLElement;

    _header?.append(this.header);
    //_main?.append(this.main);
    //_footer?.append(this.footer);
  }
}

export default App;
