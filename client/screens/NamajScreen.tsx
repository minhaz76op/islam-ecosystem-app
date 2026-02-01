import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";

const { width } = Dimensions.get("window");

const NAMAJ_DATA = {
  jumma: {
    title: "Jumma Namaj",
    rules: "Jumma prayer is a congregational prayer held every Friday. It replaces the Dhuhr prayer.",
    steps: [
      "First Khutbah (Sermon) by Imam",
      "Short sitting interval",
      "Second Khutbah",
      "2 Rak'at Fard prayer in congregation"
    ],
    duas: [
      { title: "Dua for Friday", ar: "اللَّهُمَّ اجْعَلْ جُمُعَتَنَا مَقْبُولَةً", tr: "Allahummaj'al jumu'atana maqbulatan", meaning: "O Allah, make our Friday accepted." }
    ]
  },
  "eid-ul-fitr": {
    title: "Eid-ul-Fitr",
    rules: "Eid-ul-Fitr prayer is performed on the 1st of Shawwal after the month of Ramadan.",
    steps: [
      "Niyyah (Intention)",
      "7 Takbirs in the first Rak'at before Surah Al-Fatiha",
      "5 Takbirs in the second Rak'at after Surah Al-Fatiha",
      "Khutbah after the prayer"
    ],
    duas: [
      { title: "Eid Takbir", ar: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ", tr: "Allahu Akbar, Allahu Akbar, La ilaha illallahu Wallahu Akbar, Allahu Akbar Walillahil Hamd", meaning: "Allah is the Greatest... and to Him belongs all praise." }
    ]
  },
  "eid-ul-adha": {
    title: "Eid-ul-Adha",
    rules: "Eid-ul-Adha prayer is performed on the 10th of Dhul-Hijjah. It commemorates Ibrahim's sacrifice.",
    steps: [
      "Niyyah (Intention)",
      "7 Takbirs in the first Rak'at before Surah Al-Fatiha",
      "5 Takbirs in the second Rak'at after Surah Al-Fatiha",
      "Khutbah after the prayer"
    ],
    duas: [
      { title: "Eid Takbir", ar: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ", tr: "Allahu Akbar, Allahu Akbar, La ilaha illallahu Wallahu Akbar, Allahu Akbar Walillahil Hamd", meaning: "Allah is the Greatest... and to Him belongs all praise." }
    ]
  },
  janajah: {
    title: "Janajah Namaj",
    rules: "Funeral prayer is Fard al-Kifayah. It has no Ruku or Sujud.",
    steps: [
      "First Takbir: Recite Sana and Surah Al-Fatiha",
      "Second Takbir: Recite Durood-e-Ibrahim",
      "Third Takbir: Recite Dua for the deceased",
      "Fourth Takbir: Say Salam"
    ],
    duas: [
      { title: "Dua for Deceased (Adult)", ar: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا وَشَاهِدِنَا وَغَائِبِنَا", tr: "Allahummaghfir lihayyina wa mayyitina...", meaning: "O Allah, forgive our living and our dead..." }
    ]
  }
};

export default function NamajScreen() {
  const headerHeight = useHeaderHeight();
  const { theme, isDark } = useTheme();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<keyof typeof NAMAJ_DATA>("jumma");

  const handlePress = () => {
    Haptics.selectionAsync();
  };

  const currentData = NAMAJ_DATA[activeTab];

  return (
    <LinearGradient
      colors={isDark ? ["#0F172A", "#1E293B"] : [AppColors.background, "#F0FDFA"]}
      style={styles.container}
    >
      <View style={[styles.header, { paddingTop: headerHeight + Spacing.md }]}>
        <View style={styles.tabContainer}>
          {(Object.keys(NAMAJ_DATA) as Array<keyof typeof NAMAJ_DATA>).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => {
                handlePress();
                setActiveTab(tab);
              }}
              style={[
                styles.tab,
                activeTab === tab && { backgroundColor: AppColors.primary },
              ]}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === tab && { color: "#FFF", fontFamily: "Poppins_600SemiBold" },
                ]}
              >
                {tab === "eid-ul-fitr" ? "Fitr" : tab === "eid-ul-adha" ? "Adha" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(500)} key={activeTab}>
          <View style={[styles.contentCard, { backgroundColor: theme.backgroundDefault }]}>
            <ThemedText style={styles.sectionTitle}>{activeTab === "eid-ul-fitr" ? t("eidUlFitr") : activeTab === "eid-ul-adha" ? t("eidUlAdha") : t(activeTab as any)}</ThemedText>
            <ThemedText style={[styles.rulesText, { color: theme.textSecondary }]}>{currentData.rules}</ThemedText>
            
            <View style={styles.divider} />
            
            <ThemedText style={styles.subTitle}>{t("procedure")}</ThemedText>
            {currentData.steps.map((step, idx) => (
              <View key={idx} style={styles.stepRow}>
                <View style={[styles.stepDot, { backgroundColor: AppColors.primary }]} />
                <ThemedText style={styles.stepText}>{step}</ThemedText>
              </View>
            ))}

            <View style={styles.divider} />

            <ThemedText style={styles.subTitle}>Duas</ThemedText>
            {currentData.duas.map((dua, idx) => (
              <View key={idx} style={styles.duaCard}>
                <ThemedText style={styles.duaTitle}>{dua.title}</ThemedText>
                <ThemedText style={styles.arabicText}>{dua.ar}</ThemedText>
                <ThemedText style={styles.transText}>{dua.tr}</ThemedText>
                <ThemedText style={[styles.meaningText, { color: theme.textSecondary }]}>{dua.meaning}</ThemedText>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: BorderRadius.lg,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: BorderRadius.md,
  },
  tabText: { fontSize: 13, fontFamily: "Poppins_400Regular" },
  scrollContent: { padding: Spacing.lg, paddingBottom: 100 },
  contentCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius["2xl"],
    ...Shadows.md,
  },
  sectionTitle: { fontSize: 22, fontFamily: "Poppins_700Bold", marginBottom: Spacing.xs },
  rulesText: { fontSize: 14, fontFamily: "Poppins_400Regular", lineHeight: 22 },
  divider: { height: 1, backgroundColor: "rgba(0,0,0,0.05)", marginVertical: Spacing.xl },
  subTitle: { fontSize: 18, fontFamily: "Poppins_600SemiBold", marginBottom: Spacing.md },
  stepRow: { flexDirection: "row", alignItems: "center", marginBottom: Spacing.sm },
  stepDot: { width: 6, height: 6, borderRadius: 3, marginRight: Spacing.md },
  stepText: { fontSize: 14, fontFamily: "Poppins_400Regular", flex: 1 },
  duaCard: { marginTop: Spacing.md },
  duaTitle: { fontSize: 15, fontFamily: "Poppins_600SemiBold", color: AppColors.primary, marginBottom: Spacing.sm },
  arabicText: { fontSize: 24, textAlign: "right", lineHeight: 40, marginBottom: Spacing.sm },
  transText: { fontSize: 14, fontFamily: "Poppins_500Medium", fontStyle: "italic", marginBottom: 4 },
  meaningText: { fontSize: 13, fontFamily: "Poppins_400Regular" },
});
