# Overview

KudiScan is a mobile-first expense tracking application designed for the Nigerian market, leveraging OCR technology to automate expense data extraction from receipts. Its core purpose is to provide users with efficient spending tracking, detailed financial reports, and intuitive financial management, all while supporting Naira currency and reflecting Nigerian design aesthetics. The project aims to be a leading localized solution for personal and small business finance management.

# User Preferences

Preferred communication style: Simple, everyday language.
User feedback: Confirmed the app look and feel works well, particularly appreciates the Nigerian-focused design with Naira currency formatting.
User color preference: Prefers dark theme with KudiScan's green color scheme and various shades of green throughout the interface.
Typography preference: Official KudiScan font style using Montserrat for all text elements (body, UI, headlines, branding) for consistent brand identity.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript.
- **Styling**: Tailwind CSS with shadcn/ui and Radix UI.
- **Routing**: Wouter.
- **State Management**: TanStack React Query for server state.
- **Design Principles**: Mobile-first, responsive, dark theme with KudiScan green palette, consistent card-based layouts, and a professional, minimalist aesthetic using Google Fonts (Inter/Roboto, Glacial Indifference). Features include a bottom navigation bar, clear CTAs, visual workflows, and dashboard previews.

## Backend Architecture
- **Server Framework**: Express.js with TypeScript.
- **API Design**: RESTful APIs.
- **Storage**: In-memory, designed for future migration to persistent databases.
- **File Handling**: Multer for receipt image uploads.

## Database & Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect.
- **Schema**: Supports expense tracking (merchant, category, amount, date, items, receipt images), user management (including subscription details), and payment processing information.
- **Validation**: Zod schemas for runtime type validation.

## Key Features
- **Automated Expense Tracking**: OCR integration (Tesseract.js) for receipt scanning.
- **Category Management**: Predefined and customizable expense categories with icons and color coding.
- **Financial Reporting**: Dashboard with spending analytics, category breakdowns, and user activity.
- **Currency Handling**: Native Nigerian Naira (₦) formatting and parsing.
- **User & Subscription Management**: Admin dashboard for user and system administration (role-based access), comprehensive subscription system with freemium/premium tiers, scan limits, and billing management.
- **Notifications**: Push notification capabilities, including subscription expiry alerts.
- **Customization**: Persistent dark mode and auto-capture preferences.
- **Payment Processing**: Integrated payment gateway for subscription management.

# External Dependencies

## Core Technologies
- React
- TypeScript
- Vite
- Express.js

## UI/Styling Libraries
- Radix UI
- Tailwind CSS
- Lucide React
- shadcn/ui

## Backend & Database
- Drizzle ORM
- @neondatabase/serverless (for PostgreSQL)
- Multer

## Data Management & Utilities
- Zod
- date-fns
- TanStack React Query
- React Hook Form

## OCR & Image Processing
- Tesseract.js

## Payment Gateway
- Paystack

# Recent Changes & Updates

## January 2025 - Landing Page Animation Improvements
- **Smooth Infinite Scroll Animation Refinement**: Implemented advanced performance optimizations for testimonials and trust sections including:
  - Hardware acceleration with will-change: transform and backface-visibility optimizations
  - Mask fade effects for smoother visual edges using CSS linear gradients
  - Hover-to-pause functionality for better user experience
  - Extended animation durations (Trust: 25s, Testimonials: 50s) for seamless loop visibility
  - Enhanced cubic-bezier easing functions for ultra-smooth motion
  - Accessibility support with reduced motion preferences and fallback scroll behavior
  - User-select prevention to improve interaction experience
  - Transform3d optimizations for individual scroll items