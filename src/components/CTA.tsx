import { motion } from "motion/react";
import { LampContainer } from "./ui/lamp";
import { Button as MovingBorderButton } from "./ui/moving-border";
import { useEffect, useState } from "react";
import {
  CLIPD_CROSSPLATFORM_BRANCH_URL,
  CLIPD_GITHUB_URL,
  CLIPD_LINUX_APT_DEPS_CMD,
  CLIPD_LINUX_INSTALL_CMD,
  CLIPD_LINUX_INSTALL_DIR,
  CLIPD_MACOS_DMG_ARM64_URL,
  CLIPD_README_URL,
  CLIPD_RELEASES_URL,
  CLIPD_REQUIREMENTS_LINUX,
  CLIPD_REQUIREMENTS_MACOS,
  CLIPD_REQUIREMENTS_WINDOWS,
  CLIPD_WINDOWS_INSTALL_DIR,
  CLIPD_WINDOWS_ZIP_FOLDER,
  CLIPD_WINDOWS_ZIP_URL,
} from "../lib/site";
import { MACOS_INSTALL_GUIDE, WINDOWS_FULL_INSTALL_GUIDE, WINDOWS_QUICK_GUIDE } from "../lib/install-guides";
import InstallSteps from "./InstallSteps";

type Platform = "macos" | "linux" | "windows";

function platformFromLocation(): Platform | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const p = params.get("platform");
  if (p === "macos" || p === "linux" || p === "windows") return p;
  return null;
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className={`shrink-0 px-2.5 py-1 text-[11px] font-mono rounded border transition-all cursor-pointer ${
        copied
          ? "text-[#a6e3a1] border-[#a6e3a1] bg-[#a6e3a1]/10"
          : "text-[#6c7086] border-[#45475a] bg-[#313244] hover:text-[#cdd6f4] hover:bg-[#45475a]"
      }`}
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}

function PlatformTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 font-mono text-[12px] border rounded-md transition-colors ${
        active
          ? "border-[#89b4fa] bg-[#89b4fa]/10 text-[#cdd6f4]"
          : "border-[#45475a] bg-transparent text-[#6c7086] hover:text-[#bac2de] hover:border-[#585b70]"
      }`}
    >
      {children}
    </button>
  );
}

function ReleaseDownloadCallout() {
  return (
    <div className="max-w-[min(100%,560px)] mx-auto mb-8 px-2 text-left border border-[#45475a] rounded-lg bg-[#11111b]/90 p-5">
      <div className="font-mono text-[11px] text-[#94e2d5] uppercase tracking-[1.5px] mb-2">
        Prefer a direct download?
      </div>
      <p className="text-[13px] text-[#a6adc8] leading-[1.7] mb-3">
        Every release includes ready-to-install builds on{" "}
        <a href={CLIPD_RELEASES_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
          GitHub Releases
        </a>
        . Download the latest <strong className="text-[#cdd6f4] font-normal">.dmg</strong> or{" "}
        <strong className="text-[#cdd6f4] font-normal">.zip</strong> for your platform — no terminal required.
      </p>
      <ul className="text-[12px] text-[#a6adc8] leading-[1.7] list-disc list-inside space-y-1.5 font-mono">
        <li>
          <span className="text-[#fab387]">macOS</span> —{" "}
          <a href={CLIPD_MACOS_DMG_ARM64_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
            <code className="text-[#89b4fa]">Clipd-0.1.1-arm64.dmg</code>
          </a>{" "}
          → open, drag <strong className="text-[#cdd6f4] font-normal">Clipd.app</strong> to Applications
        </li>
        <li>
          <span className="text-[#fab387]">Windows</span> —{" "}
          <a href={CLIPD_WINDOWS_ZIP_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
            <code className="text-[#89b4fa]">Clipd-windows-x86_64-v0.1.1.zip</code>
          </a>{" "}
          → unzip, run <code className="text-[#89b4fa]">clipd-ui.exe</code>
        </li>
        <li>
          <span className="text-[#fab387]">Linux</span> —{" "}
          <code className="text-[#89b4fa]">clipd_*.deb</code>,{" "}
          <code className="text-[#89b4fa]">clipd-*.AppImage</code>, or{" "}
          <code className="text-[#89b4fa]">Clipd-linux-x86_64-*.zip</code>
        </li>
      </ul>
    </div>
  );
}

export default function CTA() {
  const [platform, setPlatform] = useState<Platform>("macos");
  const waitlistAction = import.meta.env.PUBLIC_SYNC_WAITLIST_FORM_ACTION as string | undefined;
  const waitlistEnabled = Boolean(waitlistAction && /^https?:\/\//i.test(waitlistAction));

  useEffect(() => {
    const fromUrl = platformFromLocation();
    if (fromUrl) setPlatform(fromUrl);
  }, []);

  return (
    <section id="install" className="relative bg-[#181825]">
      <LampContainer className="!bg-[#181825]">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="text-center"
        >
          <h2 className="font-mono text-[clamp(30px,4.5vw,48px)] font-bold tracking-[-2px] text-[#cdd6f4] mb-5">
            Stop switching tabs.
          </h2>

          <p className="text-sm text-[#a6adc8] mb-8 max-w-[560px] mx-auto leading-[1.7]">
            Pick your platform below — use a one-liner script, or download the latest{" "}
            <strong className="text-[#cdd6f4] font-normal">.dmg</strong> /{" "}
            <strong className="text-[#cdd6f4] font-normal">.zip</strong> from{" "}
            <a href={CLIPD_RELEASES_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
              GitHub Releases
            </a>
            . Open source under BSL — free for personal use.
          </p>

          <ReleaseDownloadCallout />

          <div className="flex justify-center flex-wrap gap-2 mb-8">
            <PlatformTab active={platform === "macos"} onClick={() => setPlatform("macos")}>
              macOS
            </PlatformTab>
            <PlatformTab active={platform === "linux"} onClick={() => setPlatform("linux")}>
              Linux
            </PlatformTab>
            <PlatformTab active={platform === "windows"} onClick={() => setPlatform("windows")}>
              Windows
            </PlatformTab>
          </div>

          {platform === "macos" && (
            <>
              <div className="max-w-[min(100%,560px)] mx-auto mb-8 px-2 text-left border border-[#313244] rounded-lg bg-[#11111b]/80 p-5">
                <div className="font-mono text-[11px] text-[#fab387] uppercase tracking-[1.5px] mb-2">
                  Requirements
                </div>
                <p className="text-[13px] text-[#a6adc8] leading-[1.7] mb-4">{CLIPD_REQUIREMENTS_MACOS}</p>
                <div className="font-mono text-[11px] text-[#cba6f7] uppercase tracking-[1.5px] mb-2">
                  First launch
                </div>
                <ol className="text-[13px] text-[#a6adc8] leading-[1.7] list-decimal list-inside space-y-1.5 mb-3">
                  <li>Open Clipd from Applications</li>
                  <li>
                    Grant <strong className="text-[#cdd6f4] font-normal">Accessibility</strong> and{" "}
                    <strong className="text-[#cdd6f4] font-normal">Input Monitoring</strong> when prompted
                  </li>
                  <li>Restart Clipd after granting permissions</li>
                  <li>Copy something, then use multi-tap Cmd+C or Ctrl+C to save to slot 1</li>
                </ol>
                <p className="text-[11px] text-[#585b70] font-mono">
                  Full setup guide in the{" "}
                  <a href={CLIPD_README_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
                    README
                  </a>
                  .
                </p>
              </div>

              <div className="max-w-[min(100%,560px)] mx-auto space-y-3 px-2">
                <InstallSteps guide={MACOS_INSTALL_GUIDE} />

                <p className="text-[11px] text-[#585b70] font-mono text-left px-1 leading-[1.6]">
                  Or download{" "}
                  <a href={CLIPD_MACOS_DMG_ARM64_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
                    Clipd-0.1.1-arm64.dmg
                  </a>{" "}
                  directly from{" "}
                  <a href={CLIPD_RELEASES_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
                    GitHub Releases
                  </a>
                  .
                </p>
              </div>
            </>
          )}

          {platform === "linux" && (
            <>
              <div className="max-w-[min(100%,560px)] mx-auto mb-8 px-2 text-left border border-[#313244] rounded-lg bg-[#11111b]/80 p-5">
                <div className="font-mono text-[11px] text-[#fab387] uppercase tracking-[1.5px] mb-2">
                  Requirements
                </div>
                <p className="text-[13px] text-[#a6adc8] leading-[1.7] mb-4">{CLIPD_REQUIREMENTS_LINUX}</p>
                <div className="font-mono text-[11px] text-[#cba6f7] uppercase tracking-[1.5px] mb-2">
                  What the installer does
                </div>
                <ul className="text-[13px] text-[#a6adc8] leading-[1.7] list-disc list-inside space-y-1.5 mb-4">
                  <li>Downloads the latest Linux release zip from GitHub Releases</li>
                  <li>Installs <code className="text-[#fab387]">clipd</code>, <code className="text-[#fab387]">clipd-ui</code>, and <code className="text-[#fab387]">clipd-gui</code> to <code className="text-[#fab387]">{CLIPD_LINUX_INSTALL_DIR}</code></li>
                  <li>Installs GTK/tray libraries via apt, dnf, pacman, or zypper when sudo is available</li>
                  <li>Adds a <code className="text-[#fab387]">.desktop</code> entry, icon, and XDG autostart on login</li>
                  <li>Appends <code className="text-[#fab387]">~/.local/bin</code> to your shell PATH if needed</li>
                </ul>
                <div className="font-mono text-[11px] text-[#cba6f7] uppercase tracking-[1.5px] mb-2">
                  First launch
                </div>
                <ol className="text-[13px] text-[#a6adc8] leading-[1.7] list-decimal list-inside space-y-1.5 mb-3">
                  <li>No special permissions needed — look for the tray icon after login</li>
                  <li>
                    Copy to slot N with <strong className="text-[#cdd6f4] font-normal">Ctrl+Super+N</strong>, paste with{" "}
                    <strong className="text-[#cdd6f4] font-normal">Ctrl+Super+Alt+N</strong> (N = 1–9, Super = Win/Super key)
                  </li>
                  <li>
                    Open search with <strong className="text-[#cdd6f4] font-normal">Ctrl+R</strong> or{" "}
                    <strong className="text-[#cdd6f4] font-normal">Ctrl+G</strong> for the GUI
                  </li>
                  <li>
                    Run <code className="text-[#fab387]">clipd daemon</code> for headless mode or{" "}
                    <code className="text-[#fab387]">clipd-ui</code> for the tray app
                  </li>
                </ol>
                <p className="text-[11px] text-[#585b70] font-mono">
                  From{" "}
                  <a href={CLIPD_CROSSPLATFORM_BRANCH_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
                    dev/crossplatform-changes
                  </a>
                  .
                </p>
              </div>

              <div className="max-w-[min(100%,560px)] mx-auto space-y-3 px-2">
                <p className="text-[11px] text-[#585b70] font-mono text-left px-1">
                  Option 1 — One-line install (recommended)
                </p>

                <MovingBorderButton
                  borderRadius="6px"
                  className="bg-[#181825] text-[#cdd6f4] border-[#313244] font-mono text-[11px] sm:text-xs w-full"
                  containerClassName="w-full h-auto"
                  duration={3000}
                >
                  <div className="flex flex-wrap items-center gap-2 px-4 sm:px-5 py-3 w-full text-left">
                    <span className="text-[#a6e3a1] shrink-0">$</span>
                    <span className="text-[#89b4fa] break-all">{CLIPD_LINUX_INSTALL_CMD}</span>
                    <CopyBtn text={CLIPD_LINUX_INSTALL_CMD} />
                  </div>
                </MovingBorderButton>

                <p className="text-[11px] text-[#585b70] font-mono text-left px-1 leading-[1.6]">
                  If library install fails on Debian/Ubuntu, run manually then retry:
                </p>

                <div className="border border-[#313244] rounded-md bg-[#11111b]/80 px-4 py-3 text-left">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs">
                    <span className="text-[#a6e3a1] shrink-0">$</span>
                    <span className="text-[#89b4fa] break-all">{CLIPD_LINUX_APT_DEPS_CMD}</span>
                    <CopyBtn text={CLIPD_LINUX_APT_DEPS_CMD} />
                  </div>
                </div>

                <p className="text-[11px] text-[#585b70] font-mono text-left px-1 pt-2">
                  Option 2 — Native installers from{" "}
                  <a href={CLIPD_RELEASES_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
                    GitHub Releases
                  </a>
                </p>
                <ul className="text-[11px] text-[#585b70] font-mono text-left px-1 leading-[1.7] list-disc list-inside space-y-1">
                  <li>
                    <code className="text-[#fab387]">clipd_*.deb</code> —{" "}
                    <code className="text-[#fab387]">sudo dpkg -i clipd_*.deb</code>
                  </li>
                  <li>
                    <code className="text-[#fab387]">clipd-*.AppImage</code> —{" "}
                    <code className="text-[#fab387]">chmod +x</code> then double-click
                  </li>
                  <li>
                    <code className="text-[#fab387]">Clipd-linux-x86_64-*.zip</code> — unzip and add the folder to PATH
                  </li>
                </ul>
              </div>
            </>
          )}

          {platform === "windows" && (
            <>
              <div className="max-w-[min(100%,560px)] mx-auto mb-8 px-2 text-left border border-[#313244] rounded-lg bg-[#11111b]/80 p-5">
                <div className="font-mono text-[11px] text-[#fab387] uppercase tracking-[1.5px] mb-2">
                  Requirements
                </div>
                <p className="text-[13px] text-[#a6adc8] leading-[1.7] mb-4">{CLIPD_REQUIREMENTS_WINDOWS}</p>
                <div className="font-mono text-[11px] text-[#cba6f7] uppercase tracking-[1.5px] mb-2">
                  What the installer does
                </div>
                <ul className="text-[13px] text-[#a6adc8] leading-[1.7] list-disc list-inside space-y-1.5 mb-4">
                  <li>
                    Downloads <code className="text-[#fab387]">Clipd-windows-x86_64-v0.1.1.zip</code> from GitHub
                    Releases
                  </li>
                  <li>Installs binaries to <code className="text-[#fab387]">{CLIPD_WINDOWS_INSTALL_DIR}</code></li>
                  <li>Adds Clipd to your user PATH</li>
                  <li>Launches the tray app immediately</li>
                </ul>
                <div className="font-mono text-[11px] text-[#cba6f7] uppercase tracking-[1.5px] mb-2">
                  First launch
                </div>
                <ol className="text-[13px] text-[#a6adc8] leading-[1.7] list-decimal list-inside space-y-1.5 mb-3">
                  <li>No extra permissions needed on Windows</li>
                  <li>Look for the tray icon in the system tray (bottom-right)</li>
                  <li>
                    Copy to slot N with <strong className="text-[#cdd6f4] font-normal">Ctrl+Super+N</strong>, paste with{" "}
                    <strong className="text-[#cdd6f4] font-normal">Ctrl+Super+Alt+N</strong> (N = 1–9, Super = Win key)
                  </li>
                  <li>
                    Open search with <strong className="text-[#cdd6f4] font-normal">Ctrl+R</strong> or{" "}
                    <strong className="text-[#cdd6f4] font-normal">Ctrl+G</strong> for the GUI
                  </li>
                </ol>
                <p className="text-[11px] text-[#585b70] font-mono">
                  Start Menu shortcuts and auto-start are included when you run{" "}
                  <code className="text-[#fab387]">install.ps1</code> from the zip — once release asset names match the
                  installer script on{" "}
                  <a href={CLIPD_CROSSPLATFORM_BRANCH_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
                    dev/crossplatform-changes
                  </a>
                  .
                </p>
              </div>

              <div className="max-w-[min(100%,560px)] mx-auto space-y-4 px-2">
                <p className="text-[11px] text-[#585b70] font-mono text-left px-1">
                  Option 1 — Full install (recommended)
                </p>
                <InstallSteps guide={WINDOWS_FULL_INSTALL_GUIDE} />

                <p className="text-[11px] text-[#585b70] font-mono text-left px-1 pt-2">
                  Option 2 — Quick try (download, extract, launch — no PATH changes)
                </p>
                <InstallSteps guide={WINDOWS_QUICK_GUIDE} />

                <p className="text-[11px] text-[#585b70] font-mono text-left px-1 pt-2">
                  Option 3 — Manual download:{" "}
                  <a href={CLIPD_WINDOWS_ZIP_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
                    {CLIPD_WINDOWS_ZIP_FOLDER}.zip
                  </a>
                  . Unzip and double-click <code className="text-[#fab387]">clipd-ui.exe</code>.
                </p>
              </div>
            </>
          )}

          <div className="mt-14 max-w-[480px] mx-auto px-4 text-left border border-[#313244] rounded-lg bg-[#11111b]/80 p-6">
            <div className="font-mono text-[11px] text-[#cba6f7] uppercase tracking-[1.5px] mb-3">E2E sync waitlist</div>
            <p className="text-[13px] text-[#a6adc8] leading-[1.7] mb-4">
              Hosted sync is not shipping yet. Leave your email if you want a ping when encrypted multi-machine sync is
              ready.
            </p>
            {waitlistEnabled ? (
              <form action={waitlistAction} method="POST" className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <label className="sr-only" htmlFor="waitlist-email">
                  Email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@domain.com"
                  className="flex-1 min-w-0 rounded-md border border-[#45475a] bg-[#181825] px-3 py-2.5 font-mono text-[13px] text-[#cdd6f4] placeholder:text-[#585b70] focus:border-[#89b4fa] focus:outline-none"
                />
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <button
                  type="submit"
                  className="shrink-0 rounded-md border border-[#89b4fa] bg-[#89b4fa]/10 px-5 py-2.5 font-mono text-[13px] text-[#89b4fa] hover:bg-[#89b4fa]/20 transition-colors"
                >
                  Notify me
                </button>
              </form>
            ) : (
              <p className="text-[12px] text-[#6c7086] font-mono leading-[1.6]">
                Set{" "}
                <code className="text-[#fab387]">PUBLIC_SYNC_WAITLIST_FORM_ACTION</code> to your form endpoint (e.g.
                Formspree) to enable submissions. Until then, watch{" "}
                <a href={CLIPD_RELEASES_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
                  Releases
                </a>{" "}
                or star the{" "}
                <a href={CLIPD_GITHUB_URL} className="text-[#89b4fa] hover:underline" target="_blank" rel="noreferrer">
                  repo
                </a>
                .
              </p>
            )}
          </div>

          <div className="flex justify-center flex-wrap gap-6 sm:gap-8 mt-10">
            <a
              href={CLIPD_GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-[#6c7086] flex items-center gap-2 hover:text-[#bac2de] transition-colors no-underline"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              github
            </a>
            <a
              href={CLIPD_RELEASES_URL}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-[#6c7086] flex items-center gap-2 hover:text-[#bac2de] transition-colors no-underline"
            >
              releases / changelog
            </a>
            <a
              href={CLIPD_README_URL}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-[#6c7086] flex items-center gap-2 hover:text-[#bac2de] transition-colors no-underline"
            >
              readme
            </a>
          </div>
        </motion.div>
      </LampContainer>
    </section>
  );
}
