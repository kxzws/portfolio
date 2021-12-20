import Header from './Header/Header';
import StartTab from './StartTab/StartTab';
import Footer from './Footer/Footer';
import { CONTENT_TAB } from './utils/constants';

class App {
  private body: HTMLElement;
  private header: Header;
  private main: StartTab;
  private footer: Footer;

  constructor() {
    this.body = document.body;
    this.header = new Header();
    this.main = new StartTab(this.header.getToysTabButton());
    this.footer = new Footer();
  }

  start(): void {
    this.body.prepend(this.header.render());
    CONTENT_TAB?.append(this.main.render());
    this.body.append(this.footer.render());
  }
}

export default App;
