import PropTypes from "prop-types";
import React from "react";

type TJokeCardProps = {
  joke: string;
  favorited?: boolean;
  onClick?: () => void;
};

const JokeCard = React.forwardRef<HTMLDivElement, TJokeCardProps>(
  ({ joke, favorited, onClick }, ref) => {
    const handleOnClick = () => {
      if (onClick) {
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        onClick={handleOnClick}
        style={{ ...(favorited && { backgroundColor: "#f15a2433" }) }}
        data-testid="joke-card"
        className="p-6 bg-white min-h-[100px] rounded-md text-xl text-center hover:opacity-60 hover:cursor-pointer"
      >
        <span>{joke}</span>
      </div>
    );
  },
);

JokeCard.displayName = "JokeCard";

JokeCard.propTypes = {
  joke: PropTypes.string.isRequired,
  favorited: PropTypes.bool,
  onClick: PropTypes.func,
};

export default JokeCard;
