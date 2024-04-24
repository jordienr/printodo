import { fontClassNames } from "./fonts";

export type Font = "font-sans" | "font-serif" | "font-mono" | "font-pixel";
export const fonts = {
  sans: "font-sans",
  mono: "font-mono",
} as const;
