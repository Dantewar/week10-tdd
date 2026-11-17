
import { z } from "zod";

// Book title schema
export const BookTitleSchema = z.enum([
  "dune",
  "neuromancer",
  "foundation",
]);

// Book schema
export const BookSchema = z.object({
  title: BookTitleSchema,
  copiesAvailable: z.number().int().nonnegative(),
});

// TypeScript types
export type BookTitle = z.infer<typeof BookTitleSchema>;

export type Book = z.infer<typeof BookSchema>;

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

// Find a book in the catalogue
export const findBook = (title: unknown): Book => {
  const validTitle = BookTitleSchema.parse(title);

  const book = catalogue[validTitle];

  return BookSchema.parse(book);
};

// Check out a book and generate a loan ID
export const checkOutBook = (book: unknown): number => {
  // Validate book using Zod
  const validBook = BookSchema.parse(book);

  // Check book availability
  if (validBook.copiesAvailable === 0) {
    throw new Error("No copies available");
  }

  // Generate random loan ID from 1000 to 9999
  const loanId = Math.floor(Math.random() * 9000) + 1000;

  return loanId;
};
