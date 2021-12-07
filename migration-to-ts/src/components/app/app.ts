import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INewsData } from '../interfaces';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (document
            .querySelector('.sources') as HTMLElement)
            .addEventListener('click', (e) => this.controller.getNews(e, (data: INewsData) => this.view.drawNews(data)));
        this.controller.getSources((data: INewsData) => this.view.drawSources(data));
    }
}

export default App;
