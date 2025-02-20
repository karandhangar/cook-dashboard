# Chef's Hub - Subscription-based Meal Service Dashboard

A web application for subscription-based meal service providers with profile and menu management capabilities.

## Features

- User Authentication (Login/Register)
- Profile Management
- Menu Planning and Management
- Dish Management
- Customer Management
- Weekly Schedule Overview
- Business Settings

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Express.js
- Authentication: Passport.js
- State Management: TanStack Query
- UI Components: shadcn/ui
- Styling: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v20 recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/karandhangar/cook-dashboard.git
cd cook-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
SESSION_SECRET=your_session_secret_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

- `/client` - Frontend React application
- `/server` - Express.js backend
- `/shared` - Shared types and schemas

## Features in Development

- PostgreSQL database integration
- Customer subscription management
- Order processing system
- Advanced analytics dashboard
- Menu template system
