import { describe, expect, it } from 'vitest';
import {
  buildExerciseProgress,
  filterWorkouts,
  getTotalReps,
  getWeeklySummary,
  getWorkoutVolume,
  starterWorkouts,
} from './workoutUtils';

describe('workout utility helpers', () => {
  it('calculates workout volume and reps from nested exercise sets', () => {
    const workout = starterWorkouts[0];

    expect(getWorkoutVolume(workout)).toBe(5300);
    expect(getTotalReps(workout)).toBe(60);
  });

  it('filters workouts by search query and category', () => {
    const filtered = filterWorkouts(starterWorkouts, {
      query: 'pilates',
      category: 'Mobility',
      range: 'All',
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe('Pilates Flow');
  });

  it('builds a weekly summary for the active week', () => {
    const summary = getWeeklySummary(starterWorkouts, new Date('2026-06-15T12:00:00'));

    expect(summary.workoutCount).toBe(1);
    expect(summary.activeDays).toBe(1);
    expect(summary.volume).toBe(5300);
  });

  it('builds progress data for a selected exercise', () => {
    const progress = buildExerciseProgress(starterWorkouts, 'Hip Thrust');

    expect(progress).toEqual([{ date: 'Jun 15', weight: 155 }]);
  });
});
