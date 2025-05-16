"use client";

import * as React from "react";
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

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function LanguageSwitch() {
  // Instead of your previous states, use a single state for language:
  const [language, setLanguage] = React.useState<"eng" | "kiny">("eng");

  // Helper to toggle language
  const toggleLanguage = (lang: "eng" | "kiny") => {
    setLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="bg-transparent shadow-none cursor-pointer border-none hover:bg-muted/30 hover:text-white text-white"
      >
        <Button variant="outline">
          {/* Show current language label on button */}
          <Languages />
          {language === "eng" ? "English" : "Kinyarwanda"}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Radio-like items for language selection */}
        <DropdownMenuCheckboxItem
          checked={language === "eng"}
          onCheckedChange={() => toggleLanguage("eng")}
        >
          English (Eng)
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={language === "kiny"}
          onCheckedChange={() => toggleLanguage("kiny")}
        >
          Kinyarwanda (Kiny)
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
