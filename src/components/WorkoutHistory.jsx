import { Activity, Dumbbell, HeartPulse, Trash2 } from 'lucide-react';
import EmptyState from './EmptyState';
import { formatDate, formatNumber, getTotalReps, getTotalSets, getWorkoutVolume } from '../lib/workoutUtils';

export default function WorkoutHistory({ workouts, onDeleteWorkout }) {
  if (!workouts.length) {
    return (
      <EmptyState
        title="No workouts match"
        message="Try a different search or add a fresh workout to start your history."
      />
    );
  }

  return (
    <div className="history-list">
      {workouts.map((workout) => (
        <article className="history-item" key={workout.id}>
          <div className="history-topline">
            <div>
              <span className="pill">{workout.category}</span>
              <h3>{workout.name}</h3>
              <p>{formatDate(workout.date)}</p>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => onDeleteWorkout(workout.id)}
              aria-label={`Delete ${workout.name}`}
            >
              <Trash2 size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="history-metrics" aria-label={`${workout.name} metrics`}>
            <Metric icon={Dumbbell} label="Sets" value={getTotalSets(workout)} />
            <Metric icon={Activity} label="Reps" value={getTotalReps(workout)} />
            <Metric icon={Dumbbell} label="Volume" value={`${formatNumber(getWorkoutVolume(workout))} lb`} />
            <Metric icon={HeartPulse} label="Cardio" value={`${workout.cardioMinutes || 0} min`} />
          </div>

          {workout.exercises.length > 0 && (
            <div className="exercise-summary">
              {workout.exercises.map((exercise) => (
                <div key={exercise.id}>
                  <strong>{exercise.name}</strong>
                  <span>
                    {exercise.sets
                      .map((set) => `${set.reps} reps x ${set.weight} lb`)
                      .join(' | ')}
                  </span>
                </div>
              ))}
            </div>
          )}

          {workout.notes && <p className="history-note">{workout.notes}</p>}
        </article>
      ))}
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div>
      <Icon size={17} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
