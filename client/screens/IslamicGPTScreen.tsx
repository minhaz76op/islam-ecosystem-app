import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Animated, { FadeIn } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, AppColors } from "@/constants/theme";
import {
  getChatMessages,
  saveChatMessage,
  clearChatMessages,
  ChatMessage,
} from "@/lib/storage";
import { getApiUrl } from "@/lib/query-client";

const SUGGESTED_QUESTIONS = [
  "How do I perform Wudu correctly?",
  "What are the pillars of Islam?",
  "Tell me about Surah Al-Fatiha",
  "What is the meaning of Tawakkul?",
  "Explain the importance of Friday prayer",
  "What are the benefits of reciting Ayatul Kursi?",
];

interface ExtendedChatMessage extends ChatMessage {
  imageBase64?: string;
  imageUri?: string;
}

interface MessageBubbleProps {
  message: ExtendedChatMessage;
  theme: any;
  onImagePress?: (uri: string) => void;
}

function MessageBubble({ message, theme, onImagePress }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const hasFormatting = !isUser && (message.content.includes("**") || message.content.includes(">") || message.content.includes("-"));

  const formatContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("> ")) {
        return (
          <View key={i} style={[styles.quoteBlock, { borderLeftColor: AppColors.gold }]}>
            <ThemedText style={[styles.quoteText, { color: theme.textSecondary }]}>
              {line.substring(2)}
            </ThemedText>
          </View>
        );
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <ThemedText key={i} style={[styles.boldText, { color: theme.text }]}>
            {line.replace(/\*\*/g, "")}
          </ThemedText>
        );
      }
      if (line.startsWith("- ") || line.match(/^\d+\./)) {
        return (
          <ThemedText key={i} style={[styles.listItem, { color: theme.text }]}>
            {line}
          </ThemedText>
        );
      }
      return (
        <ThemedText key={i} style={[styles.messageText, { color: isUser ? "#FFFFFF" : theme.text }]}>
          {line}
        </ThemedText>
      );
    });
  };

  return (
    <View
      style={[
        styles.messageBubble,
        isUser
          ? [styles.userBubble, { backgroundColor: theme.primary }]
          : [
              styles.aiBubble,
              {
                backgroundColor: hasFormatting ? AppColors.gold + "10" : theme.backgroundDefault,
                borderColor: hasFormatting ? AppColors.gold + "30" : theme.cardBorder,
              },
            ],
      ]}
    >
      {!isUser && hasFormatting ? (
        <View style={styles.goldBoxHeader}>
          <Feather name="book-open" size={14} color={AppColors.gold} />
          <ThemedText style={[styles.goldBoxLabel, { color: AppColors.gold }]}>
            Islamic Knowledge
          </ThemedText>
        </View>
      ) : null}
      
      {message.imageUri ? (
        <Pressable onPress={() => onImagePress?.(message.imageUri!)}>
          <Image
            source={{ uri: message.imageUri }}
            style={styles.messageImage}
            resizeMode="cover"
          />
        </Pressable>
      ) : null}
      
      {isUser ? (
        <ThemedText style={[styles.messageText, { color: "#FFFFFF" }]}>
          {message.content}
        </ThemedText>
      ) : (
        <View style={styles.formattedContent}>{formatContent(message.content)}</View>
      )}
    </View>
  );
}

