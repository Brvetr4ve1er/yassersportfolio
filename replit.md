# Portfolio Website

## Overview

This is a full-stack React portfolio website built with Express.js backend and Vite frontend. The application showcases a professional portfolio with sections for projects, blog posts, and contact form functionality. It's designed as a single-page application with smooth scrolling navigation and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

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
- **Projects**: Portfolio projects with title, description, technologies, links
- **Blog Posts**: Articles with content, categories, and publication dates
- **Contact Submissions**: Form submissions from visitors

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
- Server-side static file serving in production
- Request/response logging with performance metrics
- Error handling middleware for API routes
- CORS and security considerations built-in