import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

type CTAHighlightProps = {
  platform: "tiktok" | "whatsapp";
  handle: string;
  subtext?: string;
  accentColor?: string;
  delayFrames?: number;
};

export const CTAHighlight: React.FC<CTAHighlightProps> = ({
  platform,
  handle,
  subtext,
  accentColor = "#00f5c4",
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
    durationInFrames: 35,
  });

  const translateY = interpolate(progress, [0, 1], [40, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Pulsing glow
  const pulse = interpolate(
    (frame - delayFrames) % 90,
    [0, 45, 90],
    [0.6, 1.0, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const isWA = platform === "whatsapp";

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: isWA
          ? "rgba(37, 211, 102, 0.08)"
          : "rgba(255, 255, 255, 0.06)",
        border: `1.5px solid ${isWA ? "rgba(37, 211, 102, 0.45)" : "rgba(255, 255, 255, 0.2)"}`,
        borderRadius: 22,
        padding: "20px 28px",
        backdropFilter: "blur(20px)",
        boxShadow: isWA
          ? `0 16px 40px rgba(37,211,102,${0.18 * pulse}), 0 0 25px rgba(37,211,102,${0.15 * pulse})`
          : `0 16px 40px rgba(0,0,0,0.4), 0 0 25px rgba(255,255,255,${0.08 * pulse})`,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* Platform SVG Icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: isWA ? "rgba(37, 211, 102, 0.18)" : "rgba(255, 255, 255, 0.1)",
            border: `1.5px solid ${isWA ? "rgba(37, 211, 102, 0.5)" : "rgba(255, 255, 255, 0.25)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {isWA ? (
            /* WhatsApp SVG */
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.3 0-.5-.1-.1-.7-1.7-.9-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.7 5.9 5.2 3.5 1.5 3.5 1 4.1 1 .6 0 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.4z"
                fill="#25D366"
              />
              <path
                d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4C8.7 21.4 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3C4.1 14.8 3.7 13.4 3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8.2-8.3 8.2z"
                fill="#25D366"
              />
            </svg>
          ) : (
            /* TikTok SVG */
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                d="M19.5 8.2c-1.4-.4-2.5-1.5-2.8-2.9h-3.4v11.6c0 1.8-1.4 3.2-3.2 3.2s-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2c.3 0 .7.1 1 .2V7.2c-.3 0-.7-.1-1-.1-3.6 0-6.6 3-6.6 6.6s3 6.6 6.6 6.6 6.6-3 6.6-6.6v-5.2c1.3.9 2.8 1.4 4.5 1.4V8.2h-.6z"
                fill="#00f5c4"
              />
              <path
                d="M19.5 8.2c-1.4-.4-2.5-1.5-2.8-2.9h-3.4v11.6c0 1.8-1.4 3.2-3.2 3.2s-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2c.3 0 .7.1 1 .2V7.2c-.3 0-.7-.1-1-.1-3.6 0-6.6 3-6.6 6.6s3 6.6 6.6 6.6 6.6-3 6.6-6.6v-5.2c1.3.9 2.8 1.4 4.5 1.4V8.2h-.6z"
                fill="#ffffff"
                style={{ transform: "translate(-1.5px, -1.5px)" }}
              />
            </svg>
          )}
        </div>

        {/* Text info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                color: isWA ? "#25D366" : "rgba(255,255,255,0.5)",
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {isWA ? "WhatsApp Chat" : "TikTok Account"}
            </span>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: isWA ? "#25D366" : accentColor,
                boxShadow: `0 0 6px ${isWA ? "#25D366" : accentColor}`,
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 27,
              fontWeight: 800,
              color: isWA ? "#ffffff" : "#ffffff",
              letterSpacing: "0.4px",
            }}
          >
            {handle}
          </span>
          {subtext && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {subtext}
            </span>
          )}
        </div>
      </div>

      {/* Action pill / arrow on the right */}
      <div
        style={{
          padding: "10px 18px",
          borderRadius: 99,
          background: isWA ? "rgba(37,211,102,0.18)" : "rgba(0,245,196,0.12)",
          border: `1px solid ${isWA ? "rgba(37,211,102,0.4)" : "rgba(0,245,196,0.3)"}`,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: isWA ? "#25D366" : accentColor,
            letterSpacing: "0.5px",
          }}
        >
          {isWA ? "Direct WA" : "Visit"}
        </span>
        <span style={{ color: isWA ? "#25D366" : accentColor, fontSize: 16 }}>→</span>
      </div>
    </div>
  );
};