function EmptyState({ theme, onSuggest }: { theme: any; onSuggest: (q: string) => void }) {
  return (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconBg, { backgroundColor: theme.primary + "15" }]}>
        <Feather name="message-circle" size={48} color={theme.primary} />
      </View>
      <ThemedText style={styles.emptyTitle}>IslamicGPT</ThemedText>
      <ThemedText style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        Your AI-powered Islamic knowledge assistant. Ask questions about Quran, Hadith, prayer, and more.
      </ThemedText>
      <View style={styles.featureBadges}>
        <View style={[styles.badge, { backgroundColor: theme.primary + "15" }]}>
          <Feather name="image" size={14} color={theme.primary} />
          <ThemedText style={[styles.badgeText, { color: theme.primary }]}>Image Analysis</ThemedText>
        </View>
        <View style={[styles.badge, { backgroundColor: theme.primary + "15" }]}>
          <Feather name="book" size={14} color={theme.primary} />
          <ThemedText style={[styles.badgeText, { color: theme.primary }]}>Quran & Hadith</ThemedText>
        </View>
      </View>
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
            <ThemedText style={[styles.suggestionText, { color: theme.text }]}>{question}</ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function AttachmentPreview({ uri, onRemove, theme }: { uri: string; onRemove: () => void; theme: any }) {
  return (
    <View style={[styles.attachmentPreview, { backgroundColor: theme.backgroundSecondary }]}>
      <Image source={{ uri }} style={styles.attachmentImage} />
      <Pressable onPress={onRemove} style={[styles.removeAttachment, { backgroundColor: theme.primary }]}>
        <Feather name="x" size={14} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

export default function IslamicGPTScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<ExtendedChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [attachedImage, setAttachedImage] = useState<{ uri: string; base64: string } | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const saved = await getChatMessages();
    setMessages(saved as ExtendedChatMessage[]);
  };

  const pickImage = async (useCamera: boolean) => {
    setShowAttachMenu(false);
    
    try {
      let result;
      
      if (useCamera) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission needed", "Camera permission is required to take photos.");
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          quality: 0.8,
          base64: true,
          allowsEditing: true,
          aspect: [4, 3],
        });
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission needed", "Gallery permission is required to select photos.");
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          quality: 0.8,
          base64: true,
          allowsEditing: true,
          aspect: [4, 3],
        });
      }

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        let base64Data = asset.base64;
        
        if (!base64Data && asset.uri) {
          base64Data = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
        }
        
        if (base64Data) {
          setAttachedImage({ uri: asset.uri, base64: base64Data });
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  const handleSend = useCallback(async () => {
    if (!inputText.trim() && !attachedImage) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Keyboard.dismiss();

    const userMessage: ExtendedChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputText.trim() || (attachedImage ? "Please analyze this image from an Islamic perspective." : ""),
      timestamp: Date.now(),
      imageUri: attachedImage?.uri,
      imageBase64: attachedImage?.base64,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    await saveChatMessage(userMessage);
    setInputText("");
    setAttachedImage(null);
    setIsTyping(true);

    try {
      const apiUrl = getApiUrl();
      const response = await fetch(new URL("/api/islamic-gpt/chat", apiUrl).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
            imageBase64: m.imageBase64,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      const aiResponse: ExtendedChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      await saveChatMessage(aiResponse);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: ExtendedChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      await saveChatMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  }, [inputText, attachedImage, messages]);

  const handleSuggest = useCallback((question: string) => {
    setInputText(question);
  }, []);

  const handleClear = useCallback(async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      "Clear Chat",
      "Are you sure you want to clear all messages?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearChatMessages();
            setMessages([]);
          },
        },
      ]
    );
  }, []);

  const handleImagePress = useCallback((uri: string) => {
    setSelectedImageUri(uri);
    setShowImageModal(true);
  }, []);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <FlatList
        ref={flatListRef}
        data={messages.length > 0 ? [...messages].reverse() : []}
        keyExtractor={(item) => item.id}
        inverted={messages.length > 0}
        renderItem={({ item }) => (
          <MessageBubble message={item} theme={theme} onImagePress={handleImagePress} />
        )}
        ListEmptyComponent={<EmptyState theme={theme} onSuggest={handleSuggest} />}
        contentContainerStyle={[
          styles.messageList,
          {
            paddingTop: messages.length > 0 ? Spacing.lg : 0,
            paddingBottom: headerHeight + Spacing.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      />

      {isTyping ? (
        <Animated.View
          entering={FadeIn.duration(300)}
          style={[styles.typingIndicator, { backgroundColor: theme.backgroundDefault }]}
        >
          <ActivityIndicator size="small" color={theme.primary} />
          <ThemedText style={[styles.typingText, { color: theme.textSecondary }]}>
            IslamicGPT is thinking...
          </ThemedText>
        </Animated.View>
      ) : null}

      {attachedImage ? (
        <View style={[styles.attachmentBar, { backgroundColor: theme.backgroundDefault }]}>
          <AttachmentPreview
            uri={attachedImage.uri}
            onRemove={() => setAttachedImage(null)}
            theme={theme}
          />
        </View>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.backgroundDefault,
            paddingBottom: insets.bottom + Spacing.md,
            borderTopColor: theme.cardBorder,
          },
        ]}
      >
        <View style={styles.inputRow}>
          <Pressable
            onPress={() => setShowAttachMenu(true)}
            style={[styles.attachButton, { backgroundColor: theme.backgroundSecondary }]}
          >
            <Feather name="plus" size={22} color={theme.primary} />
          </Pressable>
          
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
            maxLength={1000}
          />
          
          {messages.length > 0 ? (
            <Pressable onPress={handleClear} style={styles.iconButton}>
              <Feather name="trash-2" size={20} color={theme.textSecondary} />
            </Pressable>
          ) : null}
          
          <Pressable
            onPress={handleSend}
            disabled={!inputText.trim() && !attachedImage}
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim() || attachedImage
                  ? theme.primary
                  : theme.backgroundSecondary,
              },
            ]}
          >
            <Feather
              name="send"
              size={18}
              color={inputText.trim() || attachedImage ? "#FFFFFF" : theme.textSecondary}
            />
          </Pressable>
        </View>
      </View>

      <Modal
        visible={showAttachMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAttachMenu(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowAttachMenu(false)}>
          <View style={[styles.attachMenuContainer, { backgroundColor: theme.backgroundDefault }]}>
            <ThemedText style={[styles.attachMenuTitle, { color: theme.text }]}>
              Add Attachment
            </ThemedText>
            <Pressable
              style={[styles.attachMenuItem, { backgroundColor: theme.backgroundSecondary }]}
              onPress={() => pickImage(true)}
            >
              <Feather name="camera" size={24} color={theme.primary} />
              <ThemedText style={[styles.attachMenuText, { color: theme.text }]}>
                Take Photo
              </ThemedText>
            </Pressable>
            <Pressable
              style={[styles.attachMenuItem, { backgroundColor: theme.backgroundSecondary }]}
              onPress={() => pickImage(false)}
            >
              <Feather name="image" size={24} color={theme.primary} />
              <ThemedText style={[styles.attachMenuText, { color: theme.text }]}>
                Choose from Gallery
              </ThemedText>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={showImageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImageModal(false)}
      >
        <Pressable style={styles.imageModalOverlay} onPress={() => setShowImageModal(false)}>
          {selectedImageUri ? (
            <Image
              source={{ uri: selectedImageUri }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          ) : null}
          <Pressable
            style={[styles.closeImageButton, { backgroundColor: theme.primary }]}
            onPress={() => setShowImageModal(false)}
          >
            <Feather name="x" size={24} color="#FFFFFF" />
          </Pressable>
        </Pressable>
      </Modal>
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
  formattedContent: {
    gap: 4,
  },
  messageText: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    lineHeight: 24,
  },
  boldText: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 4,
  },
  listItem: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    lineHeight: 24,
    paddingLeft: 8,
  },
  quoteBlock: {
    borderLeftWidth: 3,
    paddingLeft: 12,
    marginVertical: 8,
  },
  quoteText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    fontStyle: "italic",
    lineHeight: 22,
  },
  messageImage: {
    width: "100%",
    height: 200,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignSelf: "flex-start",
  },
  typingText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  attachmentBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  attachmentPreview: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    overflow: "hidden",
  },
  attachmentImage: {
    width: "100%",
    height: "100%",
  },
  removeAttachment: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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
  attachButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
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
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  featureBadges: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing["2xl"],
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  attachMenuContainer: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  attachMenuTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  attachMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  attachMenuText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  imageModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
  },
  closeImageButton: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
