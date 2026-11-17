
import { describe, test, expect } from "vitest";
import { borrowBook } from "./library";

describe("Library Integration Tests - borrowBook", () => {
  test("borrows dune for member 7", () => {
    const loan = borrowBook("dune", 7);

    expect(loan.title).toBe("dune");
    expect(loan.memberId).toBe(7);
  });

  test("generates a loan ID between 1000 and 9999", () => {
    const loan = borrowBook("dune", 7);

    expect(typeof loan.loanId).toBe("number");
    expect(loan.loanId).toBeGreaterThanOrEqual(1000);
    expect(loan.loanId).toBeLessThanOrEqual(9999);
  });

  test("throws when no copies are available", () => {
    expect(() =>
      borrowBook("foundation", 7)
    ).toThrow("No copies available");
  });

  test("throws when member ID is negative", () => {
    expect(() =>
      borrowBook("dune", -1)
    ).toThrow();
  });
});
