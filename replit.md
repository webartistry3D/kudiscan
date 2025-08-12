# Overview

KudiScan is a mobile-first expense tracking application that leverages OCR technology to automatically extract and categorize expense data from scanned receipts. Its primary purpose is to help users efficiently track spending, generate detailed financial reports, and manage their finances through an intuitive interface. The project aims to provide a localized solution for Nigerian users, with a focus on Naira currency formatting and relevant design aesthetics.

# User Preferences

Preferred communication style: Simple, everyday language.
User feedback: Confirmed the app look and feel works well, particularly appreciates the Nigerian-focused design with Naira currency formatting.
User color preference: Prefers dark theme with KudiScan's green color scheme and various shades of green throughout the interface.
Typography preference: Official KudiScan font style using Montserrat for all text elements (body, UI, headlines, branding) for consistent brand identity.

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

# Recent Changes Log

## January 2025 - Page Navigation & Loading Performance Optimization
- **SELECTIVE LOADING STRATEGY**: Maintained loading screens for main app pages (Dashboard, Admin, Transactions, Reports) while making Settings submenu items load instantly like UI components
- **Fixed Settings Navigation Issue**: Replaced window.location.href with wouter Link components for Budget Settings, Expense Categories, Privacy Settings, Help Center, and Contact Support to eliminate loading delays and logo screens
- **KudiScan Brand Color Consistency**: Updated primary color to exact #29A378 (hsl(150 48% 46%)) across all CSS variables for consistent KudiScan green branding, applied green color to all Settings icons and text
- **Enhanced About KudiScan Format**: Updated About popup with proper formatting - "About KudiScan v1.0.0" title, SME focus in mission, business loan positioning in goals
- **UI/UX Improvements**: Reduced button widths across all pages to fit content, improved Settings sections spacing with increased icon sizes (6x6), changed Budget Settings icon to Naira symbol (₦)
- **Dashboard Budget Bar Fix**: Limited dark green budget bar width to match amount text width for better visual proportion
- **Settings Panel Enhancement**: Improved spacing (space-y-6 p-6), increased icon sizes to match App Settings, applied KudiScan green to all text and icons for consistency
- **Fixed Budget Remaining Calculation**: Budget Remaining now correctly shows remaining amount from total monthly budget instead of individual category budgets
- **Enhanced Budget Settings**: Shows real-time budget remaining calculations based on monthly budget totals
- **Comprehensive Expense Categories Page**: Created full-featured category management with add/edit/delete, icon selection, and color customization
- **Improved Navigation Consistency**: Fixed navbar structure across Dashboard and Admin pages with proper fixed headers
- **Privacy Settings Optimization**: Removed "Delete all data" section, prevented horizontal scrolling, and streamlined data management
- **Instant Scroll Behavior**: Changed all page scroll behavior from 'smooth' to 'instant' for book-like page flipping experience
- **Two-Tier Loading Strategy**: Main pages keep loading screens for proper UX, Settings items behave like integrated UI dashboard elements
- **Settings Menu Distinction**: Settings submenu items now use instant wouter Link navigation instead of full page reloads

## January 2025 - Authentication Pages & Features Updates
- Set address bar color to #22262A using meta theme-color tag for consistent branding
- Removed welcome text from login and register pages for cleaner presentation
- Updated KudiScan branding with #29A378 for "Kudi" and #E8F0FE for "Scan" on auth pages
- Replaced Features "Expense Management" with "OCR + AI Recognition" using brain emoji, emphasizing advanced OCR+AI technology
- Updated Premium pricing from ₦2,500 to ₦3,000 per month across pricing section
- Doubled icon sizes in "How KudiScan works" section from w-8 h-8 to w-16 h-16, containers from w-16 h-16 to w-32 h-32
- Simplified step descriptions: "Upload your receipt with the Scan button" and reordered flow to Track & Analyze before Generate Reports
- Replaced Receipt icon with Naira symbol (₦) for Generate Reports step, emphasizing Nigerian market focus
- Removed Trustpilot section and rating display for cleaner presentation
- Updated hero text from "KudiScan is your automated finance assistant" to "Your automated finance assistant"
- Added Integration section with #22262A background and #292E33 cards for Email, Bank, and Export integrations
- Added FAQ section with #0C3124 background, #2D3339 cards, and #29A378 question text covering pricing, bank compatibility, and security
- Added Testimonials section with sliding animation featuring Chidinma (Lagos entrepreneur) and Tunde (freelancer) testimonials
- Implemented flowing pulsation sequence for process cards: Snap (0s) → Track (1.2s) → Report (2.4s) → Scale (4.8s) with smooth sine wave-like animation
- Enhanced card and icon animations with scaling and border color changes, removed glow effects for cleaner look