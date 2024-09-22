import React from "react";

type TJokeCardProps = {
  joke: string;
};

const JokeCard: React.FC<TJokeCardProps> = ({ joke }) => {
  return (
    <div
      data-testid="joke-card"
      className="p-6 bg-white min-h-[100px] rounded-md text-xl text-center hover:opacity-60 hover:cursor-pointer"
    >
      <span>{joke}</span>
    </div>
  );
};

export default JokeCard;
