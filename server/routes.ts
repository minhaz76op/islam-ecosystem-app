import type { Express, Request, Response } from "express";
import { createServer, type Server } from "node:http";
import { storage } from "./storage";
import * as bcrypt from "bcryptjs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { username, password, displayName } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        displayName: displayName || username,
      });

      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to login" });
    }
  });

  // User routes
  app.get("/api/users/search", async (req: Request, res: Response) => {
    try {
      const { query, userId } = req.query;
      if (!query || !userId) {
        return res.status(400).json({ error: "Query and userId are required" });
      }
      const users = await storage.searchUsers(query as string, userId as string);
      const sanitizedUsers = users.map(({ password, ...user }) => user);
      res.json(sanitizedUsers);
    } catch (error) {
      res.status(500).json({ error: "Failed to search users" });
    }
  });

  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // Friend request routes
  app.post("/api/friends/request", async (req: Request, res: Response) => {
    try {
      const { senderId, receiverId } = req.body;

      if (!senderId || !receiverId) {
        return res.status(400).json({ error: "SenderId and receiverId are required" });
      }

      if (senderId === receiverId) {
        return res.status(400).json({ error: "Cannot send friend request to yourself" });
      }

      // Check if already friends
      const areFriends = await storage.areFriends(senderId, receiverId);
      if (areFriends) {
        return res.status(400).json({ error: "Already friends" });
      }

      // Check for existing pending request
      const existingRequest = await storage.getPendingRequest(senderId, receiverId);
      if (existingRequest) {
        return res.status(400).json({ error: "Friend request already pending" });
      }

      const request = await storage.sendFriendRequest({ senderId, receiverId });
      res.status(201).json(request);
    } catch (error) {
      res.status(500).json({ error: "Failed to send friend request" });
    }
  });

  app.get("/api/friends/requests/:userId", async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      const requests = await storage.getFriendRequests(userId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to get friend requests" });
    }
  });

  app.get("/api/friends/requests/sent/:userId", async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      const requests = await storage.getSentFriendRequests(userId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to get sent friend requests" });
    }
  });

  app.post("/api/friends/respond", async (req: Request, res: Response) => {
    try {
      const { requestId, accept } = req.body;

      if (!requestId || accept === undefined) {
        return res.status(400).json({ error: "RequestId and accept are required" });
      }

      await storage.respondToFriendRequest(requestId, accept);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to respond to friend request" });
    }
  });

  // Friends routes
  app.get("/api/friends/:userId", async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      const friends = await storage.getFriends(userId);
      const sanitizedFriends = friends.map(({ password, ...friend }) => friend);
      res.json(sanitizedFriends);
    } catch (error) {
      res.status(500).json({ error: "Failed to get friends" });
    }
  });

  app.delete("/api/friends/:userId/:friendId", async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      const friendId = req.params.friendId as string;
      await storage.removeFriend(userId, friendId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove friend" });
    }
  });

  // Message routes
  app.post("/api/messages", async (req: Request, res: Response) => {
    try {
      const { senderId, receiverId, content } = req.body;

      if (!senderId || !receiverId || !content) {
        return res.status(400).json({ error: "SenderId, receiverId, and content are required" });
      }

      const message = await storage.sendMessage({ senderId, receiverId, content });
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.get("/api/messages/:userId/:friendId", async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      const friendId = req.params.friendId as string;
      const messages = await storage.getMessages(userId, friendId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to get messages" });
    }
  });

  app.post("/api/messages/read", async (req: Request, res: Response) => {
    try {
      const { userId, senderId } = req.body;

      if (!userId || !senderId) {
        return res.status(400).json({ error: "UserId and senderId are required" });
      }

      await storage.markMessagesAsRead(userId, senderId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to mark messages as read" });
    }
  });

  app.get("/api/messages/unread/:userId", async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      const count = await storage.getUnreadMessageCount(userId);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Failed to get unread count" });
    }
  });

  app.get("/api/conversations/:userId", async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      const conversations = await storage.getConversations(userId);
      const sanitizedConversations = conversations.map(({ friend, ...rest }) => ({
        ...rest,
        friend: { ...friend, password: undefined },
      }));
      res.json(sanitizedConversations);
    } catch (error) {
      res.status(500).json({ error: "Failed to get conversations" });
    }
  });

  // Challenge routes
  app.post("/api/challenges", async (req: Request, res: Response) => {
    try {
      const { creatorId, opponentId, type, title, description, targetValue, endDate } = req.body;

      if (!creatorId || !opponentId || !type || !title || !targetValue || !endDate) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const challenge = await storage.createChallenge({
        creatorId,
        opponentId,
        type,
        title,
        description,
        targetValue,
        endDate: new Date(endDate),
      });
      res.status(201).json(challenge);
    } catch (error) {
      res.status(500).json({ error: "Failed to create challenge" });
    }
  });

  app.get("/api/challenges/:userId", async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      const challenges = await storage.getChallenges(userId);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ error: "Failed to get challenges" });
    }
  });

  app.get("/api/challenges/single/:challengeId", async (req: Request, res: Response) => {
    try {
      const challengeId = req.params.challengeId as string;
      const challenge = await storage.getChallenge(challengeId);
      if (!challenge) {
        return res.status(404).json({ error: "Challenge not found" });
      }
      res.json(challenge);
    } catch (error) {
      res.status(500).json({ error: "Failed to get challenge" });
    }
  });

  app.post("/api/challenges/respond", async (req: Request, res: Response) => {
    try {
      const { challengeId, accept } = req.body;

      if (!challengeId || accept === undefined) {
        return res.status(400).json({ error: "ChallengeId and accept are required" });
      }

      await storage.respondToChallenge(challengeId, accept);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to respond to challenge" });
    }
  });

  app.post("/api/challenges/progress", async (req: Request, res: Response) => {
    try {
      const { challengeId, oderId, progress } = req.body;

      if (!challengeId || !oderId || progress === undefined) {
        return res.status(400).json({ error: "ChallengeId, userId, and progress are required" });
      }

      await storage.updateChallengeProgress(challengeId, oderId, progress);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update challenge progress" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
