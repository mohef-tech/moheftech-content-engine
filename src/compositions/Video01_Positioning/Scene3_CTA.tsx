import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Audio,
  staticFile,
  Sequence,
} from "remotion";
import { CTAHighlight } from "./components/CTAHighlight";

const ACCENT = "#00f5c4";
const SCENE_DURATION = 240; // 8s @ 30fps

export const Scene3_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -- Fade in from black & fade out at end --------------------
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const fadeOut = interpolate(
    frame,
    [SCENE_DURATION - 12, SCENE_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  // -- Top HUD Entrance -----------------------------------------
  const hudP = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.8 },
    durationInFrames: 25,
  });

  // -- Divider bar ----------------------------------------------
  const barW = interpolate(frame, [15, 60], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // -- Main text entrance ---------------------------------------
  const mainP = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 18, stiffness: 110, mass: 0.9 },
    durationInFrames: 35,
  });
  const mainY = interpolate(mainP, [0, 1], [50, 0]);
  const mainOpacity = interpolate(mainP, [0, 1], [0, 1]);

  // -- Sub text -------------------------------------------------
  const subP = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.9 },
    durationInFrames: 30,
  });
  const subY = interpolate(subP, [0, 1], [40, 0]);
  const subOpacity = interpolate(subP, [0, 1], [0, 1]);

  // -- Active status badge --------------------------------------
  const statusP = spring({
    frame: Math.max(0, frame - 45),
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
    durationInFrames: 30,
  });
  const statusY = interpolate(statusP, [0, 1], [30, 0]);
  const statusOpacity = interpolate(statusP, [0, 1], [0, 1]);

  // Pulsing dot for online status
  const pulseDot = Math.sin(frame * 0.16) * 0.3 + 0.7;



  // -- Ambient glow pulse ---------------------------------------
  const ambientGlow = interpolate(
    frame % 120,
    [0, 60, 120],
    [0.04, 0.09, 0.04],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        opacity: fadeIn * fadeOut,
        background:
          "linear-gradient(160deg, #070a0e 0%, #0d121c 50%, #060911 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "0 68px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient tech grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,245,196,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,196,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          pointerEvents: "none",
        }}
      />

      {/* Ambient radial glow */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0,245,196,${ambientGlow}) 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top HUD bar */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 68,
          right: 68,
          opacity: hudP,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          paddingBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: ACCENT,
              boxShadow: `0 0 10px ${ACCENT}`,
            }}
          />
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: 3,
            }}
          >
            hendra <span style={{ color: ACCENT }}>— Mohef-Tech</span>
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 14,
            color: ACCENT,
            letterSpacing: 2,
          }}
        >
          [ 03 / 03 ]
        </span>
      </div>

      {/* Content Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 20,
        }}
      >
        {/* Accent Bar */}
        <div
          style={{
            width: `${barW}%`,
            height: 4,
            background: `linear-gradient(90deg, ${ACCENT}, rgba(0,245,196,0.3) 70%, transparent)`,
            boxShadow: `0 0 18px ${ACCENT}`,
            marginBottom: 32,
          }}
        />

        {/* Main headline */}
        <div
          style={{
            transform: `translateY(${mainY}px)`,
            opacity: mainOpacity,
          }}
        >
          <h2
            style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontSize: 64,
              fontWeight: 900,
              color: "#ffffff",
              margin: "0 0 10px 0",
              letterSpacing: "-2px",
              lineHeight: 1.12,
            }}
          >
            Semua urusan IT kamu,{" "}
            <span style={{ color: ACCENT, textShadow: `0 0 40px ${ACCENT}60` }}>
              beres di satu tempat.
            </span>
          </h2>
        </div>

        {/* Sub text */}
        <div
          style={{
            transform: `translateY(${subY}px)`,
            opacity: subOpacity,
            marginTop: 14,
            marginBottom: 28,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 34,
              fontWeight: 500,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              letterSpacing: "-0.3px",
              lineHeight: 1.35,
            }}
          >
            Chat <span style={{ color: "#ffffff", fontWeight: 800 }}>hendra</span> sekarang!
          </p>
        </div>

        {/* Online Status Pill */}
        <div
          style={{
            transform: `translateY(${statusY}px)`,
            opacity: statusOpacity,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(40, 200, 64, 0.1)",
            border: "1px solid rgba(40, 200, 64, 0.35)",
            borderRadius: 99,
            padding: "8px 18px",
            width: "fit-content",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#28c840",
              boxShadow: "0 0 8px #28c840",
              opacity: pulseDot,
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "#28c840",
              letterSpacing: "0.2px",
            }}
          >
            hendra is active • Konsultasi Cepat & Solutif
          </span>
        </div>

        {/* CTA Chips */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
          }}
        >
          <CTAHighlight
            platform="whatsapp"
            handle="0823-3674-4354"
            subtext="Simpan kontak / direct chat WhatsApp"
            accentColor={ACCENT}
            delayFrames={65}
          />
          <CTAHighlight
            platform="tiktok"
            handle="@resetsystem"
            subtext="Follow & kirim DM seputar kebutuhan IT"
            accentColor={ACCENT}
            delayFrames={95}
          />
        </div>

        {/* Bottom CTA Guide with Right-Arrow visual pointer */}
        <div
          style={{
            marginTop: 34,
            opacity: interpolate(frame, [115, 140], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: `2px solid ${ACCENT}80`,
              background: `${ACCENT}18`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `translateX(${Math.sin(frame * 0.18) * 6}px)`,
              boxShadow: `0 0 16px ${ACCENT}30`,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke={ACCENT}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.2px",
            }}
          >
            Tap link di bio atau profil di sebelah kanan 👉
          </span>
        </div>
      </div>



      {/* ── Sound Effects (SFX) ── */}
      {/* 01. Scene 3 Entrance */}
      <Sequence from={15} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx-whoosh.mp3")} volume={0.5} />
      </Sequence>

      {/* 02. WhatsApp CTA Beep */}
      <Sequence from={65} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx-ui-beep.mp3")} volume={0.55} />
      </Sequence>

      {/* 03. TikTok CTA Beep */}
      <Sequence from={95} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx-ui-beep.mp3")} volume={0.55} />
      </Sequence>


    </div>
  );
};
