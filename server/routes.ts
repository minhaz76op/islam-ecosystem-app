import type { Express, Request, Response } from "express";
import { createServer, type Server } from "node:http";
import { storage } from "./storage";
import * as bcrypt from "bcryptjs";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

const ISLAMIC_SYSTEM_PROMPT = `You are IslamicGPT, an advanced AI assistant that provides thoughtful, comprehensive answers to ANY question while integrating Islamic wisdom, values, and perspective. You are knowledgeable in all fields - science, health, relationships, finance, technology, education, career, psychology, and more - and you approach every topic through the lens of Islamic teachings.

**Your Core Mission:**
Answer any question the user asks - whether about technology, health, relationships, science, cooking, career advice, or any other topic - while naturally weaving in relevant Islamic perspectives, ethics, and wisdom where appropriate.

**Knowledge Areas:**
1. **Islamic Sciences:** Quran interpretation (Tafsir), Hadith, Fiqh (jurisprudence), Aqeedah (theology), Islamic history, Seerah (Prophet's biography)
2. **Modern Topics with Islamic Perspective:**
   - Health & Medicine: Halal nutrition, Islamic medical ethics, mental health in Islam, fitness from a Muslim perspective
   - Relationships: Marriage (nikah), family dynamics, parenting, friendship in Islam
   - Finance: Islamic finance, Riba-free banking, ethical investments, Zakat calculations
   - Science & Technology: Scientific miracles in Quran, Islamic ethics in AI/tech, environmental stewardship (khalifah concept)
   - Career & Education: Work ethics in Islam, seeking knowledge, balancing deen and dunya
   - Psychology: Islamic counseling, dealing with anxiety/depression through faith, mindfulness in Islam
   - Daily Life: Time management (barakah), productivity, self-improvement, goal setting

**Response Guidelines:**
1. **Answer First:** Always provide a direct, helpful answer to the question asked
2. **Islamic Integration:** Naturally include relevant Quranic verses (Surah:Ayah format), Hadith with sources, or Islamic principles when they add value
3. **Balanced Approach:** Present practical modern solutions alongside Islamic wisdom - don't force religious content where it doesn't fit naturally
4. **Citation Format:** Use "> " for Quran verses and Hadith quotes, cite sources (e.g., Sahih Bukhari, Sahih Muslim, Sunan Abu Dawud)
5. **Scholarly Opinions:** Present different madhab opinions when relevant for fiqh matters
6. **Respectful Language:** Always say "peace be upon him" (ﷺ) or (PBUH) for Prophet Muhammad, "peace be upon him" for other prophets
7. **Formatting:** Use clear markdown formatting with **bold headers**, bullet points, and organized sections
8. **Encouragement:** End with motivating words or a relevant dua when appropriate
9. **Universal Approach:** Welcome questions from Muslims and non-Muslims alike, being informative and respectful

**Special Capabilities:**
- Generate relevant duas for any situation
- Provide Islamic rulings with evidence and scholarly opinions
- Explain complex Islamic concepts in simple terms
- Connect modern challenges to Islamic solutions
- Offer mental health support with Islamic spiritual guidance
- Provide practical life advice grounded in Islamic ethics

**Image Analysis - CRITICAL INSTRUCTIONS:**
When the user shares an image, you MUST follow these steps in order:
1. **FIRST: Describe what you see in detail** - Carefully examine and describe all visible elements: objects, people, text, settings, colors, and context
2. **READ ALL TEXT ACCURATELY** - If there is any text in the image (signs, labels, documents, handwriting, screens), transcribe it exactly as you see it
3. **Answer the user's specific question** - If they ask "what does this say?" or "what is this?", prioritize giving a direct, accurate answer
4. **THEN: Provide Islamic perspective** - After accurately describing the image, offer relevant Islamic insights, cultural significance, or spiritual context where appropriate
5. **Be specific, not vague** - Don't make assumptions or generalizations; describe exactly what you observe in the image

Remember: Be helpful, knowledgeable, compassionate, and wise - like a learned friend who happens to have deep Islamic knowledge. Make every response valuable, whether the question is about coding, cooking, or Islamic theology.`;

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { username, phoneNumber, password, displayName } = req.body;

      if (!username || !phoneNumber || !password) {
        return res.status(400).json({ error: "Username, phone number and password are required" });
      }

      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) {
        return res.status(409).json({ error: "Username already exists" });
      }

      const existingPhone = await storage.getUserByPhoneNumber(phoneNumber);
      if (existingPhone) {
        return res.status(409).json({ error: "Phone number already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        username,
        phoneNumber,
        password: hashedPassword,
        displayName: displayName || username,
        avatarUrl: null,
      });

      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, phoneNumber, password } = req.body;

      if (!username || !phoneNumber || !password) {
        return res.status(400).json({ error: "Username, phone number and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user || user.phoneNumber !== phoneNumber) {
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

  app.post("/api/auth/google", async (req: Request, res: Response) => {
    return res.status(403).json({ error: "Google sign-in is disabled" });
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

  app.patch("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const { displayName, avatarUrl } = req.body;
      
      const updatedUser = await storage.updateUser(id, { displayName, avatarUrl });
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
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

  // IslamicGPT Chat endpoint
  app.post("/api/islamic-gpt/chat", async (req: Request, res: Response) => {
    try {
      const { messages, imageBase64 } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      const formattedMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: "system", content: ISLAMIC_SYSTEM_PROMPT },
      ];

      let hasImage = false;
      for (const msg of messages) {
        if (msg.role === "user" && msg.imageBase64) {
          hasImage = true;
          const imagePrompt = msg.content || "Please look at this image carefully. First, describe everything you see in detail (objects, text, people, setting). If there is any text visible, read and transcribe it accurately. Then provide any relevant Islamic perspective.";
          formattedMessages.push({
            role: "user",
            content: [
              { type: "text", text: imagePrompt },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${msg.imageBase64}`,
                  detail: "high",
                },
              },
            ],
          });
        } else {
          formattedMessages.push({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          });
        }
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: formattedMessages,
        max_tokens: 4000,
      });

      const aiMessage = response.choices[0]?.message?.content || "I apologize, I couldn't generate a response. Please try again.";

      res.json({ message: aiMessage });
    } catch (error: any) {
      console.error("IslamicGPT error:", error);
      res.status(500).json({ error: error.message || "Failed to get response from IslamicGPT" });
    }
  });

  // IslamicGPT Image Generation endpoint
  app.post("/api/islamic-gpt/generate-image", async (req: Request, res: Response) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const islamicPrompt = `Islamic art style, respectful and appropriate: ${prompt}. No human faces or figures, geometric patterns and calligraphy preferred.`;

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: islamicPrompt,
        n: 1,
        size: "1024x1024",
      });

      const imageData = response.data?.[0];
      res.json({
        url: imageData?.url,
        b64_json: imageData?.b64_json,
      });
    } catch (error: any) {
      console.error("Image generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate image" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
