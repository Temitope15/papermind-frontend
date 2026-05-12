// Configure these once binaries are published to GitHub Releases.
// Until then, the buttons fall back to the latest release page.

export const REPO = 'Temitope15/papermind'
export const VERSION = '0.2.1'

const RELEASE_BASE = `https://github.com/${REPO}/releases/latest/download`

export type Platform = 'mac' | 'windows' | 'linux'

export const DOWNLOADS: Record<Platform, string> = {
  mac: `${RELEASE_BASE}/PaperMind-${VERSION}-arm64.dmg`,
  windows: `${RELEASE_BASE}/PaperMind.Setup.${VERSION}.exe`,
  linux: `${RELEASE_BASE}/PaperMind-${VERSION}.AppImage`,
}

export const MAC_INTEL_DOWNLOAD = `${RELEASE_BASE}/PaperMind-${VERSION}.dmg`
export const FALLBACK_URL = `https://github.com/${REPO}/releases/latest`
