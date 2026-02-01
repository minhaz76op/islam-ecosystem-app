import { Text, type TextProps, Platform } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { Typography } from "@/constants/theme";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "h1" | "h2" | "h3" | "h4" | "body" | "small" | "link" | "arabic" | "arabicLarge" | "number";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "body",
  ...rest
}: ThemedTextProps) {
  const { theme, isDark } = useTheme();

  const getColor = () => {
    if (isDark && darkColor) {
      return darkColor;
    }

    if (!isDark && lightColor) {
      return lightColor;
    }

    if (type === "link") {
      return theme.link;
    }

    return theme.text;
  };

  const getTypeStyle = () => {
    switch (type) {
      case "h1":
        return Typography.h1;
      case "h2":
        return Typography.h2;
      case "h3":
        return Typography.h3;
      case "h4":
        return Typography.h4;
      case "body":
        return Typography.body;
      case "small":
        return Typography.small;
      case "link":
        return Typography.link;
      case "number":
        return Typography.number;
      case "arabic":
        return Typography.arabic;
      case "arabicLarge":
        return Typography.arabicLarge;
      default:
        return Typography.body;
    }
  };

  const isArabic = type === "arabic" || type === "arabicLarge";
  const isNumber = type === "number";
  const writingDirection = isArabic ? "rtl" : "ltr";

  return (
    <Text
      style={[
        { color: getColor(), writingDirection },
        getTypeStyle(),
        isNumber && { fontVariant: ["tabular-nums"] },
        style,
      ]}
      {...rest}
    />
  );
}
