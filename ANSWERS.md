
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
while Zod validates actual values at runtime.

This explains why Vitest could run the code even
when TypeScript showed an error.

### Question 2
Which file does the orderPizza test belong in, and why?

The test belongs in pizzashop.integration.test.ts.

The orderPizza function combines createPizza,
sendOrder and chargeCustomer.

Testing these functions together is an integration
test because it checks how different parts of
the application work together.

## Exercise 2 – Testing chargeCustomer

### Question
What was the bug, and what does it tell you
about testing error messages?

The bug was a spelling mistake in the error message.

The function returned "cutomer" instead of "customer"
when the order ID was undefined.

The function correctly rejected invalid input,
but the error message was incorrect.

This shows that testing whether an error is thrown
is not always enough.

Testing the exact error message helps ensure that
the application provides clear and consistent
information when something goes wrong.

## Exercise 3 – Testing the Schemas Themselves

### Question
Why use toEqual and not toBe when comparing objects?

We use toEqual because it compares the properties
and values inside objects.

The toBe matcher checks whether two variables
refer to exactly the same object in memory.

Two objects can contain identical data but still
be different objects in memory.

Therefore, toEqual is the correct matcher when
comparing the contents of pizza objects.

## Exercise 5 – Testing checkOutBook

### Question
Could the random number test pass by luck
even if the code were wrong?

Yes. The test could pass by luck because Math.random()
produces different values each time.

A function might sometimes return a valid number
even if its implementation is incorrect.

To make the test more trustworthy, I could mock
Math.random() using vi.spyOn() in Vitest.

This would allow me to test specific values,
including the lowest and highest possible loan IDs.

## Exercise 6 – registerLoan and borrowBook

### Question
What does the foundation test show about errors
travelling through a chain of functions?

The borrowBook function calls findBook,
checkOutBook and registerLoan.

When borrowing "foundation", findBook successfully
returns the book even though no copies are available.

The checkOutBook function then throws the error
"No copies available".

Because borrowBook does not catch this error,
it travels back through the function chain
to the caller.

This shows that an error inside one function
can stop the complete operation and be reported
by the function that called it.
