import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface LinePart {
  text: string;
  cls: string;
}

interface DemoLine {
  type: "comment" | "cmd" | "empty";
  text?: string;
  parts?: LinePart[];
  cursor?: boolean;
}

const lines: DemoLine[] = [
  { type: "comment", text: "# two items copied — Cmd×2 or Cmd+C then Ctrl+C" },
  {
    type: "cmd",
    parts: [
      { text: "❯", cls: "text-[#a6e3a1]" },
      { text: " API key ", cls: "text-[#a6adc8]" },
      { text: "⌘+C", cls: "text-[#cba6f7]" },
      { text: "×2", cls: "text-[#fab387] font-bold" },
      { text: " → slot 1 ✓", cls: "text-[#a6e3a1]" },
    ],
  },
  {
    type: "cmd",
    parts: [
      { text: "❯", cls: "text-[#a6e3a1]" },
      { text: " endpoint URL ", cls: "text-[#a6adc8]" },
      { text: "⌘+C", cls: "text-[#cba6f7]" },
      { text: "×3", cls: "text-[#fab387] font-bold" },
      { text: " → slot 2 ✓", cls: "text-[#a6e3a1]" },
    ],
  },
  { type: "empty" },
  { type: "comment", text: "# editor — paste in any order" },
  {
    type: "cmd",
    parts: [
      { text: "❯", cls: "text-[#a6e3a1]" },
      { text: " ⌘+V", cls: "text-[#cba6f7]" },
      { text: "×2", cls: "text-[#fab387] font-bold" },
      { text: " ← slot 1 (API key)", cls: "text-[#a6adc8]" },
    ],
  },
  {
    type: "cmd",
    parts: [
      { text: "❯", cls: "text-[#a6e3a1]" },
      { text: " ⌘+V", cls: "text-[#cba6f7]" },
      { text: "×3", cls: "text-[#fab387] font-bold" },
      { text: " ← slot 2 (endpoint)", cls: "text-[#a6adc8]" },
    ],
  },
  { type: "empty" },
  {
    type: "cmd",
    parts: [
      { text: "❯", cls: "text-[#a6e3a1]" },
      { text: " clipd search", cls: "text-[#cdd6f4]" },
      { text: " # fuzzy TUI (ratatui)", cls: "text-[#6c7086] italic" },
    ],
    cursor: true,
  },
];

export default function DemoTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [demoVideoAvailable, setDemoVideoAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/clipd-demo.mp4", { method: "HEAD" })
      .then((res) => {
        if (!cancelled && res.ok) setDemoVideoAvailable(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-24 border-b border-[#313244]">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-[#6c7086] mb-4 flex items-center justify-center gap-2">
            <span className="text-[#585b70]">{"//"}</span>
            <span className="text-[#cba6f7]">fn</span>
            <span className="text-[#a6e3a1]">demo</span>
            <span className="text-[#6c7086]">()</span>
          </div>
          <h2 className="font-mono text-[clamp(26px,3.8vw,40px)] font-bold tracking-[-1.5px] text-[#cdd6f4] mb-3">
            Multi-slot copy. Zero tab switches.
          </h2>
          <p className="text-sm text-[#a6adc8] max-w-[520px] mx-auto">
            Up to 30 slots — then fuzzy search with <span className="text-[#cdd6f4]">clipd search</span> or the GUI. Drop a
            short screen recording at <span className="text-[#fab387]">public/clipd-demo.mp4</span> and it appears below
            automatically.
          </p>
        </div>

        {demoVideoAvailable && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-[800px] mx-auto mb-12 rounded-[10px] overflow-hidden border border-[#313244] bg-[#11111b]"
            style={{ boxShadow: "0 0 0 1px #313244, 0 24px 80px rgba(0,0,0,0.45)" }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#313244] bg-[#181825]">
              <span className="font-mono text-[11px] text-[#6c7086] ml-2 flex-1 text-center">clipd — screen capture</span>
            </div>
            <video
              className="w-full block bg-black"
              src="/clipd-demo.mp4"
              controls
              playsInline
              preload="metadata"
              muted
            />
          </motion.div>
        )}

        <div
          ref={ref}
          className="bg-[#1e1e2e] border border-[#313244] rounded-[10px] overflow-hidden max-w-[720px] mx-auto"
          style={{ boxShadow: "0 0 0 1px #313244, 0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(203,166,247,0.03)" }}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#313244] bg-[#181825]">
            <span className="font-mono text-[11px] text-[#6c7086] ml-2 flex-1 text-center">clipd — multi-slot demo</span>
          </div>
          <div className="p-6 font-mono text-[13px] leading-[2] min-h-[260px]">
            {lines.map((line, i) => {
              if (line.type === "empty") {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: i * 0.4 + 0.3, duration: 0.3 }}
                  >
                    &nbsp;
                  </motion.div>
                );
              }
              if (line.type === "comment") {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                    transition={{ delay: i * 0.4 + 0.3, duration: 0.4 }}
                    className="text-[#6c7086] italic"
                  >
                    {line.text}
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                  transition={{ delay: i * 0.4 + 0.3, duration: 0.4 }}
                >
                  {line.parts!.map((part, j) => (
                    <span key={j} className={part.cls}>
                      {part.text}
                    </span>
                  ))}
                  {line.cursor && (
                    <span
                      className="inline-block w-2 h-4 bg-[#fab387] rounded-[1px] ml-0.5 align-text-bottom"
                      style={{ animation: "blink 1s step-end infinite" }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
