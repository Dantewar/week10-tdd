
import { describe, test, expect } from "vitest";
import {
  createPizza,
  sendOrder,
  orderPizza,
  chargeCustomer,
} from "./pizzashop";

describe("Pizza Shop Unit Tests", () => {
  test("createPizza returns correct type and price", () => {
    const pizza = createPizza("margherita");

    expect(pizza).toEqual({
      type: "margherita",
      price: 100,
    });
  });

  test("createPizza throws for unknown type", () => {
    expect(() => createPizza("hawaii")).toThrow();
  });

  test("sendOrder returns a numeric order id", () => {
    const id = sendOrder({
      type: "pepperoni",
      price: 120,
    });

    expect(typeof id).toBe("number");
    expect(Number.isInteger(id)).toBe(true);
    expect(id).toBeGreaterThanOrEqual(0);
    expect(id).toBeLessThan(1000);
  });

  test("orderPizza returns true for a valid pizza", () => {
    expect(orderPizza("pepperoni")).toBe(true);
  });

  test("createPizza returns vegetarian pizza for 110 SEK", () => {
    expect(createPizza("vegetarian")).toEqual({
      type: "vegetarian",
      price: 110,
    });
  });
});

describe("chargeCustomer Unit Tests", () => {
  test("returns true for a valid order ID and amount", () => {
    expect(chargeCustomer(42, 100)).toBe(true);
  });

  test("throws the correct error when order ID is undefined", () => {
    expect(() => chargeCustomer(undefined, 100)).toThrow(
      "Cannot charge the customer without a valid order ID!"
    );
  });

  test("throws for a negative order ID", () => {
    expect(() => chargeCustomer(-1, 100)).toThrow();
  });

  test("throws for a decimal order ID", () => {
    expect(() => chargeCustomer(12.5, 100)).toThrow();
  });

  test("throws when the amount is zero", () => {
    expect(() => chargeCustomer(42, 0)).toThrow();
  });
});
