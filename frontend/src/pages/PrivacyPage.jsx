const privacyPoints = [
  'Do not collect personal data unless necessary.',
  'Encrypt all sensitive data.',
  'Never sell user data.',
  'Allow anonymous usage.',
  'Logs may be stored for security purposes.',
  'Data may be shared only with legal authorities if required by law.'
];

export function PrivacyPage() {
  return (
    <section className="card">
      <h2>Privacy Policy</h2>
      <ul>
        {privacyPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}
