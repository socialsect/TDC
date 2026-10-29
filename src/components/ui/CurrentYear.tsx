"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Reads the year in the browser only, so the static homepage never bakes in a stale
 * value and prerendering stays deterministic.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year}</>;
}
