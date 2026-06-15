import { Save, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePanel({ profile, onSave }) {
  const [draft, setDraft] = useState(profile);

  const updateField = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(draft);
  };

  return (
    <div className="profile-grid">
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input value={draft.name} onChange={(event) => updateField('name', event.target.value)} />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            value={draft.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </label>
        <label>
          <span>Current goal</span>
          <select value={draft.goal} onChange={(event) => updateField('goal', event.target.value)}>
            <option>Build strength</option>
            <option>Improve consistency</option>
            <option>Increase cardio</option>
            <option>Learn gym exercises</option>
          </select>
        </label>
        <button className="primary-button" type="submit">
          <Save size={18} aria-hidden="true" />
          Save profile
        </button>
      </form>

      <aside className="auth-note">
        <ShieldCheck size={24} aria-hidden="true" />
        <h3>About email sign-in</h3>
        <p>
          This portfolio version stores profile and workout data locally in the browser. Secure email sign-in
          requires a backend authentication provider such as Supabase, Firebase, Auth0, or a custom server.
        </p>
        <p>
          The app is structured so real auth can be added later without redesigning the user flow.
        </p>
      </aside>
    </div>
  );
}
