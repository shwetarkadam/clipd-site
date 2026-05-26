import {
  CLIPD_MACOS_DMG_ARM64_URL,
  CLIPD_MACOS_INSTALL_COPY,
  CLIPD_RELEASES_URL,
  CLIPD_WINDOWS_FULL_INSTALL_COPY,
  CLIPD_WINDOWS_INSTALL_COPY,
  CLIPD_WINDOWS_ZIP_FOLDER,
  CLIPD_WINDOWS_ZIP_URL,
} from "./site";
import type { InstallGuide } from "../components/InstallSteps";

export const MACOS_INSTALL_GUIDE: InstallGuide = {
  shell: "$",
  shellHint: "Terminal · macOS 11+ · Apple Silicon",
  copyText: CLIPD_MACOS_INSTALL_COPY,
  steps: [
    {
      title: "Download the installer",
      code: [`curl -fsSL -o /tmp/Clipd.dmg \\`, `  ${CLIPD_MACOS_DMG_ARM64_URL}`],
    },
    {
      title: "Open the disk image",
      code: ["open /tmp/Clipd.dmg"],
    },
    {
      title: "Drag Clipd.app into Applications",
      note: "First launch: grant Accessibility and Input Monitoring, then restart Clipd.",
    },
  ],
  afterSteps: `No Terminal? Download Clipd-0.1.1-arm64.dmg from ${CLIPD_RELEASES_URL}`,
};

export const WINDOWS_QUICK_GUIDE: InstallGuide = {
  shell: "PS>",
  shellHint: "PowerShell · Windows 10/11 · 64-bit",
  copyText: CLIPD_WINDOWS_INSTALL_COPY,
  steps: [
    {
      title: "Download the zip to your temp folder",
      code: [
        `$zip = "$env:TEMP\\Clipd.zip"`,
        `Invoke-WebRequest -Uri "${CLIPD_WINDOWS_ZIP_URL}" -OutFile $zip`,
      ],
    },
    {
      title: "Extract the archive",
      code: ["Expand-Archive -Path $zip -DestinationPath $env:TEMP -Force"],
    },
    {
      title: "Launch Clipd",
      code: [`Start-Process "$env:TEMP\\${CLIPD_WINDOWS_ZIP_FOLDER}\\clipd-ui.exe"`],
      note: "Look for the tray icon bottom-right. SmartScreen may ask you to allow the app once.",
    },
  ],
  afterSteps: `Prefer a manual download? Get ${CLIPD_WINDOWS_ZIP_FOLDER}.zip from GitHub Releases.`,
};

export const WINDOWS_FULL_INSTALL_GUIDE: InstallGuide = {
  shell: "PS>",
  shellHint: "PowerShell · full install to %LOCALAPPDATA%\\Clipd + PATH",
  copyText: CLIPD_WINDOWS_FULL_INSTALL_COPY,
  steps: [
    {
      title: "Download and extract",
      code: [
        `$u = "${CLIPD_WINDOWS_ZIP_URL}"`,
        `$z = "$env:TEMP\\Clipd.zip"`,
        "Invoke-WebRequest -Uri $u -OutFile $z -UseBasicParsing",
        "Expand-Archive -Path $z -DestinationPath $env:TEMP -Force",
      ],
    },
    {
      title: "Install to AppData and add PATH",
      code: [
        `$d = "$env:LOCALAPPDATA\\Clipd"`,
        `$f = "${CLIPD_WINDOWS_ZIP_FOLDER}"`,
        "New-Item -ItemType Directory -Path $d -Force | Out-Null",
        'Copy-Item "$env:TEMP\\$f\\*.exe" $d -Force',
        '$p = [Environment]::GetEnvironmentVariable("Path", "User")',
        'if ($p -notlike "*$d*") { [Environment]::SetEnvironmentVariable("Path", "$p;$d", "User") }',
      ],
    },
    {
      title: "Start Clipd",
      code: ['Start-Process "$d\\clipd-ui.exe"'],
    },
  ],
};
