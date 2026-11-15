import { Link } from 'react-router-dom';
import { PhageGlyph } from '../ui/icons';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className={`logo${compact ? ' logo--compact' : ''}`}>
      <span className="logo__mark" aria-hidden="true">
        <PhageGlyph />
      </span>
      <span className="logo__text">
        <span className="logo__word">
          Mays<span className="logo__slash">/</span>Reportagen
        </span>
        <span className="logo__claim">Geschichten, die bewegen</span>
      </span>
      <span className="visually-hidden">Startseite</span>
    </Link>
  );
}
