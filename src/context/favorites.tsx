import React from "react";
import { TChuckJoke } from "../api/chuck-api";
import {
  getFavoritesFromStorage,
  remoteFavoritesFromStorage,
  setFavoriteInStorage,
} from "../database/localstorage";

type TFavoriteContextProviderProps = {
  favorites: TChuckJoke[];
  setFavorite: (joke: TChuckJoke) => void;
  removeFavorite: (id: string) => void;
  refreshFavorites: () => void;
};

export const FavoriteContext =
  React.createContext<TFavoriteContextProviderProps | null>(null);

export const useFavoriteContext = () => {
  const context = React.useContext(FavoriteContext);

  if (!context) {
    throw new Error(
      "useFavoriteContext must be used within a FavoriteContextProvider",
    );
  }

  return context;
};

export const FavoriteContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavoritesState] = React.useState<TChuckJoke[]>([]);

  const setFavorite = (joke: TChuckJoke) => {
    setFavoriteInStorage(joke);
    setFavoritesState(getFavoritesFromStorage() ?? []);
  };

  const removeFavorite = (id: string) => {
    remoteFavoritesFromStorage(id);
    setFavoritesState((favState) => favState.filter((fav) => fav.id !== id));
  };

  const refreshFavorites = () => {
    const favorites = getFavoritesFromStorage() ?? [];
    setFavoritesState(favorites);
  };

  React.useEffect(() => {
    refreshFavorites();
  }, []);

  return (
    <FavoriteContext.Provider
      value={{ favorites, setFavorite, removeFavorite, refreshFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
