import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Friend request status enum
export const friendRequestStatusEnum = pgEnum("friend_request_status", ["pending", "accepted", "rejected"]);

// Friend requests table
export const friendRequests = pgTable("friend_requests", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id", { length: 36 }).notNull().references(() => users.id),
  receiverId: varchar("receiver_id", { length: 36 }).notNull().references(() => users.id),
  status: friendRequestStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Friendships table (for accepted friends)
export const friendships = pgTable("friendships", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
  friendId: varchar("friend_id", { length: 36 }).notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Messages table
export const messages = pgTable("messages", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id", { length: 36 }).notNull().references(() => users.id),
  receiverId: varchar("receiver_id", { length: 36 }).notNull().references(() => users.id),
  content: text("content").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Challenge status enum
export const challengeStatusEnum = pgEnum("challenge_status", ["pending", "accepted", "completed", "expired"]);

// Challenge types enum
export const challengeTypeEnum = pgEnum("challenge_type", [
  "prayer_streak",
  "quran_reading",
  "tasbih_count",
  "dua_memorization",
  "fasting",
  "charity"
]);

// Challenges table
export const challenges = pgTable("challenges", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  creatorId: varchar("creator_id", { length: 36 }).notNull().references(() => users.id),
  opponentId: varchar("opponent_id", { length: 36 }).notNull().references(() => users.id),
  type: challengeTypeEnum("type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  targetValue: integer("target_value").notNull(),
  creatorProgress: integer("creator_progress").default(0).notNull(),
  opponentProgress: integer("opponent_progress").default(0).notNull(),
  status: challengeStatusEnum("status").default("pending").notNull(),
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  sentRequests: many(friendRequests, { relationName: "sentRequests" }),
  receivedRequests: many(friendRequests, { relationName: "receivedRequests" }),
  friendships: many(friendships, { relationName: "userFriendships" }),
  sentMessages: many(messages, { relationName: "sentMessages" }),
  receivedMessages: many(messages, { relationName: "receivedMessages" }),
  createdChallenges: many(challenges, { relationName: "createdChallenges" }),
  receivedChallenges: many(challenges, { relationName: "receivedChallenges" }),
}));

export const friendRequestsRelations = relations(friendRequests, ({ one }) => ({
  sender: one(users, {
    fields: [friendRequests.senderId],
    references: [users.id],
    relationName: "sentRequests",
  }),
  receiver: one(users, {
    fields: [friendRequests.receiverId],
    references: [users.id],
    relationName: "receivedRequests",
  }),
}));

export const friendshipsRelations = relations(friendships, ({ one }) => ({
  user: one(users, {
    fields: [friendships.userId],
    references: [users.id],
    relationName: "userFriendships",
  }),
  friend: one(users, {
    fields: [friendships.friendId],
    references: [users.id],
    relationName: "friendFriendships",
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: "sentMessages",
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
    relationName: "receivedMessages",
  }),
}));

export const challengesRelations = relations(challenges, ({ one }) => ({
  creator: one(users, {
    fields: [challenges.creatorId],
    references: [users.id],
    relationName: "createdChallenges",
  }),
  opponent: one(users, {
    fields: [challenges.opponentId],
    references: [users.id],
    relationName: "receivedChallenges",
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  avatarUrl: true,
});

export const insertFriendRequestSchema = createInsertSchema(friendRequests).pick({
  senderId: true,
  receiverId: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  senderId: true,
  receiverId: true,
  content: true,
});

export const insertChallengeSchema = createInsertSchema(challenges).pick({
  creatorId: true,
  opponentId: true,
  type: true,
  title: true,
  description: true,
  targetValue: true,
  endDate: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type FriendRequest = typeof friendRequests.$inferSelect;
export type Friendship = typeof friendships.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Challenge = typeof challenges.$inferSelect;
export type InsertFriendRequest = z.infer<typeof insertFriendRequestSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
