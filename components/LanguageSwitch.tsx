"use client";

import { useMemo, useState, useEffect, startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function LanguageSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const [optimisticLocale, setOptimisticLocale] = useState<string>("en");

  // Sync with actual pathname changes
  useEffect(() => {
    const locale = pathname.split("/")[1] || "en";
    setOptimisticLocale(locale);
  }, [pathname]);

  const handleLanguageChange = (newLocale: string) => {
    // Optimistically update the UI immediately
    setOptimisticLocale(newLocale);

    // Start navigation transition
    startTransition(() => {
      const segments = pathname.split("/");
      segments[1] = newLocale;
      const searchParams = new URLSearchParams(window.location.search);
      router.push(`${segments.join("/")}?${searchParams.toString()}`);
    });
  };

  const languageLabel = optimisticLocale === "rw" ? "Kinyarwanda" : "English";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-accent/30 text-white hover:text-white"
        >
          <Languages className="mr-2 h-4 w-4" />
          {languageLabel}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Select Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className="cursor-pointer flex items-center justify-between"
        >
          English
          {optimisticLocale === "en" && <Check />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleLanguageChange("rw")}
          className="cursor-pointer flex items-center justify-between"
        >
          Kinyarwanda
          {optimisticLocale === "rw" && <Check />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
