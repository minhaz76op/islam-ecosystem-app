import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import {
  getChatMessages,
  saveChatMessage,
  clearChatMessages,
  ChatMessage,
} from "@/lib/storage";

const SUGGESTED_QUESTIONS = [
  "How do I perform Wudu correctly?",
  "What are the pillars of Islam?",
  "Tell me about Surah Al-Fatiha",
  "What is the meaning of Tawakkul?",
];

const AI_RESPONSES: Record<string, string> = {
  wudu: `**How to Perform Wudu (Ablution)**

1. **Make the intention** (Niyyah) in your heart
2. **Say Bismillah** - "In the name of Allah"
3. **Wash your hands** three times
4. **Rinse your mouth** three times
5. **Clean your nose** by sniffing water three times
6. **Wash your face** three times
7. **Wash your arms** to the elbows, three times each
8. **Wipe your head** once with wet hands
9. **Clean your ears** with wet fingers
10. **Wash your feet** to the ankles, three times each

> *"O you who believe! When you intend to offer prayer, wash your faces and your hands up to the elbows..."* - **Surah Al-Ma'idah 5:6**`,

  pillars: `**The Five Pillars of Islam**

1. **Shahada** (Declaration of Faith)
   "There is no god but Allah, and Muhammad is the Messenger of Allah"

2. **Salah** (Prayer)
   Five daily prayers at prescribed times

3. **Zakat** (Charity)
   Annual charitable giving of 2.5% of wealth

4. **Sawm** (Fasting)
   Fasting during the month of Ramadan

5. **Hajj** (Pilgrimage)
   Pilgrimage to Makkah once in a lifetime if able

> *"Islam is built upon five pillars..."* - **Sahih al-Bukhari**`,

  fatiha: `**Surah Al-Fatiha (The Opening)**

بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
الرَّحْمَٰنِ الرَّحِيمِ
مَالِكِ يَوْمِ الدِّينِ
إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ
صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ

**Translation:** "In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of the worlds..."

This Surah is recited in every unit of prayer and is considered the greatest Surah in the Quran.`,

  tawakkul: `**Tawakkul (Trust in Allah)**

Tawakkul means putting your complete trust and reliance in Allah while taking the necessary means (Asbab).

**Key aspects:**

1. **Belief** - Knowing Allah is the best planner
2. **Action** - Taking practical steps while trusting the outcome to Allah
3. **Acceptance** - Being content with Allah's decree

> *"And whoever relies upon Allah - then He is sufficient for him."* - **Surah At-Talaq 65:3**

> *"Tie your camel first, then put your trust in Allah."* - **Hadith (Tirmidhi)**

Tawakkul is not passive; it's active trust combined with effort.`,

  default: `Thank you for your question! I'm here to help you learn more about Islam.

Please feel free to ask about:
- Prayer (Salah) and its requirements
- Quran and its teachings
- Islamic history and prophets
- Daily Islamic practices
- Zakat and charity
- Fasting and Ramadan
- Hajj and pilgrimage

I'll do my best to provide helpful and accurate information from authentic Islamic sources.`,
};

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("wudu") || lowerMessage.includes("ablution")) {
    return AI_RESPONSES.wudu;
  }
  if (lowerMessage.includes("pillar") || lowerMessage.includes("five")) {
    return AI_RESPONSES.pillars;
  }
  if (lowerMessage.includes("fatiha") || lowerMessage.includes("opening")) {
    return AI_RESPONSES.fatiha;
  }
  if (lowerMessage.includes("tawakkul") || lowerMessage.includes("trust")) {
    return AI_RESPONSES.tawakkul;
  }

  return AI_RESPONSES.default;
}

interface MessageBubbleProps {
  message: ChatMessage;
  theme: any;
}

function MessageBubble({ message, theme }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isGoldBox =
    !isUser && (message.content.includes("**") || message.content.includes(">"));

  return (
    <View
      style={[
        styles.messageBubble,
        isUser
          ? [styles.userBubble, { backgroundColor: theme.primary }]
          : [
              styles.aiBubble,
              {
                backgroundColor: isGoldBox
                  ? AppColors.gold + "10"
                  : theme.backgroundDefault,
                borderColor: isGoldBox ? AppColors.gold + "30" : theme.cardBorder,
              },
            ],
      ]}
    >
      {!isUser && isGoldBox ? (
        <View style={styles.goldBoxHeader}>
          <Feather name="book-open" size={14} color={AppColors.gold} />
          <ThemedText style={[styles.goldBoxLabel, { color: AppColors.gold }]}>
            Islamic Knowledge
          </ThemedText>
        </View>
      ) : null}
      <ThemedText
        style={[
          styles.messageText,
          { color: isUser ? "#FFFFFF" : theme.text },
        ]}
      >
        {message.content}
      </ThemedText>
    </View>
  );
}

