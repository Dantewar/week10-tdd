
import { z } from "zod";

// Pizza menu
const menu = {
  margherita: 100,
  pepperoni: 120,
  vegetarian: 110,
};

// Zod schemas
export const PizzaTypeSchema = z.enum([
  "margherita",
  "pepperoni",
  "vegetarian",
]);

export const PizzaSchema = z.object({
  type: PizzaTypeSchema,
  price: z.number().positive(),
});

export const OrderIdSchema = z.number().int().nonnegative();

export const AmountSchema = z.number().positive();

// TypeScript types
export type PizzaType = z.infer<typeof PizzaTypeSchema>;
export type Pizza = z.infer<typeof PizzaSchema>;

// Create a pizza
export const createPizza = (type: unknown): Pizza => {
  const pizzaType = PizzaTypeSchema.parse(type);

  return PizzaSchema.parse({
    type: pizzaType,
    price: menu[pizzaType],
  });
};

// Send an order to the kitchen
const sendOrder = (pizza: unknown): number => {
  const validPizza = PizzaSchema.parse(pizza);

  console.log(
    `Sending ${validPizza.type} to the kitchen!`
  );

  const orderId = Math.floor(Math.random() * 1000);

  return orderId;
};

// Charge the customer
const chargeCustomer = (
  orderId: unknown,
  amount: unknown
): boolean => {
  if (orderId === undefined || orderId === null) {
    throw new Error(
      "Cannot charge the cutomer without a valid order ID!"
    );
  }

  const validOrderId = OrderIdSchema.parse(orderId);
  const validAmount = AmountSchema.parse(amount);

  console.log(
    `Charging ${validAmount}SEK for order #${validOrderId}`
  );

  return true;
};

// Complete pizza order
const orderPizza = (pizzaType: unknown): boolean => {
  const pizza = createPizza(pizzaType);

  const orderId = sendOrder(pizza);

  const paymentSuccess = chargeCustomer(
    orderId,
    pizza.price
  );

  return paymentSuccess;
};

export { sendOrder, chargeCustomer, orderPizza };
