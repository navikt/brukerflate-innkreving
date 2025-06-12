# Project Guidelines for Brukerflate Innkreving

## Project Overview
Brukerflate Innkreving is a web application developed by NAV (Norwegian Labour and Welfare Administration) for debt collection management. The application allows users to search for debtors (skyldnere) by national ID number (fødselsnummer) or organization number (orgnummer) and view details about their claims/debts (krav).

## Project Structure
- `/app` - Main application code
  - `/components` - Reusable UI components
  - `/routes` - Route definitions using TanStack Router
  - `/server` - Server-side code and API endpoints
  - `/types` - TypeScript type definitions
  - `/queries` - API query definitions
- `/test` - Test files

## Technology Stack
- React 19 with TypeScript
- TanStack libraries (Router, React Query, React Form)
- TanStack Start as the meta-framework (with Vinxi as a dependency)
- NAV's design system (@navikt/ds-react, @navikt/ds-css)
- Zod for schema validation

## Development Guidelines
- Run `npm run dev` to start the development server
- Run `npm run build` to build the project for production
- Run `npm run start` to start the production server

## Code Style Guidelines
- Follow TypeScript best practices
- Use NAV's design system components for UI elements
- Use Zod for data validation
- Follow the established project structure for new features

## Testing
When implementing changes, ensure that the application's core functionality remains intact:
- Debtor search functionality
- Claim details display
- Navigation between different views
