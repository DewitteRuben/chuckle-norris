import { useFavoriteContext } from "../../context/favorites";
import JokeCard from "../JokeCard/JokeCard";
import PageHeader from "../PageHeader/PageHeader";

const FavoritesFeed = () => {
  const { favorites, removeFavorite } = useFavoriteContext();

  const onCardClick = (jokeId: string) => {
    removeFavorite(jokeId);
  };

  if (!favorites.length) {
    return (
      <PageHeader
        title="You currently have no favorite jokes :("
        subtitle="Click on a joke on the home page to save it to your favorites!"
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Your collection of favorite jokes!"
        subtitle="Click on a joke to remove it from your favorites!"
      />
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
