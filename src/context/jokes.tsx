import React, { Dispatch, SetStateAction } from "react";
import chuckAPI, { TChuckJoke } from "../api/chuck-api";

const MAX_JOKE_AMOUNT = 10;
const JOKE_INTERVAL = 5000;

type TJokeContextProviderProps = {
  jokes: TChuckJoke[];
  jokeIntervalMode: boolean;
  isLoading: boolean;
  setJokeIntervalMode: Dispatch<SetStateAction<boolean>>;
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
  const [jokeIntervalMode, setJokeIntervalMode] = React.useState(false);
  const isFetchingNewJoke = React.useRef(false);

  React.useEffect(() => {
    const fetchJokes = async () => {
      setLoading(true);

      const jokeTasks = [];

      for (let i = 0; i < MAX_JOKE_AMOUNT; i++) {
        const jokeTask = chuckAPI.getRandomJoke().then((joke) => {
          setJokes((jokes) => {
            if (jokes.length < MAX_JOKE_AMOUNT) {
              return [...jokes, joke];
            }

            return jokes;
          });
        });

        jokeTasks.push(jokeTask);
      }

      try {
        await Promise.all(jokeTasks);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJokes();
  }, []);

  const fetchNewJoke = async () => {
    if (isFetchingNewJoke.current) return;

    try {
      isFetchingNewJoke.current = true;

      const newJoke = await chuckAPI.getRandomJoke();

      setJokes((prevJokes) => {
        const updatedJokes = [...prevJokes, newJoke];

        if (updatedJokes.length > MAX_JOKE_AMOUNT) {
          return updatedJokes.slice(1);
        }

        return updatedJokes;
      });
    } catch (error) {
      console.error(error);
    } finally {
      isFetchingNewJoke.current = false;
    }
  };

  React.useEffect(() => {
    const jokeLoadingInterval: NodeJS.Timer = setInterval(async () => {
      if (!jokeIntervalMode) return clearInterval(jokeLoadingInterval);

      setJokes((prevJokes) => {
        if (prevJokes.length === MAX_JOKE_AMOUNT) {
          return prevJokes.slice(1);
        }

        return prevJokes;
      });

      fetchNewJoke();
    }, JOKE_INTERVAL);

    return () => clearInterval(jokeLoadingInterval);
  }, [jokeIntervalMode]);

  return (
    <JokeContext.Provider
      value={{
        jokes: jokes,
        jokeIntervalMode: jokeIntervalMode,
        setJokeIntervalMode: setJokeIntervalMode,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </JokeContext.Provider>
  );
};
