"use client";
import React, { Suspense } from "react";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn, LogOut, Search, UserPlus } from "lucide-react";
import { LanguageSwitch } from "./LanguageSwitch";
import { useTranslations } from "next-intl";
import { SignOutButton, useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const t = useTranslations("HomePage");
  const { isSignedIn } = useAuth();
  return (
    <nav className="text-white px-6 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <Image src={Logo} alt="Logo Image" />
        <p className="text-lg font-semibold">KarenCMS</p>
      </div>
      <div className="flex items-center gap-6">
        {isSignedIn ? (
          <SignOutButton>
            <Button>
              <LogOut className="h-5 w-5" />
              {t("Navigation.auth.logout")}
            </Button>
          </SignOutButton>
        ) : (
          <div className="flex gap-8 text-sm">
            <Link href={"/sign-in"} className="flex items-center gap-1">
              <LogIn className="w-5 h-5" />
              {t("Navigation.auth.login")}
            </Link>
            <Link href={"/sign-up"} className="flex items-center gap-1">
              <UserPlus className="w-5 h-5" />
              {t("Navigation.auth.signup")}
            </Link>
          </div>
        )}
        <div>
          <Link href="/searchdoc">
            <Button className="bg-muted/30 text-white hover:bg-muted/40 cursor-pointer">
              <Search />
              {t("Navigation.search.text")}
            </Button>
          </Link>
        </div>
        <Suspense>
          <LanguageSwitch />
        </Suspense>
      </div>
    </nav>
  );
};

export default Navbar;
