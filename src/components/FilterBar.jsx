import { Search, SlidersHorizontal } from 'lucide-react';

const categories = ['All', 'Strength', 'Cardio', 'Hybrid', 'Mobility'];
const ranges = ['All', '7 days', '30 days', '90 days'];

export default function FilterBar({ filters, onChange }) {
  const updateFilter = (name, value) => {
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="filter-bar" aria-label="Workout history filters">
      <label className="search-field">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Search workouts</span>
        <input
          type="search"
          placeholder="Search workout, exercise, or note"
          value={filters.query}
          onChange={(event) => updateFilter('query', event.target.value)}
        />
      </label>

      <label className="select-field">
        <SlidersHorizontal size={18} aria-hidden="true" />
        <span className="sr-only">Filter by workout type</span>
        <select value={filters.category} onChange={(event) => updateFilter('category', event.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="select-field">
        <span className="sr-only">Filter by date range</span>
        <select value={filters.range} onChange={(event) => updateFilter('range', event.target.value)}>
          {ranges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
