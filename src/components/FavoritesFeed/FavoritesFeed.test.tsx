import { render, screen, fireEvent } from "@testing-library/react";
import { useFavoriteContext } from "../../context/favorites";
import FavoritesFeed from "./FavoritesFeed";

jest.mock("../../context/favorites", () => ({
  useFavoriteContext: jest.fn(),
}));

describe("FavoriteFeed", () => {
  const removeFavoriteMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFavoriteContext as jest.Mock).mockReturnValue({
      favorites: [],
      removeFavorite: removeFavoriteMock,
    });
  });

  it("renders empty state when no favorites are present", () => {
    render(<FavoritesFeed />);
    expect(
      screen.getByText(/you currently have no favorite jokes :\(/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /click on a joke on the home page to save it to your favorites!/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders favorite jokes when present", () => {
    const mockFavorites = [
      { id: "1", value: "Chuck Norris joke 1" },
      { id: "2", value: "Chuck Norris joke 2" },
    ];

    (useFavoriteContext as jest.Mock).mockReturnValueOnce({
      favorites: mockFavorites,
      removeFavorite: removeFavoriteMock,
    });

    render(<FavoritesFeed />);

    expect(
      screen.getByText(/your collection of favorite jokes!/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/Chuck Norris joke 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Chuck Norris joke 2/i)).toBeInTheDocument();
  });

  it("removes a favorite joke on card click", () => {
    const mockFavorites = [{ id: "1", value: "Chuck Norris joke 1" }];

    (useFavoriteContext as jest.Mock).mockReturnValueOnce({
      favorites: mockFavorites,
      removeFavorite: removeFavoriteMock,
    });

    render(<FavoritesFeed />);

    const jokeCard = screen.getByText(/Chuck Norris joke 1/i);
    fireEvent.click(jokeCard);

    expect(removeFavoriteMock).toHaveBeenCalledWith("1");
  });
});
