# Project Guidelines for Brukerflate Innkreving

This document outlines the guidelines for working with the Brukerflate Innkreving project.

## Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Routing**: Tanstack Router
- **Data Fetching**: Tanstack Query (React Query)
- **Form Handling**: Tanstack Form
- **UI Components**: Aksel Design System (@navikt/ds-react)
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm 10.12.1
- **Schema Validation**: Zod

## Project Structure

- **src/components/**: Reusable UI components
- **src/domain/**: Domain models and business logic
- **src/infrastructure/**: API clients, utilities, etc.
- **src/queries/**: React Query hooks and related code
- **src/routes/**: Application routes (using Tanstack Router)
- **src/server/**: Server-side code
- **src/style/**: CSS and styling related files
- **src/types/**: TypeScript type definitions
- **src/vite-plugins/**: Custom Vite plugins for development

## Development Guidelines

### Components

- Use functional components with TypeScript interfaces for props
- Import components from Aksel library (@navikt/ds-react) whenever possible
- Follow the naming convention of PascalCase for component files and functions

### Routing

- The project uses Tanstack Router for routing
- Routes are defined in the `src/routes/` directory
- The router is configured in `src/router.tsx`

### State Management

- Use Tanstack Query (React Query) for server state management
- Use React's built-in state management (useState, useContext) for UI state

### TypeScript

- Enable strict type checking
- Define interfaces for component props
- Use type definitions from `src/types/` directory

### Code Style

- The project uses ESLint and Prettier for code formatting
- Follow the ESLint configuration defined in `eslint.config.js`
- React 17+ style (no need to import React for JSX)

### Building and Running

- Use `pnpm dev` to run the development server
- Use `pnpm build` to create a production build

## AI Development Guidelines

- AI models should use context7 when working on this project to get the latest documentation for whatever language or framework they are working on
- When suggesting changes, ensure they align with the existing patterns and technologies used in the project
- Prioritize using Aksel components over custom implementations
- Ensure type safety with TypeScript
