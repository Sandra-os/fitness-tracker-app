import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import EmptyState from './EmptyState';

const tooltipStyle = {
  background: '#fffafb',
  border: '1px solid rgba(44, 73, 108, 0.12)',
  borderRadius: 12,
  boxShadow: '0 18px 40px rgba(63, 89, 122, 0.14)',
  color: '#1d2b3f',
};

export default function ProgressCharts({
  trendData,
  exerciseOptions,
  selectedExercise,
  onSelectExercise,
  exerciseProgress,
}) {
  return (
    <div className="charts-grid">
      <div className="chart-panel large-chart">
        <div className="chart-heading">
          <div>
            <h3>Weekly training volume</h3>
            <p>Total pounds moved across strength sets.</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={trendData} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="volumeGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#4f8edb" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#4f8edb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(73, 103, 142, 0.14)" />
            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#617189', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#617189', fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#4f8edb"
              strokeWidth={3}
              fill="url(#volumeGradient)"
              name="Volume"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-panel">
        <div className="chart-heading">
          <div>
            <h3>Cardio minutes</h3>
            <p>Minutes logged by week.</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={trendData} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(73, 103, 142, 0.14)" />
            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#617189', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#617189', fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="cardio" name="Cardio" radius={[10, 10, 0, 0]} fill="#ef8fb6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-panel">
        <div className="chart-heading responsive-heading">
          <div>
            <h3>Exercise progress</h3>
            <p>Heaviest set over time.</p>
          </div>
          {exerciseOptions.length > 0 && (
            <label className="mini-select">
              <span className="sr-only">Choose exercise</span>
              <select value={selectedExercise} onChange={(event) => onSelectExercise(event.target.value)}>
                {exerciseOptions.map((exercise) => (
                  <option key={exercise} value={exercise}>
                    {exercise}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        {exerciseProgress.length ? (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={exerciseProgress} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(73, 103, 142, 0.14)" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#617189', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#617189', fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="weight"
                name="Weight"
                stroke="#8f75d9"
                strokeWidth={3}
                dot={{ r: 4, fill: '#8f75d9', strokeWidth: 0 }}
                activeDot={{ r: 7, fill: '#ef8fb6', stroke: '#fff', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState title="No exercise trend yet" message="Add a weighted exercise to see strength progress." />
        )}
      </div>
    </div>
  );
}
