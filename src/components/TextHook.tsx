import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

type TextHookProps = {
  headline: string;
  subtext?: string;
  accentColor?: string;
};

export const TextHook: React.FC<TextHookProps> = ({
  headline = "The Future of Code",
  subtext = "Is already here.",
  accentColor = "#00f5c4",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline: slide up + fade in
  const headlineProgress = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
    durationInFrames: 30,
  });

  const headlineY = interpolate(headlineProgress, [0, 1], [60, 0]);
  const headlineOpacity = interpolate(headlineProgress, [0, 1], [0, 1]);

  // Subtext: delayed entrance
  const subtextProgress = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.9 },
    durationInFrames: 30,
  });

  const subtextY = interpolate(subtextProgress, [0, 1], [40, 0]);
  const subtextOpacity = interpolate(subtextProgress, [0, 1], [0, 1]);

  // Accent line width
  const lineWidth = interpolate(frame, [10, 40], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Glow pulse
  const glowOpacity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.4, 1, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "0 80px",
        boxSizing: "border-box",
        background: "transparent",
      }}
    >
      {/* Accent line */}
      <div
        style={{
          width: `${lineWidth}%`,
          height: 3,
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          marginBottom: 32,
          boxShadow: `0 0 12px ${accentColor}`,
          opacity: glowOpacity,
        }}
      />

      {/* Headline */}
      <div
        style={{
          transform: `translateY(${headlineY}px)`,
          opacity: headlineOpacity,
        }}
      >
        <h1
          style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontSize: 96,
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-2px",
            textShadow: `0 0 40px rgba(255,255,255,0.15)`,
          }}
        >
          {headline.split(" ").map((word, i) => (
            <span
              key={i}
              style={{
                color: i === headline.split(" ").length - 1 ? accentColor : "#ffffff",
              }}
            >
              {word}{" "}
            </span>
          ))}
        </h1>
      </div>

      {/* Subtext */}
      <div
        style={{
          transform: `translateY(${subtextY}px)`,
          opacity: subtextOpacity,
          marginTop: 24,
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontSize: 42,
            fontWeight: 300,
            color: "rgba(255,255,255,0.6)",
            margin: 0,
            letterSpacing: "1px",
          }}
        >
          {subtext}
        </p>
      </div>
    </div>
  );
};
