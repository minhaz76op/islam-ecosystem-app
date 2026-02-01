import { 
  users, 
  friendRequests, 
  friendships, 
  messages, 
  challenges,
  type User, 
  type InsertUser,
  type FriendRequest,
  type InsertFriendRequest,
  type Friendship,
  type Message,
  type InsertMessage,
  type Challenge,
  type InsertChallenge,
} from "@shared/schema";
import { db } from "./db";
import { eq, or, and, desc, ilike, ne, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User | undefined>;
  searchUsers(query: string, excludeUserId: string): Promise<User[]>;
  
  // Friend request methods
  sendFriendRequest(data: InsertFriendRequest): Promise<FriendRequest>;
  getFriendRequests(userId: string): Promise<(FriendRequest & { sender: User })[]>;
  getSentFriendRequests(userId: string): Promise<(FriendRequest & { receiver: User })[]>;
  respondToFriendRequest(requestId: string, accept: boolean): Promise<void>;
  getPendingRequest(senderId: string, receiverId: string): Promise<FriendRequest | undefined>;
  
  // Friendship methods
  getFriends(userId: string): Promise<User[]>;
  removeFriend(userId: string, friendId: string): Promise<void>;
  areFriends(userId: string, friendId: string): Promise<boolean>;
  
  // Message methods
  sendMessage(data: InsertMessage): Promise<Message>;
  getMessages(userId: string, friendId: string): Promise<Message[]>;
  markMessagesAsRead(userId: string, senderId: string): Promise<void>;
  getUnreadMessageCount(userId: string): Promise<number>;
  getConversations(userId: string): Promise<{ friend: User; lastMessage: Message; unreadCount: number }[]>;
  
  // Challenge methods
  createChallenge(data: InsertChallenge): Promise<Challenge>;
  getChallenges(userId: string): Promise<(Challenge & { creator: User; opponent: User })[]>;
  respondToChallenge(challengeId: string, accept: boolean): Promise<void>;
  updateChallengeProgress(challengeId: string, userId: string, progress: number): Promise<void>;
  getChallenge(challengeId: string): Promise<(Challenge & { creator: User; opponent: User }) | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user || undefined;
  }

  async searchUsers(query: string, excludeUserId: string): Promise<User[]> {
    return db
      .select()
      .from(users)
      .where(
        and(
          or(
            ilike(users.username, `%${query}%`),
            ilike(users.displayName, `%${query}%`),
            ilike(users.phoneNumber, `%${query}%`)
          ),
          ne(users.id, excludeUserId)
        )
      )
      .limit(20);
  }

  // Friend request methods
  async sendFriendRequest(data: InsertFriendRequest): Promise<FriendRequest> {
    const [request] = await db.insert(friendRequests).values(data).returning();
    return request;
  }

  async getFriendRequests(userId: string): Promise<(FriendRequest & { sender: User })[]> {
    const requests = await db
      .select()
      .from(friendRequests)
      .innerJoin(users, eq(friendRequests.senderId, users.id))
      .where(
        and(
          eq(friendRequests.receiverId, userId),
          eq(friendRequests.status, "pending")
        )
      )
      .orderBy(desc(friendRequests.createdAt));

    return requests.map((r) => ({
      ...r.friend_requests,
      sender: r.users,
    }));
  }

  async getSentFriendRequests(userId: string): Promise<(FriendRequest & { receiver: User })[]> {
    const requests = await db
      .select()
      .from(friendRequests)
      .innerJoin(users, eq(friendRequests.receiverId, users.id))
      .where(
        and(
          eq(friendRequests.senderId, userId),
          eq(friendRequests.status, "pending")
        )
      )
      .orderBy(desc(friendRequests.createdAt));

    return requests.map((r) => ({
      ...r.friend_requests,
      receiver: r.users,
    }));
  }

  async respondToFriendRequest(requestId: string, accept: boolean): Promise<void> {
    const [request] = await db
      .select()
      .from(friendRequests)
      .where(eq(friendRequests.id, requestId));

    if (!request) return;

    await db
      .update(friendRequests)
      .set({
        status: accept ? "accepted" : "rejected",
        updatedAt: new Date(),
      })
      .where(eq(friendRequests.id, requestId));

    if (accept) {
      // Create bidirectional friendship
      await db.insert(friendships).values([
        { userId: request.senderId, friendId: request.receiverId },
        { userId: request.receiverId, friendId: request.senderId },
      ]);
    }
  }

  async getPendingRequest(senderId: string, receiverId: string): Promise<FriendRequest | undefined> {
    const [request] = await db
      .select()
      .from(friendRequests)
      .where(
        and(
          or(
            and(eq(friendRequests.senderId, senderId), eq(friendRequests.receiverId, receiverId)),
            and(eq(friendRequests.senderId, receiverId), eq(friendRequests.receiverId, senderId))
          ),
          eq(friendRequests.status, "pending")
        )
      );
    return request || undefined;
  }

  // Friendship methods
  async getFriends(userId: string): Promise<User[]> {
    const friendsList = await db
      .select()
      .from(friendships)
      .innerJoin(users, eq(friendships.friendId, users.id))
      .where(eq(friendships.userId, userId));

    return friendsList.map((f) => f.users);
  }

  async removeFriend(userId: string, friendId: string): Promise<void> {
    await db
      .delete(friendships)
      .where(
        or(
          and(eq(friendships.userId, userId), eq(friendships.friendId, friendId)),
          and(eq(friendships.userId, friendId), eq(friendships.friendId, userId))
        )
      );
  }

  async areFriends(userId: string, friendId: string): Promise<boolean> {
    const [friendship] = await db
      .select()
      .from(friendships)
      .where(
        and(eq(friendships.userId, userId), eq(friendships.friendId, friendId))
      );
    return !!friendship;
  }

  // Message methods
  async sendMessage(data: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(data).returning();
    return message;
  }

  async getMessages(userId: string, friendId: string): Promise<Message[]> {
    return db
      .select()
      .from(messages)
      .where(
        or(
          and(eq(messages.senderId, userId), eq(messages.receiverId, friendId)),
          and(eq(messages.senderId, friendId), eq(messages.receiverId, userId))
        )
      )
      .orderBy(messages.createdAt);
  }

  async markMessagesAsRead(userId: string, senderId: string): Promise<void> {
    await db
      .update(messages)
      .set({ read: true })
      .where(
        and(
          eq(messages.receiverId, userId),
          eq(messages.senderId, senderId),
          eq(messages.read, false)
        )
      );
  }

  async getUnreadMessageCount(userId: string): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(messages)
      .where(and(eq(messages.receiverId, userId), eq(messages.read, false)));
    return result[0]?.count || 0;
  }

  async getConversations(userId: string): Promise<{ friend: User; lastMessage: Message; unreadCount: number }[]> {
    const friends = await this.getFriends(userId);
    const conversations: { friend: User; lastMessage: Message; unreadCount: number }[] = [];

    for (const friend of friends) {
      const messagesResult = await db
        .select()
        .from(messages)
        .where(
          or(
            and(eq(messages.senderId, userId), eq(messages.receiverId, friend.id)),
            and(eq(messages.senderId, friend.id), eq(messages.receiverId, userId))
          )
        )
        .orderBy(desc(messages.createdAt))
        .limit(1);

      if (messagesResult.length > 0) {
        const unreadResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(messages)
          .where(
            and(
              eq(messages.senderId, friend.id),
              eq(messages.receiverId, userId),
              eq(messages.read, false)
            )
          );

        conversations.push({
          friend,
          lastMessage: messagesResult[0],
          unreadCount: unreadResult[0]?.count || 0,
        });
      }
    }

    return conversations.sort(
      (a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()
    );
  }

  // Challenge methods
  async createChallenge(data: InsertChallenge): Promise<Challenge> {
    const [challenge] = await db.insert(challenges).values(data).returning();
    return challenge;
  }

  async getChallenges(userId: string): Promise<(Challenge & { creator: User; opponent: User })[]> {
    const challengesList = await db
      .select()
      .from(challenges)
      .where(
        or(eq(challenges.creatorId, userId), eq(challenges.opponentId, userId))
      )
      .orderBy(desc(challenges.createdAt));

    const result: (Challenge & { creator: User; opponent: User })[] = [];

    for (const challenge of challengesList) {
      const [creator] = await db.select().from(users).where(eq(users.id, challenge.creatorId));
      const [opponent] = await db.select().from(users).where(eq(users.id, challenge.opponentId));

      if (creator && opponent) {
        result.push({
          ...challenge,
          creator,
          opponent,
        });
      }
    }

    return result;
  }

  async respondToChallenge(challengeId: string, accept: boolean): Promise<void> {
    await db
      .update(challenges)
      .set({ status: accept ? "accepted" : "expired" })
      .where(eq(challenges.id, challengeId));
  }

  async updateChallengeProgress(challengeId: string, oderId: string, progress: number): Promise<void> {
    const [challenge] = await db.select().from(challenges).where(eq(challenges.id, challengeId));
    if (!challenge) return;

    if (challenge.creatorId === oderId) {
      await db.update(challenges).set({ creatorProgress: progress }).where(eq(challenges.id, challengeId));
    } else if (challenge.opponentId === oderId) {
      await db.update(challenges).set({ opponentProgress: progress }).where(eq(challenges.id, challengeId));
    }

    // Check if challenge is completed
    const [updated] = await db.select().from(challenges).where(eq(challenges.id, challengeId));
    if (updated && updated.creatorProgress >= updated.targetValue && updated.opponentProgress >= updated.targetValue) {
      await db.update(challenges).set({ status: "completed" }).where(eq(challenges.id, challengeId));
    }
  }

  async getChallenge(challengeId: string): Promise<(Challenge & { creator: User; opponent: User }) | undefined> {
    const [challenge] = await db.select().from(challenges).where(eq(challenges.id, challengeId));
    if (!challenge) return undefined;

    const [creator] = await db.select().from(users).where(eq(users.id, challenge.creatorId));
    const [opponent] = await db.select().from(users).where(eq(users.id, challenge.opponentId));

    if (!creator || !opponent) return undefined;

    return { ...challenge, creator, opponent };
  }
}

export const storage = new DatabaseStorage();
