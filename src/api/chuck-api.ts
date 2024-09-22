export type TChuckJoke = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

class ChuckAPI {
  private baseURL: string;
  constructor() {
    this.baseURL = "https://api.chucknorris.io";
    this.getRandomJoke = this.getRandomJoke.bind(this);
  }

  getRandomJoke(): Promise<TChuckJoke> {
    return fetch(this.baseURL + "/jokes/random").then((res) => res.json());
  }

  getRandomJokes(amount: number) {
    return Promise.all(Array.from({ length: amount }).map(this.getRandomJoke));
  }
}

const chuckAPI = new ChuckAPI();

export default chuckAPI;
