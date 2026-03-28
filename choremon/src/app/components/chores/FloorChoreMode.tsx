"use client";

import { useEffect } from "react";

type ChoreType = "vacuum" | "mop" | "sweep";

type Props = {
  choreType: ChoreType;
  onComplete?: (xp: number) => void;
};

const CHORE_META: Record<ChoreType, { label: string; emoji: string; color: string }> = {
  vacuum: { label: "Vacuuming", emoji: "🧹", color: "#818cf8" },
  mop:    { label: "Mopping",   emoji: "🪣", color: "#38bdf8" },
  sweep:  { label: "Sweeping",  emoji: "🫧", color: "#34d399" },
};

export default function FloorChoreMode({ choreType, onComplete }: Props) {
  const meta = CHORE_META[choreType];

  useEffect(() => {
    const stored = sessionStorage.getItem("choreResult");
    if (stored) {
      sessionStorage.removeItem("choreResult");
      try {
        const { xp } = JSON.parse(stored);
        onComplete?.(xp);
      } catch {}
    }
  }, [onComplete]);

  function openAR() {
    window.location.href = `/ar-vacuum.html?chore=${choreType}`;
  }

  return (
    <div style={{
      width: "100%",
      background: "#0a0a14",
      borderRadius: 20,
      padding: "40px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
      fontFamily: "system-ui, sans-serif",
      textAlign: "center",
    }}>
      <div style={{ fontSize: 64 }}>{meta.emoji}</div>

      <div>
        <h2 style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>
          {meta.label}
        </h2>
        <p style={{ color: "#64748b", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
          Real floor detection — no markers needed.<br/>
          Works on iOS and Android.
        </p>
      </div>

      {/* Steps */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { step: "1", text: "Point camera at the floor" },
          { step: "2", text: "Tap corners to draw your zone" },
          { step: "3", text: "Walk over orbs to collect XP" },
        ].map(({ step, text }) => (
          <div key={step} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "#111827", borderRadius: 12, padding: "12px 16px",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: meta.color + "22",
              border: `1px solid ${meta.color}55`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: meta.color, fontSize: 13, fontWeight: 700,
              flexShrink: 0,
            }}>
              {step}
            </div>
            <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>{text}</p>
          </div>
        ))}
      </div>

      <button
        onClick={openAR}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: 14,
          background: meta.color,
          color: "#fff",
          border: "none",
          fontSize: 17,
          fontWeight: 700,
          cursor: "pointer",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
          marginTop: 4,
        }}
      >
        Open AR Camera →
      </button>
    </div>
  );
}