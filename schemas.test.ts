
import { describe, test, expect } from "vitest";

import {
  PizzaTypeSchema,
  PizzaSchema,
  AmountSchema,
  OrderIdSchema,
} from "./pizzashop";

describe("Zod Schema Unit Tests", () => {
  test("accepts margherita as a valid pizza type", () => {
    const result = PizzaTypeSchema.parse("margherita");

    expect(result).toBe("margherita");
  });

  test("rejects Margherita with a capital M", () => {
    expect(() => {
      PizzaTypeSchema.parse("Margherita");
    }).toThrow();
  });

  test("accepts a valid pepperoni pizza object", () => {
    const pizza = PizzaSchema.parse({
      type: "pepperoni",
      price: 120,
    });

    expect(pizza).toEqual({
      type: "pepperoni",
      price: 120,
    });
  });

  test("rejects a pizza without a price", () => {
    expect(() => {
      PizzaSchema.parse({
        type: "pepperoni",
      });
    }).toThrow();
  });

  test("rejects an amount provided as a string", () => {
    expect(() => {
      AmountSchema.parse("100");
    }).toThrow();
  });

  test("accepts order ID zero", () => {
    const result = OrderIdSchema.parse(0);

    expect(result).toBe(0);
  });
});
