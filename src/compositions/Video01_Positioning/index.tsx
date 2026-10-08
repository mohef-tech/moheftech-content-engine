import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, interpolate } from "remotion";
import { Scene1_HookKinetik } from "./Scene1_HookKinetik";
import { Scene2_SolutionCards } from "./Scene2_SolutionCards";
import { Scene3_CTA } from "./Scene3_CTA";

// ── Frame Map & Timing ─────────────────────────────────────────────
//   Scene 1: frames   0 → 209 (7.0 s • Hook Kinetik & Chip Diagnosis)
//   Scene 2: frames 210 → 659 (15.0 s • 3 Solution Cards + Terminal)
//   Scene 3: frames 660 → 899 (8.0 s • CTA, WhatsApp, TikTok Profile Cue)
//   Total  : 900 frames = 30.0 s @ 30 fps
// ───────────────────────────────────────────────────────────────────

export const S1_START = 0;
export const S1_DUR = 210;

export const S2_START = 210;
export const S2_DUR = 450;

export const S3_START = 660;
export const S3_DUR = 240;

export const Video01_Positioning: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#070a0e" }} durationInFrames={844}>
      {/* ── Background Music (Lo-Fi Tech / Minimalist Cyber Beat) ── */}
      <Audio
        src={staticFile("audio/backsound-tech.mp3")}
        volume={(f) =>
          interpolate(f, [0, 25, 860, 900], [0, 0.7, 0.7, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {/* ── Scene 1: Hook Kinetik ── */}
      <Sequence from={S1_START} durationInFrames={S1_DUR}>
        <Scene1_HookKinetik />
      </Sequence>

      {/* ── Scene 2: Solution Cards ── */}
      <Sequence from={S2_START} durationInFrames={S2_DUR}>
        <Scene2_SolutionCards />
      </Sequence>

      {/* ── Scene 3: CTA & Visual Profile Pointer ── */}
      <Sequence from={S3_START} durationInFrames={S3_DUR}>
        <Scene3_CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
