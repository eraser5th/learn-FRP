export const range = (s: number, e: number, step: number = 1) =>
  new Array(e - s).map((_, i) => i * step + s);
