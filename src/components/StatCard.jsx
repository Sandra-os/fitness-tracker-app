export default function StatCard({ label, value, detail, icon: Icon, tone = 'blue' }) {
  return (
    <article className={`stat-card stat-card-${tone}`}>
      <div className="stat-icon" aria-hidden="true">
        <Icon size={22} strokeWidth={2.2} />
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        {detail && <span>{detail}</span>}
      </div>
    </article>
  );
}
