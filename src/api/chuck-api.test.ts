import chuckAPI from "./chuck-api";

describe("ChuckAPI", () => {
  it("should fetch a random quote", async () => {
    const quote = await chuckAPI.getRandomJoke();

    expect(quote).toHaveProperty("categories");
    expect(quote).toHaveProperty("created_at");
    expect(quote).toHaveProperty("icon_url");
    expect(quote).toHaveProperty("id");
    expect(quote).toHaveProperty("updated_at");
    expect(quote).toHaveProperty("url");
    expect(quote).toHaveProperty("value");
  });

  it("should fetch multiple random quotes", async () => {
    const quotes = await chuckAPI.getRandomJokes(2);

    expect(quotes.length).toBe(2);
    quotes.forEach((quote) => {
      expect(quote).toHaveProperty("categories");
      expect(quote).toHaveProperty("created_at");
      expect(quote).toHaveProperty("icon_url");
      expect(quote).toHaveProperty("id");
      expect(quote).toHaveProperty("updated_at");
      expect(quote).toHaveProperty("url");
      expect(quote).toHaveProperty("value");
    });
  });
});
