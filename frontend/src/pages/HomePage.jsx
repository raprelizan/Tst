export function HomePage({ copy }) {
  return (
    <section className="card">
      <h2>{copy.homeSubtitle}</h2>
      <p className="danger-banner">{copy.disclaimer}</p>
      <p>
        AmanSignal helps communities share security tips safely with moderation and secure handling,
        while clearly respecting legal and ethical boundaries.
      </p>
    </section>
  );
}
