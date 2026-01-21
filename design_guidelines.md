# Day with Islam - Design Guidelines

## 1. Brand Identity

**Purpose**: Premium Islamic lifestyle companion blending spiritual practice with modern technology. Serves Muslims seeking to integrate daily Islamic habits, prayer management, and religious knowledge into their digital life.

**Aesthetic Direction**: Luxurious/refined with spiritual motifs. Blend Apple's minimalist design with modern Islamic patterns. Think premium, reverent, and sophisticated - not ornate or traditional. Smooth animations and liquid transitions create a calming, meditative experience.

**Memorable Element**: Fluid Arabic calligraphy animations and contextual multilingual Duas that adapt throughout the day.

## 2. Color Palette

- **Primary**: Emerald Green (#064E3B) - Main brand color for buttons, headers
- **Accent**: Deep Sky Blue (#4A90E2) - Progress indicators, links, highlights
- **Luxury**: Gold (#D4AF37) - Premium features, achievements, Quran/Hadith citations
- **Background**: Soft Off-White (#F9FAFB) - Primary background
- **Text Primary**: #1F2937
- **Text Secondary**: #6B7280
- **Surface**: White (#FFFFFF) with subtle shadows

## 3. Typography

- **Primary Font**: 'Poppins' or 'Inter' for English text
- **Bengali Font**: 'Hind Siliguri' for Bengali transliterations
- **Arabic Font**: System Arabic font with proper calligraphic weight
- **Type Scale**:
  - Title: Bold, 24-28pt
  - Heading: SemiBold, 18-20pt
  - Body: Regular, 16pt
  - Caption: Regular, 14pt

## 4. Navigation Architecture

**Root Navigation**: Fixed Tab Bar (5 tabs)
- Home (Dashboard)
- Tasks (Salah Tracker)
- IslamicGPT (AI Assistant)
- Calendar
- Tasbih (Counter)

**Auth Flow**: Email/Google/Phone OTP → Multi-step Registration → Dashboard

## 5. Screen Specifications

### Splash Screen
- **Layout**: Full-screen liquid animation
- **Content**: Arabic calligraphy "السلام عليكم" morphing to "As-salamu alaykum"
- **Duration**: 2-3 seconds
- **Safe Area**: None (full screen takeover)

### Authentication Screen
- **Layout**: Center-aligned form, logo at top
- **Components**: Google sign-in button, Phone OTP input, Email/password fields
- **Navigation**: Stack-only (no tabs visible)
- **Safe Area**: Top: insets.top + 40px, Bottom: insets.bottom + 40px

### Registration Wizard
- **Layout**: Multi-step glassmorphic form with progress indicator
- **Fields**: Name, Age, Height, Nationality, Birthday, Gender
- **Style**: Glassmorphism effect (semi-transparent cards with backdrop blur)
- **Buttons**: Next/Previous in header, Submit below form on final step
- **Safe Area**: Top: headerHeight + 20px, Bottom: insets.bottom + 20px

### Home Screen (Dashboard)
- **Header**: Transparent, custom header
  - Left: Circular profile avatar (40x40px)
  - Center: "As-salamu alaykum, [Name]" greeting
  - Right: Notification icon
- **Main Content**: ScrollView with sections:
  1. Sunnah Habits (horizontal scroll of 3D icon cards)
  2. Next Salah Card (countdown timer with pulsing glow during Azan)
  3. Multilingual Dua Card (Arabic → Bengali Phonetic → English)
  4. Daily Salah Tracker (5 circular progress rings)
- **Safe Area**: Top: headerHeight + 24px, Bottom: tabBarHeight + 24px
- **Empty State**: Use when user hasn't completed profile setup

### IslamicGPT Screen
- **Layout**: Chat interface with message bubbles
- **Header**: Default navigation with "IslamicGPT" title
- **Components**: 
  - Message list (scrollable)
  - Input bar with microphone icon (voice), attachment icon (files)
  - "Gold Box" formatting for Quran/Hadith citations (gold border, #D4AF37 background tint)
- **Safe Area**: Top: headerHeight + 16px, Bottom: tabBarHeight + inputBarHeight + 16px

### Tasbih (Counter) Screen
- **Layout**: Full-screen minimalist counter
- **Header**: Transparent with preset selector
- **Main Content**: 
  - Large central circular button (120x120px) with haptic feedback
  - Counter display (large bold numerals)
  - Rotating mandala background pattern (slow parallax animation)
  - Weekly history graph at bottom
- **Floating Element**: Preset buttons (SubhanAllah, Alhamdulillah, Allahu Akbar)
- **Safe Area**: Top: headerHeight + 32px, Bottom: tabBarHeight + 32px

### Salah Tracker Screen
- **Layout**: Grid of 5 prayer time cards (Fajr to Isha)
- **Header**: Default with title "Salah Tracker"
- **Components**: 
  - Each card shows: prayer name, time, check-in button, status
  - GPS-based prayer times
  - Qaza (missed prayers) log section
- **Interaction**: Tap check-in triggers haptic + Lottie "Task Completed" animation
- **Safe Area**: Top: headerHeight + 16px, Bottom: tabBarHeight + 24px

### Zakat Calculator Screen
- **Layout**: Wizard-style form
- **Header**: Default with "Zakat Calculator" title
- **Components**: 
  - Input fields: Gold (grams), Silver (grams), Cash, Assets
  - Live gold rate display (API-fetched)
  - Nisab threshold indicator
  - Calculate button with result card
- **Safe Area**: Top: headerHeight + 16px, Bottom: insets.bottom + 24px

### Qibla Finder Screen
- **Layout**: Full-screen 3D compass
- **Header**: Transparent
- **Main Content**: Animated compass with smooth rotation, parallax Islamic pattern background
- **Safe Area**: Top: headerHeight + 24px, Bottom: tabBarHeight + 24px

## 6. Visual Design

- **Touchable Feedback**: Subtle scale animation (0.97x) on press
- **Floating Buttons**: Use subtle drop shadow (offset: 0,2; opacity: 0.10; radius: 2)
- **Cards**: Rounded corners (12px), soft shadow for elevation
- **Transitions**: Smooth page transitions (300ms ease-in-out)
- **Loading States**: Shimmer effects on skeleton screens
- **Icons**: Feather icons from @expo/vector-icons

## 7. Assets to Generate

1. **icon.png** - App icon with emerald green crescent and star motif
2. **splash-icon.png** - Centered logo for splash screen
3. **empty-profile.png** - Placeholder avatar illustration (circular)
4. **empty-tasks.png** - Empty state for when no Salahs are logged
5. **empty-chat.png** - Empty state for IslamicGPT (initial message suggestion)
6. **mandala-pattern.png** - Rotating background pattern for Tasbih screen
7. **qibla-compass.png** - 3D compass needle illustration
8. **sunnah-water.png** - 3D icon for water habit
9. **sunnah-miswak.png** - 3D icon for Miswak habit
10. **sunnah-smile.png** - 3D icon for smile habit
11. **sunnah-charity.png** - 3D icon for charity habit
12. **calligraphy-salaam.png** - Arabic calligraphy for splash animation

**Style Note**: All custom illustrations should use the emerald green/gold palette with subtle gradients. 3D icons should have soft shadows and premium finish. Islamic patterns should be geometric and modern, not traditional ornate.