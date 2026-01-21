import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { getUserProfile, saveUserProfile, UserProfile } from "@/lib/storage";
import { getAuthUser, updateAuthUser } from "@/lib/auth";

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: undefined,
    nationality: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const saved = await getUserProfile();
    const authUser = await getAuthUser();
    if (saved) {
      setProfile(saved);
    } else if (authUser) {
      setProfile({ name: authUser.name });
    }
  };

  const handleSave = async () => {
    if (!profile.name.trim()) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    setIsLoading(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      await saveUserProfile(profile);
      await updateAuthUser({ name: profile.name });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.goBack();
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoading(false);
    }
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
      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        style={styles.avatarSection}
      >
        <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
          <Feather name="user" size={40} color="#FFFFFF" />
        </View>
        <Pressable
          style={[styles.changePhotoBtn, { backgroundColor: theme.backgroundDefault }]}
        >
          <Feather name="camera" size={16} color={theme.primary} />
          <ThemedText style={[styles.changePhotoText, { color: theme.primary }]}>
            Change Photo
          </ThemedText>
        </Pressable>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        style={[styles.formCard, { backgroundColor: theme.backgroundDefault }]}
      >
        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Full Name
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
              },
            ]}
            value={profile.name}
            onChangeText={(text) => setProfile({ ...profile, name: text })}
            placeholder="Enter your name"
            placeholderTextColor={theme.textSecondary}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Age
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
              },
            ]}
            value={profile.age?.toString() || ""}
            onChangeText={(text) =>
              setProfile({
                ...profile,
                age: text ? parseInt(text, 10) : undefined,
              })
            }
            placeholder="Enter your age"
            placeholderTextColor={theme.textSecondary}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Nationality
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
              },
            ]}
            value={profile.nationality}
            onChangeText={(text) => setProfile({ ...profile, nationality: text })}
            placeholder="Enter your nationality"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Gender
          </ThemedText>
          <View style={styles.genderRow}>
            {["Male", "Female"].map((gender) => (
              <Pressable
                key={gender}
                onPress={async () => {
                  await Haptics.selectionAsync();
                  setProfile({ ...profile, gender });
                }}
                style={[
                  styles.genderButton,
                  {
                    backgroundColor:
                      profile.gender === gender
                        ? theme.primary
                        : theme.backgroundSecondary,
                  },
                ]}
              >
                <Feather
                  name={gender === "Male" ? "user" : "user"}
                  size={18}
                  color={profile.gender === gender ? "#FFFFFF" : theme.text}
                />
                <ThemedText
                  style={[
                    styles.genderText,
                    { color: profile.gender === gender ? "#FFFFFF" : theme.text },
                  ]}
                >
                  {gender}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <Button
          onPress={handleSave}
          disabled={isLoading || !profile.name.trim()}
          style={styles.saveButton}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </Animated.View>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: Spacing["3xl"],
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  changePhotoBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
  },
  changePhotoText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  formCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing["2xl"],
    ...Shadows.sm,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    marginBottom: Spacing.sm,
  },
  input: {
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  genderRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  genderButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.md,
  },
  genderText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  saveButton: {
    marginTop: Spacing.sm,
  },
});
