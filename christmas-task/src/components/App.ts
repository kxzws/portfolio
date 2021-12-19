import Header from './Header/Header';
//import Main from './main/Main';
import Footer from './Footer/Footer';

class App {
  private body: HTMLElement;
  private header: Header;
  //private main: Main;
  private footer: Footer;

  constructor() {
    this.body = document.body;
    this.header = new Header();
    //this.main = new Main();
    this.footer = new Footer();
  }

  start(): void {
    this.body.append(this.header.render());
    //this.body.append(this.main.render());
    this.body.append(this.footer.render());
  }
}

export default App;
