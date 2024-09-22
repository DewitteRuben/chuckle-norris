import React from "react";
import JokeCard from "../JokeCard/JokeCard";
import chuckAPI, { TChuckJoke } from "../../api/chuck-api";

const JokeFeed = () => {
  const [jokes, setJokes] = React.useState<TChuckJoke[]>([]);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchJokes = async () => {
      try {
        setLoading(true);
        const jokes = await chuckAPI.getRandomJokes(10);
        setJokes(jokes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJokes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {jokes.map((joke) => {
        return <JokeCard key={joke.id} joke={joke.value} />;
      })}
    </div>
  );
};

export default JokeFeed;
