import { TChuckJoke } from "../api/chuck-api";

const LOCALSTORAGE_FAVORITES_KEY = "CHUCKLE_NORRIS_FAVORITES";
export const MAX_FAVORITED_JOKES = 10;

export const getFavoritesFromStorage = () => {
  try {
    const favoritesString = localStorage.getItem(LOCALSTORAGE_FAVORITES_KEY);

    if (!favoritesString) return null;

    return JSON.parse(favoritesString) as TChuckJoke[];
  } catch (error) {
    console.error("failed to get favorites from localstorage", error);
    return null;
  }
};

export const setFavoritesInStorage = (jokes: TChuckJoke[]) => {
  try {
    localStorage.setItem(LOCALSTORAGE_FAVORITES_KEY, JSON.stringify(jokes));
  } catch (error) {
    console.error("failed to set favorites in localstorage", error);
  }
};

export const setFavoriteInStorage = (joke: TChuckJoke) => {
  let favorites = getFavoritesFromStorage();

  if (!favorites) {
    favorites = [];
  }

  const existingFavorite = favorites.find((f) => f.id === joke.id);

  if (existingFavorite) {
    throw new Error("joke already stored in favorites");
  }

  if (favorites.length === MAX_FAVORITED_JOKES) {
    throw new Error("maximum joke capacity reached");
  }

  favorites.push(joke);

  return setFavoritesInStorage(favorites);
};

export const remoteFavoritesFromStorage = (id: string) => {
  const favorites = getFavoritesFromStorage();

  if (!favorites) return;

  setFavoritesInStorage(favorites.filter((f) => f.id !== id));
};
