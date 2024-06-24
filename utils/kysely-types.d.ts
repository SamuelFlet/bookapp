import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Author {
  fullName: string;
  id: Generated<number>;
}

export interface Book {
  authorId: number;
  id: Generated<number>;
  img: string | null;
  pubYear: number | null;
  title: string;
}

export interface Users {
  email: string;
  id: Generated<number>;
  name: string;
  password: string;
}

export interface UsersBooks {
  bookid: number;
  status: string | null;
  userid: number;
}

export interface DB {
  author: Author;
  book: Book;
  users: Users;
  usersBooks: UsersBooks;
}
