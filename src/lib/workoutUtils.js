const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const starterWorkouts = [
  {
    id: 'starter-1',
    name: 'Glute Strength',
    category: 'Strength',
    date: '2026-06-15',
    cardioMinutes: 10,
    notes: 'Felt strong on hip thrusts.',
    exercises: [
      {
        id: 'starter-1-ex-1',
        name: 'Hip Thrust',
        sets: [
          { id: 'starter-1-ex-1-set-1', reps: 10, weight: 135 },
          { id: 'starter-1-ex-1-set-2', reps: 8, weight: 155 },
          { id: 'starter-1-ex-1-set-3', reps: 8, weight: 155 },
        ],
      },
      {
        id: 'starter-1-ex-2',
        name: 'Dumbbell Romanian Deadlift',
        sets: [
          { id: 'starter-1-ex-2-set-1', reps: 12, weight: 40 },
          { id: 'starter-1-ex-2-set-2', reps: 12, weight: 45 },
          { id: 'starter-1-ex-2-set-3', reps: 10, weight: 45 },
        ],
      },
    ],
  },
  {
    id: 'starter-2',
    name: 'Pilates Flow',
    category: 'Mobility',
    date: '2026-06-11',
    cardioMinutes: 18,
    notes: 'Core and mobility reset.',
    exercises: [
      {
        id: 'starter-2-ex-1',
        name: 'Bodyweight Squat',
        sets: [
          { id: 'starter-2-ex-1-set-1', reps: 15, weight: 0 },
          { id: 'starter-2-ex-1-set-2', reps: 15, weight: 0 },
        ],
      },
    ],
  },
  {
    id: 'starter-3',
    name: 'Upper Body Glow',
    category: 'Strength',
    date: '2026-06-09',
    cardioMinutes: 8,
    notes: 'Kept the pace steady.',
    exercises: [
      {
        id: 'starter-3-ex-1',
        name: 'Dumbbell Shoulder Press',
        sets: [
          { id: 'starter-3-ex-1-set-1', reps: 10, weight: 25 },
          { id: 'starter-3-ex-1-set-2', reps: 10, weight: 25 },
          { id: 'starter-3-ex-1-set-3', reps: 8, weight: 30 },
        ],
      },
      {
        id: 'starter-3-ex-2',
        name: 'Lat Pulldown',
        sets: [
          { id: 'starter-3-ex-2-set-1', reps: 12, weight: 70 },
          { id: 'starter-3-ex-2-set-2', reps: 10, weight: 80 },
          { id: 'starter-3-ex-2-set-3', reps: 10, weight: 80 },
        ],
      },
    ],
  },
  {
    id: 'starter-4',
    name: 'Sunday Walk',
    category: 'Cardio',
    date: '2026-06-07',
    cardioMinutes: 35,
    notes: 'Low impact recovery.',
    exercises: [],
  },
];

