/** Shared URLs and install strings — keep in sync with github.com/shwetarkadam/clipd README. */

export const CLIPD_REPO = "shwetarkadam/clipd" as const;
export const CLIPD_VERSION = "v0.1.0" as const;
export const CLIPD_GITHUB_URL = "https://github.com/shwetarkadam/clipd" as const;
export const CLIPD_README_URL = `${CLIPD_GITHUB_URL}/blob/main/README.md` as const;
export const CLIPD_RELEASES_URL = `${CLIPD_GITHUB_URL}/releases` as const;
export const CLIPD_RELEASE_TAG = "v0.1.0" as const;

/** Actual assets on GitHub Releases (install scripts expect different names — see CLIPD_*_INSTALL_PS1_CMD). */
export const CLIPD_MACOS_DMG_ARM64_URL =
  `${CLIPD_GITHUB_URL}/releases/download/${CLIPD_RELEASE_TAG}/Clipd-0.1.1-arm64.dmg` as const;
export const CLIPD_WINDOWS_ZIP_URL =
  `${CLIPD_GITHUB_URL}/releases/download/${CLIPD_RELEASE_TAG}/Clipd-windows-x86_64-v0.1.1.zip` as const;
export const CLIPD_WINDOWS_ZIP_FOLDER = "Clipd-windows-x86_64-v0.1.1" as const;

export const CLIPD_RAW_INSTALL_SH =
  "https://raw.githubusercontent.com/shwetarkadam/clipd/main/install.sh" as const;
export const CLIPD_RAW_INSTALL_SH_CROSSPLATFORM =
  "https://raw.githubusercontent.com/shwetarkadam/clipd/dev/crossplatform-changes/install.sh" as const;
export const CLIPD_RAW_INSTALL_PS1 =
  "https://raw.githubusercontent.com/shwetarkadam/clipd/dev/crossplatform-changes/install.ps1" as const;
export const CLIPD_CROSSPLATFORM_BRANCH_URL =
  "https://github.com/shwetarkadam/clipd/tree/dev/crossplatform-changes" as const;
export const SITE_URL = "https://clipd.sh" as const;
export const CLIPD_INSTALL_SECTION_HASH = "#install" as const;

/** Readable multi-line install — copy-paste friendly. */
export const CLIPD_MACOS_INSTALL_COPY = [
  `curl -fsSL -o /tmp/Clipd.dmg ${CLIPD_MACOS_DMG_ARM64_URL}`,
  "open /tmp/Clipd.dmg",
].join("\n");

export const CLIPD_WINDOWS_INSTALL_COPY = [
  `$zip = "$env:TEMP\\Clipd.zip"`,
  `Invoke-WebRequest -Uri "${CLIPD_WINDOWS_ZIP_URL}" -OutFile $zip`,
  "Expand-Archive -Path $zip -DestinationPath $env:TEMP -Force",
  `Start-Process "$env:TEMP\\${CLIPD_WINDOWS_ZIP_FOLDER}\\clipd-ui.exe"`,
].join("\n");

export const CLIPD_WINDOWS_FULL_INSTALL_COPY = [
  `$u = "${CLIPD_WINDOWS_ZIP_URL}"`,
  `$d = "$env:LOCALAPPDATA\\Clipd"`,
  `$f = "${CLIPD_WINDOWS_ZIP_FOLDER}"`,
  "New-Item -ItemType Directory -Path $d -Force | Out-Null",
  `$z = "$env:TEMP\\Clipd.zip"`,
  "Invoke-WebRequest -Uri $u -OutFile $z -UseBasicParsing",
  "Expand-Archive -Path $z -DestinationPath $env:TEMP -Force",
  'Copy-Item "$env:TEMP\\$f\\*.exe" $d -Force',
  '$p = [Environment]::GetEnvironmentVariable("Path", "User")',
  'if ($p -notlike "*$d*") { [Environment]::SetEnvironmentVariable("Path", "$p;$d", "User") }',
  'Start-Process "$d\\clipd-ui.exe"',
].join("\n");

/** macOS one-liner — downloads the published .dmg (Apple Silicon). */
export const CLIPD_INSTALL_CMD = CLIPD_MACOS_INSTALL_COPY.replace("\n", " && ");

