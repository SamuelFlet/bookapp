import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
});

export const authorRelations = relations(authors, ({ many }) => ({
  books: many(books),
}));

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id")
    .notNull()
    .references(() => authors.id),
  title: text("title").notNull(),
  pubYear: integer("publication_year"),
  img: text("img"),
});

export const bookRelations = relations(books, ({ one, many }) => ({
  author: one(authors, {
    fields: [books.authorId],
    references: [authors.id],
  }),
  usersBooks: many(UserBooks),
}));

export const UserBooks = pgTable("user_books", {
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),
  userId: text("user_id")
    .notNull()
    .references(() => UserProfile.user_id),
});

export const UserProfile = pgTable("user_profile", {
  user_id: text("user_id").primaryKey().notNull(),
  fullName: text("full_name"),
});

export const profileRelations = relations(UserProfile, ({ many }) => ({
  books: many(UserBooks),
}));

export const profileBooksRelations = relations(UserBooks, ({ one }) => ({
  profile: one(UserProfile, {
    fields: [UserBooks.userId],
    references: [UserProfile.user_id],
  }),

  book: one(books, {
    fields: [UserBooks.bookId],
    references: [books.id],
  }),
}));
