import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import Animated, { FadeInDown } from "react-native-reanimated";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { getUserProfile, saveUserProfile, UserProfile } from "@/lib/storage";
import { getAuthUser, updateAuthUser, AuthUser } from "@/lib/auth";
import { getApiUrl } from "@/lib/query-client";

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    age: undefined,
    nationality: "",
    gender: "",
    avatarUri: "",
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
      setProfile({ name: authUser.name, email: authUser.email });
    }
  };

  const pickImage = async () => {
    await Haptics.selectionAsync();
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfile({ ...profile, avatarUri: result.assets[0].uri });
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
      const authUser = await getAuthUser();
      if (!authUser) throw new Error("Not authenticated");

      // Use uniqueId or email as the identifier for now, 
      // since the current AuthUser interface doesn't have a database 'id'
      const identifier = authUser.uniqueId || authUser.email;
      const response = await fetch(new URL(`/api/users/${identifier}`, getApiUrl()).toString(), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: profile.name,
          avatarUrl: profile.avatarUri,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();
      await saveUserProfile(profile);
      await updateAuthUser(updatedUser);
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
        <Pressable onPress={pickImage} style={[styles.avatar, { backgroundColor: theme.primary }]}>
          {profile.avatarUri ? (
            <Image source={{ uri: profile.avatarUri }} style={styles.avatarImage} />
          ) : (
            <Feather name="user" size={40} color="#FFFFFF" />
          )}
          <View style={[styles.cameraOverlay, { backgroundColor: theme.primary }]}>
            <Feather name="camera" size={14} color="#FFFFFF" />
          </View>
        </Pressable>
        <Pressable
          onPress={pickImage}
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
            Email Address
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
              },
            ]}
            value={profile.email}
            onChangeText={(text) => setProfile({ ...profile, email: text })}
            placeholder="Enter your email"
            placeholderTextColor={theme.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
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
    overflow: "hidden",
    position: "relative",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
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
