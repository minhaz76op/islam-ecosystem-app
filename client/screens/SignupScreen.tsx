import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable, Platform, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as AppleAuthentication from "expo-apple-authentication";
import Animated, { FadeInDown } from "react-native-reanimated";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import { login } from "@/lib/auth";
import { saveUserProfile } from "@/lib/storage";

export default function SignupScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      await login(email.trim(), name.trim());
      await saveUserProfile({ name: name.trim(), email: email.trim() });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.goBack();
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLoading(true);

    try {
      const mockGoogleUser = {
        name: "Google User",
        email: "user@gmail.com",
      };
      await login(mockGoogleUser.email, mockGoogleUser.name);
      await saveUserProfile({ name: mockGoogleUser.name, email: mockGoogleUser.email });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.goBack();
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const userName = credential.fullName
        ? `${credential.fullName.givenName || ""} ${credential.fullName.familyName || ""}`.trim()
        : "Apple User";
      const userEmail = credential.email || "apple@user.com";

      await login(userEmail, userName);
      await saveUserProfile({ name: userName, email: userEmail });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.goBack();
    } catch (error: any) {
      if (error.code !== "ERR_REQUEST_CANCELED") {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
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
            Email Address
          </ThemedText>
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={20} color={theme.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.backgroundSecondary, color: theme.text },
                errors.email ? { borderWidth: 1, borderColor: theme.error } : null,
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={theme.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {errors.email ? (
            <ThemedText style={[styles.errorText, { color: theme.error }]}>{errors.email}</ThemedText>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Password
          </ThemedText>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={20} color={theme.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.backgroundSecondary, color: theme.text, paddingRight: 50 },
                errors.password ? { borderWidth: 1, borderColor: theme.error } : null,
              ]}
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
              <Feather name={showPassword ? "eye-off" : "eye"} size={20} color={theme.textSecondary} />
            </Pressable>
          </View>
          {errors.password ? (
            <ThemedText style={[styles.errorText, { color: theme.error }]}>{errors.password}</ThemedText>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Confirm Password
          </ThemedText>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={20} color={theme.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.backgroundSecondary, color: theme.text },
                errors.confirmPassword ? { borderWidth: 1, borderColor: theme.error } : null,
              ]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry={!showPassword}
            />
          </View>
          {errors.confirmPassword ? (
            <ThemedText style={[styles.errorText, { color: theme.error }]}>{errors.confirmPassword}</ThemedText>
          ) : null}
        </View>

        <Button onPress={handleSignup} disabled={isLoading} style={styles.signupButton}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.dividerRow}>
        <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />
        <ThemedText style={[styles.dividerText, { color: theme.textSecondary }]}>
          or sign up with
        </ThemedText>
        <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.socialRow}>
        <Pressable
          onPress={handleGoogleSignIn}
          style={[
            styles.socialButton,
            { backgroundColor: theme.backgroundDefault, borderColor: theme.cardBorder },
          ]}
        >
          <View style={styles.googleIcon}>
            <ThemedText style={styles.googleIconText}>G</ThemedText>
          </View>
          <ThemedText style={styles.socialText}>Google</ThemedText>
        </Pressable>

        {Platform.OS === "ios" ? (
          <Pressable
            onPress={handleAppleSignIn}
            style={[styles.socialButton, { backgroundColor: "#000000", borderColor: "#000000" }]}
          >
            <Feather name="smartphone" size={22} color="#FFFFFF" />
            <ThemedText style={[styles.socialText, { color: "#FFFFFF" }]}>Apple</ThemedText>
          </Pressable>
        ) : null}
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
  eyeButton: {
    position: "absolute",
    right: Spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: Spacing.sm,
  },
  errorText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginTop: Spacing.xs,
  },
  signupButton: {
    marginTop: Spacing.lg,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginHorizontal: Spacing.lg,
  },
  socialRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing["2xl"],
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4285F4",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIconText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  socialText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
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
