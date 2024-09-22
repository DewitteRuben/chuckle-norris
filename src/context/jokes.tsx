import React, { Dispatch, SetStateAction } from "react";
import chuckAPI, { TChuckJoke } from "../api/chuck-api";

export const MAX_JOKE_AMOUNT = 10;

type TJokeContextProviderProps = {
  jokes: TChuckJoke[];
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const JokeContext =
  React.createContext<TJokeContextProviderProps | null>(null);

export const useJokeContext = () => {
  const context = React.useContext(JokeContext);

  if (!context) {
    throw new Error("useJokeContext must be used within a JokeContextProvider");
  }

  return context;
};

export const JokeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [jokes, setJokes] = React.useState<TChuckJoke[]>([]);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchJokes = async () => {
      try {
        setLoading(true);

        const resultJokes = await chuckAPI.getRandomJokes(MAX_JOKE_AMOUNT);

        setJokes(resultJokes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJokes();
  }, []);

  return (
    <JokeContext.Provider
      value={{
        jokes: jokes,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </JokeContext.Provider>
  );
};
