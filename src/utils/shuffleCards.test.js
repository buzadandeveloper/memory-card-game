import { describe, it, expect } from "vitest";
import { shuffleCards } from "./shuffleCards";

describe("shuffle cards", () => {
  const cards = ["A", "B", "C", "D"];
  it("should duplicate the cards base on selectedValue", () => {
    const selectedValue = 2;
    const deck = shuffleCards(cards, selectedValue);
    expect(deck.length).toBe(cards.length * selectedValue);
  });

  it("should shuffle random deck", () => {
    const selectedValue = 1;
    const deck = shuffleCards(cards, selectedValue);
    expect(deck.sort()).toEqual(cards.sort());
  });
});
