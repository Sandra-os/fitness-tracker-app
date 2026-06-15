export default function DashboardCard({ title, action, className = '', children }) {
  return (
    <section className={`dashboard-card ${className}`}>
      {(title || action) && (
        <div className="card-heading">
          {title && <h2>{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
