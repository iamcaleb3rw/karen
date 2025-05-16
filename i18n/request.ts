import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Optional: preload message imports
const messagesMap = {
  en: () => import("../messages/en.json"),
  rw: () => import("../messages/rw.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (await messagesMap[locale]()).default;

  return {
    locale,
    messages,
  };
});
