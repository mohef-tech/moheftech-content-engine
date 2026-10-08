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
import { TerminalWindow } from "../../components/TerminalWindow";

const ACCENT = "#00f5c4";
const SCENE_DURATION = 450; // 15s @ 30fps

export const Scene2_SolutionCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -- Scene fade out -------------------------------------------
  const fadeOut = interpolate(
    frame,
    [SCENE_DURATION - 15, SCENE_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  // -- Top HUD & Branding entrance ------------------------------
  const hudP = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.8 },
    durationInFrames: 25,
  });

  // -- Section heading entrance ---------------------------------
  const titleP = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.8 },
    durationInFrames: 30,
  });
  const titleY = interpolate(titleP, [0, 1], [30, 0]);
  const titleOpacity = interpolate(titleP, [0, 1], [0, 1]);

  // -- Card 1 Animation (Service & Upgrade) ---------------------
  const card1P = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 18, stiffness: 90, mass: 1 },
    durationInFrames: 35,
  });
  const card1Y = interpolate(card1P, [0, 1], [50, 0]);
  const card1Opacity = interpolate(card1P, [0, 1], [0, 1]);
  // Speed boost bar
  const speedBarW = interpolate(frame, [50, 110], [15, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // -- Card 2 Animation (Software & App) ------------------------
  const card2P = spring({
    frame: Math.max(0, frame - 145),
    fps,
    config: { damping: 18, stiffness: 90, mass: 1 },
    durationInFrames: 35,
  });
  const card2Y = interpolate(card2P, [0, 1], [50, 0]);
  const card2Opacity = interpolate(card2P, [0, 1], [0, 1]);

  // -- Card 3 Animation (IT Consult) ----------------------------
  const card3P = spring({
    frame: Math.max(0, frame - 265),
    fps,
    config: { damping: 18, stiffness: 90, mass: 1 },
    durationInFrames: 35,
  });
  const card3Y = interpolate(card3P, [0, 1], [50, 0]);
  const card3Opacity = interpolate(card3P, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        opacity: fadeOut,
        background:
          "linear-gradient(160deg, #070a0e 0%, #0d121c 50%, #060911 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "0 64px",
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

      {/* Radial neon glow */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,245,196,0.05) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      {/* Top HUD bar */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 64,
          right: 64,
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
          [ 02 / 03 ]
        </span>
      </div>

      {/* Section Title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          marginTop: 40,
          marginBottom: 28,
        }}
      >
        <h2
          style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontSize: 54,
            fontWeight: 900,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
          }}
        >
          Solusi IT{" "}
          <span style={{ color: ACCENT, textShadow: `0 0 35px ${ACCENT}60` }}>
            All-in-One
          </span>
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            fontWeight: 500,
            color: "rgba(255,255,255,0.45)",
            margin: "8px 0 0",
          }}
        >
          dari hendra — Mohef-Tech
        </p>
      </div>

      {/* 3 Pillars Solution Cards Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
        }}
      >
        {/* CARD 1: Service & Upgrade */}
        <div
          style={{
            transform: `translateY(${card1Y}px)`,
            opacity: card1Opacity,
            background: "rgba(12, 17, 26, 0.92)",
            backdropFilter: "blur(20px)",
            border: `1.5px solid ${frame >= 30 && frame < 145 ? ACCENT : "rgba(255,255,255,0.12)"}`,
            borderRadius: 22,
            padding: "20px 28px",
            boxShadow:
              frame >= 30 && frame < 145
                ? `0 12px 35px ${ACCENT}22, 0 0 25px ${ACCENT}15`
                : "0 8px 30px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            transition: "border 0.3s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: `${ACCENT}18`,
                border: `1.5px solid ${ACCENT}45`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {/* Tool / Upgrade Icon */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                  stroke={ACCENT}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Service & Upgrade
                </span>
                <span
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 13,
                    color: ACCENT,
                    fontWeight: 700,
                    letterSpacing: 1,
                    background: `${ACCENT}15`,
                    padding: "4px 10px",
                    borderRadius: 8,
                    border: `1px solid ${ACCENT}40`,
                  }}
                >
                  SAVE BUDGET
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 17,
                  color: "rgba(255,255,255,0.65)",
                  margin: "6px 0 0",
                  lineHeight: 1.4,
                }}
              >
                Laptop/PC lemot & bermasalah? Cukup upgrade biar ngebut lagi, gak perlu beli baru!
              </p>
            </div>
          </div>

          {/* Interactive Benchmark Element */}
          <div
            style={{
              background: "rgba(0,0,0,0.35)",
              borderRadius: 14,
              padding: "12px 18px",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                SPEED BENCHMARK: HDD ➔ NVMe Gen4 + DUAL RAM
              </span>
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 13,
                  color: ACCENT,
                  fontWeight: 700,
                }}
              >
                +300% NGEBUT
              </span>
            </div>
            {/* Speed Progress Bar */}
            <div
              style={{
                width: "100%",
                height: 6,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${speedBarW}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, #ffbd2e, ${ACCENT})`,
                  borderRadius: 99,
                  boxShadow: `0 0 10px ${ACCENT}`,
                }}
              />
            </div>
          </div>
        </div>

        {/* CARD 2: Software & App + Embedded TerminalWindow */}
        <div
          style={{
            transform: `translateY(${card2Y}px)`,
            opacity: card2Opacity,
            background: "rgba(12, 17, 26, 0.92)",
            backdropFilter: "blur(20px)",
            border: `1.5px solid ${frame >= 145 && frame < 265 ? ACCENT : "rgba(255,255,255,0.12)"}`,
            borderRadius: 22,
            padding: "20px 28px",
            boxShadow:
              frame >= 145 && frame < 265
                ? `0 12px 35px ${ACCENT}22, 0 0 25px ${ACCENT}15`
                : "0 8px 30px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            transition: "border 0.3s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: `${ACCENT}18`,
                border: `1.5px solid ${ACCENT}45`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {/* Code window icon */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <polyline points="16 18 22 12 16 6" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="8 6 2 12 8 18" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Software & App
                </span>
                <span
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 13,
                    color: "#a5d6ff",
                    fontWeight: 700,
                    letterSpacing: 1,
                    background: "rgba(165, 214, 255, 0.12)",
                    padding: "4px 10px",
                    borderRadius: 8,
                    border: "1px solid rgba(165, 214, 255, 0.3)",
                  }}
                >
                  WEB & MOBILE
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 17,
                  color: "rgba(255,255,255,0.65)",
                  margin: "6px 0 0",
                  lineHeight: 1.4,
                }}
              >
                Punya ide bisnis? Apapun — kita buatkan Website modern atau Aplikasi siap pakai!
              </p>
            </div>
          </div>

          {/* Embedded TerminalWindow Interaktif */}
          <div style={{ marginTop: 2 }}>
            <TerminalWindow
              title="hendra-engine — deploy.sh"
              accentColor={ACCENT}
              fontSize={13}
              minHeight={100}
              delayFrames={160}
              typingSpeed={1.5}
              showLineNumbers={false}
              lines={[
                { text: "$ hendra build --system=web,mobile", type: "output" },
                { text: "✓ Modern UI/UX Architecture applied", type: "function" },
                { text: "✓ Deploy Success: Ready for customers!", type: "output" },
              ]}
              style={{ padding: 0 }}
            />
          </div>
        </div>

        {/* CARD 3: IT Consult & Setup */}
        <div
          style={{
            transform: `translateY(${card3Y}px)`,
            opacity: card3Opacity,
            background: "rgba(12, 17, 26, 0.92)",
            backdropFilter: "blur(20px)",
            border: `1.5px solid ${frame >= 265 ? ACCENT : "rgba(255,255,255,0.12)"}`,
            borderRadius: 22,
            padding: "20px 28px",
            boxShadow:
              frame >= 265
                ? `0 12px 35px ${ACCENT}22, 0 0 25px ${ACCENT}15`
                : "0 8px 30px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            transition: "border 0.3s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: `${ACCENT}18`,
                border: `1.5px solid ${ACCENT}45`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {/* Headset / Consult Icon */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  stroke={ACCENT}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-0.5px",
                  }}
                >
                  IT Consult & Setup
                </span>
                <span
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 13,
                    color: "#28c840",
                    fontWeight: 700,
                    letterSpacing: 1,
                    background: "rgba(40, 200, 64, 0.12)",
                    padding: "4px 10px",
                    borderRadius: 8,
                    border: "1px solid rgba(40, 200, 64, 0.35)",
                  }}
                >
                  100% GRATIS
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 17,
                  color: "rgba(255,255,255,0.65)",
                  margin: "6px 0 0",
                  lineHeight: 1.4,
                }}
              >
                Bingung rakit PC, Printer Rusak, atau Butuh Laptop bingung ambil yang gimana? Konsultasi gratis sampai beres.
              </p>
            </div>
          </div>

          {/* Interactive Feature Tags Pill */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
            {[
              "✓ Rekomendasi Sesuai Budget",
              "✓ Tanpa Boncos",
              "✓ Dampingi Sampai Nyala",
            ].map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: ACCENT,
                  background: `${ACCENT}14`,
                  border: `1px solid ${ACCENT}35`,
                  borderRadius: 8,
                  padding: "5px 12px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sound Effects (SFX) ── */}
      {/* Scene Heading */}
      <Sequence from={5} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx-whoosh.mp3")} volume={0.5} />
      </Sequence>

      {/* Card 1: Service & Upgrade */}
      <Sequence from={30} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx-whoosh.mp3")} volume={0.55} />
      </Sequence>

      {/* Card 2: Software & App */}
      <Sequence from={145} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx-whoosh.mp3")} volume={0.55} />
      </Sequence>

      {/* Card 2: Terminal Typing */}
      <Sequence from={160} durationInFrames={80}>
        <Audio src={staticFile("audio/sfx-typing.mp3")} volume={0.45} />
      </Sequence>

      {/* Card 3: IT Consult */}
      <Sequence from={265} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx-whoosh.mp3")} volume={0.55} />
      </Sequence>

      {/* Card 3: 100% Gratis Badge */}
      <Sequence from={278} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx-ui-beep.mp3")} volume={0.5} />
      </Sequence>
    </div>
  );
};
