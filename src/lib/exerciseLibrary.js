export const exerciseLibrary = [
  {
    name: 'Hip Thrust',
    muscle: 'Glutes',
    equipment: 'Barbell',
    level: 'Intermediate',
    category: 'Lower Body',
    cues: ['Keep chin tucked', 'Drive through heels', 'Pause at the top'],
  },
  {
    name: 'Goblet Squat',
    muscle: 'Quads',
    equipment: 'Dumbbell',
    level: 'Beginner',
    category: 'Lower Body',
    cues: ['Brace your core', 'Keep chest tall', 'Track knees over toes'],
  },
  {
    name: 'Romanian Deadlift',
    muscle: 'Hamstrings',
    equipment: 'Dumbbells',
    level: 'Intermediate',
    category: 'Lower Body',
    cues: ['Hinge at hips', 'Keep back neutral', 'Feel hamstrings stretch'],
  },
  {
    name: 'Lat Pulldown',
    muscle: 'Back',
    equipment: 'Cable Machine',
    level: 'Beginner',
    category: 'Upper Body',
    cues: ['Pull elbows down', 'Avoid leaning too far back', 'Control the return'],
  },
  {
    name: 'Dumbbell Shoulder Press',
    muscle: 'Shoulders',
    equipment: 'Dumbbells',
    level: 'Beginner',
    category: 'Upper Body',
    cues: ['Stack wrists over elbows', 'Press overhead smoothly', 'Keep ribs down'],
  },
  {
    name: 'Cable Row',
    muscle: 'Back',
    equipment: 'Cable Machine',
    level: 'Beginner',
    category: 'Upper Body',
    cues: ['Sit tall', 'Pull elbows back', 'Squeeze shoulder blades'],
  },
  {
    name: 'Incline Dumbbell Press',
    muscle: 'Chest',
    equipment: 'Dumbbells',
    level: 'Intermediate',
    category: 'Upper Body',
    cues: ['Set bench to a low incline', 'Control the lowering phase', 'Press up and in'],
  },
  {
    name: 'Walking Lunges',
    muscle: 'Glutes',
    equipment: 'Bodyweight',
    level: 'Beginner',
    category: 'Lower Body',
    cues: ['Step long enough', 'Lower with control', 'Push through the front foot'],
  },
  {
    name: 'Plank',
    muscle: 'Core',
    equipment: 'Bodyweight',
    level: 'Beginner',
    category: 'Core',
    cues: ['Stack shoulders over elbows', 'Squeeze glutes', 'Keep a straight line'],
  },
  {
    name: 'Cable Wood Chop',
    muscle: 'Core',
    equipment: 'Cable Machine',
    level: 'Intermediate',
    category: 'Core',
    cues: ['Rotate through torso', 'Keep hips controlled', 'Move with intention'],
  },
  {
    name: 'Treadmill Incline Walk',
    muscle: 'Cardio',
    equipment: 'Treadmill',
    level: 'Beginner',
    category: 'Cardio',
    cues: ['Choose a sustainable incline', 'Stand tall', 'Keep breathing steady'],
  },
  {
    name: 'Stationary Bike',
    muscle: 'Cardio',
    equipment: 'Bike',
    level: 'Beginner',
    category: 'Cardio',
    cues: ['Set seat height correctly', 'Keep cadence smooth', 'Add resistance gradually'],
  },
];

export const libraryCategories = ['All', ...new Set(exerciseLibrary.map((exercise) => exercise.category))];
export const libraryMuscles = ['All', ...new Set(exerciseLibrary.map((exercise) => exercise.muscle))];

export function filterExercises(exercises, { query = '', category = 'All', muscle = 'All' }) {
  const search = query.trim().toLowerCase();

  return exercises.filter((exercise) => {
    const searchable = [exercise.name, exercise.muscle, exercise.equipment, exercise.level, exercise.category]
      .join(' ')
      .toLowerCase();

    return (
      (!search || searchable.includes(search)) &&
      (category === 'All' || exercise.category === category) &&
      (muscle === 'All' || exercise.muscle === muscle)
    );
  });
}
