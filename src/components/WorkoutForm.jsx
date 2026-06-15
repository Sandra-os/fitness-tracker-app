import React from 'react';
import { CalendarDays, Dumbbell, Plus, Save, Trash2 } from 'lucide-react';
import { createId } from '../lib/workoutUtils';

const today = new Date().toISOString().slice(0, 10);

function blankSet() {
  return {
    id: createId('set'),
    reps: '',
    weight: '',
  };
}

function blankExercise() {
  return {
    id: createId('exercise'),
    name: '',
    sets: [blankSet()],
  };
}

const initialForm = {
  name: '',
  category: 'Strength',
  date: today,
  cardioMinutes: '',
  notes: '',
  exercises: [blankExercise()],
};

export default function WorkoutForm({ onAddWorkout }) {
  const [form, setForm] = useFormState();

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateExercise = (exerciseId, field, value) => {
    setForm((current) => ({
      ...current,
      exercises: current.exercises.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise,
      ),
    }));
  };

  const updateSet = (exerciseId, setId, field, value) => {
    setForm((current) => ({
      ...current,
      exercises: current.exercises.map((exercise) => {
        if (exercise.id !== exerciseId) {
          return exercise;
        }

        return {
          ...exercise,
          sets: exercise.sets.map((set) => (set.id === setId ? { ...set, [field]: value } : set)),
        };
      }),
    }));
  };

  const addExercise = () => {
    setForm((current) => ({ ...current, exercises: [...current.exercises, blankExercise()] }));
  };

  const removeExercise = (exerciseId) => {
    setForm((current) => ({
      ...current,
      exercises:
        current.exercises.length === 1
          ? [blankExercise()]
          : current.exercises.filter((exercise) => exercise.id !== exerciseId),
    }));
  };

  const addSet = (exerciseId) => {
    setForm((current) => ({
      ...current,
      exercises: current.exercises.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, sets: [...exercise.sets, blankSet()] } : exercise,
      ),
    }));
  };

  const removeSet = (exerciseId, setId) => {
    setForm((current) => ({
      ...current,
      exercises: current.exercises.map((exercise) => {
        if (exercise.id !== exerciseId) {
          return exercise;
        }

        return {
          ...exercise,
          sets: exercise.sets.length === 1 ? [blankSet()] : exercise.sets.filter((set) => set.id !== setId),
        };
      }),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedExercises = form.exercises
      .map((exercise) => ({
        ...exercise,
        name: exercise.name.trim(),
        sets: exercise.sets
          .map((set) => ({
            ...set,
            reps: Number(set.reps) || 0,
            weight: Number(set.weight) || 0,
          }))
          .filter((set) => set.reps > 0 || set.weight > 0),
      }))
      .filter((exercise) => exercise.name && exercise.sets.length > 0);

    const cardioMinutes = Number(form.cardioMinutes) || 0;

    if (!form.name.trim() || (!cleanedExercises.length && cardioMinutes <= 0)) {
      return;
    }

    onAddWorkout({
      id: createId('workout'),
      name: form.name.trim(),
      category: form.category,
      date: form.date,
      cardioMinutes,
      notes: form.notes.trim(),
      exercises: cleanedExercises,
    });

    setForm({
      ...initialForm,
      date: today,
      exercises: [blankExercise()],
    });
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Workout name</span>
          <input
            required
            type="text"
            placeholder="Morning strength"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </label>

        <label>
          <span>Type</span>
          <select value={form.category} onChange={(event) => updateField('category', event.target.value)}>
            <option>Strength</option>
            <option>Cardio</option>
            <option>Hybrid</option>
            <option>Mobility</option>
          </select>
        </label>

        <label>
          <span>Date</span>
          <div className="input-with-icon">
            <CalendarDays size={18} aria-hidden="true" />
            <input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} />
          </div>
        </label>

        <label>
          <span>Cardio minutes</span>
          <input
            min="0"
            type="number"
            placeholder="20"
            value={form.cardioMinutes}
            onChange={(event) => updateField('cardioMinutes', event.target.value)}
          />
        </label>
      </div>

      <div className="exercise-builder">
        <div className="builder-heading">
          <div>
            <p>Exercise details</p>
            <span>Track sets, reps, and weight for each movement.</span>
          </div>
          <button type="button" className="ghost-button" onClick={addExercise}>
            <Plus size={18} aria-hidden="true" />
            Exercise
          </button>
        </div>

        {form.exercises.map((exercise, exerciseIndex) => (
          <div className="exercise-panel" key={exercise.id}>
            <div className="exercise-header">
              <label>
                <span>Exercise {exerciseIndex + 1}</span>
                <div className="input-with-icon">
                  <Dumbbell size={18} aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Hip thrust"
                    value={exercise.name}
                    onChange={(event) => updateExercise(exercise.id, 'name', event.target.value)}
                  />
                </div>
              </label>
              <button
                type="button"
                className="icon-button"
                onClick={() => removeExercise(exercise.id)}
                aria-label={`Remove exercise ${exerciseIndex + 1}`}
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="set-table">
              <div className="set-row set-row-heading">
                <span>Set</span>
                <span>Reps</span>
                <span>Weight</span>
                <span>Remove</span>
              </div>

              {exercise.sets.map((set, setIndex) => (
                <div className="set-row" key={set.id}>
                  <span className="set-number">{setIndex + 1}</span>
                  <label>
                    <span className="sr-only">Reps for set {setIndex + 1}</span>
                    <input
                      min="0"
                      type="number"
                      value={set.reps}
                      onChange={(event) => updateSet(exercise.id, set.id, 'reps', event.target.value)}
                    />
                  </label>
                  <label>
                    <span className="sr-only">Weight for set {setIndex + 1}</span>
                    <input
                      min="0"
                      type="number"
                      value={set.weight}
                      onChange={(event) => updateSet(exercise.id, set.id, 'weight', event.target.value)}
                    />
                  </label>
                  <button
                    type="button"
                    className="icon-button subtle"
                    onClick={() => removeSet(exercise.id, set.id)}
                    aria-label={`Remove set ${setIndex + 1}`}
                  >
                    <Trash2 size={17} aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>

            <button type="button" className="text-button" onClick={() => addSet(exercise.id)}>
              <Plus size={17} aria-hidden="true" />
              Add set
            </button>
          </div>
        ))}
      </div>

      <label>
        <span>Notes</span>
        <textarea
          rows="3"
          placeholder="How did this workout feel?"
          value={form.notes}
          onChange={(event) => updateField('notes', event.target.value)}
        />
      </label>

      <button type="submit" className="primary-button">
        <Save size={18} aria-hidden="true" />
        Save workout
      </button>
    </form>
  );
}

function useFormState() {
  return React.useState({
    ...initialForm,
    exercises: [blankExercise()],
  });
}
