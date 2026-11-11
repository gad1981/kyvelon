import type { CubeFaceId } from "@/lib/cube-faces";

export const CUBE_ENTRY_KEY = "kyvelon-cube-entry";

export type CubeEntryPayload = {
  faceId: CubeFaceId;
  at: number;
};

/** Survives React Strict Mode remount so we don't double-consume sessionStorage. */
let consumeCache: { faceId: CubeFaceId; ok: boolean; at: number } | null =
  null;

export function markCubeEntry(faceId: CubeFaceId) {
  if (typeof window === "undefined") return;
  consumeCache = null;
  const payload: CubeEntryPayload = { faceId, at: Date.now() };
  window.sessionStorage.setItem(CUBE_ENTRY_KEY, JSON.stringify(payload));
}

export function consumeCubeEntry(faceId: CubeFaceId): boolean {
  if (typeof window === "undefined") return false;

  // Same navigation / Strict remount — reuse the first answer.
  if (
    consumeCache &&
    consumeCache.faceId === faceId &&
    Date.now() - consumeCache.at < 4000
  ) {
    return consumeCache.ok;
  }

  const raw = window.sessionStorage.getItem(CUBE_ENTRY_KEY);
  if (!raw) {
    consumeCache = { faceId, ok: false, at: Date.now() };
    return false;
  }
  try {
    const data = JSON.parse(raw) as CubeEntryPayload;
    window.sessionStorage.removeItem(CUBE_ENTRY_KEY);
    const ok = data.faceId === faceId && Date.now() - data.at < 8000;
    consumeCache = { faceId, ok, at: Date.now() };
    return ok;
  } catch {
    window.sessionStorage.removeItem(CUBE_ENTRY_KEY);
    consumeCache = { faceId, ok: false, at: Date.now() };
    return false;
  }
}
