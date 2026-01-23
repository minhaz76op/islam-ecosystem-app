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
- **Duas**: Collection of authentic duas with Arabic text, English transliteration, English and Bengali translations, source references
- **Quran**: Full Quran reader with Arabic text, English and Bengali translations (Al-Fatihah fully implemented with all 7 verses)
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
- **Enhanced EditProfileScreen**: Added avatar image picker with expo-image-picker, email field
- **Navigation Updates**:
  - HomeStackNavigator: Added Calendar and DailySalah screens
  - SettingsStackNavigator: Added EditProfile, Login, Signup, LanguageSelect, Alarm, Notifications screens
- **HomeScreen Enhancements**: Added calendar quick access button, navigation to DailySalah from prayer card
- **Storage Extensions**: AlarmSettings, NotificationSettings, UserLocation, CompletedPrayer interfaces

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