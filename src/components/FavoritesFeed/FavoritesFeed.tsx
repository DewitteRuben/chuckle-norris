import { useFavoriteContext } from "../../context/favorites";
import JokeCard from "../JokeCard/JokeCard";

const FavoritesFeed = () => {
  const { favorites, removeFavorite } = useFavoriteContext();

  const onCardClick = (jokeId: string) => {
    removeFavorite(jokeId);
  };

  if (!favorites.length) {
    return (
      <div className="mb-6">
        <h2>You currently have no favorite jokes :(</h2>
        <p>Click on a joke on the home page to save it to your favorites!</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2>Your collection of favorite jokes!</h2>
        <p>Click on a joke to remove it from your favorites</p>
      </div>
      <div className="flex flex-col gap-6">
        {favorites.map((joke) => (
          <JokeCard
            key={joke.id}
            joke={joke.value}
            onClick={() => onCardClick(joke.id)}
          />
        ))}
      </div>
    </>
  );
};

export default FavoritesFeed;
