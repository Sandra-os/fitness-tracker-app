import { Award, CalendarCheck2, Flame, HeartPulse } from 'lucide-react';
import { formatDate, formatNumber } from '../lib/workoutUtils';

export default function WeeklySummary({ summary, records }) {
  return (
    <div className="weekly-summary">
      <div className="week-focus">
        <span>This week</span>
        <strong>{summary.workoutCount} workouts logged</strong>
        <p>Week of {formatDate(summary.weekStart.toISOString().slice(0, 10))}</p>
      </div>

      <div className="summary-list">
        <SummaryItem icon={CalendarCheck2} label="Active days" value={`${summary.activeDays} days`} />
        <SummaryItem icon={Flame} label="Strength volume" value={`${formatNumber(summary.volume)} lb`} />
        <SummaryItem icon={HeartPulse} label="Cardio minutes" value={`${summary.cardio} min`} />
        <SummaryItem
          icon={Award}
          label="Heaviest lift"
          value={records.heaviestLift.weight ? `${records.heaviestLift.exercise} at ${records.heaviestLift.weight} lb` : 'Start logging'}
        />
      </div>
    </div>
  );
}

function SummaryItem({ icon: Icon, label, value }) {
  return (
    <div className="summary-item">
      <Icon size={19} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
