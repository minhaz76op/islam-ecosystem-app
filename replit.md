# Day with Islam - Replit Configuration

## Overview

Day with Islam is a premium Islamic lifestyle mobile application built with React Native (Expo) and Express.js. The app serves as a comprehensive spiritual companion for Muslims, featuring prayer time tracking, Tasbih counter, Islamic AI assistant (IslamicGPT), Sunnah habit tracking, and multilingual Dua displays. The design philosophy blends Apple's minimalist aesthetic with modern Islamic patterns, emphasizing a luxurious and reverent user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React Native with Expo SDK 54 (New Architecture enabled)
- **Navigation**: React Navigation v7 with native stack and bottom tabs
- **State Management**: TanStack React Query for server state, local AsyncStorage for persistence
- **Animations**: React Native Reanimated for fluid UI animations and Lottie for micro-interactions
- **Styling**: Custom theme system with light/dark mode support, emerald green (#064E3B) as primary brand color
- **Typography**: Poppins font family for English, system Arabic fonts for Islamic text

### Backend Architecture
- **Server**: Express.js v5 with TypeScript
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Storage**: Currently uses in-memory storage (MemStorage class) with PostgreSQL schema defined via Drizzle ORM
- **CORS**: Dynamic origin handling for Replit deployment domains and localhost development

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` - contains user table with UUID primary keys
- **Client Storage**: AsyncStorage for user preferences, prayer completion, chat history, and Tasbih counts
- **Validation**: Zod schemas generated via drizzle-zod

### Key Design Patterns
- **Path Aliasing**: `@/` maps to `./client`, `@shared/` maps to `./shared`
- **Screen Organization**: Each feature has its own stack navigator wrapped in the main tab navigator
- **Component Architecture**: Themed components (ThemedText, ThemedView) for consistent styling
- **Error Handling**: React Error Boundary with development-mode debugging

### Navigation Structure
Five main tabs: Home (Dashboard), Menu (Resources), IslamicGPT (AI Chat), Tasbih (Counter), Settings

### Menu Features (6 screens accessible from Menu tab)
- **Duas**: Comprehensive collection of 40+ authentic duas organized by 20+ categories (Morning & Evening, Sleep, Waking Up, Bathroom, Wudu, Mosque, Food & Drink, Travel, Clothing, Home, Distress & Anxiety, Forgiveness, Weather, Sickness, Parents, Marriage, Knowledge, Protection, Guidance, Debt & Provision, Death & Afterlife, Fasting, Hajj & Umrah, Character, Gratitude, Daily Life, Gatherings) with Arabic text, transliteration, English and Bengali translations, and hadith source references
- **Quran**: Complete Quran reader with all 114 surahs including surah number, name, Arabic name, verse count, revelation type (Meccan/Medinan), English translation, and Bengali translation. Al-Fatihah fully implemented with all 7 verses readable.
- **Islamic Articles**: Curated Islamic articles organized by category (Prayer, Basics, Ramadan, Charity, Worship)
- **Islamic Quiz**: AI-based quiz with multiple choice questions, explanations, score tracking
- **Mosque Locator**: GPS-based mosque finder using expo-location (requires location permission)
- **Roza Timetable**: Complete Ramadan 2025 Sehri and Iftar timetable with 30 days

### Theme & Language Context
- **ThemeContext**: Manages dark/light theme with system preference support, persisted to AsyncStorage
- **LanguageContext**: Supports English, Arabic, Bengali with translation function t()
- Theme and language preferences are persisted and applied app-wide

### Recent Changes
- Added Menu tab with 6 feature screens replacing previous Tasks tab
- Implemented ThemeProvider and LanguageProvider contexts in App.tsx
- Fixed dark mode toggle to properly switch between light/dark themes
- Fixed language selection to immediately update app language
- Added debouncing to Tasbih button to prevent duplicate clicks (100ms timeout)
- **Unified Authentication System**: LoginScreen and SignupScreen now use AuthContext backend APIs for unified login/registration with username/password
- **Audio Playback**: Added audio playback to Duas and Quran screens using expo-audio with useAudioPlayer hook
- **Settings Enhancements**: AboutScreen, PrivacyPolicyScreen, TermsOfServiceScreen, AdhanSettingsScreen added
- **Profile Display**: HomeScreen shows user avatar from storage, Settings shows username and unique ID

### Latest Session Changes (January 2026)
- **Islamic Calendar System**: Full Gregorian-Islamic date conversion using astronomical algorithms
  - Location: `client/lib/islamic-calendar.ts`
  - Features: Julian date conversion, holiday tracking, upcoming events
- **GPS-based Prayer Times**: Real prayer time calculations using Karachi method
  - Location: `client/lib/prayer-calculator.ts`
  - Supports multiple calculation methods (Karachi, ISNA, MWL, Makkah, Egypt)
- **Notification System**: expo-notifications integration for prayer reminders
  - Location: `client/lib/notifications.ts`
  - Android notification channels for prayer reminders and Fajr alarm
- **New Screens Added**:
  - SignupScreen: User registration with Google/Apple authentication
  - CalendarScreen: Dual calendar showing both Gregorian and Islamic dates with holiday markers
  - AlarmScreen: Prayer alarm settings with customizable azan sounds and reminder times
  - NotificationsScreen: Notification preferences for prayer reminders, events, and daily verses
  - DailySalahScreen: Location-based prayer times with prayer completion tracking
  - DailyTaskScreen: Daily task management with add/complete/delete functionality
  - DietHealthScreen: Diet and nutrition tracking with water intake, meal logging
  - ExerciseScreen: Exercise tracking with presets, custom workouts, and step counter
- **Enhanced EditProfileScreen**: Added avatar image picker with expo-image-picker, email field
- **Navigation Updates**:
  - HomeStackNavigator: Added Calendar, DailySalah, DailyTask, DietHealth, Exercise screens
  - SettingsStackNavigator: Added EditProfile, Login, Signup, LanguageSelect, Alarm, Notifications screens
- **HomeScreen Enhancements**: 
  - Dashboard section at top showing level progress bar with XP tracking (100 XP per level), XP badge, and 4 activity stat cards (tasks, prayers, water, exercise minutes)
  - 4 quick access cards: Daily Tasks, Health (unified diet/exercise), Daily Salah, Calendar
  - Calendar quick access button, navigation to DailySalah from prayer card
- **Unified HealthScreen**: Combined Diet & Health + Exercise into single screen with tabs (overview, diet, exercise), height/weight input, BMI calculation with categories, and personalized health suggestions
- **Gamified Level System**: Profile leveling based on activity completion with addXP function tracking total XP and level
- **Data Files**:
  - `client/data/quran-surahs.ts`: Complete Quran with all 114 surahs metadata
  - `client/data/duas.ts`: Comprehensive collection of 40+ authentic duas with categories, getDuasByCategory() and searchDuas() utilities
- **Storage Extensions**: DailyTask, Meal, DietLog, Exercise, ExerciseLog, AlarmSettings, NotificationSettings, UserLocation, CompletedPrayer, HealthProfile, UserLevel interfaces

## External Dependencies

### Third-Party Services
- **Location Services**: expo-location for GPS-based prayer time calculations
- **Haptic Feedback**: expo-haptics for tactile user interactions
- **Glass Effects**: expo-blur and expo-glass-effect for iOS liquid glass UI

### Database
- **PostgreSQL**: Connection via DATABASE_URL environment variable (Drizzle ORM configured but database may need provisioning)

### Build & Development
- **Bundler**: Metro (via Expo)
- **Server Build**: esbuild for production server compilation
- **Migrations**: Drizzle Kit for database schema management (`npm run db:push`)

### Key NPM Packages
- `@tanstack/react-query`: Data fetching and caching
- `react-native-reanimated`: High-performance animations
- `expo-linear-gradient`: Gradient backgrounds
- `lottie-react-native`: JSON-based animations
- `react-native-keyboard-controller`: Keyboard-aware scroll views