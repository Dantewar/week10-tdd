
import { describe, test, expect } from "vitest";

import {
  findBook,
  checkOutBook,
  registerLoan,
} from "./library";

// Exercise 4 - findBook
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

// Exercise 5 - checkOutBook
describe("Library Unit Tests - checkOutBook", () => {
  const availableBook = {
    title: "dune",
    copiesAvailable: 3,
  };

  test("returns a number", () => {
    const loanId = checkOutBook(availableBook);

    expect(typeof loanId).toBe("number");
  });

  test("returns a whole number", () => {
    const loanId = checkOutBook(availableBook);

    expect(Number.isInteger(loanId)).toBe(true);
  });

  test("returns a loan ID between 1000 and 9999", () => {
    const loanId = checkOutBook(availableBook);

    expect(loanId).toBeGreaterThanOrEqual(1000);
    expect(loanId).toBeLessThanOrEqual(9999);
  });

  test("throws when no copies are available", () => {
    expect(() =>
      checkOutBook({
        title: "foundation",
        copiesAvailable: 0,
      })
    ).toThrow("No copies available");
  });

  test("throws when copiesAvailable is missing", () => {
    expect(() =>
      checkOutBook({
        title: "dune",
      })
    ).toThrow();
  });
});

// Exercise 6 - registerLoan
describe("Library Unit Tests - registerLoan", () => {
  test("registerLoan returns a valid loan", () => {
    const loan = registerLoan(1234, "dune", 7);

    expect(loan).toEqual({
      loanId: 1234,
      title: "dune",
      memberId: 7,
    });
  });

  test("registerLoan throws when memberId is zero", () => {
    expect(() =>
      registerLoan(1234, "dune", 0)
    ).toThrow();
  });

  test("registerLoan throws for an invalid book title", () => {
    expect(() =>
      registerLoan(1234, "harry potter", 7)
    ).toThrow();
  });
});
