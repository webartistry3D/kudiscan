# Overview

KudiScan is a mobile-first expense tracking application that allows users to scan receipts using OCR technology and automatically extract expense data. The application helps users track their spending across different categories, view detailed reports, and manage their financial data through an intuitive interface.

# User Preferences

Preferred communication style: Simple, everyday language.

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