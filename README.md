# BloomFit Fitness Tracker

BloomFit is a polished React fitness tracking dashboard for logging workouts, tracking exercises, reviewing weekly performance, and visualizing progress over time. It is designed as a portfolio-ready frontend project with a soft, modern visual style that feels friendly, calm, and professional across desktop, tablet, and mobile screens.

## Live Demo

[Open the app on GitHub Pages](https://sandra-os.github.io/fitness-tracker-app/)

> The GitHub Pages deployment may take a minute to appear after a new push.

## Features

- Log workouts with name, type, date, cardio minutes, and notes
- Add multiple exercises per workout
- Track sets, reps, and weight used for each exercise
- Save workout history in `localStorage`
- Search workout history by workout, exercise, category, or note
- Filter history by workout type and date range
- View weekly workout, cardio, active day, and strength-volume summaries
- Review all-time dashboard stats and personal best highlights
- Track progress with weekly volume, cardio, and exercise charts
- Reset to curated demo data for quick portfolio review
- Fully responsive layout for phones, tablets, laptops, and large displays
- Reusable React components and utility functions

## Tech Stack

- React
- Vite
- JavaScript
- CSS3
- Recharts
- Lucide React
- Vitest
- Testing Library
- GitHub Pages

## Screenshots

![BloomFit dashboard screenshot](docs/screenshots/dashboard.jpg)

![BloomFit mobile screenshot](docs/screenshots/mobile.jpg)

## Folder Structure

```text
fitness-tracker-app/
  public/
    bloomfit-hero.jpg
  docs/
    screenshots/
      dashboard.jpg
      mobile.jpg
  src/
    components/
      DashboardCard.jsx
      EmptyState.jsx
      FilterBar.jsx
      ProgressCharts.jsx
      StatCard.jsx
      WeeklySummary.jsx
      WorkoutForm.jsx
      WorkoutHistory.jsx
    hooks/
      useLocalStorage.js
    lib/
      workoutUtils.js
      workoutUtils.test.js
    App.jsx
    App.css
    main.jsx
    setupTests.js
  .github/
    workflows/
      deploy.yml
  README.md
  package.json
  vite.config.js
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Sandra-os/fitness-tracker-app.git
cd fitness-tracker-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This project includes a GitHub Actions workflow that builds the Vite app and deploys it to GitHub Pages whenever changes are pushed to the `main` branch.

If the live link is not active yet, open the repository settings in GitHub, go to **Pages**, and make sure the source is set to **GitHub Actions**.

## Future Improvements

- Add editable workout entries
- Add custom exercise categories and saved templates
- Add body measurements and goal tracking
- Add CSV export for workout history
- Add dark mode
- Add cloud sync with authentication