export function createId(prefix = 'item') {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getWorkoutVolume(workout) {
  return workout.exercises.reduce((exerciseTotal, exercise) => {
    return (
      exerciseTotal +
      exercise.sets.reduce((setTotal, set) => {
        const reps = Number(set.reps) || 0;
        const weight = Number(set.weight) || 0;
        return setTotal + reps * weight;
      }, 0)
    );
  }, 0);
}

export function getTotalSets(workout) {
  return workout.exercises.reduce((total, exercise) => total + exercise.sets.length, 0);
}

export function getTotalReps(workout) {
  return workout.exercises.reduce((total, exercise) => {
    return total + exercise.sets.reduce((setTotal, set) => setTotal + (Number(set.reps) || 0), 0);
  }, 0);
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(Math.round(value || 0));
}

export function formatDate(dateValue) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${dateValue}T12:00:00`));
}

export function sortWorkoutsByDate(workouts) {
  return [...workouts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function filterWorkouts(workouts, { query = '', category = 'All', range = 'All' }) {
  const normalizedQuery = query.trim().toLowerCase();
  const now = new Date();
  const rangeStart = getRangeStartDate(range, now);

  return sortWorkoutsByDate(workouts).filter((workout) => {
    const searchableText = [
      workout.name,
      workout.category,
      workout.notes,
      ...workout.exercises.map((exercise) => exercise.name),
    ]
      .join(' ')
      .toLowerCase();
    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
    const matchesCategory = category === 'All' || workout.category === category;
    const workoutDate = new Date(`${workout.date}T12:00:00`);
    const matchesRange = !rangeStart || workoutDate >= rangeStart;

    return matchesQuery && matchesCategory && matchesRange;
  });
}

export function getRangeStartDate(range, now = new Date()) {
  if (range === '7 days') {
    return new Date(now.getTime() - 7 * DAY_IN_MS);
  }

  if (range === '30 days') {
    return new Date(now.getTime() - 30 * DAY_IN_MS);
  }

  if (range === '90 days') {
    return new Date(now.getTime() - 90 * DAY_IN_MS);
  }

  return null;
}

export function getStartOfWeek(date = new Date()) {
  const weekStart = new Date(date);
  weekStart.setHours(0, 0, 0, 0);
  const day = weekStart.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  weekStart.setDate(weekStart.getDate() + mondayOffset);
  return weekStart;
}

export function getWeeklySummary(workouts, now = new Date()) {
  const weekStart = getStartOfWeek(now);
  const weekEnd = new Date(weekStart.getTime() + 7 * DAY_IN_MS);
  const workoutsThisWeek = workouts.filter((workout) => {
    const workoutDate = new Date(`${workout.date}T12:00:00`);
    return workoutDate >= weekStart && workoutDate < weekEnd;
  });

  const activeDays = new Set(workoutsThisWeek.map((workout) => workout.date));
  const totals = workoutsThisWeek.reduce(
    (summary, workout) => {
      summary.workoutCount += 1;
      summary.sets += getTotalSets(workout);
      summary.reps += getTotalReps(workout);
      summary.volume += getWorkoutVolume(workout);
      summary.cardio += Number(workout.cardioMinutes) || 0;
      return summary;
    },
    { workoutCount: 0, sets: 0, reps: 0, volume: 0, cardio: 0 },
  );

  return {
    ...totals,
    activeDays: activeDays.size,
    workouts: workoutsThisWeek,
    weekStart,
  };
}

export function getExerciseOptions(workouts) {
  const exerciseNames = new Set();
  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (exercise.name) {
        exerciseNames.add(exercise.name);
      }
    });
  });

  return [...exerciseNames].sort((a, b) => a.localeCompare(b));
}

export function buildWeeklyTrend(workouts, now = new Date()) {
  const thisWeekStart = getStartOfWeek(now);
  const weeks = Array.from({ length: 6 }, (_, index) => {
    const start = new Date(thisWeekStart.getTime() - (5 - index) * 7 * DAY_IN_MS);
    const end = new Date(start.getTime() + 7 * DAY_IN_MS);
    const weekWorkouts = workouts.filter((workout) => {
      const workoutDate = new Date(`${workout.date}T12:00:00`);
      return workoutDate >= start && workoutDate < end;
    });

    return {
      week: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(start),
      workouts: weekWorkouts.length,
      volume: weekWorkouts.reduce((total, workout) => total + getWorkoutVolume(workout), 0),
      cardio: weekWorkouts.reduce((total, workout) => total + (Number(workout.cardioMinutes) || 0), 0),
    };
  });

  return weeks;
}

export function buildExerciseProgress(workouts, exerciseName) {
  if (!exerciseName) {
    return [];
  }

  return sortWorkoutsByDate(workouts)
    .reverse()
    .flatMap((workout) => {
      const matchingExercise = workout.exercises.find(
        (exercise) => exercise.name.toLowerCase() === exerciseName.toLowerCase(),
      );

      if (!matchingExercise) {
        return [];
      }

      const heaviestSet = matchingExercise.sets.reduce(
        (maxWeight, set) => Math.max(maxWeight, Number(set.weight) || 0),
        0,
      );

      return {
        date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(
          new Date(`${workout.date}T12:00:00`),
        ),
        weight: heaviestSet,
      };
    })
    .slice(-8);
}

export function getPersonalRecords(workouts) {
  const longestCardio = workouts.reduce(
    (best, workout) => ((Number(workout.cardioMinutes) || 0) > best.cardioMinutes ? workout : best),
    { cardioMinutes: 0 },
  );

  const bestVolume = workouts.reduce(
    (best, workout) => (getWorkoutVolume(workout) > best.volume ? { workout, volume: getWorkoutVolume(workout) } : best),
    { workout: null, volume: 0 },
  );

  const heaviestLift = workouts.reduce(
    (best, workout) => {
      workout.exercises.forEach((exercise) => {
        exercise.sets.forEach((set) => {
          const weight = Number(set.weight) || 0;
          if (weight > best.weight) {
            best = { exercise: exercise.name, weight, date: workout.date };
          }
        });
      });
      return best;
    },
    { exercise: 'No lifts yet', weight: 0, date: null },
  );

  return {
    bestVolume,
    heaviestLift,
    longestCardio,
  };
}
