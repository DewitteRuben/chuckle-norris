import { fireEvent, render, screen } from "@testing-library/react";
import JokeCard from "./JokeCard";

describe("JokeCard Component", () => {
  const joke = "Chuck Norris can divide by zero";

  it("renders the joke", () => {
    render(<JokeCard joke={joke} />);
    const jokeElement = screen.getByText(joke);
    expect(jokeElement).toBeInTheDocument();
  });

  it("applies the favorited background color when favorited prop is true", () => {
    render(<JokeCard joke={joke} favorited={true} />);
    const cardElement = screen.getByTestId("joke-card");
    expect(cardElement).toHaveStyle("background-color: #f15a2433");
  });

  it("does not apply the favorited background color when favorited prop is false", () => {
    render(<JokeCard joke={joke} favorited={false} />);
    const cardElement = screen.getByTestId("joke-card");
    expect(cardElement).not.toHaveStyle("background-color: #f15a2433");
  });

  it("calls onClick when the card is clicked", () => {
    const onClickMock = jest.fn();
    render(<JokeCard joke={joke} onClick={onClickMock} />);

    const cardElement = screen.getByTestId("joke-card");
    fireEvent.click(cardElement);

    expect(onClickMock).toHaveBeenCalled();
  });
});
