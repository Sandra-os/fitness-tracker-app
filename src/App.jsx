import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  BarChart3,
  BookOpen,
  Clock3,
  Dumbbell,
  Flame,
  PenLine,
  RotateCcw,
  Sparkles,
  UserRound,
} from 'lucide-react';
import AppNav from './components/AppNav';
import DashboardCard from './components/DashboardCard';
import ExerciseLibrary from './components/ExerciseLibrary';
import FilterBar from './components/FilterBar';
import ProfilePanel from './components/ProfilePanel';
import ProgressCharts from './components/ProgressCharts';
import StatCard from './components/StatCard';
import WeeklySummary from './components/WeeklySummary';
import WorkoutForm from './components/WorkoutForm';
import WorkoutHistory from './components/WorkoutHistory';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  buildExerciseProgress,
  buildWeeklyTrend,
  filterWorkouts,
  formatNumber,
  getExerciseOptions,
  getPersonalRecords,
  getTotalSets,
  getWeeklySummary,
  getWorkoutVolume,
  starterWorkouts,
} from './lib/workoutUtils';

const initialFilters = {
  query: '',
  category: 'All',
  range: 'All',
};

const defaultProfile = {
  name: 'Sandra',
  email: '',
  goal: 'Build strength',
};

const validViews = ['home', 'log', 'history', 'library', 'progress', 'profile'];

export default function App() {
  const [workouts, setWorkouts] = useLocalStorage('bloomfit.workouts', starterWorkouts);
  const [profile, setProfile] = useLocalStorage('bloomfit.profile', defaultProfile);
  const [activeView, setActiveView] = useState(getInitialView);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedExercise, setSelectedExercise] = useState('');

  const filteredWorkouts = useMemo(() => filterWorkouts(workouts, filters), [workouts, filters]);
  const weeklySummary = useMemo(() => getWeeklySummary(workouts), [workouts]);
  const weeklyTrend = useMemo(() => buildWeeklyTrend(workouts), [workouts]);
  const exerciseOptions = useMemo(() => getExerciseOptions(workouts), [workouts]);
  const records = useMemo(() => getPersonalRecords(workouts), [workouts]);
  const exerciseProgress = useMemo(
    () => buildExerciseProgress(workouts, selectedExercise),
    [workouts, selectedExercise],
  );

  const totals = useMemo(
    () =>
      workouts.reduce(
        (summary, workout) => {
          summary.volume += getWorkoutVolume(workout);
          summary.cardio += Number(workout.cardioMinutes) || 0;
          summary.sets += getTotalSets(workout);
          return summary;
        },
        { volume: 0, cardio: 0, sets: 0 },
      ),
    [workouts],
  );

  useEffect(() => {
    const syncViewFromHash = () => {
      const hashView = window.location.hash.replace('#', '');
      if (validViews.includes(hashView)) {
        setActiveView(hashView);
      }
    };

    window.addEventListener('hashchange', syncViewFromHash);
    return () => window.removeEventListener('hashchange', syncViewFromHash);
  }, []);

  useEffect(() => {
    if (!exerciseOptions.length) {
      setSelectedExercise('');
      return;
    }

    if (!selectedExercise || !exerciseOptions.includes(selectedExercise)) {
      setSelectedExercise(exerciseOptions[0]);
    }
  }, [exerciseOptions, selectedExercise]);

  const navigate = (view) => {
    setActiveView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addWorkout = (workout) => {
    setWorkouts((current) => [workout, ...current]);
    navigate('history');
  };

  const deleteWorkout = (workoutId) => {
    setWorkouts((current) => current.filter((workout) => workout.id !== workoutId));
  };

  const resetDemoData = () => {
    setWorkouts(starterWorkouts);
    setFilters(initialFilters);
  };

  return (
    <div className="app-shell">
      <AppNav activeView={activeView} onNavigate={navigate} />

      {activeView === 'home' && (
        <HomeView
          profile={profile}
          workouts={workouts}
          totals={totals}
          records={records}
          weeklySummary={weeklySummary}
          onNavigate={navigate}
        />
      )}

      {activeView === 'log' && (
        <AppView eyebrow="Workout logger" title="Log a workout" icon={PenLine}>
          <div className="focused-layout">
            <DashboardCard title="Workout details">
              <WorkoutForm onAddWorkout={addWorkout} />
            </DashboardCard>
            <AsidePanel
              title="Logging tip"
              text="Keep each entry specific enough that future you can understand what changed: exercise, sets, reps, weight, and cardio minutes."
            />
          </div>
        </AppView>
      )}

      {activeView === 'history' && (
        <AppView eyebrow="Workout storage" title="Workout history" icon={Activity}>
          <DashboardCard
            title="Saved workouts"
            action={
              <button type="button" className="ghost-button compact" onClick={resetDemoData}>
                <RotateCcw size={17} aria-hidden="true" />
                Reset demo
              </button>
            }
          >
            <FilterBar filters={filters} onChange={setFilters} />
            <div className="history-count">
              <BarChart3 size={18} aria-hidden="true" />
              Showing {filteredWorkouts.length} of {workouts.length} workouts
            </div>
            <WorkoutHistory workouts={filteredWorkouts} onDeleteWorkout={deleteWorkout} />
          </DashboardCard>
        </AppView>
      )}

      {activeView === 'library' && (
        <AppView eyebrow="Exercise guide" title="Find exercises before the gym" icon={BookOpen}>
          <DashboardCard title="Exercise library">
            <ExerciseLibrary />
          </DashboardCard>
        </AppView>
      )}

      {activeView === 'progress' && (
        <AppView eyebrow="Training insights" title="Progress dashboard" icon={BarChart3}>
          <div className="progress-layout">
            <DashboardCard title="This week">
              <WeeklySummary summary={weeklySummary} records={records} />
            </DashboardCard>
            <DashboardCard title="Charts">
              <ProgressCharts
                trendData={weeklyTrend}
                exerciseOptions={exerciseOptions}
                selectedExercise={selectedExercise}
                onSelectExercise={setSelectedExercise}
                exerciseProgress={exerciseProgress}
              />
            </DashboardCard>
          </div>
        </AppView>
      )}

      {activeView === 'profile' && (
        <AppView eyebrow="Account" title="Profile and app access" icon={UserRound}>
          <DashboardCard title="Local profile">
            <ProfilePanel profile={profile} onSave={setProfile} />
          </DashboardCard>
        </AppView>
      )}
    </div>
  );
}

