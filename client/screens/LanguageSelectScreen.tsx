import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";
import {
  getLanguagePreference,
  setLanguagePreference,
  LanguagePreference,
  LANGUAGES,
} from "@/lib/settings";

export default function LanguageSelectScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [selectedLanguage, setSelectedLanguage] = useState<LanguagePreference>("en");

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const lang = await getLanguagePreference();
    setSelectedLanguage(lang);
  };

  const handleSelectLanguage = async (langCode: LanguagePreference) => {
    await Haptics.selectionAsync();
    setSelectedLanguage(langCode);
    await setLanguagePreference(langCode);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: insets.bottom + Spacing["2xl"],
        paddingHorizontal: Spacing.lg,
      }}
    >
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <ThemedText style={styles.title}>Select Language</ThemedText>
        <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
          Choose your preferred language for the app
        </ThemedText>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        style={[styles.languageList, { backgroundColor: theme.backgroundDefault }]}
      >
        {LANGUAGES.map((language, index) => {
          const isSelected = selectedLanguage === language.code;
          return (
            <Pressable
              key={language.code}
              onPress={() => handleSelectLanguage(language.code as LanguagePreference)}
              style={[
                styles.languageRow,
                index < LANGUAGES.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: theme.cardBorder,
                },
              ]}
            >
              <View style={styles.languageInfo}>
                <ThemedText style={styles.languageName}>
                  {language.name}
                </ThemedText>
                <ThemedText
                  style={[styles.languageNative, { color: theme.textSecondary }]}
                >
                  {language.nativeName}
                </ThemedText>
              </View>
              <View
                style={[
                  styles.radioOuter,
                  {
                    borderColor: isSelected ? theme.primary : theme.textSecondary,
                  },
                ]}
              >
                {isSelected ? (
                  <View
                    style={[styles.radioInner, { backgroundColor: theme.primary }]}
                  />
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <View
          style={[
            styles.noteCard,
            { backgroundColor: theme.primary + "10", borderColor: theme.primary + "30" },
          ]}
        >
          <Feather name="info" size={18} color={theme.primary} />
          <ThemedText style={[styles.noteText, { color: theme.textSecondary }]}>
            Some content like Duas and Quran verses will always display in Arabic with translations.
          </ThemedText>
        </View>
      </Animated.View>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing["2xl"],
  },
  languageList: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    marginBottom: Spacing["2xl"],
    ...Shadows.sm,
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    marginBottom: 2,
  },
  languageNative: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  noteCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
});
