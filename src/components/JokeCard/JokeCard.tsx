import PropTypes from "prop-types";
import React from "react";

type TJokeCardProps = {
  joke: string;
  favorited?: boolean;
  onClick?: () => void;
};

const JokeCard: React.FC<TJokeCardProps> = ({ joke, favorited, onClick }) => {
  return (
    <div
      data-testid="joke-card"
      onClick={onClick}
      style={{ ...(favorited && { backgroundColor: "#f15a2433" }) }}
      className="p-6 bg-white min-h-[100px] rounded-md text-xl text-center hover:opacity-60 hover:cursor-pointer"
    >
      <span>{joke}</span>
    </div>
  );
};

JokeCard.propTypes = {
  joke: PropTypes.string.isRequired,
  favorited: PropTypes.bool,
  onClick: PropTypes.func,
};

export default JokeCard;
