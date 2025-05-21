# Next.js Dashboard with shadcn/ui

This project is a two-page UI built with Next.js and shadcn/ui components. It includes a dashboard page and a settings page with form validation using React Hook Form and Zod, as well as state management with Zustand.

## Features

- **Authentication System**:

  - Login page with form validation
  - Token-based authentication
  - Protected routes

- **Dashboard Page**:

  - Display of mock data using shadcn/ui Card components
  - Dialog component for creating new projects
  - Responsive design for all screen sizes
  - API simulation with loading states

- **Settings Page**:
  - Form with input fields (Name, Email, Password)
  - Form validation using React Hook Form + Zod
  - Dark mode toggle using shadcn/ui + Tailwind
  - Form state persistence using Zustand

## Technology Stack

- **Next.js**: App Router for routing and server components
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible UI components
- **React Hook Form + Zod**: Form handling with validation
- **Zustand**: Lightweight state management
- **TanStack Query**: Data fetching and caching

## Project Structure

The project follows a feature-based architecture:

- `/app`: Next.js App Router pages
- `/components`: Shared UI components
- `/context`: React context providers
- `/hooks`: Custom React hooks
- `/services`: API service layer
- `/store`: Manager global state
- `/types`: TypeScript type definitions

## Performance Optimizations

- Component memoization with React.memo
- Optimized re-renders with useCallback and useMemo
- Data caching with TanStack Query
- Code splitting with dynamic imports
- Suspense for improved loading states

## How to Run the Project

1. Clone the repository
2. Install dependencies:
   \`\`\`
   yarn install
   \`\`\`
3. Run the development server:
   \`\`\`
   yarn dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser
5. Login with demo credentials:
   - Email: admin@gmail.com
   - Password: 123456

## System Design Decisions

- **Feature-based Architecture**: Components are organized by feature/domain rather than by type, making the codebase more maintainable as it scales.
- **Service Layer**: API calls are abstracted into service classes, making it easy to switch between mock data and real API endpoints.
- **Zustand + Hooks Pattern**: Authentication state is managed through zustand and exposed via custom hooks.
- **Optimistic UI Updates**: Form submissions update the UI immediately while the API request is in progress.
- **Error Handling**: Comprehensive error handling at multiple levels (API, form validation, UI feedback).

## Technology Choices

- **Next.js**: Chosen for its built-in routing, server-side rendering capabilities, and excellent developer experience.
- **Tailwind CSS**: Used for rapid UI development with utility classes.
- **shadcn/ui**: Provides high-quality, accessible UI components that work well with Tailwind CSS.
- **React Hook Form + Zod**: Offers efficient form handling with strong type validation.
- **Zustand**: Selected for state management due to its simplicity and persistence capabilities compared to more complex alternatives like Redux.

## Assumptions and Shortcuts

- Mock data is used instead of actual API calls
- Form data is stored in the browser's local storage using Zustand's persist middleware
- The project focuses on UI implementation rather than backend integration
