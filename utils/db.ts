import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { type DB } from "@/utils/kysely-types";
import { Pool } from "pg";
import "dotenv/config";

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL! as string,
    }),
  }),
  plugins: [new CamelCasePlugin()],
});
