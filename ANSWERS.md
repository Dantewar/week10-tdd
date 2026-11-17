
# Week 10 – Unit Tests, Integration Tests and Zod

## Exercise 1 – A New Pizza on the Menu

### Question 1

Which schema stopped the test, and why?

Initially, PizzaTypeSchema rejected "vegetarian"
because it only accepted "margherita" and "pepperoni".

After adding vegetarian to the schema, the test
still failed because the menu did not contain
a price for the new pizza.

TypeScript checks types during development,
while Zod checks actual values at runtime.

This explains why Vitest could run the code even
when TypeScript showed an error.

### Question 2

Which file does the orderPizza test belong in,
and why?

The test belongs in pizzashop.integration.test.ts.

The orderPizza function combines createPizza,
sendOrder and chargeCustomer.

Testing these functions together is an integration
test because it checks how different parts of
the application work together.
