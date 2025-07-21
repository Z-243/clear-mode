export default function Hero() {
  return (
    <>
      <div className="hero-section">
        <div className="hero-container">
          {/* Benefits Card */}
          <div className="hero-card">
            <h2>✍️ Ready to write your heart out?</h2>
            <ul>
              <li>30 days, 30 prompts — just show up and write.</li>
              <li>
                Spark ideas, boost creativity, and build your writing muscle.
              </li>
              <li>No pressure, no perfection — just progress.</li>
            </ul>
          </div>

          {/* Guide Card */}
          <div className="hero-card">
            <h3>📘 How It Works</h3>
            <ul className="rule-list">
              <li className="rule-title">Word Goals 🎯</li>
              <p>Aim for the target, but write what feels right.</p>
              <li className="rule-title">Get Real 🧠</li>
              <p>This is your space — raw, honest, unfiltered.</p>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
