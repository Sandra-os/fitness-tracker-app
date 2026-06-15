import { describe, expect, it } from 'vitest';
import { exerciseLibrary, filterExercises } from './exerciseLibrary';

describe('exercise library helpers', () => {
  it('filters by query text', () => {
    const results = filterExercises(exerciseLibrary, { query: 'treadmill', category: 'All', muscle: 'All' });

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Treadmill Incline Walk');
  });

  it('filters by category and muscle', () => {
    const results = filterExercises(exerciseLibrary, { query: '', category: 'Upper Body', muscle: 'Back' });

    expect(results.map((exercise) => exercise.name)).toEqual(['Lat Pulldown', 'Cable Row']);
  });
});
