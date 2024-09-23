import JokeCard from "../JokeCard/JokeCard";
import { useJokeContext } from "../../context/jokes";
import { TChuckJoke } from "../../api/chuck-api";
import { useFavoriteContext } from "../../context/favorites";
import { MAX_FAVORITED_JOKES } from "../../database/localstorage";
import PageHeader from "../PageHeader/PageHeader";
import FeedContainer from "../FeedContainer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React from "react";
import Button from "../Button/Button";

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
      <div className="flex sm:flex-row sm:justify-between flex-col">
        <PageHeader
          title="The latest Chuck Jokes!"
          subtitle="Click on a joke to add it to your favorites"
        />
        <Button
          loading={isLoading}
          onClick={() => setJokeIntervalMode((qMode) => !qMode)}
        >
          {jokeIntervalMode
            ? "Stop receiving more jokes!"
            : "Receive more jokes!"}
        </Button>
      </div>
      <TransitionGroup component={FeedContainer}>
        {jokes.map((joke) => {
          const isFavorite = !!favorites.find(
            (favJoke) => favJoke.id === joke.id,
          );

          const itemRef = React.createRef<HTMLDivElement>();

          return (
            <CSSTransition
              timeout={500}
              unmountOnExit
              nodeRef={itemRef}
              classNames={{
                exitActive: "transition-opacity opacity-0 duration-500",
              }}
              key={joke.id}
            >
              <JokeCard
                favorited={isFavorite}
                joke={joke.value}
                ref={itemRef}
                onClick={() => onCardClick(joke)}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </>
  );
};

export default JokeFeed;
