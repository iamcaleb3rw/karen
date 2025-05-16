"use client";
import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const Hero = () => {
  const t = useTranslations("HomePage");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative h-full flex flex-col gap-12 text-center items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
        <p className="text-md text-white/70">{t("tagline")}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="bg-white focus-visible:ring-2 max-w-[707px] w-full flex items-center px-3 rounded-md shadow-md"
      >
        <Search className="text-muted-foreground" />
        <Input
          placeholder={t("search")}
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
