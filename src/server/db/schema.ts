// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  smallint,
  boolean,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `vapelore_${name}`);

export const posts = createTable(
  "post",
  {
    userId: varchar("userId", { length: 256 }).notNull(),
    id: serial("id").primaryKey(),
    // name: varchar("name", { length: 256 }),
    imageUrl: varchar("imageUrl", { length: 2083 }).notNull(),
    brand: varchar("brand", { length: 256 }).notNull(),
    model: varchar("model", { length: 256 }).notNull(),
    puffs: integer("puffs").notNull(),
    strength: varchar("strength", { length: 20 }).notNull(),
    puffType: varchar("puffType", { length: 20 }).notNull(),
    taste: varchar("taste", { length: 20 }).notNull(),
    charge: varchar("charge", { length: 20 }).notNull(),
    liqVolume: smallint("liqVolume").notNull(),
    capacity: smallint("capacity").notNull(),
    display: varchar("display", { length: 128 }).notNull(),
    features: varchar("features", { length: 512 }),
    isApproved: boolean("isApproved").default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.brand),
  }),
);
