import {
  getFavoritesFromStorage,
  setFavoritesInStorage,
  setFavoriteInStorage,
  remoteFavoritesFromStorage,
  MAX_FAVORITED_JOKES,
} from "./localstorage";

import { TChuckJoke } from "../api/chuck-api";

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
    writable: true,
  });
});

describe("Local Storage Favorite Functions", () => {
  it("getFavoritesFromStorage returns null if no favorites", () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    expect(getFavoritesFromStorage()).toBeNull();
  });

  it("getFavoritesFromStorage returns parsed favorites", () => {
    const favorites = [{ id: "1", joke: "Chuck Norris walks into a bar." }];
    (localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify(favorites),
    );
    expect(getFavoritesFromStorage()).toEqual(favorites);
  });

  it("setFavoritesInStorage saves favorites to localStorage", () => {
    const favorites: TChuckJoke[] = [
      {
        id: "1",
        value: "Chuck Norris walks into a bar.",
        categories: [],
        created_at: "",
        icon_url: "",
        updated_at: "",
        url: "",
      },
    ];

    setFavoritesInStorage(favorites);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "CHUCKLE_NORRIS_FAVORITES",
      JSON.stringify(favorites),
    );
  });

  it("setFavoriteInStorage adds a favorite successfully", () => {
    const joke = {
      id: "1",
      value: "Chuck Norris can divide by zero.",
      categories: [],
      created_at: "",
      icon_url: "",
      updated_at: "",
      url: "",
    };

    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify([]));

    setFavoriteInStorage(joke);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "CHUCKLE_NORRIS_FAVORITES",
      JSON.stringify([joke]),
    );
  });

  it("setFavoriteInStorage throws error if joke already exists", () => {
    const joke = {
      id: "1",
      value: "Chuck Norris can divide by zero.",
      categories: [],
      created_at: "",
      icon_url: "",
      updated_at: "",
      url: "",
    };

    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify([joke]));

    expect(() => setFavoriteInStorage(joke)).toThrow(
      "joke already stored in favorites",
    );
  });

  it("setFavoriteInStorage throws error if joke already has been stored", () => {
    const favorites = Array.from({ length: MAX_FAVORITED_JOKES }, (_, i) => ({
      id: `${i}`,
      joke: `Joke ${i}`,
    }));

    (localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify(favorites),
    );

    const newJoke = {
      id: "20",
      value: "Chuck Norris is the reason Waldo is hiding.",
      categories: [],
      created_at: "",
      icon_url: "",
      updated_at: "",
      url: "",
    };

    expect(() => setFavoriteInStorage(newJoke)).toThrow(
      "maximum joke capacity reached",
    );
  });

  it("setFavoriteInStorage throws error if maximum jokes reached", () => {
    const favorites = Array.from({ length: MAX_FAVORITED_JOKES }, (_, i) => ({
      id: `${i}`,
      joke: `Joke ${i}`,
    }));

    (localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify(favorites),
    );

    const newJoke = {
      id: "20",
      value: "Chuck Norris is the reason Waldo is hiding.",
      categories: [],
      created_at: "",
      icon_url: "",
      updated_at: "",
      url: "",
    };

    expect(() => setFavoriteInStorage(newJoke)).toThrow(
      "maximum joke capacity reached",
    );
  });

  it("remoteFavoritesFromStorage removes a favorite", () => {
    const favorites = [{ id: "1", joke: "Chuck Norris walks into a bar." }];
    (localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify(favorites),
    );
    remoteFavoritesFromStorage("1");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "CHUCKLE_NORRIS_FAVORITES",
      JSON.stringify([]),
    );
  });

  it("remoteFavoritesFromStorage does nothing if favorites are null", () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    remoteFavoritesFromStorage("1");
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
