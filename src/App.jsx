import React, { Suspense, lazy, useEffect, useState } from "react";

const Scene = lazy(() => import("./Scene"));

const colors = [
  { name: "Graphite", value: "#8b93a5" },
  { name: "Azure", value: "#4f8cff" },
  { name: "Coral", value: "#ff6f61" },
  { name: "Mint", value: "#5ee6c5" }
];

function StaticFallback({ message = "3D preview unavailable" }) {
  return (
    <div className="fallback" role="img" aria-label="Static fallback for the 3D product preview">
      <div className="fallback-orbit">
        <div className="fallback-object" />
      </div>
      <strong>{message}</strong>
      <span>The configurator controls remain available below.</span>
    </div>
  );
}

export default function App() {
  const [color, setColor] = useState(colors[0].value);
  const [roughness, setRoughness] = useState(0.28);
  const [metalness, setMetalness] = useState(0.78);
  const [wireframe, setWireframe] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow3D(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const effectiveAnimation = animate && !reducedMotion;

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Orbit One home">
          <span className="brand-mark">O</span>
          <span>ORBIT ONE</span>
        </a>
        <span className="status-pill"><i /> Interactive 3D</span>
      </header>

      <section className="hero">
        <div className="intro">
          <p className="eyebrow">WEEK 07 • 3D WEB EXPERIENCE</p>
          <h1>Build it.<br /><em>Spin it.</em><br />Make it yours.</h1>
          <p className="lede">
            A lightweight product configurator built for the browser.
            Drag to inspect the object, then tune its surface in real time.
          </p>
          <div className="interaction-hint">
            <span className="mouse-icon">↔</span>
            <span>Drag to rotate · Pinch/scroll to zoom</span>
          </div>
        </div>

        <div className="stage-card">
          <div className="stage-glow" />
          {show3D ? (
            <Suspense fallback={<StaticFallback message="Preparing 3D preview…" />}>
              <Scene
                color={color}
                roughness={roughness}
                metalness={metalness}
                wireframe={wireframe}
                animate={effectiveAnimation}
              />
            </Suspense>
          ) : (
            <StaticFallback message="Preparing 3D preview…" />
          )}
          {reducedMotion && (
            <div className="motion-note">Reduced motion is enabled.</div>
          )}
        </div>
      </section>

      <section className="configurator" aria-labelledby="config-title">
        <div className="config-heading">
          <div>
            <p className="eyebrow">CONFIGURATOR</p>
            <h2 id="config-title">Tune the finish.</h2>
          </div>
          <button
            className={`animate-button ${animate ? "active" : ""}`}
            onClick={() => setAnimate((v) => !v)}
            aria-pressed={animate}
          >
            <span>{animate ? "Ⅱ" : "▶"}</span> {animate ? "Pause motion" : "Animate"}
          </button>
        </div>

        <div className="controls-grid">
          <div className="control-group color-group">
            <label>Material color</label>
            <div className="swatches">
              {colors.map((item) => (
                <button
                  key={item.value}
                  className={`swatch ${color === item.value ? "selected" : ""}`}
                  style={{ "--swatch": item.value }}
                  onClick={() => setColor(item.value)}
                  aria-label={`Use ${item.name}`}
                  aria-pressed={color === item.value}
                  title={item.name}
                />
              ))}
            </div>
            <span className="value-label">{colors.find((x) => x.value === color)?.name}</span>
          </div>

          <div className="control-group">
            <div className="range-label"><label htmlFor="metalness">Metalness</label><span>{metalness.toFixed(2)}</span></div>
            <input id="metalness" type="range" min="0" max="1" step="0.01" value={metalness} onChange={(e) => setMetalness(Number(e.target.value))} />
          </div>

          <div className="control-group">
            <div className="range-label"><label htmlFor="roughness">Roughness</label><span>{roughness.toFixed(2)}</span></div>
            <input id="roughness" type="range" min="0.05" max="1" step="0.01" value={roughness} onChange={(e) => setRoughness(Number(e.target.value))} />
          </div>

          <label className="toggle-control">
            <span>
              <strong>Wireframe</strong>
              <small>Show the underlying geometry</small>
            </span>
            <input type="checkbox" checked={wireframe} onChange={(e) => setWireframe(e.target.checked)} />
            <span className="toggle" aria-hidden="true" />
          </label>
        </div>
      </section>

      <section className="info-grid">
        <article>
          <span className="info-number">01</span>
          <h3>Lightweight geometry</h3>
          <p>The product is built from simple Three.js primitives, avoiding a heavy external model download.</p>
        </article>
        <article>
          <span className="info-number">02</span>
          <h3>Responsive interaction</h3>
          <p>Orbit controls support mouse and touch input, with a restrained pixel ratio for mobile GPUs.</p>
        </article>
        <article>
          <span className="info-number">03</span>
          <h3>Responsible loading</h3>
          <p>The 3D scene is lazy-loaded and a static HTML/CSS fallback is available while it initializes.</p>
        </article>
      </section>

      <footer>
        <span>Orbit One / 3D Web Experiment</span>
        <span>Built with React Three Fiber</span>
      </footer>
    </main>
  );
}