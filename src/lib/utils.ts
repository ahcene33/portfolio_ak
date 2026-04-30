/**
 * Helper utilities for the front‑end.
 * • fetchJSON – simple wrapper with error handling.
 * • debounce – utility for input handling (if needed later).
 */

export async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as T;
    return data;
  } catch (err) {
    console.error('fetchJSON error →', err);
    return null;
  }
}

/**
 * Simple debounce.
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, ms = 300) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
