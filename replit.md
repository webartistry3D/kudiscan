# Overview

KudiScan is a mobile-first expense tracking application that leverages OCR technology to automatically extract and categorize expense data from scanned receipts. Its primary purpose is to help users efficiently track spending, generate detailed financial reports, and manage their finances through an intuitive interface. The project aims to provide a localized solution for Nigerian users, with a focus on Naira currency formatting and relevant design aesthetics.

# User Preferences

Preferred communication style: Simple, everyday language.
User feedback: Confirmed the app look and feel works well, particularly appreciates the Nigerian-focused design with Naira currency formatting.
User color preference: Prefers dark theme with KudiScan's green color scheme and various shades of green throughout the interface.
Typography preference: Selected Google Fonts + Glacial Indifference combination for modern minimalist aesthetic - Inter/Roboto for body text/UI elements, Glacial Indifference for headlines and branding.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript.
- **Styling**: Tailwind CSS with shadcn/ui.
- **Routing**: Wouter.
- **State Management**: TanStack React Query for server state management.
- **Mobile-First Design**: Responsive design with bottom navigation.
- **UI/UX Decisions**: Dark theme with KudiScan's green color scheme and various shades of green. Uses Google Fonts (Inter/Roboto for body, Glacial Indifference for headlines) for a modern minimalist aesthetic. Features a professional header, hero section with clear CTAs, visual workflow, testimonials, company logos (Nigerian brands), and dashboard previews. Implemented consistent card-based layouts and semantic color classes for dark theme consistency.

## Backend Architecture
- **Server Framework**: Express.js with TypeScript.
- **API Design**: RESTful API endpoints.
- **Storage**: In-memory storage, designed for easy migration to persistent databases.
- **File Handling**: Multer for receipt image uploads.

## Database & Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect.
- **Schema**: Expense tracking including merchant, category, amount, date, items, and receipt images.
- **Validation**: Zod schemas for runtime type validation.

## Key Features
- **Receipt Scanning**: OCR integration using Tesseract.js.
- **Category Management**: Predefined expense categories with icons and color coding.
- **Financial Reporting**: Dashboard with spending analytics and category breakdowns.
- **Currency Handling**: Nigerian Naira (₦) formatting and parsing.
- **User Management**: Admin dashboard for user and system management (role-based access).
- **Notifications**: Push notification functionality.
- **Settings**: Persistent dark mode and auto-capture preferences.

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18+, React DOM.
- **TypeScript**.
- **Vite**.

## UI/Design Dependencies
- **Radix UI**.
- **Tailwind CSS**.
- **Lucide React**.
- **shadcn/ui**.

## Backend Dependencies
- **Express.js**.
- **Drizzle ORM**.
- **@neondatabase/serverless** (for PostgreSQL).
- **Multer**.

## Data & Validation
- **Zod**.
- **date-fns**.

## Development & Build Tools
- **ESBuild**.
- **tsx**.
- **PostCSS**.

## OCR & Image Processing
- **Tesseract.js**.
- **Browser File API**.

## State Management
- **TanStack React Query**.
- **React Hook Form**.

## Database Configuration
- **Drizzle Kit**.
- **PostgreSQL**.