function HomeView({ profile, workouts, totals, records, weeklySummary, onNavigate }) {
  return (
    <main className="home-view">
      <section
        className="hero-section"
        style={{ '--hero-image': `url("${import.meta.env.BASE_URL}bloomfit-hero.jpg")` }}
      >
        <div className="hero-copy">
          <div className="brand-pill">
            <Sparkles size={18} aria-hidden="true" />
            BloomFit Fitness App
          </div>
          <h1>BloomFit Fitness Tracker</h1>
          <p>
            Plan your gym session, look up exercises, log workouts, and review your progress in one
            neat fitness app.
          </p>
          <div className="hero-actions">
            <button className="primary-link" type="button" onClick={() => onNavigate('log')}>
              Log workout
            </button>
            <button className="secondary-link" type="button" onClick={() => onNavigate('library')}>
              Browse exercises
            </button>
          </div>
        </div>

      </section>

      <section className="welcome-strip">
        <div>
          <span>Welcome back</span>
          <strong>{profile.name || 'Athlete'}</strong>
        </div>
        <p>{weeklySummary.workoutCount} workout logged this week.</p>
      </section>

      <section className="stats-grid" aria-label="Fitness overview">
        <StatCard label="Workouts stored" value={workouts.length} detail="Saved in this browser" icon={Activity} tone="blue" />
        <StatCard
          label="Strength volume"
          value={`${formatNumber(totals.volume)} lb`}
          detail={`${totals.sets} total sets`}
          icon={Flame}
          tone="rose"
        />
        <StatCard
          label="Cardio minutes"
          value={formatNumber(totals.cardio)}
          detail="All tracked sessions"
          icon={Clock3}
          tone="mint"
        />
        <StatCard
          label="Best volume"
          value={records.bestVolume.volume ? `${formatNumber(records.bestVolume.volume)} lb` : '0 lb'}
          detail={records.bestVolume.workout?.name || 'Start lifting'}
          icon={Dumbbell}
          tone="lavender"
        />
      </section>

      <section className="quick-actions" aria-label="Quick actions">
        <QuickAction
          icon={PenLine}
          title="Log a workout"
          text="Add exercises, sets, reps, weights, and cardio minutes."
          onClick={() => onNavigate('log')}
        />
        <QuickAction
          icon={Activity}
          title="Review history"
          text="Search and filter the workouts already stored in your browser."
          onClick={() => onNavigate('history')}
        />
        <QuickAction
          icon={BookOpen}
          title="Use the exercise library"
          text="Look up gym movements and basic form cues before training."
          onClick={() => onNavigate('library')}
        />
      </section>
    </main>
  );
}

function AppView({ eyebrow, title, icon: Icon, children }) {
  return (
    <main className="app-view">
      <section className="page-heading">
        <div className="page-icon" aria-hidden="true">
          <Icon size={24} />
        </div>
        <div>
          <span>{eyebrow}</span>
          <h1>{title}</h1>
        </div>
      </section>
      {children}
    </main>
  );
}

function QuickAction({ icon: Icon, title, text, onClick }) {
  return (
    <button className="quick-action" type="button" onClick={onClick}>
      <Icon size={22} aria-hidden="true" />
      <strong>{title}</strong>
      <span>{text}</span>
    </button>
  );
}

function AsidePanel({ title, text }) {
  return (
    <aside className="aside-panel">
      <Sparkles size={22} aria-hidden="true" />
      <h2>{title}</h2>
      <p>{text}</p>
    </aside>
  );
}

function getInitialView() {
  const hashView = window.location.hash.replace('#', '');
  return validViews.includes(hashView) ? hashView : 'home';
}
