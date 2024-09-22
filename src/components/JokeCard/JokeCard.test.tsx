import { render, screen } from "@testing-library/react";
import JokeCard from "./JokeCard";

describe("JokeCard Component", () => {
  const joke = "Chuck Norris can divide by zero";

  it("renders the joke quote", () => {
    render(<JokeCard joke={joke} />);
    const jokeElement = screen.getByText(joke);
    expect(jokeElement).toBeInTheDocument();
  });
});
