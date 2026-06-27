import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<{ text: string; highlight?: string }[]>([]);
  const [done, setDone] = useState(false);

  const bootLogs = [
    { text: "Booting portfolio runtime..." },
    { text: "✓ React mounted", highlight: "#3fb950" },
    { text: "✓ Skills module compiled", highlight: "#3fb950" },
    { text: "✓ Projects indexed", highlight: "#3fb950" },
    { text: "→ Fetching GitHub stats...", highlight: "#58a6ff" },
    { text: "✓ Styles applied", highlight: "#3fb950" },
    { text: "⚡ Ready to launch", highlight: "#ffa657" },
  ];

  useEffect(() => {
    let p = 0;
    const progressInterval = setInterval(() => {
      p = Math.min(100, p + Math.random() * 4 + 1);
      setProgress(p);
      if (p >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
    }, 180);

    bootLogs.forEach((log, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev.slice(-3), log]);
      }, i * 600);
    });

    return () => clearInterval(progressInterval);
  }, []);

  const segments = [
    { label: "ASSETS", threshold: 0 },
    { label: "MODULES", threshold: 25 },
    { label: "STYLES", threshold: 60 },
    { label: "READY", threshold: 90 },
  ];

  // Responsive sizing based on screen width
  const isLaptop = window.innerWidth >= 1024;
  const logoSize = isLaptop ? 72 : 48;
  const spinnerSize = isLaptop ? 80 : 56;
  const spinnerInset = isLaptop ? 8 : 6;
  const dotSize = isLaptop ? 8 : 6;
  const maxWidth = isLaptop ? 580 : 360;
  const contentGap = isLaptop ? 36 : 28;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0d1117",
        fontFamily: "ui-monospace, 'Geist Mono', Consolas, monospace",
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "auto",
        transition: "opacity 0.5s ease",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(#58a6ff08 1px,transparent 1px),linear-gradient(90deg,#58a6ff08 1px,transparent 1px)",
          backgroundSize: isLaptop ? "60px 60px" : "40px 40px",
        }}
      />

      {/* Corner brackets */}
      {(
        [
          { top: 16, left: 16, borderTop: "1px solid #58a6ff66", borderLeft: "1px solid #58a6ff66" },
          { top: 16, right: 16, borderTop: "1px solid #58a6ff66", borderRight: "1px solid #58a6ff66" },
          { bottom: 16, left: 16, borderBottom: "1px solid #58a6ff66", borderLeft: "1px solid #58a6ff66" },
          { bottom: 16, right: 16, borderBottom: "1px solid #58a6ff66", borderRight: "1px solid #58a6ff66" },
        ] as React.CSSProperties[]
      ).map((s, i) => (
        <div key={i} style={{ position: "absolute", width: isLaptop ? 28 : 20, height: isLaptop ? 28 : 20, ...s }} />
      ))}

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: contentGap,
          width: "100%",
          maxWidth: maxWidth,
          padding: "0 24px",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: logoSize,
              fontWeight: 900,
              letterSpacing: -1,
              lineHeight: 1,
              color: "#e6edf3",
              userSelect: "none",
            }}
          >
            <div style={{ display: "flex", gap: isLaptop ? 14 : 5 }}>
              <span>Dhinesh</span>
              <span style={{ color: "#58a6ff" }}>Kumar</span>
            </div>
          </div>
          <p
            style={{
              fontSize: isLaptop ? 12 : 10,
              letterSpacing: isLaptop ? 8 : 6,
              color: "#8b949e",
              marginTop: isLaptop ? 10 : 6,
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </p>
        </div>

        {/* Spinner */}
        <div style={{ position: "relative", width: spinnerSize, height: spinnerSize }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid #30363d",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "#58a6ff",
              animation: "spin 1s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: spinnerInset,
              borderRadius: "50%",
              border: "1px solid transparent",
              borderTopColor: "#3fb95088",
              animation: "spin 1.5s linear infinite reverse",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: isLaptop ? 8 : 6,
                height: isLaptop ? 8 : 6,
                borderRadius: "50%",
                background: "#58a6ff",
                animation: "pulse 1s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Terminal log */}
        <div
          style={{
            width: "100%",
            background: "#161b22",
            border: "1px solid #30363d",
            borderRadius: 8,
            padding: isLaptop ? "18px 22px" : "14px 16px",
          }}
        >
          <div style={{ minHeight: isLaptop ? 120 : 88, fontSize: isLaptop ? 13 : 11, lineHeight: 1.8 }}>
            {logs.map((log, i) => (
              <div key={i} style={{ color: log.highlight ?? "#8b949e" }}>
                {log.text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <span style={{ color: "#58a6ff", fontSize: isLaptop ? 13 : 11 }}>$</span>
            <span style={{ color: "#3fb950", fontSize: isLaptop ? 13 : 11 }}>npm run dev</span>
            <span style={{ color: "#3fb950", animation: "blink 1s step-end infinite" }}>█</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: isLaptop ? 11 : 10, color: "#8b949e", letterSpacing: 2, textTransform: "uppercase" }}>
              Initializing
            </span>
            <span
              style={{
                fontSize: isLaptop ? 11 : 10,
                color: progress >= 100 ? "#3fb950" : "#58a6ff",
                transition: "color 0.3s",
              }}
            >
              {Math.floor(progress)}%
            </span>
          </div>
          <div style={{ height: isLaptop ? 3 : 2, background: "#21262d", borderRadius: 1, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                borderRadius: 1,
                background: "linear-gradient(90deg, #58a6ff, #3fb950)",
                width: `${progress}%`,
                transition: "width 0.15s ease",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {segments.map((s) => (
              <span
                key={s.label}
                style={{
                  fontSize: isLaptop ? 10 : 9,
                  letterSpacing: 1,
                  color: progress >= s.threshold ? "#58a6ff" : "#30363d",
                  transition: "color 0.3s",
                }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: isLaptop ? 8 : 6 }}>
          {(["#58a6ff", "#3fb950", "#ffa657"] as const).map((color, i) => (
            <div
              key={i}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                background: color,
                animation: `dotFade 1.2s ease-in-out infinite`,
                animationDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Version */}
      <p
        style={{
          position: "absolute",
          bottom: 24,
          fontSize: isLaptop ? 10 : 9,
          letterSpacing: 3,
          color: "#30363d",
          textTransform: "uppercase",
        }}
      >
        v1.0.0 · dhineshkumar · 2026
      </p>

      {/* Keyframes */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes dotFade { 0%,80%,100% { opacity: 0; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}