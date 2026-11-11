"use client";

import { useEffect, useRef, useState } from "react";
import type { CubeFaceId } from "@/lib/cube-faces";
import {
  FaceSoundEngine,
  readSoundPref,
  writeSoundPref,
} from "@/lib/face-sound";

export function useFaceSound(faceId: CubeFaceId) {
  const engineRef = useRef<FaceSoundEngine | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  useEffect(() => {
    const engine = new FaceSoundEngine();
    engineRef.current = engine;
    const pref = readSoundPref();
    setEnabled(pref);

    let cancelled = false;

    async function boot() {
      if (!pref) return;
      try {
        await engine.setEnabled(true);
        await engine.enter(faceId, { chime: true });
        if (!cancelled) setNeedsGesture(false);
      } catch {
        if (!cancelled) setNeedsGesture(true);
      }
    }

    void boot();

    return () => {
      cancelled = true;
      engine.dispose();
      engineRef.current = null;
    };
    // Mount once per face page instance; face changes handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine || !enabled) return;
    void engine.enter(faceId, { chime: true }).catch(() => {
      setNeedsGesture(true);
    });
  }, [faceId, enabled]);

  async function toggle() {
    const engine = engineRef.current ?? new FaceSoundEngine();
    engineRef.current = engine;
    const next = !enabled;
    try {
      await engine.setEnabled(next);
      if (next) {
        await engine.enter(faceId, { chime: true });
        setNeedsGesture(false);
      }
      setEnabled(next);
      writeSoundPref(next);
    } catch {
      setNeedsGesture(true);
      setEnabled(false);
      writeSoundPref(false);
    }
  }

  return { enabled, needsGesture, toggle };
}
