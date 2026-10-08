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

const ACCENT = "#00f5c4";
const SCENE_DURATION = 210; // 7s @ 30fps

const CHIPS_DATA = [
  {
    delay: 20,
    label: "ISSUE DETECTED",
    value: "CPU 100% • DISK LEMOT • OVERHEAT",
    color: "#ff5f57",
  },
  {
    delay: 45,
    label: "CUSTOM RIG",
    value: "OPTIMAL SPECS • 144+ FPS ULTRA",
    color: "#ffbd2e",
  },
  {
    delay: 75,
    label: "DEV ENVIRONMENT",
    value: "FULLSTACK WEB & MOBILE APPS READY",
    color: ACCENT,
  },
];

export const Scene1_HookKinetik: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -- Scene fade out ------------------------------------------
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

  // -- Top HUD & Branding entrance -----------------------------
  const hudEntrance = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.8 },
    durationInFrames: 25,
  });

  // -- Line 1 - Kinetic punch "Laptop Lemot?" -------------------
  const line1P = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 10, stiffness: 220, mass: 0.5 },
    durationInFrames: 20,
  });
  const line1Scale = interpolate(line1P, [0, 1], [1.3, 1]);
  const line1Opacity = interpolate(line1P, [0, 1], [0, 1]);

  // -- Line 2 - PC Gaming / Desain (Muncul setelah Chip 3 di frame 75) --
  const line2P = spring({
    frame: Math.max(0, frame - 82),
    fps,
    config: { damping: 18, stiffness: 130, mass: 0.8 },
    durationInFrames: 22,
  });
  const line2Y = interpolate(line2P, [0, 1], [35, 0]);
  const line2Opacity = interpolate(line2P, [0, 1], [0, 1]);

  // -- Accent bar width -----------------------------------------
  const barWidth = interpolate(frame, [88, 115], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // -- Line 3 - Web & App Sendiri -------------------------------
  const line3P = spring({
    frame: Math.max(0, frame - 105),
    fps,
    config: { damping: 18, stiffness: 130, mass: 0.8 },
    durationInFrames: 22,
  });
  const line3Y = interpolate(line3P, [0, 1], [35, 0]);
  const line3Opacity = interpolate(line3P, [0, 1], [0, 1]);

  // -- Line 4 - Nanya-nanya IT apapun disini tempatnya ----------
  const line4P = spring({
    frame: Math.max(0, frame - 126),
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
    durationInFrames: 22,
  });
  const line4Y = interpolate(line4P, [0, 1], [30, 0]);
  const line4Opacity = interpolate(line4P, [0, 1], [0, 1]);

  // -- Save prompt (appears ~frame 138) ------------------------
  const saveP = spring({
    frame: Math.max(0, frame - 138),
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
    durationInFrames: 25,
  });
  const saveY = interpolate(saveP, [0, 1], [30, 0]);
  const saveEntrance = interpolate(saveP, [0, 1], [0, 1]);
  const saveGlow = Math.sin(frame * 0.16) * 0.25 + 0.75;

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
        padding: "0 72px",
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
            linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          pointerEvents: "none",
        }}
      />

      {/* Radial neon glow center */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,245,196,0.07) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      {/* Top HUD bar */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 72,
          right: 72,
          opacity: hudEntrance,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          paddingBottom: 16,
        }}
      >
        {/* Branding: hendra — Mohef-Tech */}
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

        {/* Viewfinder indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 14,
              color: ACCENT,
              letterSpacing: 2,
            }}
          >
            [ 01 / 03 ]
          </span>
        </div>
      </div>

      {/* Main headline group */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 10,
        }}
      >
        {/* Line 1 - BIG kinetic punch */}
        <div
          style={{
            transform: `scale(${line1Scale})`,
            opacity: line1Opacity,
            transformOrigin: "left center",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontSize: 96,
              fontWeight: 900,
              color: ACCENT,
              letterSpacing: "-3px",
              lineHeight: 1.05,
              textShadow: `0 0 70px ${ACCENT}60`,
            }}
          >
            Laptop Lemot?
          </span>
        </div>

        {/* 3 HUD Diagnostic Chips (Muncul bergantian & STAY kebawah) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 14,
            marginBottom: 20,
            width: "fit-content",
          }}
        >
          {CHIPS_DATA.map((chip, idx) => {
            const chipProgress = spring({
              frame: Math.max(0, frame - chip.delay),
              fps,
              config: { damping: 16, stiffness: 140, mass: 0.8 },
              durationInFrames: 22,
            });
            const chipY = interpolate(chipProgress, [0, 1], [20, 0]);
            const chipOpacity = interpolate(chipProgress, [0, 1], [0, 1]);

            if (frame < chip.delay) return null;

            return (
              <div
                key={idx}
                style={{
                  transform: `translateY(${chipY}px)`,
                  opacity: chipOpacity,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(18, 24, 38, 0.90)",
                  border: `1.5px solid ${chip.color}55`,
                  borderRadius: 12,
                  padding: "8px 18px",
                  width: "fit-content",
                  boxShadow: `0 4px 18px rgba(0,0,0,0.4), 0 0 12px ${chip.color}20`,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: chip.color,
                    boxShadow: `0 0 8px ${chip.color}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 14,
                    color: chip.color,
                    fontWeight: 700,
                    letterSpacing: 1.2,
                  }}
                >
                  [{chip.label}]
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    color: "#ffffff",
                    fontWeight: 500,
                  }}
                >
                  {chip.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Line 2 - Butuh PC Gaming / Desain */}
        <div
          style={{
            transform: `translateY(${line2Y}px)`,
            opacity: line2Opacity,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontSize: 48,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
              lineHeight: 1.2,
            }}
          >
            Butuh PC Gaming / Desain / Kerjaan?
          </span>
        </div>

        {/* Accent animated dividing bar */}
        <div
          style={{
            width: `${barWidth}%`,
            height: 3,
            background: `linear-gradient(90deg, ${ACCENT}, rgba(0,245,196,0.3) 70%, transparent)`,
            boxShadow: `0 0 16px ${ACCENT}`,
            marginTop: 16,
            marginBottom: 16,
          }}
        />

        {/* Line 3 - Web & App Sendiri */}
        <div
          style={{
            transform: `translateY(${line3Y}px)`,
            opacity: line3Opacity,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontSize: 48,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
              lineHeight: 1.2,
            }}
          >
            Atau Pengen Bikin{" "}
            <span style={{ color: ACCENT }}>Web & App Sendiri?</span>
          </span>
        </div>

        {/* Line 4 - Kalimat Tambahan Baru */}
        <div
          style={{
            transform: `translateY(${line4Y}px)`,
            opacity: line4Opacity,
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(0, 245, 196, 0.08)",
            border: `1.5px solid ${ACCENT}45`,
            borderRadius: 16,
            padding: "14px 22px",
            width: "fit-content",
            boxShadow: `0 8px 25px rgba(0,0,0,0.3), 0 0 20px ${ACCENT}15`,
          }}
        >
          <span style={{ fontSize: 24, lineHeight: 1 }}>💬</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.3,
            }}
          >
            Atau pengen nanya-nanya seputar dunia IT apapun,{" "}
            <span style={{ color: ACCENT, textShadow: `0 0 20px ${ACCENT}60` }}>
              di sini tempatnya!
            </span>
          </span>
        </div>
      </div>

      {/* Save prompt - bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 72,
          right: 72,
          transform: `translateY(${saveY}px)`,
          opacity: saveEntrance,
          display: "flex",
          alignItems: "center",
          gap: 18,
          background: "rgba(10, 15, 24, 0.92)",
          border: `1.5px solid ${ACCENT}70`,
          borderRadius: 20,
          padding: "20px 28px",
          backdropFilter: "blur(16px)",
          boxShadow: `0 16px 40px rgba(0,0,0,0.6), 0 0 ${35 * saveGlow}px ${ACCENT}30`,
        }}
      >
        {/* Bookmark SVG Icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: `${ACCENT}22`,
            border: `1px solid ${ACCENT}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
              stroke={ACCENT}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "0.2px",
              lineHeight: 1.25,
            }}
          >
            Save video ini dulu sebelum hilang,
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 600,
              color: ACCENT,
              letterSpacing: "0.1px",
            }}
          >
            karena kamu udah nemu solusi yang tepat!
          </span>
        </div>
      </div>

      {/* ── Sound Effects (SFX) ── */}
      {/* Hook Punch "Laptop Lemot?" */}
      <Sequence from={5} durationInFrames={45}>
        <Audio src={staticFile("audio/sfx-whoosh.mp3")} volume={0.65} />
      </Sequence>

      {/* Chip 1: Issue Detected */}
      <Sequence from={20} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx-ui-beep.mp3")} volume={0.5} />
      </Sequence>

      {/* Chip 2: Custom Rig */}
      <Sequence from={45} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx-ui-beep.mp3")} volume={0.5} />
      </Sequence>

      {/* Chip 3: Dev Environment */}
      <Sequence from={75} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx-ui-beep.mp3")} volume={0.55} />
      </Sequence>

      {/* Line 2: PC Gaming/Desain */}
      <Sequence from={82} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx-whoosh.mp3")} volume={0.55} />
      </Sequence>

      {/* Line 3: Web & App */}
      <Sequence from={105} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx-whoosh.mp3")} volume={0.55} />
      </Sequence>

      {/* Save Prompt */}
      <Sequence from={138} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx-ui-beep.mp3")} volume={0.5} />
      </Sequence>
    </div>
  );
};
