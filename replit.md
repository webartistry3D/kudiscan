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
- **Expensify-Style Free-Flowing Animations**: Implemented continuous infinite scroll animations inspired by Expensify including:
  - Pure linear animations with no interruptions or pauses (Trust: 30s, Testimonials: 60s)
  - Hardware acceleration optimizations for smooth performance
  - Clean, unobstructed scrolling without fade effects or hover interactions
  - Seamless loop transitions using -50% translateX for perfect continuity
  - Accessibility support with reduced motion preferences
  - User-select prevention for cleaner interaction experience
  - Transform3d optimizations for enhanced performance

## January 2025 - Enhanced OCR Accuracy Implementation
- **Advanced Image Preprocessing**: Implemented sophisticated image enhancement techniques including:
  - Grayscale conversion with luminance-based processing for better text recognition
  - Binary thresholding and contrast enhancement to improve character clarity
  - Canvas-based preprocessing pipeline for optimal OCR input preparation
- **Multi-Pass OCR Recognition**: Enhanced accuracy through multiple recognition attempts:
  - Three-pass system with different Page Segmentation Modes (Single Block, Single Column, Auto)
  - Confidence-based result selection choosing the best performing recognition
  - Nigerian-specific character whitelisting including Naira symbol (₦) support
- **Enhanced Text Parsing Algorithms**: Comprehensive Nigerian market optimizations:
  - Extended merchant recognition database covering major Nigerian retailers, banks, and services
  - Advanced regex patterns for Nigerian business names and corporate structures
  - Multi-method amount extraction with context-aware total detection
  - Improved date parsing supporting DD/MM/YYYY format common in Nigeria
  - Smart item extraction with pattern matching for receipt line items
  - Confidence scoring and validation for reliability assessment