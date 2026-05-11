'use client'

import { useEffect, useState } from 'react'
import type { Platform } from './downloads'

export function detectOS(): Platform | null {
  if (typeof window === 'undefined') return null

  const nav = window.navigator
  const ua = nav.userAgent || ''
  const platform =
    // @ts-expect-error userAgentData is not in lib.dom types for all targets
    (nav.userAgentData?.platform as string | undefined) || nav.platform || ''

  const haystack = `${platform} ${ua}`.toLowerCase()

  if (/mac|iphone|ipad|ipod|darwin/.test(haystack)) return 'mac'
  if (/win/.test(haystack)) return 'windows'
  if (/linux|x11|cros/.test(haystack)) return 'linux'
  return null
}

export function useDetectedOS(): Platform | null {
  const [os, setOs] = useState<Platform | null>(null)

  useEffect(() => {
    setOs(detectOS())
  }, [])

  return os
}
