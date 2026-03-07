import { en } from "./en";
import { pl } from "./pl";
import { uk } from "./uk";

export const supportedLocales = ["en", "pl", "uk"] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "pl";

export const messagesByLocale = {
  en,
  pl,
  uk,
} as const;

export const isSupportedLocale = (value: string): value is SupportedLocale =>
  supportedLocales.includes(value as SupportedLocale);
