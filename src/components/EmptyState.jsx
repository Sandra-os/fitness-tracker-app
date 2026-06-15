import { Sparkles } from 'lucide-react';

export default function EmptyState({ title, message }) {
  return (
    <div className="empty-state">
      <Sparkles size={28} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
