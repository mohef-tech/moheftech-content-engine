import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

type SolutionCardProps = {
  icon: string;
  title: string;
  description: string;
  accentColor?: string;
  delayFrames?: number;
  children?: React.ReactNode;
};

export const SolutionCard: React.FC<SolutionCardProps> = ({
  icon,
  title,
  description,
  accentColor = "#00f5c4",
  delayFrames = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 20, stiffness: 90, mass: 1 },
    durationInFrames: 45,
  });
  const translateY = interpolate(progress, [0, 1], [90, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const glowCycle = ((frame - delayFrames) % 120 + 120) % 120;
  const glowRaw = interpolate(glowCycle, [0, 60, 120], [0.14, 0.36, 0.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hexGlow = Math.round(glowRaw * 255)
    .toString(16)
    .padStart(2, "0");

  const iconSp = spring({
    frame: Math.max(0, frame - delayFrames - 15),
    fps,
    config: { damping: 10, stiffness: 250, mass: 0.5 },
    durationInFrames: 20,
  });
  const iconS = interpolate(iconSp, [0, 1], [0.2, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        background: "rgba(10, 14, 20, 0.88)",
        backdropFilter: "blur(24px)",
        border: `1.5px solid ${accentColor}50`,
        borderRadius: 24,
        padding: "24px 32px",
        boxShadow: `0 0 35px ${accentColor}${hexGlow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Top row: icon + title + desc */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 20 }}>
        <div
          style={{
            transform: `scale(${iconS})`,
            flexShrink: 0,
            width: 58,
            height: 58,
            borderRadius: 14,
            background: `${accentColor}18`,
            border: `1.5px solid ${accentColor}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
          }}
        >
          {icon}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
          <div
            style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.5px",
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontSize: 18,
              fontWeight: 400,
              color: "rgba(255,255,255,0.60)",
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        </div>
      </div>

      {/* Mini interactive element */}
      {children && (
        <div
          style={{
            marginTop: 14,
            paddingTop: 14,
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
