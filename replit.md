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
Five main tabs: Home (Dashboard), Tasks (Salah Tracker), IslamicGPT (AI Chat), Tasbih (Counter), Settings

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