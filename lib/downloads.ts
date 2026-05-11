// Configure these once binaries are published to GitHub Releases.
// Until then, the buttons fall back to the latest release page.

export const REPO = 'Temitope15/papermind'
export const VERSION = '0.2.0'

const RELEASE_BASE = `https://github.com/${REPO}/releases/latest/download`

export const DOWNLOADS = {
  mac: `${RELEASE_BASE}/PaperMind-${VERSION}.dmg`,
  macArm: `${RELEASE_BASE}/PaperMind-${VERSION}-arm64.dmg`,
  windows: `${RELEASE_BASE}/PaperMind.Setup.${VERSION}.exe`,
  linux: `${RELEASE_BASE}/PaperMind-${VERSION}.AppImage`,
  fallback: `https://github.com/${REPO}/releases/latest`,
} as const

export type Platform = keyof Omit<typeof DOWNLOADS, 'fallback'>
