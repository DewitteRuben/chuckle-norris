import JokeCard from "../JokeCard/JokeCard";
import { useJokeContext } from "../../context/jokes";
import { TChuckJoke } from "../../api/chuck-api";
import { useFavoriteContext } from "../../context/favorites";
import { MAX_FAVORITED_JOKES } from "../../database/localstorage";
import PageHeader from "../PageHeader/PageHeader";

const JokeFeed = () => {
  const { isLoading, jokes, setJokeIntervalMode, jokeIntervalMode } =
    useJokeContext();
  const { setFavorite, removeFavorite, favorites } = useFavoriteContext();

  const onCardClick = (joke: TChuckJoke) => {
    const isFavorite = !!favorites.find((favJoke) => favJoke.id === joke.id);

    if (isFavorite) {
      removeFavorite(joke.id);
      return;
    }

    if (favorites.length === MAX_FAVORITED_JOKES) {
      alert(`You cannot favorite more than ${MAX_FAVORITED_JOKES} jokes!`);
      return;
    }

    setFavorite(joke);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-between">
        <PageHeader
          title="The latest Chuck Jokes!"
          subtitle="Click on a joke to add it to your favorites"
        />
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
          const isFavorite = !!favorites.find(
            (favJoke) => favJoke.id === joke.id,
          );

          return (
            <JokeCard
              favorited={isFavorite}
              key={joke.id}
              onClick={() => onCardClick(joke)}
              joke={joke.value}
            />
          );
        })}
      </div>
    </>
  );
};

export default JokeFeed;
