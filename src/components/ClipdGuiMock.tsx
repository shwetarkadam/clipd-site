import { motion } from "motion/react";

function TagIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" className={className} aria-hidden="true">
      <path
        d="M4 12.5V5.5a1 1 0 0 1 1-1h7l8.5 8.5-7 7L4 12.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ClipBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#313244]/80 text-[#9399b2] text-[9px] leading-none">
      {children}
    </span>
  );
}

const clips = [
  {
    active: true,
    icon: "📄",
    text: "cd /Users/shwetakadam/eng_projects/clipd/clipd",
    tags: ["text", "stable"],
    time: "1w ago",
  },
  {
    icon: "{ }",
    text: "{ \"name\": \"clipd\", \"version\": \"0.1.0\", \"edition\": \"2021\" }",
    tags: ["code", "sublime_text"],
    time: "1w ago",
    mono: true,
  },
  {
    icon: "{ }",
    text: "{ \"name\": \"clipd-gui\", \"version\": \"0.1.0\" }",
    tags: ["code", "clipd-gui"],
    time: "1w ago",
    mono: true,
  },
  {
    icon: "📄",
    text: "target/release/clipd",
    tags: ["text", "stable"],
    time: "1w ago",
  },
  {
    icon: "🔗",
    text: "https://github.com/shwetarkadam/clipd",
    tags: ["url", "Brave Browser"],
    time: "1w ago",
  },
  {
    icon: "🔗",
    text: "https://shwetakadam.github.io/",
    tags: ["url", "Brave Browser"],
    time: "1w ago",
  },
];

export default function ClipdGuiMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
      className="w-full select-none"
      aria-label="clipd native GUI — searchable clipboard history with preview pane"
      role="img"
    >
      <div
        className="rounded-xl overflow-hidden border border-[#45475a]/80 bg-[#1e1e2e] text-[#cdd6f4] antialiased"
        style={{
          boxShadow:
            "0 0 0 1px rgba(69,71,90,0.5), 0 32px 100px rgba(0,0,0,0.55), 0 0 80px rgba(137,180,250,0.04)",
        }}
      >
        {/* Header */}
        <div className="px-4 pt-3.5 pb-2.5 border-b border-[#313244]/90 bg-[#181825]">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2 shrink-0">
              <TagIcon className="text-[#89b4fa]" />
              <span className="font-semibold text-[15px] tracking-[-0.02em] text-[#cdd6f4]">clipd</span>
            </div>
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#11111b] border border-[#313244] min-w-0">
              <svg viewBox="0 0 24 24" width={14} height={14} className="text-[#585b70] shrink-0" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="text-[13px] text-[#585b70] truncate">Search clips...</span>
            </div>
            <button
              type="button"
              tabIndex={-1}
              className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#313244] bg-[#11111b] text-[11px] text-[#a6adc8]"
            >
              <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-[#89b4fa] via-[#cba6f7] to-[#fab387]" />
              Catppuccin
            </button>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              {["Text", "Sessions", "Privacy"].map((label, i) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] ${
                    i === 0
                      ? "bg-[#313244] text-[#cdd6f4] border border-[#45475a]"
                      : "text-[#6c7086] border border-transparent"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
            <span className="text-[10px] text-[#585b70]">8 clips</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex min-h-[320px]">
          {/* Clip list */}
          <div className="w-[42%] border-r border-[#313244]/90 bg-[#181825]/40">
            {clips.map((clip, i) => (
              <div
                key={i}
                className={`px-3 py-2.5 border-b border-[#313244]/50 ${
                  clip.active ? "bg-[#313244]/70" : "hover:bg-[#313244]/25"
                }`}
              >
                <div className="flex items-start gap-2 min-w-0">
                  <span className={`shrink-0 text-[11px] mt-0.5 ${clip.mono ? "text-[#89b4fa] font-mono" : ""}`}>
                    {clip.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[11.5px] leading-[1.5] truncate ${
                        clip.active ? "text-[#cdd6f4] font-medium" : "text-[#a6adc8]"
                      } ${clip.mono ? "font-mono text-[10.5px]" : ""}`}
                    >
                      {clip.text}
                    </p>
                    <div className="flex flex-wrap items-center gap-1 mt-1.5">
                      {clip.tags.map((tag) => (
                        <ClipBadge key={tag}>{tag}</ClipBadge>
                      ))}
                      <span className="text-[9px] text-[#585b70] ml-auto">{clip.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Preview */}
          <div className="flex-1 flex flex-col bg-[#1e1e2e] min-w-0">
            <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-[#313244]/70">
              <div className="flex flex-wrap items-center gap-1.5">
                <ClipBadge>text</ClipBadge>
                <ClipBadge>stable</ClipBadge>
                <ClipBadge>id:842</ClipBadge>
                <ClipBadge>1w ago</ClipBadge>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-md border border-[#89b4fa]/50 text-[#89b4fa] text-[10px]">
                  Paste Settings
                </span>
                <span className="px-2.5 py-1 rounded-md border border-[#a6e3a1]/50 text-[#a6e3a1] text-[10px]">
                  Copy
                </span>
              </div>
            </div>
            <div className="flex-1 p-4">
              <div className="h-full rounded-lg border border-[#313244] bg-[#11111b] p-4 font-mono text-[11px] leading-[1.75] text-[#cdd6f4]">
                <div>cd /Users/shwetakadam/eng_projects/clipd/clipd</div>
                <div className="text-[#a6adc8]">git reset --hard claude/nostalgic-davinci-2fea33</div>
                <div className="text-[#a6adc8]">cargo build --release</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#313244]/90 bg-[#181825] flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#585b70]">
          <span>
            <span className="text-[#6c7086]">↑↓</span> Navigate
          </span>
          <span>
            <span className="text-[#6c7086]">↵</span> Copy
          </span>
          <span>
            <span className="text-[#6c7086]">⌘D</span> Delete
          </span>
          <span>
            <span className="text-[#6c7086]">⌘T</span> Theme
          </span>
          <span>
            <span className="text-[#6c7086]">Esc</span> Close
          </span>
        </div>
      </div>
    </motion.div>
  );
}
