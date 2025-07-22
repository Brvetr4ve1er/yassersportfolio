# Mohamed Yasser Hamisse Portfolio Website

## Overview

A professional portfolio website for Mohamed Yasser Hamisse, an English Language Instructor and Creative Digital Artist from Algiers, Algeria. Built as a full-stack React application with Express.js backend and Vite frontend, showcasing his multilingual communication skills, creative design work, educational experience, and cross-cultural expertise.

## User Preferences

Preferred communication style: Simple, everyday language.
Portfolio Owner: Mohamed Yasser Hamisse
Focus: Education, Digital Art, Language Instruction, Cross-cultural Communication

## System Architecture

### Full-Stack Monorepo Structure
- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (currently using in-memory storage as fallback)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build System**: Vite for frontend, esbuild for backend production builds

### Project Structure
```
├── client/           # Frontend React application
├── server/           # Backend Express server
├── shared/           # Shared types and schemas
└── migrations/       # Database migration files
```

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and API calls
- **React Hook Form** with Zod validation for form handling
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens

### Backend Architecture
- **Express.js** REST API server
- **TypeScript** for type safety across the stack
- **Drizzle ORM** for database operations with PostgreSQL
- **Zod schemas** for request validation
- **In-memory storage** as development fallback

### UI Design System
- Modern, professional design with neutral color palette
- Custom CSS variables for consistent theming
- Responsive design with mobile-first approach
- Smooth scrolling navigation between sections
- Toast notifications for user feedback

## Data Flow

### API Endpoints
- `GET /api/projects` - Fetch all projects
- `GET /api/projects/featured` - Fetch featured projects
- `GET /api/blog` - Fetch all blog posts
- `GET /api/blog/featured` - Fetch featured blog posts
- `POST /api/contact` - Submit contact form

### Database Schema
Three main entities:
- **Projects**: Portfolio projects including social media campaigns, digital art/NFT work, educational coordination
- **Blog Posts**: Articles about language learning, cultural exchange, creative journey, and educational insights
- **Contact Submissions**: Form submissions from potential clients, students, or collaborators

### State Management
- TanStack Query handles server state, caching, and API calls
- React Hook Form manages local form state
- No global client state management needed due to simple data flow

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **react-hook-form**: Form management
- **zod**: Schema validation

### UI and Styling
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundler for production builds

## Deployment Strategy

### Development
- Vite dev server with HMR for frontend development
- Express server with tsx for TypeScript execution
- Automatic database schema synchronization with `drizzle-kit push`

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Single deployable artifact with both frontend and backend

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Development vs production detection via `NODE_ENV`
- Replit-specific plugins and configurations for cloud deployment

### Key Features
- **Professional Hero Section**: Showcasing Mohamed Yasser's trilingual skills and creative background
- **About Section**: Personal story from gaming inspiration to education and digital art
- **Work Portfolio**: Featured projects including Artiland Studio campaigns, NFT trading success, and educational coordination
- **Education & Certifications**: University degree, Duolingo certification, digital art training, and achievements
- **Hobbies & Interests**: Personal interests from gaming to psychology, with cultural quote
- **Blog Section**: Articles on language transformation, creative journey, and cross-cultural communication
- **Contact Form**: Professional contact with social media links (LinkedIn, Behance)
- **Responsive Design**: Mobile-first approach with smooth scrolling navigation
- **SEO Optimization**: Dynamic meta tags and Open Graph integration

## Recent Updates (January 2025)
- **Typography System**: Implemented Poppins geometric bold font family across the entire site
- **Font Weights**: Enhanced with font-black (900) weights for headings and tracking-tight for better readability
- **Component Alignment**: Comprehensive audit and fixes for layout alignment issues across all sections
- **Hero Section**: Improved grid layout, better content centering, and responsive avatar card placement
- **About Section**: Enhanced typography hierarchy and spacing consistency
- **Work Section**: Standardized typography and improved grid spacing
- **Contact Section**: Replaced with enhanced cassette tape card design featuring animated reels and social media icons
- **Performance Optimization**: Implemented lazy loading, API timeouts, reduced motion support, and centralized social URL management
- **Social Media Integration**: Added placeholder URLs in constants.ts for easy updating of all social media links