interface ISource {
  id: string;
  name: string;
}

interface IArticle {
  source: ISource;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

interface INewsData {
  articles: IArticle[];
  sources: ISource[];
}

type Option = {
  apiKey: string;
};

type callbackType<T> = (data: T) => void;

export {
  ISource,
  IArticle,
  INewsData,
  Option,
  callbackType
};
