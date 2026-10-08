import React from "react";
import { Composition } from "remotion";
import { TextHook } from "./components/TextHook";
import { BRollFrame } from "./components/BRollFrame";
import { TerminalWindow } from "./components/TerminalWindow";

// ─── Canvas Settings ──────────────────────────────────────────
const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;
const FPS = 30;

// ─── Dark Background Wrapper ──────────────────────────────────
const DarkBg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      background: "linear-gradient(160deg, #0a0c10 0%, #0d1117 60%, #0a0f1e 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
    }}
  >
    {/* Ambient grid */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        pointerEvents: "none",
      }}
    />
    {/* Radial glow center */}
    <div
      style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800,
        height: 800,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,245,196,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }}
    />
    {children}
  </div>
);

// ─── Scene: Text Hook ─────────────────────────────────────────
export const SceneTextHook: React.FC = () => (
  <DarkBg>
    <TextHook
      headline="The Future of Code"
      subtext="Is already here."
      accentColor="#00f5c4"
    />
  </DarkBg>
);

// ─── Scene: B-Roll Frame ──────────────────────────────────────
export const SceneBRoll: React.FC = () => (
  <DarkBg>
    <BRollFrame
      label="SCENE 02"
      badgeText="REC"
      accentColor="#00f5c4"
    />
  </DarkBg>
);

// ─── Scene: Terminal Window ───────────────────────────────────
export const SceneTerminal: React.FC = () => (
  <DarkBg>
    <TerminalWindow
      title="terminal — content-engine"
      accentColor="#00f5c4"
    />
  </DarkBg>
);

// ─── Root Compositions ────────────────────────────────────────
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TextHook"
        component={SceneTextHook}
        durationInFrames={90}
        fps={FPS}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
      <Composition
        id="BRollFrame"
        component={SceneBRoll}
        durationInFrames={120}
        fps={FPS}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
      <Composition
        id="TerminalWindow"
        component={SceneTerminal}
        durationInFrames={150}
        fps={FPS}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </>
  );
};
