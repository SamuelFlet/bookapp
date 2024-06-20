export type Book = {
  id: number;
  title: string;
  publish_year: string;
  authorId: number;
  ownersId: number[];
  lang: string;
  media_type: string;
};

export type Author = {
  id: number;
  name: string;
  birth_year: string;
  death_year: string | null;
  bookId: number[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  books: string;
};

export type user_books = {
  bookId: number;
  userId: number;
};

export type BookAuthorName = {
  authorid: number;
  id: number;
  name: string;
  title: string;
  publish_year: string;
  lang: string;
  img: string;
};
