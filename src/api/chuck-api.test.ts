import chuckAPI from "./chuck-api";

describe("ChuckAPI", () => {
  it("should fetch a random joke", async () => {
    const joke = await chuckAPI.getRandomJoke();

    expect(joke).toHaveProperty("categories");
    expect(joke).toHaveProperty("created_at");
    expect(joke).toHaveProperty("icon_url");
    expect(joke).toHaveProperty("id");
    expect(joke).toHaveProperty("updated_at");
    expect(joke).toHaveProperty("url");
    expect(joke).toHaveProperty("value");
  });

  it("should fetch multiple random jokes", async () => {
    const jokes = await chuckAPI.getRandomJokes(2);

    expect(jokes.length).toBe(2);
    jokes.forEach((joke) => {
      expect(joke).toHaveProperty("categories");
      expect(joke).toHaveProperty("created_at");
      expect(joke).toHaveProperty("icon_url");
      expect(joke).toHaveProperty("id");
      expect(joke).toHaveProperty("updated_at");
      expect(joke).toHaveProperty("url");
      expect(joke).toHaveProperty("value");
    });
  });
});
