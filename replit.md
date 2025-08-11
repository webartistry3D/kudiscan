# Overview

KudiScan is a mobile-first expense tracking application that allows users to scan receipts using OCR technology and automatically extract expense data. The application helps users track their spending across different categories, view detailed reports, and manage their financial data through an intuitive interface.

# User Preferences

Preferred communication style: Simple, everyday language.
User feedback (Jan 2025): Confirmed the app look and feel works well, particularly appreciates the Nigerian-focused design with Naira currency formatting.
User color preference (Jan 2025): Prefers dark theme colors matching Replit's conversation environment - main background #292C33, cards/panels #383B42.

# Recent Changes

## January 2025 - Layout Containment & Boundary Fixes
- Fixed Dashboard overview section to use Card-based containment instead of full-width sections
- Applied proper boundary constraints with max-width and overflow-x-hidden across all sections
- Enhanced mobile-first responsive design with flexbox constraints and text truncation
- Standardized all panels (Dashboard, Admin, Settings, etc.) to use consistent Card-based layouts
- Ensured no horizontal scrolling on any page with proper container width management
- Made all sections contained within proper boundaries rather than stretched end-to-end
- Applied uniform padding and spacing across all contained panels for visual consistency

## January 2025 - Push Notifications & Admin Dashboard
- Fixed push notification toggle functionality with proper async handling and browser permission requests
- Created comprehensive admin dashboard with three main tabs:
  * Overview: System metrics, user stats, and recent activity monitoring
  * Users: Complete user management with search, filtering, and status controls
  * Reports: System information and report generation placeholders
- Added admin middleware and backend routes for user management operations
- Enhanced settings page to show admin panel access for admin users
- Implemented proper error handling and toast notifications for admin actions
- Configured app to load in dark mode by default with CSS @apply directive
- Replaced dollar sign icons with Banknote icons for proper Naira currency representation
- Added admin navigation explanation banner with tab descriptions
- Fixed alignment issues to prevent horizontal scrolling on admin pages
- Implemented role-based routing so admin users go directly to admin dashboard after login
- Updated bottom navigation to show admin-specific options for admin users

## January 2025 - Settings & Authentication Improvements
- Fixed authentication state management with proper query cache invalidation
- Resolved DOM nesting warnings in login/register forms
- Implemented fully functional settings page with working toggles:
  * Push Notifications toggle with browser permission requests
  * Dark Mode toggle with localStorage persistence and CSS class application
  * Auto-Capture toggle for receipt scanning preferences
- Added functionality to header notification and profile buttons
- Changed Budget Settings icon from dollar sign to Naira symbol (₦)
- Enhanced dashboard with scroll-to-top behavior after login
- Added comprehensive dark mode support across all components
- Implemented settings persistence using localStorage
- Added toast notifications for all settings interactions

## January 2025 - Profile & Theme Updates
- Created dedicated user profile page with full editing capabilities
- Fixed profile icon navigation to open profile page instead of settings
- Fixed Monthly Budget icon to display proper Naira (₦) symbol
- Resolved Category Budgets text overflow with proper responsive design
- Implemented modern professional dark theme matching international standards
- Replaced hardcoded color values with design system variables across all components
- Applied consistent theming to: header, navigation, cards, modals, and all UI elements
- Enhanced dark theme with user-preferred colors matching Replit environment (#292C33 background, #383B42 cards)
- Removed green metallic theme in favor of standard, professional dark mode
- Updated all components to use theme variables (bg-background, text-foreground, etc.)
- Ensured complete dark mode coverage without any white areas remaining
- Removed all color gradients and backdrop blur effects
- Changed Recent Transactions title to light color (text-muted-foreground)
- Made budget bar occupy full width with lighter green shade (bg-green-300)
- Applied Settings page dark mode formatting to Transactions and Reports pages

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **Mobile-First Design**: Responsive design optimized for mobile devices with bottom navigation

## Backend Architecture
- **Server Framework**: Express.js with TypeScript for type-safe server-side development
- **API Design**: RESTful API endpoints for expense management operations
- **Storage**: In-memory storage with interface-based design allowing easy migration to persistent databases
- **File Handling**: Multer for receipt image uploads and processing

## Database & Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema**: Expense tracking with fields for merchant, category, amount, date, items, and receipt images
- **Validation**: Zod schemas for runtime type validation and data integrity

## Key Features
- **Receipt Scanning**: OCR integration using Tesseract.js for automatic data extraction from receipt images
- **Category Management**: Predefined expense categories with icons and color coding
- **Financial Reporting**: Dashboard with spending analytics and category breakdowns
- **Currency Handling**: Nigerian Naira (₦) formatting and parsing utilities

## UI/UX Design Patterns
- **Component Architecture**: Modular component design with reusable UI elements
- **Toast Notifications**: User feedback system for actions and errors
- **Modal Workflows**: Multi-step processes for receipt scanning and data entry
- **Progressive Enhancement**: Camera functionality with fallback to file selection

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18+ with React DOM for modern UI development
- **TypeScript**: Full TypeScript support across frontend and backend
- **Vite**: Fast development server and build tool with HMR support

## UI/Design Dependencies
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Consistent icon library for interface elements
- **shadcn/ui**: Pre-built, customizable component library

## Backend Dependencies
- **Express.js**: Web framework for Node.js server
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL support
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **Multer**: Middleware for handling multipart/form-data (file uploads)

## Data & Validation
- **Zod**: Schema validation library for runtime type checking
- **date-fns**: Modern date utility library for date formatting and manipulation

## Development & Build Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution engine for development
- **PostCSS**: CSS processing with Tailwind CSS integration

## OCR & Image Processing
- **Tesseract.js**: Client-side OCR library for receipt text extraction
- **Browser File API**: Native file handling for image capture and processing

## State Management
- **TanStack React Query**: Server state management with caching and synchronization
- **React Hook Form**: Form state management with validation

## Database Configuration
- **Drizzle Kit**: Database migration and schema management tools
- **PostgreSQL**: Production database with UUID support for primary keys
- **Environment Variables**: Secure database connection configuration