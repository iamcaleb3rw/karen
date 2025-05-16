import React from "react";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { LanguageSwitch } from "./LanguageSwitch";

const Navbar = () => {
  return (
    <nav className="text-white px-6 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <Image src={Logo} alt="Logo Image" />
        <p className="text-lg font-semibold">KarenCMS</p>
      </div>
      <div className="flex items-center gap-6">
        <div>
          <Link href="/searchdoc">
            <Button className="bg-muted/30 text-white hover:bg-muted/40 cursor-pointer">
              <Search />
              Search complaints
            </Button>
          </Link>
        </div>
        <LanguageSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
