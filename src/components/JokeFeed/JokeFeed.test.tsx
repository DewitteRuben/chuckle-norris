import { fireEvent, render, screen } from "@testing-library/react";
import JokeFeed from "./JokeFeed";
import { useJokeContext } from "../../context/jokes";

jest.mock("../../context/jokes", () => ({
  useJokeContext: jest.fn(),
}));

describe("JokeFeed", () => {
  const setJokeIntervalModeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useJokeContext as jest.Mock).mockReturnValue({
      isLoading: false,
      jokes: [],
      jokeIntervalMode: false,
      setJokeIntervalMode: setJokeIntervalModeMock,
    });
  });

  it("renders the loading state", () => {
    (useJokeContext as jest.Mock).mockReturnValueOnce({
      isLoading: true,
      jokes: [],
    });

    render(<JokeFeed />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders a joke", () => {
    const mockJokes = [{ id: 1, value: "Chuck Norris joke 1" }];
    (useJokeContext as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      jokes: mockJokes,
    });

    render(<JokeFeed />);
    expect(screen.getByText(/Chuck Norris joke 1/i)).toBeInTheDocument();
  });

  it("handles joke interval mode toggle", () => {
    render(<JokeFeed />);

    const toggleButton = screen.getByRole("button", {
      name: /receive more jokes!/i,
    });

    fireEvent.click(toggleButton);

    expect(setJokeIntervalModeMock).toHaveBeenCalled();
  });
});