/** Broken until Clipd-macos-*-v*.zip is uploaded to Releases — kept for reference. */
export const CLIPD_INSTALL_SH_CMD = `curl -fsSL ${CLIPD_RAW_INSTALL_SH} | bash` as const;

/** Linux one-liner — cross-platform install.sh (also supports macOS). */
export const CLIPD_LINUX_INSTALL_CMD = `curl -fsSL ${CLIPD_RAW_INSTALL_SH_CROSSPLATFORM} | bash` as const;

/** Windows — download published zip, install to %LOCALAPPDATA%\\Clipd, add PATH, launch tray app. */
export const CLIPD_WINDOWS_INSTALL_CMD =
  `$u="${CLIPD_WINDOWS_ZIP_URL}"; $d="$env:LOCALAPPDATA\\Clipd"; $f="${CLIPD_WINDOWS_ZIP_FOLDER}"; New-Item -ItemType Directory -Path $d -Force | Out-Null; $z="$env:TEMP\\Clipd.zip"; Invoke-WebRequest -Uri $u -OutFile $z -UseBasicParsing; Expand-Archive -Path $z -DestinationPath $env:TEMP -Force; Copy-Item "$env:TEMP\\$f\\*.exe" $d -Force; $p=[Environment]::GetEnvironmentVariable("Path","User"); if ($p -notlike "*$d*") { [Environment]::SetEnvironmentVariable("Path","$p;$d","User") }; Start-Process "$d\\clipd-ui.exe"` as const;

/** Windows — download zip and launch without installing (quick try). */
export const CLIPD_WINDOWS_QUICK_CMD =
  `$u="${CLIPD_WINDOWS_ZIP_URL}"; $z="$env:TEMP\\Clipd.zip"; Invoke-WebRequest -Uri $u -OutFile $z -UseBasicParsing; Expand-Archive -Path $z -DestinationPath $env:TEMP -Force; Start-Process "$env:TEMP\\${CLIPD_WINDOWS_ZIP_FOLDER}\\clipd-ui.exe"` as const;

/** Same quick try via curl.exe (works from cmd.exe or when Invoke-WebRequest is restricted). */
export const CLIPD_WINDOWS_INSTALL_CMD_CURL =
  `curl.exe -fsSL -o "%TEMP%\\Clipd.zip" "${CLIPD_WINDOWS_ZIP_URL}" && powershell -NoProfile -Command "Expand-Archive -Path $env:TEMP\\Clipd.zip -DestinationPath $env:TEMP -Force; Start-Process ($env:TEMP+'\\${CLIPD_WINDOWS_ZIP_FOLDER}\\clipd-ui.exe')"` as const;

/** Broken until Clipd-windows-*-v0.1.0.zip matches Releases — kept for reference. */
export const CLIPD_WINDOWS_INSTALL_PS1_CMD = `irm ${CLIPD_RAW_INSTALL_PS1} | iex` as const;

/** Run install.ps1 from the unzipped release folder (also broken until asset names match the release tag). */
export const CLIPD_WINDOWS_ZIP_INSTALL_CMD =
  "powershell -NoProfile -ExecutionPolicy Bypass -File .\\install.ps1" as const;

export const CLIPD_WINDOWS_INSTALL_DIR = "%LOCALAPPDATA%\\Clipd" as const;
export const CLIPD_LINUX_INSTALL_DIR = "~/.local/bin" as const;

export const CLIPD_REQUIREMENTS_MACOS = "macOS 11.0+ · Apple Silicon (arm64)" as const;
export const CLIPD_REQUIREMENTS_LINUX =
  "Linux x86_64 · GTK3 + tray (Debian/Ubuntu, Fedora, Arch, openSUSE)" as const;
export const CLIPD_REQUIREMENTS_WINDOWS = "Windows 10/11 · x86_64 (64-bit)" as const;

/** Debian/Ubuntu library install if the script cannot use sudo automatically. */
export const CLIPD_LINUX_APT_DEPS_CMD =
  "sudo apt-get install -y libgtk-3-0 libayatana-appindicator3-1 libdbus-1-3 libxdo3" as const;

/** @deprecated use CLIPD_REQUIREMENTS_MACOS */
export const CLIPD_REQUIREMENTS = CLIPD_REQUIREMENTS_MACOS;
