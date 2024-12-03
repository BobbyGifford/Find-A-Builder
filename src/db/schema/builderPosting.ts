import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { usersTable } from "./users.ts";

export const builderPostsTable = pgTable("builder_posts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer('user_id').references(() => usersTable.id, {onDelete: 'cascade'}).notNull(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 255 }),
    website: varchar({ length: 255 }).notNull(),
    profession: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
});

export const postsRelations = relations(builderPostsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [builderPostsTable.user_id],
        references: [usersTable.id],
    }),
}));