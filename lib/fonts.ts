import { Inter, Pixelify_Sans } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], display: "swap" });
export const pixel = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const fontClassNames = {
  mono: "font-mono",
  serif: "font-serif",
  sans: inter.className,
  pixel: pixel.className,
};
