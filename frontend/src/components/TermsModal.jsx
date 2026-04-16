import { useMemo } from 'react';

const terms = [
  'The platform is NOT a law enforcement authority.',
  'Users must NOT submit false, misleading, or malicious reports.',
  'False reports intended to harm others may lead to legal consequences.',
  'Anonymous reports are allowed but may be deprioritized.',
  'Confidential reports may be disclosed ONLY if required by law or official authorities.',
  'The platform does NOT guarantee action by authorities.',
  'Users must NOT upload illegal content or violate privacy.',
  'The platform reserves the right to block abusive users.',
  'All data is handled according to privacy and security best practices.',
  'The platform acts only as an intermediary and is not responsible for outcomes.'
];

export function TermsModal({ open, onAccept, title, acceptLabel }) {
  const items = useMemo(() => terms, []);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{title}</h2>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button onClick={onAccept}>{acceptLabel}</button>
      </div>
    </div>
  );
}
