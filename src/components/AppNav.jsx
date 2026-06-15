import { Activity, BarChart3, BookOpen, Home, Menu, PenLine, UserRound } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'log', label: 'Log Workout', icon: PenLine },
  { id: 'history', label: 'History', icon: Activity },
  { id: 'library', label: 'Exercises', icon: BookOpen },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: UserRound },
];

export default function AppNav({ activeView, onNavigate }) {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#home" onClick={() => onNavigate('home')}>
        <span className="brand-mark" aria-hidden="true">
          <Menu size={20} />
        </span>
        <span>
          <strong>BloomFit</strong>
          <small>Fitness app</small>
        </span>
      </a>

      <nav className="main-menu" aria-label="Primary navigation">
        {navItems.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            className={activeView === id ? 'active' : ''}
            href={`#${id}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={17} aria-hidden="true" />
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
