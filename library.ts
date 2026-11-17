
import { z } from "zod";

// Book schemas
export const BookTitleSchema = z.enum([
  "dune",
  "neuromancer",
  "foundation",
]);

export const BookSchema = z.object({
  title: BookTitleSchema,
  copiesAvailable: z.number().int().nonnegative(),
});

// Loan schema
export const LoanSchema = z.object({
  loanId: z.number().int().positive(),
  title: BookTitleSchema,
  memberId: z.number().int().positive(),
});

// TypeScript types
export type BookTitle = z.infer<typeof BookTitleSchema>;
export type Book = z.infer<typeof BookSchema>;
export type Loan = z.infer<typeof LoanSchema>;

// Library catalogue
const catalogue: Record<BookTitle, Book> = {
  dune: {
    title: "dune",
    copiesAvailable: 3,
  },

  neuromancer: {
    title: "neuromancer",
    copiesAvailable: 1,
  },

  foundation: {
    title: "foundation",
    copiesAvailable: 0,
  },
};

// Find a book
export const findBook = (title: unknown): Book => {
  const validTitle = BookTitleSchema.parse(title);

  const book = catalogue[validTitle];

  return BookSchema.parse(book);
};

// Check out a book
export const checkOutBook = (book: unknown): number => {
  const validBook = BookSchema.parse(book);

  if (validBook.copiesAvailable === 0) {
    throw new Error("No copies available");
  }

  const loanId = Math.floor(Math.random() * 9000) + 1000;

  return loanId;
};

// Register a loan
export const registerLoan = (
  loanId: unknown,
  title: unknown,
  memberId: unknown
): Loan => {
  return LoanSchema.parse({
    loanId,
    title,
    memberId,
  });
};

// Borrow a book using the complete workflow
export const borrowBook = (
  title: unknown,
  memberId: unknown
): Loan => {
  const book = findBook(title);

  const loanId = checkOutBook(book);

  const loan = registerLoan(
    loanId,
    book.title,
    memberId
  );

  return loan;
};
