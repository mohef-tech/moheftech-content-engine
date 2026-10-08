import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export type CodeLine = {
  text: string;
  type?: "comment" | "keyword" | "string" | "function" | "default" | "output";
};

export type TerminalWindowProps = {
  title?: string;
  lines?: CodeLine[];
  accentColor?: string;
  typingSpeed?: number; // frames per character
  fontSize?: number;
  minHeight?: number;
  delayFrames?: number;
  style?: React.CSSProperties;
  showLineNumbers?: boolean;
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
  fontSize = 15,
  minHeight = 240,
  delayFrames = 0,
  style,
  showLineNumbers = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delayFrames);

  // Window entrance
  const entranceProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.8 },
    durationInFrames: 35,
  });

  const translateY = interpolate(entranceProgress, [0, 1], [60, 0]);
  const opacity = interpolate(entranceProgress, [0, 1], [0, 1]);

  // Calculate how many characters to show (typewriter effect)
  const startDelay = 15; // frames after entrance before typing starts
  const charsVisible = Math.max(
    0,
    Math.floor((adjustedFrame - startDelay) / Math.max(1, typingSpeed))
  );

  // Cursor blink
  const cursorVisible = Math.floor(frame / 16) % 2 === 0;

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
          minHeight: fontSize + 10,
        }}
      >
        {/* Line number */}
        {showLineNumbers && (
          <span
            style={{
              color: "rgba(255,255,255,0.22)",
              fontSize: Math.max(11, fontSize - 2),
              fontFamily: "'Courier New', monospace",
              width: 28,
              textAlign: "right",
              marginRight: 16,
              userSelect: "none",
              flexShrink: 0,
            }}
          >
            {lineIndex + 1}
          </span>
        )}

        {/* Code text */}
        <span
          style={{
            color,
            fontSize,
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
                width: 8,
                height: fontSize + 1,
                background: accentColor,
                marginLeft: 2,
                verticalAlign: "middle",
                boxShadow: `0 0 8px ${accentColor}`,
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
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          background: "rgba(18, 22, 30, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.12)",
          overflow: "hidden",
          boxShadow: `0 24px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04), 0 0 35px ${accentColor}18`,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            background: "#0d1117",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            gap: 10,
          }}
        >
          {/* Traffic lights */}
          {["#ff5f57", "#ffbd2e", "#28c840"].map((color, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: color,
                opacity: 0.9,
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
              color: "rgba(255,255,255,0.45)",
              letterSpacing: 1,
            }}
          >
            {title}
          </span>

          {/* Accent dot */}
          <div
            style={{
              width: 7,
              height: 7,
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
            padding: "16px 20px 20px 20px",
            minHeight,
            boxSizing: "border-box",
          }}
        >
          {renderedLines}
        </div>
      </div>
    </div>
  );
};
