import { BookOpen, ExternalLink, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { exerciseLibrary, filterExercises, libraryCategories, libraryMuscles } from '../lib/exerciseLibrary';
import EmptyState from './EmptyState';

export default function ExerciseLibrary() {
  const [filters, setFilters] = useState({ query: '', category: 'All', muscle: 'All' });
  const filteredExercises = useMemo(() => filterExercises(exerciseLibrary, filters), [filters]);

  const updateFilter = (field, value) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="library-view">
      <div className="library-toolbar">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search exercise library</span>
          <input
            type="search"
            placeholder="Search by exercise, muscle, or equipment"
            value={filters.query}
            onChange={(event) => updateFilter('query', event.target.value)}
          />
        </label>

        <label className="select-field">
          <span className="sr-only">Filter by category</span>
          <select value={filters.category} onChange={(event) => updateFilter('category', event.target.value)}>
            {libraryCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>

        <label className="select-field">
          <span className="sr-only">Filter by muscle</span>
          <select value={filters.muscle} onChange={(event) => updateFilter('muscle', event.target.value)}>
            {libraryMuscles.map((muscle) => (
              <option key={muscle}>{muscle}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="library-meta">
        <BookOpen size={18} aria-hidden="true" />
        Showing {filteredExercises.length} exercises
      </div>

      {filteredExercises.length ? (
        <div className="exercise-library-grid">
          {filteredExercises.map((exercise) => (
            <article className="exercise-card" key={exercise.name}>
              <div>
                <span>{exercise.category}</span>
                <h3>{exercise.name}</h3>
                <p>
                  {exercise.muscle} - {exercise.equipment} - {exercise.level}
                </p>
              </div>
              <ul>
                {exercise.cues.map((cue) => (
                  <li key={cue}>{cue}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No exercises found" message="Try a broader search or clear one of the filters." />
      )}

      <div className="resource-strip">
        <p>Need a larger movement database?</p>
        <a href="https://exrx.net/Lists/Directory" target="_blank" rel="noreferrer">
          ExRx directory
          <ExternalLink size={16} aria-hidden="true" />
        </a>
        <a href="https://musclewiki.com/" target="_blank" rel="noreferrer">
          MuscleWiki
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
