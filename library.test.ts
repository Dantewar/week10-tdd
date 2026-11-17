
import { describe, test, expect } from "vitest";

import { findBook } from "./library";

describe("Library Unit Tests - findBook", () => {
  test("findBook returns dune with 3 copies", () => {
    const book = findBook("dune");

    expect(book).toEqual({
      title: "dune",
      copiesAvailable: 3,
    });
  });

  test("findBook returns foundation with 0 copies", () => {
    const book = findBook("foundation");

    expect(book).toEqual({
      title: "foundation",
      copiesAvailable: 0,
    });
  });

  test("findBook throws for an unknown book", () => {
    expect(() => findBook("harry potter")).toThrow();
  });

  test("findBook throws when title is a number", () => {
    expect(() => findBook(42)).toThrow();
  });
});
