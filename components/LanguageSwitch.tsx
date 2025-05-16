"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Languages } from "lucide-react";

export function LanguageSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current locale from pathname (assuming locale is first segment)
  const segments = pathname.split("/");
  const currentLocale = segments[1]; // e.g. "eng" or "kiny"

  // Prepare a function to switch locale
  const switchLocale = (locale: string) => {
    // Replace the first segment with the new locale
    segments[1] = locale;

    // Compose new path
    const newPathname = segments.join("/");

    // Include search params
    const search = searchParams.toString();
    const url = search ? `${newPathname}?${search}` : newPathname;

    // Navigate to new locale URL
    router.push(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="bg-transparent shadow-none cursor-pointer border-none hover:bg-muted/30 hover:text-white text-white"
      >
        <Button variant="outline">
          <Languages />
          {currentLocale === "en" ? "English" : "Kinyarwanda"}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={currentLocale === "en"}
          onCheckedChange={() => switchLocale("en")}
        >
          English(US)
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={currentLocale === "rw"}
          onCheckedChange={() => switchLocale("rw")}
        >
          Kinyarwanda
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
