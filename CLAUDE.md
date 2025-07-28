# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 website for 川の家おさか (River House Osaka), a leisure facility specializing in river fish experiences in Gifu Prefecture. The site uses App Router and is built with TypeScript, Tailwind CSS, and integrates with microCMS for content management.

## Common Commands

```bash
# Development
bun dev                 # Start development server
bun run build          # Build for production
bun run start          # Start production server
bun run lint           # Run ESLint

# Type Generation
bun run generate:cms types  # Generate TypeScript types from microCMS API schema

# Type Checking (not defined in package.json but referenced in README)
bun typecheck          # Run TypeScript type checking
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with Typography plugin
- **CMS**: microCMS for content management
- **Animations**: Framer Motion
- **Package Manager**: Bun

### Project Structure
- `src/app/`: Next.js App Router pages and components
  - `_components/`: Shared components (primarily server components)
  - `_functions/`: Utility functions
  - Individual route folders for each page
- `src/libs/`: External service integrations (microCMS client)
- `src/types/`: TypeScript type definitions
- `src/schema/`: microCMS API schemas

### Key Integration Points

#### microCMS Integration
- Client configuration in `src/libs/client.ts`
- Environment variables required:
  - `MICROCMS_API_KEY`
  - `MICROCMS_SERVICE_DOMAIN`
  - `GOOGLE_MAPS_API_KEY`
- Content types: news, blogs, categories
- Type generation from API schemas

#### Component Architecture
- Default to Server Components
- Client Components only when necessary (interactivity)
- Headless UI components implemented as Client Components

#### External Services
- Google Maps integration for access page
- Air Reserve (Airリザーブ) for reservation system
- Google Tag Manager (GTM-5T5JVT5Q)

## Development Guidelines

### Code Style
- ESLint configured with Next.js core-web-vitals
- Prettier with Tailwind CSS plugin for consistent formatting
- TypeScript strict mode enabled

### Image Handling
- Remote images from microCMS (`images.microcms-assets.io`)
- Local images in `public/` directory organized by feature

### Font Configuration
- Primary: Noto Sans
- Display: Shippori Antique B1 (CSS variable: `--font-shippori-antique-b1`)

### Environment Setup
Required environment variables in `.env`:
```env
MICROCMS_API_KEY=
MICROCMS_SERVICE_DOMAIN=
GOOGLE_MAPS_API_KEY=
```