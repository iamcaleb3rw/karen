import { getRequestConfig } from "next-intl/server";
import { hasLocale, Locale } from "next-intl";
import { routing } from "./routing";
// Assuming you have a type for your locales

// Optional: preload message imports
const messagesMap: Record<
  Locale,
  () => Promise<{ default: Record<string, any> }>
> = {
  en: () => import("../messages/en.json"),
  rw: () => import("../messages/rw.json"),
  fr: () => import("../messages/fr.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales as readonly string[], requested)
    ? (requested as Locale)
    : (routing.defaultLocale as Locale);

  const messages = (await messagesMap[locale]()).default;

  return {
    locale,
    messages,
  };
});
