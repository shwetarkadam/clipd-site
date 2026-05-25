/** Shared URLs and install strings — keep in sync with github.com/shwetarkadam/clipd README. */

export const CLIPD_REPO = "shwetarkadam/clipd" as const;
export const CLIPD_VERSION = "v0.1.0" as const;
export const CLIPD_GITHUB_URL = "https://github.com/shwetarkadam/clipd" as const;
export const CLIPD_README_URL = `${CLIPD_GITHUB_URL}/blob/main/README.md` as const;
export const CLIPD_RELEASES_URL = `${CLIPD_GITHUB_URL}/releases` as const;
export const CLIPD_RAW_INSTALL_SH =
  "https://raw.githubusercontent.com/shwetarkadam/clipd/main/install.sh" as const;
export const CLIPD_RAW_INSTALL_SH_CROSSPLATFORM =
  "https://raw.githubusercontent.com/shwetarkadam/clipd/dev/crossplatform-changes/install.sh" as const;
export const CLIPD_RAW_INSTALL_PS1 =
  "https://raw.githubusercontent.com/shwetarkadam/clipd/dev/crossplatform-changes/install.ps1" as const;
export const CLIPD_CROSSPLATFORM_BRANCH_URL =
  "https://github.com/shwetarkadam/clipd/tree/dev/crossplatform-changes" as const;
export const SITE_URL = "https://clipd.sh" as const;

/** One-line install from README (Option 1). */
export const CLIPD_INSTALL_CMD = `curl -fsSL ${CLIPD_RAW_INSTALL_SH} | bash` as const;

/** Linux one-liner — cross-platform install.sh (also supports macOS). */
export const CLIPD_LINUX_INSTALL_CMD = `curl -fsSL ${CLIPD_RAW_INSTALL_SH_CROSSPLATFORM} | bash` as const;

/** Windows one-liner (PowerShell) — from dev/crossplatform-changes; switches to /main when PR #2 merges. */
export const CLIPD_WINDOWS_INSTALL_CMD = `irm ${CLIPD_RAW_INSTALL_PS1} | iex` as const;

/** Same install via curl.exe in PowerShell (plain curl is an alias for Invoke-WebRequest). */
export const CLIPD_WINDOWS_INSTALL_CMD_CURL = `curl.exe -fsSL ${CLIPD_RAW_INSTALL_PS1} -o "$env:TEMP\\clipd-install.ps1"; powershell -NoProfile -ExecutionPolicy Bypass -File "$env:TEMP\\clipd-install.ps1"` as const;

/** Run install.ps1 from the unzipped release folder (manual download from GitHub Releases). */
export const CLIPD_WINDOWS_ZIP_INSTALL_CMD =
  "powershell -NoProfile -ExecutionPolicy Bypass -File .\\install.ps1" as const;

export const CLIPD_WINDOWS_INSTALL_DIR = "%LOCALAPPDATA%\\Clipd" as const;
export const CLIPD_LINUX_INSTALL_DIR = "~/.local/bin" as const;

export const CLIPD_REQUIREMENTS_MACOS = "macOS 11.0+ · Apple Silicon (arm64) or Intel" as const;
export const CLIPD_REQUIREMENTS_LINUX =
  "Linux x86_64 · GTK3 + tray (Debian/Ubuntu, Fedora, Arch, openSUSE)" as const;
export const CLIPD_REQUIREMENTS_WINDOWS = "Windows 10/11 · x86_64 (64-bit)" as const;

/** Debian/Ubuntu library install if the script cannot use sudo automatically. */
export const CLIPD_LINUX_APT_DEPS_CMD =
  "sudo apt-get install -y libgtk-3-0 libayatana-appindicator3-1 libdbus-1-3 libxdo3" as const;

/** @deprecated use CLIPD_REQUIREMENTS_MACOS */
export const CLIPD_REQUIREMENTS = CLIPD_REQUIREMENTS_MACOS;
