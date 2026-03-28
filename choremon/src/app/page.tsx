"use client";

import { useState } from "react";
import FloorChoreMode from "@/app/components/chores/FloorChoreMode";

type ChoreType = "vacuum" | "mop" | "sweep";

const CHORES: { type: ChoreType; emoji: string; label: string }[] = [
  { type: "vacuum", emoji: "🧹", label: "Vacuum" },
  { type: "mop",    emoji: "🪣", label: "Mop" },
  { type: "sweep",  emoji: "🫧", label: "Sweep" },
];

export default function TestPage() {
  const [activeChore, setActiveChore] = useState<ChoreType | null>(null);
  const [result, setResult] = useState<{ xp: number; chore: string } | null>(null);

  if (result) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a0a14",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}>
        <div style={{ textAlign: "center", padding: 32 }}>
          <div style={{ fontSize: 64 }}>🏆</div>
          <h1 style={{ color: "#34d399", fontSize: 28, margin: "12px 0 4px" }}>Quest Complete!</h1>
          <p style={{ color: "#94a3b8", fontSize: 16, margin: "0 0 8px" }}>{result.chore} done</p>
          <p style={{ color: "#818cf8", fontSize: 40, fontWeight: 900, margin: "0 0 28px" }}>+{result.xp} XP</p>
          <button
            onClick={() => { setResult(null); setActiveChore(null); }}
            style={styles.btn}
          >
            Do another chore
          </button>
        </div>
      </div>
    );
  }

  if (activeChore) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a0a14",
        padding: 12,
        fontFamily: "system-ui, sans-serif",
      }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <FloorChoreMode
            choreType={activeChore}
            onComplete={(xp) => setResult({ xp, chore: activeChore })}
          />
          <button
            onClick={() => setActiveChore(null)}
            style={{ ...styles.btn, marginTop: 12, background: "transparent", color: "#64748b", border: "1px solid #1e293b" }}
          >
            ← Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a14",
      padding: "40px 20px",
      fontFamily: "system-ui, sans-serif",
      maxWidth: 480,
      margin: "0 auto",
      boxSizing: "border-box",
    }}>
      <h1 style={{ color: "#f1f5f9", fontSize: 28, fontWeight: 900, margin: "0 0 4px" }}>
        ⚔️ Choremon
      </h1>
      <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 32px" }}>
        Pick a floor chore to start
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {CHORES.map(({ type, emoji, label }) => (
          <button
            key={type}
            onClick={() => setActiveChore(type)}
            style={styles.choreBtn}
          >
            <span style={{ fontSize: 30 }}>{emoji}</span>
            <span style={{ fontSize: 18, fontWeight: 700 }}>{label}</span>
            <span style={{ marginLeft: "auto", color: "#64748b", fontSize: 20 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  choreBtn: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "20px 18px",
    borderRadius: 16,
    background: "#1a1a2e",
    border: "1.5px solid #2d2d4e",
    color: "#e2e8f0",
    cursor: "pointer",
    textAlign: "left",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
    userSelect: "none",
    width: "100%",
    fontSize: 16,
  },
  btn: {
    display: "block",
    width: "100%",
    padding: "14px",
    borderRadius: 12,
    background: "#1e293b",
    color: "#f1f5f9",
    border: "1px solid #334155",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 600,
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
  },
};