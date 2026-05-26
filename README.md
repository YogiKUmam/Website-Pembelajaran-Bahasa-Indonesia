# Nusantara Language Academy

Nusantara Language Academy is an interactive Indonesian language learning website designed for foreign embassy staff and their families. The platform helps users learn Indonesian through practical, real-life scenarios such as airport arrival, embassy office communication, diplomatic events, daily life, Indonesian etiquette, and emergency situations.

This project was built as an MVP to demonstrate a contextual, scenario-based learning experience with interactive practice, quiz evaluation, progress tracking, certificates, and a simple admin monitoring dashboard.

## Features

- Multi-page learning website with Home, Courses, Learn, Quiz, Certificate, and Admin Dashboard pages.
- Scenario-based Indonesian learning modules for embassy and daily-life contexts.
- Interactive Learn page with phrases, vocabulary practice, listening support, speaking simulation, and writing exercises.
- 15-question quiz with mixed question types:
  - Multiple choice
  - Audio/listening
  - Fill in the blank
- Quiz result review with score summary, incorrect answer review, and topic recommendations.
- Local progress tracking using `localStorage`.
- Certificate page based on learning progress and quiz results.
- Admin dashboard prototype for monitoring learner progress.
- Responsive UI for desktop and mobile screens.

## Learning Modules

- At the Airport
- Embassy Office
- Diplomatic Events
- Daily Life
- Indonesian Culture and Etiquette
- Emergency & Public Services

## Tech Stack

- React
- Vite
- JavaScript
- Custom CSS
- lucide-react
- localStorage
- Web Speech API
- Playwright

## Getting Started

### Prerequisites

Make sure Node.js and npm are installed on your machine.

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will run locally at:

```text
http://127.0.0.1:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```text
src/
  main.jsx      Main React application, routes, data, and components
  styles.css    Global styling and responsive layout
index.html      Vite HTML entry point
package.json    Project scripts and dependencies
```

## MVP Scope

This project currently works as a frontend MVP/prototype. User progress, quiz answers, login state, and certificate data are stored locally in the browser with `localStorage`. A future production version could add a backend database, real authentication, role-based access control, native speaker audio, and a more complete admin analytics system.

## Purpose

The goal of this project is to provide a practical Indonesian learning experience for embassy communities by combining language, culture, etiquette, and real communication scenarios into one accessible web platform.
