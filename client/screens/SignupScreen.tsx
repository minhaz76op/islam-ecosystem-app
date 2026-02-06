import React, { useState } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { saveUserProfile } from "@/lib/storage";

export default function SignupScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Display name is required";
    }

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    setIsLoading(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // @ts-ignore - Adding phoneNumber to register call
      const result = await register(username.trim().toLowerCase(), "no-password", name.trim(), phoneNumber.trim());
      if (result.success) {
        await saveUserProfile({ name: name.trim() });
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        // Navigate to the main app flow
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        setErrors({ general: result.error || "Registration failed" });
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing["2xl"],
        paddingBottom: insets.bottom + Spacing["2xl"],
        paddingHorizontal: Spacing.lg,
      }}
    >
      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
          <Feather name="user-plus" size={32} color="#FFFFFF" />
        </View>
        <ThemedText style={styles.title}>Create Account</ThemedText>
        <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
          Join Day with Islam and begin your spiritual journey
        </ThemedText>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        style={[styles.formCard, { backgroundColor: theme.backgroundDefault }]}
      >
        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Full Name
          </ThemedText>
          <View style={styles.inputWrapper}>
            <Feather name="user" size={20} color={theme.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.backgroundSecondary, color: theme.text },
                errors.name ? { borderWidth: 1, borderColor: theme.error } : null,
              ]}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="words"
            />
          </View>
          {errors.name ? (
            <ThemedText style={[styles.errorText, { color: theme.error }]}>{errors.name}</ThemedText>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Username
          </ThemedText>
          <View style={styles.inputWrapper}>
            <Feather name="at-sign" size={20} color={theme.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.backgroundSecondary, color: theme.text },
                errors.username ? { borderWidth: 1, borderColor: theme.error } : null,
              ]}
              value={username}
              onChangeText={setUsername}
              placeholder="Choose a username"
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {errors.username ? (
            <ThemedText style={[styles.errorText, { color: theme.error }]}>{errors.username}</ThemedText>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Phone Number
          </ThemedText>
          <View style={styles.inputWrapper}>
            <Feather name="phone" size={20} color={theme.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.backgroundSecondary, color: theme.text },
                errors.phoneNumber ? { borderWidth: 1, borderColor: theme.error } : null,
              ]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              placeholderTextColor={theme.textSecondary}
              keyboardType="phone-pad"
            />
          </View>
          {errors.phoneNumber ? (
            <ThemedText style={[styles.errorText, { color: theme.error }]}>{errors.phoneNumber}</ThemedText>
          ) : null}
        </View>
        
        {errors.general ? (
          <ThemedText style={[styles.errorText, { color: theme.error, textAlign: "center", marginBottom: Spacing.md }]}>
            {errors.general}
          </ThemedText>
        ) : null}

        <Button onPress={handleSignup} disabled={isLoading} style={styles.signupButton}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.footer}>
        <ThemedText style={[styles.footerText, { color: theme.textSecondary }]}>
          Already have an account?{" "}
        </ThemedText>
        <Pressable onPress={navigateToLogin}>
          <ThemedText style={[styles.signInText, { color: theme.primary }]}>Sign In</ThemedText>
        </Pressable>
      </Animated.View>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
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
  inputWrapper: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: Spacing.lg,
    top: 14,
    zIndex: 1,
  },
  input: {
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.md,
    paddingLeft: Spacing["4xl"] + Spacing.sm,
    paddingRight: Spacing.lg,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  errorText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginTop: Spacing.xs,
  },
  signupButton: {
    marginTop: Spacing.lg,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  signInText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
});
