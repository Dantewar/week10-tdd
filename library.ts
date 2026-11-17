
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
  // Validate the input
  const validTitle = BookTitleSchema.parse(title);

  // Find the book
  const book = catalogue[validTitle];

  // Validate and return the book
  return BookSchema.parse(book);
};
