import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable, Alert, Image } from "react-native";
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
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import { saveUserProfile } from "@/lib/storage";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { login, loginWithGoogle } = useAuth();

  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username.trim() || !phoneNumber.trim() || !password.trim()) {
      setError("Please enter your username, phone number and password");
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    setIsLoading(true);
    setError("");
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // @ts-ignore - Adding phoneNumber to login call
      const result = await login(username.trim().toLowerCase(), password, phoneNumber.trim());
      if (result.success) {
        await saveUserProfile({ name: username.trim() });
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        navigation.goBack();
      } else {
        setError(result.error || "Login failed");
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError("");
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const result = await loginWithGoogle();
      if (result.success) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        navigation.goBack();
      } else {
        if (result.error?.includes("not configured")) {
          Alert.alert(
            "Google Sign-In Setup Required",
            "To enable Google Sign-In, you need to configure Google OAuth credentials in your app settings. Please contact the developer for assistance.",
            [{ text: "OK" }]
          );
        } else {
          setError(result.error || "Google Sign-In failed");
        }
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing["3xl"],
        paddingBottom: insets.bottom + Spacing["2xl"],
        paddingHorizontal: Spacing.lg,
      }}
    >
      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        style={styles.header}
      >
        <View
          style={[styles.iconContainer, { backgroundColor: theme.primary }]}
        >
          <Feather name="user" size={32} color="#FFFFFF" />
        </View>
        <ThemedText style={styles.title}>Welcome Back</ThemedText>
        <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
          Sign in to continue your Islamic journey
        </ThemedText>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        style={[
          styles.formCard,
          { backgroundColor: theme.backgroundDefault },
        ]}
      >
        {error ? (
          <ThemedText style={[styles.errorText, { color: theme.error, textAlign: "center", marginBottom: Spacing.md }]}>
            {error}
          </ThemedText>
        ) : null}

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Username
          </ThemedText>
          <View style={styles.inputWrapper}>
            <Feather
              name="at-sign"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.backgroundSecondary,
                  color: theme.text,
                },
              ]}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Phone Number
          </ThemedText>
          <View style={styles.inputWrapper}>
            <Feather
              name="phone"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.backgroundSecondary,
                  color: theme.text,
                },
              ]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              placeholderTextColor={theme.textSecondary}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Password
          </ThemedText>
          <View style={styles.inputWrapper}>
            <Feather
              name="lock"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.backgroundSecondary,
                  color: theme.text,
                  paddingRight: 50,
                },
              ]}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={theme.textSecondary}
              />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.forgotPassword}>
          <ThemedText style={[styles.forgotText, { color: theme.primary }]}>
            Forgot Password?
          </ThemedText>
        </Pressable>

        <Button
          onPress={handleLogin}
          disabled={isLoading || !username.trim() || !phoneNumber.trim() || !password.trim()}
          style={styles.loginButton}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(500).duration(500)}
        style={styles.footer}
      >
        <ThemedText style={[styles.footerText, { color: theme.textSecondary }]}>
          Don't have an account?{" "}
        </ThemedText>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <ThemedText style={[styles.signUpText, { color: theme.primary }]}>
            Sign Up
          </ThemedText>
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
    marginBottom: Spacing["3xl"],
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: Spacing.xl,
  },
  forgotText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  loginButton: {
    marginTop: Spacing.sm,
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
    marginBottom: Spacing["3xl"],
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4285F4",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
  googleText: {
    fontSize: 15,
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
  signUpText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  errorText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
});
