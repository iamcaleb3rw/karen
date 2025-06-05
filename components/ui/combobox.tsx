"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const departmentData = [
  {
    name: "Ministry of Infrastructure (MININFRA)",
    description:
      "Oversees roads, public buildings, housing, and transport infrastructure.",
  },
  {
    name: "Rwanda Utilities Regulatory Authority (RURA)",
    description:
      "Regulates utilities like water, electricity, transport, telecoms, and sanitation.",
  },
  {
    name: "Water and Sanitation Corporation (WASAC)",
    description:
      "Handles water supply and drainage systems across the country.",
  },
  {
    name: "Rwanda Energy Group (REG)",
    description:
      "Manages electricity generation, transmission, and distribution.",
  },
  {
    name: "Rwanda National Police (RNP)",
    description:
      "Maintains law and order, handles crimes and community safety.",
  },
  {
    name: "Ministry of Health (MINISANTE)",
    description:
      "Oversees health facilities, services, and public health programs.",
  },
  {
    name: "Rwanda Environment Management Authority (REMA)",
    description:
      "Handles environmental protection and pollution-related issues.",
  },
  {
    name: "Rwanda Housing Authority (RHA)",
    description: "Responsible for urban development and housing regulations.",
  },
  {
    name: "Ministry of Education (MINEDUC)",
    description:
      "Oversees public schools, quality of education, and academic services.",
  },
  {
    name: "Rwanda Transport Development Agency (RTDA)",
    description: "Develops and maintains transport infrastructure.",
  },
  {
    name: "Office of the Ombudsman",
    description:
      "Handles corruption, abuse of office, and poor service delivery.",
  },
  {
    name: "Ministry of Local Government (MINALOC)",
    description:
      "Coordinates local governance, social welfare, and community development.",
  },
  {
    name: "Rwanda Revenue Authority (RRA)",
    description: "Manages taxes, utility billing, and customs.",
  },
  {
    name: "Ministry of Public Service and Labor (MIFOTRA)",
    description:
      "Manages employment, labor relations, and civil service issues.",
  },
  {
    name: "Ministry of ICT and Innovation (MINICT)",
    description:
      "Oversees digital governance, online services, and digital literacy.",
  },
  {
    name: "Rwanda Development Board (RDB)",
    description:
      "Handles business licensing, permits, and investment services.",
  },
  {
    name: "Rwanda Consumer Protection Authority",
    description: "Handles consumer rights and complaints.",
  },
  {
    name: "National Council of Persons with Disabilities (NCPD)",
    description:
      "Addresses welfare and inclusion for persons with disabilities.",
  },
  {
    name: "Local Sector Offices (Umurenge)",
    description:
      "Frontline units of government where many complaints are first received.",
  },
  {
    name: "General Complaints",
    description: "Covers uncategorized complaints or unresolved issues.",
  },
];

interface ComboboxDemoProps {
  onSelect: (departmentName: string) => void;
}
export function ComboboxDemo({ onSelect }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? departmentData.find((framework) => framework.name === value)?.name
            : "Select framework..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[500px] p-0" side="right">
        <Command className="w-full">
          <CommandInput
            placeholder="Search framework..."
            className="h-9 w-full"
          />
          <CommandList className="w-full">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {departmentData.map((framework) => (
                <CommandItem
                  key={framework.name}
                  value={framework.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onSelect(currentValue);
                  }}
                >
                  {framework.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
