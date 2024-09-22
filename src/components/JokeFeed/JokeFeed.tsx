import JokeCard from "../JokeCard/JokeCard";
import { useJokeContext } from "../../context/jokes";

const JokeFeed = () => {
  const { isLoading, jokes } = useJokeContext();

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