function EmptyState({ theme, onSuggest }: { theme: any; onSuggest: (q: string) => void }) {
  return (
    <View style={styles.emptyContainer}>
      <View
        style={[styles.emptyIconBg, { backgroundColor: theme.primary + "15" }]}
      >
        <Feather name="message-circle" size={48} color={theme.primary} />
      </View>
      <ThemedText style={styles.emptyTitle}>IslamicGPT</ThemedText>
      <ThemedText style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        Ask questions about Islam, Quran, Hadith, and daily practices
      </ThemedText>
      <View style={styles.suggestions}>
        {SUGGESTED_QUESTIONS.map((question, index) => (
          <Pressable
            key={index}
            onPress={() => onSuggest(question)}
            style={[
              styles.suggestionChip,
              { backgroundColor: theme.backgroundDefault, borderColor: theme.cardBorder },
            ]}
          >
            <ThemedText style={styles.suggestionText}>{question}</ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function IslamicGPTScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const saved = await getChatMessages();
    setMessages(saved);
  };

  const handleSend = useCallback(async () => {
    if (!inputText.trim()) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Keyboard.dismiss();

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputText.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    await saveChatMessage(userMessage);
    setInputText("");
    setIsTyping(true);

    setTimeout(async () => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(userMessage.content),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      await saveChatMessage(aiResponse);
      setIsTyping(false);
    }, 1500);
  }, [inputText]);

  const handleSuggest = useCallback((question: string) => {
    setInputText(question);
  }, []);

  const handleClear = useCallback(async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    await clearChatMessages();
    setMessages([]);
  }, []);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        inverted={messages.length > 0}
        renderItem={({ item }) => <MessageBubble message={item} theme={theme} />}
        ListEmptyComponent={<EmptyState theme={theme} onSuggest={handleSuggest} />}
        contentContainerStyle={[
          styles.messageList,
          {
            paddingTop: messages.length > 0 ? Spacing.lg : 0,
            paddingBottom: headerHeight + Spacing.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          if (messages.length > 0) {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
          }
        }}
      />

      {isTyping ? (
        <Animated.View
          entering={FadeIn.duration(300)}
          style={[
            styles.typingIndicator,
            { backgroundColor: theme.backgroundDefault },
          ]}
        >
          <View style={styles.typingDots}>
            <View style={[styles.dot, { backgroundColor: theme.textSecondary }]} />
            <View style={[styles.dot, { backgroundColor: theme.textSecondary }]} />
            <View style={[styles.dot, { backgroundColor: theme.textSecondary }]} />
          </View>
          <ThemedText style={[styles.typingText, { color: theme.textSecondary }]}>
            IslamicGPT is typing...
          </ThemedText>
        </Animated.View>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.backgroundDefault,
            paddingBottom: tabBarHeight + Spacing.md,
            borderTopColor: theme.cardBorder,
          },
        ]}
      >
        <View style={styles.inputRow}>
          {messages.length > 0 ? (
            <Pressable onPress={handleClear} style={styles.clearButton}>
              <Feather name="trash-2" size={20} color={theme.textSecondary} />
            </Pressable>
          ) : null}
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
              },
            ]}
            placeholder="Ask about Islam..."
            placeholderTextColor={theme.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <Pressable
            onPress={handleSend}
            disabled={!inputText.trim()}
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim()
                  ? theme.primary
                  : theme.backgroundSecondary,
              },
            ]}
          >
            <Feather
              name="send"
              size={18}
              color={inputText.trim() ? "#FFFFFF" : theme.textSecondary}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: Spacing.lg,
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: "85%",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  userBubble: {
    alignSelf: "flex-end",
    borderBottomRightRadius: Spacing.xs,
  },
  aiBubble: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: Spacing.xs,
    borderWidth: 1,
  },
  goldBoxHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  goldBoxLabel: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  messageText: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    lineHeight: 24,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignSelf: "flex-start",
  },
  typingDots: {
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  typingText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  inputContainer: {
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderTopWidth: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: Spacing.sm,
  },
  clearButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing["4xl"],
  },
  emptyIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: Spacing["2xl"],
  },
  suggestions: {
    gap: Spacing.sm,
    width: "100%",
  },
  suggestionChip: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});
