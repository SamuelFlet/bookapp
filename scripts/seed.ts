import { db } from "@/utils/db";
import { users, author, book } from "@/app/lib/placeholder-data";
import { hash } from "bcryptjs";
import { sql } from "kysely";

async function seedUsers() {
  try {
    const createTable = await db.schema
      .createTable("users")
      .ifNotExists()
      .addColumn("id", "serial", (col) => col.primaryKey().notNull())
      .addColumn("name", "text", (col) => col.notNull())
      .addColumn("email", "text", (col) => col.unique().notNull())
      .addColumn("password", "text", (col) => col.notNull())
      .execute();

    console.log('created "users" table');

    const insertedUsers = await Promise.all(
      users.map(async (users) => {
        const hashedPassword = await hash(users.password, 10);
        return db
          .insertInto("users")
          .values([
            {
              id: users.id,
              name: users.name,
              email: users.email,
              password: hashedPassword,
            },
          ])
          .execute();
      })
    );
    console.log(`Seeded ${insertedUsers.length} users`);
    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

const seedAuthors = async () => {
  try {
    const createTable = await db.schema
      .createTable("author")
      .ifNotExists()
      .addColumn("id", "serial", (col) => col.primaryKey().notNull())
      .addColumn("fullName", "text", (col) => col.notNull().unique())
      .addColumn("Bio","text")
      .execute();

    console.log('created "author" table');

    const insertedAuthors = await Promise.all(
      author.map(async (author) => {
        return db
          .insertInto("author")
          .values([
            {
              id: author.id,
              fullName: author.fullName,
            },
          ])
          .execute();
      })
    );
    console.log(`Seeded ${insertedAuthors.length} authors`);
    return {
      createTable,
      author: insertedAuthors,
    };
  } catch (error) {
    console.error("Error seeding authors:", error);
    throw error;
  }
};

const seedBooks = async () => {
  try {
    const createTable = await db.schema
      .createTable("book")
      .ifNotExists()
      .addColumn("id", "serial", (col) => col.primaryKey().notNull())
      .addColumn("authorId", "integer", (col) => col.notNull())
      .addColumn("img", "text")
      .addColumn("title", "text", (col) => col.notNull())
      .addColumn("pubYear", "integer")
      .execute();

    console.log('created "book" table');

    const insertedBooks = await Promise.all(
      book.map(async (book) => {
        return db
          .insertInto("book")
          .values([
            {
              id: book.id,
              authorId: book.authorId,
              img: book.img,
              pubYear: book.pubYear,
              title: book.title,
            },
          ])
          .execute();
      })
    );
    console.log(`Seeded ${insertedBooks.length} books`);
    return {
      createTable,
      book: insertedBooks,
    };
  } catch (error) {
    console.error("Error seeding books:", error);
    throw error;
  }
};

const seedUserBooks = async () => {
  try {
    const createTable = await db.schema
      .createTable("users_books")
      .ifNotExists()
      .addColumn("userid", "integer", (col) =>
        col.references("users.id").onDelete("cascade").notNull()
      )
      .addColumn("bookid", "integer", (col) =>
        col.references("book.id").onDelete("cascade").notNull()
      )
      .addColumn('status','text')
      .addPrimaryKeyConstraint('primary_key',['userid','bookid'])
      .execute();
    console.log('created "users_books" table');
    // const insertedUsersBooks = null
    // console.log(`Seeded ${insertedUsersBooks.length} books`);
    return {
      createTable,
      // book: insertedUsersBooks,
    };
  } catch (error) {
    console.error("Error seeding users_books:", error);
    throw error;
  }
};

async function main() {
  try {
    await seedUsers();
    await seedAuthors();
    await seedBooks();
    await seedUserBooks();
  } catch (error) {
    console.error("Failed to seed:", error);
    throw error;
  }
  db.destroy();
}

main();
