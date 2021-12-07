import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', { // https://newsapi.org/v2/
            apiKey: '409271144cfd438b96b70ca79bd289c1', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
