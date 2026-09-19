import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  apiToken: text("api_token"),
  token: text("token"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").default(0).notNull(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const readingLists = pgTable("reading_lists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  blogId: integer("blog_id").references(() => blogs.id, { onDelete: "cascade" }).notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingLists: many(readingLists),
}))

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
  readingLists: many(readingLists),
}))

export const readingListsRelations = relations(readingLists, ({ one }) => ({
  user: one(users, {
    fields: [readingLists.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [readingLists.blogId],
    references: [blogs.id],
  }),
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Blog = typeof blogs.$inferSelect
export type NewBlog = typeof blogs.$inferInsert
export type ReadingList = typeof readingLists.$inferSelect
export type NewReadingList = typeof readingLists.$inferInsert
