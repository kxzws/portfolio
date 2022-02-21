import './Footer.css';

class Footer {
  private footer: HTMLElement;

  constructor() {
    this.footer = document.createElement('footer');
    this.footer.classList.add('footer');
  }

  render(): HTMLElement {
    const gitLink = this.createLink('https://github.com/kxzws');
    const rssLink = this.createLink('https://rs.school/js/');
    const time = document.createElement('time');

    gitLink.textContent = 'me on github';

    time.dateTime = '2021-12-20';
    time.textContent = '© 2021';

    rssLink.classList.add('rss-link');
    const rssLogo = document.createElement('img');
    rssLogo.src = 'https://rs.school/images/rs_school_js.svg';
    rssLogo.alt = 'logo: rolling scopes school';
    rssLink.append(rssLogo);

    this.footer.append(gitLink);
    this.footer.append(time);
    this.footer.append(rssLink);

    return this.footer;
  }

  private createLink(link: string): HTMLElement {
    const footerLink = document.createElement('a');
    footerLink.classList.add('footer__link');
    footerLink.href = link;
    footerLink.target = '_blank';
    
    return footerLink;
  }
}

export default Footer;
