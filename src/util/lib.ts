export const range = (s: number, e: number, step: number = 1): number[] =>
  new Array(e - s).fill(0).map((_, i) => i * step + s);
