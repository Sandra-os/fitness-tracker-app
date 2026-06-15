import { useEffect, useMemo, useState } from 'react';
import { Activity, BarChart3, Clock3, Dumbbell, Flame, RotateCcw, Sparkles } from 'lucide-react';
import DashboardCard from './components/DashboardCard';
import FilterBar from './components/FilterBar';
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

export default function App() {
  const [workouts, setWorkouts] = useLocalStorage('bloomfit.workouts', starterWorkouts);
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
    if (!exerciseOptions.length) {
      setSelectedExercise('');
      return;
    }

    if (!selectedExercise || !exerciseOptions.includes(selectedExercise)) {
      setSelectedExercise(exerciseOptions[0]);
    }
  }, [exerciseOptions, selectedExercise]);

  const addWorkout = (workout) => {
    setWorkouts((current) => [workout, ...current]);
  };

  const deleteWorkout = (workoutId) => {
    setWorkouts((current) => current.filter((workout) => workout.id !== workoutId));
  };

  const resetDemoData = () => {
    setWorkouts(starterWorkouts);
    setFilters(initialFilters);
  };

  return (
    <main className="app-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <div className="brand-pill">
            <Sparkles size={18} aria-hidden="true" />
            BloomFit Dashboard
          </div>
          <h1>Track every rep, set, lift, and glowing cardio minute.</h1>
          <p>
            A responsive React fitness tracker with local workout history, weekly summaries,
            progress charts, and an elegant dashboard made for real daily use.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#log-workout">
              Log workout
            </a>
            <a className="secondary-link" href="#history">
              View history
            </a>
          </div>
        </div>

        <div className="hero-media" aria-label="Fitness accessories in soft blue and blush tones">
          <img src={`${import.meta.env.BASE_URL}bloomfit-hero.jpg`} alt="" />
        </div>
      </section>

      <section className="stats-grid" aria-label="Fitness dashboard overview">
        <StatCard label="Workouts logged" value={workouts.length} detail="All time" icon={Activity} tone="blue" />
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

      <section className="dashboard-layout">
        <div className="left-stack">
          <DashboardCard title="Weekly summary">
            <WeeklySummary summary={weeklySummary} records={records} />
          </DashboardCard>

          <DashboardCard title="Progress charts">
            <ProgressCharts
              trendData={weeklyTrend}
              exerciseOptions={exerciseOptions}
              selectedExercise={selectedExercise}
              onSelectExercise={setSelectedExercise}
              exerciseProgress={exerciseProgress}
            />
          </DashboardCard>
        </div>

        <DashboardCard title="Log workout" className="form-card" action={<BadgeIcon />}>
          <div id="log-workout" />
          <WorkoutForm onAddWorkout={addWorkout} />
        </DashboardCard>
      </section>

      <DashboardCard
        title="Workout history"
        className="history-card"
        action={
          <button type="button" className="ghost-button compact" onClick={resetDemoData}>
            <RotateCcw size={17} aria-hidden="true" />
            Reset demo
          </button>
        }
      >
        <div id="history" />
        <FilterBar filters={filters} onChange={setFilters} />
        <div className="history-count">
          <BarChart3 size={18} aria-hidden="true" />
          Showing {filteredWorkouts.length} of {workouts.length} workouts
        </div>
        <WorkoutHistory workouts={filteredWorkouts} onDeleteWorkout={deleteWorkout} />
      </DashboardCard>
    </main>
  );
}

function BadgeIcon() {
  return (
    <div className="mini-badge" aria-hidden="true">
      <Dumbbell size={18} />
    </div>
  );
}
