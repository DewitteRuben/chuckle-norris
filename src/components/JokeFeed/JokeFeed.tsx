import JokeCard from "../JokeCard/JokeCard";
import { useJokeContext } from "../../context/jokes";

const JokeFeed = () => {
  const { isLoading, jokes, setJokeIntervalMode, jokeIntervalMode } =
    useJokeContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="mb-6">
          <h2>The latest Chuck Jokes!</h2>
          <p>Click on a joke to add it to your favorites</p>
        </div>
        <button
          disabled={isLoading}
          onClick={() => setJokeIntervalMode((qMode) => !qMode)}
          className={`font-bold rounded-lg text-md mb-6 p-4 bg-[#4DB6AC] hover:bg-[#379D8F] text-[#ffffff] justify-center ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {jokeIntervalMode
            ? "Stop receiving more jokes!"
            : "Receive more jokes!"}
        </button>
      </div>
      <div className="flex flex-col gap-6">
        {jokes.map((joke) => {
          return <JokeCard key={joke.id} joke={joke.value} />;
        })}
      </div>
    </>
  );
};

export default JokeFeed;
