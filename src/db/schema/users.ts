import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { builderPostsTable } from "./builderPosting.ts";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
    builderPosts: one(builderPostsTable),
}));