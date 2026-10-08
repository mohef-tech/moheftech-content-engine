import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

type BRollFrameProps = {
  label?: string;
  badgeText?: string;
  accentColor?: string;
  children?: React.ReactNode;
};

export const BRollFrame: React.FC<BRollFrameProps> = ({
  label = "SCENE",
  badgeText = "LIVE",
  accentColor = "#00f5c4",
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame entrance
  const progress = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 90, mass: 1 },
    durationInFrames: 40,
  });

  const scale = interpolate(progress, [0, 1], [0.92, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Corner bracket animation
  const bracketProgress = interpolate(frame, [5, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Scan line animation
  const scanY = interpolate(frame % 120, [0, 120], [0, 100]);

  // Badge blink
  const badgeOpacity = Math.sin(frame * 0.15) * 0.3 + 0.7;

  const cornerSize = 28;
  const cornerThickness = 3;

  const CornerBracket: React.FC<{
    position: "tl" | "tr" | "bl" | "br";
  }> = ({ position }) => {
    const isTop = position.startsWith("t");
    const isLeft = position.endsWith("l");

    return (
      <div
        style={{
          position: "absolute",
          [isTop ? "top" : "bottom"]: 0,
          [isLeft ? "left" : "right"]: 0,
          width: cornerSize * bracketProgress,
          height: cornerSize * bracketProgress,
          borderTop: isTop
            ? `${cornerThickness}px solid ${accentColor}`
            : "none",
          borderBottom: !isTop
            ? `${cornerThickness}px solid ${accentColor}`
            : "none",
          borderLeft: isLeft
            ? `${cornerThickness}px solid ${accentColor}`
            : "none",
          borderRight: !isLeft
            ? `${cornerThickness}px solid ${accentColor}`
            : "none",
          boxShadow: `0 0 8px ${accentColor}80`,
        }}
      />
    );
  };

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 48px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          background: "#0d1117",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `0 0 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Scan line effect */}
        <div
          style={{
            position: "absolute",
            top: `${scanY}%`,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        {/* Content area */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "'Inter', sans-serif",
            fontSize: 20,
          }}
        >
          {children ?? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  border: `2px solid rgba(255,255,255,0.15)`,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                }}
              >
                ▶
              </div>
              <span style={{ letterSpacing: 3, fontSize: 13 }}>
                B-ROLL PLACEHOLDER
              </span>
            </div>
          )}
        </div>

        {/* Corner brackets */}
        <CornerBracket position="tl" />
        <CornerBracket position="tr" />
        <CornerBracket position="bl" />
        <CornerBracket position="br" />

        {/* Top HUD bar */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            right: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 5,
          }}
        >
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              color: `${accentColor}`,
              letterSpacing: 3,
              textTransform: "uppercase",
              opacity: bracketProgress,
            }}
          >
            {label}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              opacity: badgeOpacity,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: accentColor,
                boxShadow: `0 0 6px ${accentColor}`,
              }}
            />
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 11,
                color: accentColor,
                letterSpacing: 2,
              }}
            >
              {badgeText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
