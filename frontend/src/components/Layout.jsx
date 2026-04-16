import { Link } from 'react-router-dom';

export function Layout({ language, setLanguage, copy, children }) {
  return (
    <div className="app-shell">
      <header>
        <h1>{copy.homeTitle}</h1>
        <nav>
          <Link to="/">{copy.navHome}</Link>
          <Link to="/submit">{copy.navSubmit}</Link>
          <Link to="/status">{copy.navStatus}</Link>
          <Link to="/admin">{copy.navAdmin}</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>
        <select value={language} onChange={(event) => setLanguage(event.target.value)}>
          <option value="ar">AR</option>
          <option value="fr">FR</option>
        </select>
      </header>
      <main>{children}</main>
      <footer>{copy.footer}</footer>
    </div>
  );
}
