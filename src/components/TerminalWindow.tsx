import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

type CodeLine = {
  text: string;
  type?: "comment" | "keyword" | "string" | "function" | "default" | "output";
};

type TerminalWindowProps = {
  title?: string;
  lines?: CodeLine[];
  accentColor?: string;
  typingSpeed?: number; // frames per character
};

const TOKEN_COLORS = {
  comment: "#6a737d",
  keyword: "#ff7b72",
  string: "#a5d6ff",
  function: "#d2a8ff",
  output: "#3fb950",
  default: "#c9d1d9",
};

const DEFAULT_LINES: CodeLine[] = [
  { text: "# Initialize content engine", type: "comment" },
  { text: "import remotion from '@remotion/cli'", type: "keyword" },
  { text: "" },
  { text: "const config = {", type: "default" },
  { text: "  width: 1080,", type: "string" },
  { text: "  height: 1920,", type: "string" },
  { text: "  fps: 30,", type: "string" },
  { text: "}", type: "default" },
  { text: "" },
  { text: "// Render video", type: "comment" },
  { text: "await remotion.render(config)", type: "function" },
  { text: "" },
  { text: "✓ Done! Output: output.mp4", type: "output" },
];

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = "terminal — content-engine",
  lines = DEFAULT_LINES,
  accentColor = "#00f5c4",
  typingSpeed = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Window entrance
  const entranceProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.8 },
    durationInFrames: 35,
  });

  const translateY = interpolate(entranceProgress, [0, 1], [80, 0]);
  const opacity = interpolate(entranceProgress, [0, 1], [0, 1]);

  // Calculate how many characters to show (typewriter effect)
  const totalChars = lines.reduce((acc, line) => acc + line.text.length + 1, 0);
  const startDelay = 20; // frames before typing starts
  const charsVisible = Math.max(
    0,
    Math.floor((frame - startDelay) / typingSpeed)
  );

  // Cursor blink
  const cursorVisible = Math.floor(frame / 18) % 2 === 0;

  // Render lines with typewriter
  let charCount = 0;
  const renderedLines = lines.map((line, lineIndex) => {
    const lineStart = charCount;
    const lineEnd = charCount + line.text.length;
    charCount += line.text.length + 1; // +1 for newline

    const visibleText = line.text.slice(
      0,
      Math.max(0, charsVisible - lineStart)
    );
    const isCurrentLine =
      charsVisible >= lineStart && charsVisible <= lineEnd;
    const isRendered = charsVisible > lineStart;

    if (!isRendered && !isCurrentLine) return null;

    const color = TOKEN_COLORS[line.type ?? "default"];

    return (
      <div
        key={lineIndex}
        style={{
          display: "flex",
          alignItems: "center",
          minHeight: 26,
        }}
      >
        {/* Line number */}
        <span
          style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: 13,
            fontFamily: "'Courier New', monospace",
            width: 32,
            textAlign: "right",
            marginRight: 20,
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          {lineIndex + 1}
        </span>

        {/* Code text */}
        <span
          style={{
            color,
            fontSize: 15,
            fontFamily: "'Courier New', 'Fira Code', monospace",
            letterSpacing: 0.3,
            whiteSpace: "pre",
          }}
        >
          {line.type === "output" && (
            <span style={{ color: accentColor, marginRight: 6 }}>$</span>
          )}
          {visibleText}
          {isCurrentLine && cursorVisible && (
            <span
              style={{
                display: "inline-block",
                width: 9,
                height: 16,
                background: accentColor,
                marginLeft: 1,
                verticalAlign: "middle",
                boxShadow: `0 0 6px ${accentColor}`,
              }}
            />
          )}
        </span>
      </div>
    );
  });

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        width: "100%",
        padding: "0 48px",
        boxSizing: "border-box",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          background: "#161b22",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
          boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), 0 0 40px ${accentColor}15`,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 18px",
            background: "#0d1117",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            gap: 12,
          }}
        >
          {/* Traffic lights */}
          {["#ff5f57", "#ffbd2e", "#28c840"].map((color, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: color,
                opacity: 0.85,
              }}
            />
          ))}

          {/* Title */}
          <span
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: "'Courier New', monospace",
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: 1,
            }}
          >
            {title}
          </span>

          {/* Accent dot */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: accentColor,
              boxShadow: `0 0 6px ${accentColor}`,
              opacity: cursorVisible ? 1 : 0.4,
            }}
          />
        </div>

        {/* Code body */}
        <div
          style={{
            padding: "20px 0 24px 0",
            minHeight: 260,
          }}
        >
          {renderedLines}
        </div>
      </div>
    </div>
  );
};
