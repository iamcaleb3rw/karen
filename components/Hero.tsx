import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-full flex flex-col gap-12 text-center items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome</h1>
        <p className="text-md text-white/70">File a complaint in an instant</p>
      </div>
      <div className="bg-white max-w-[500px] w-full flex items-center px-3 rounded-md shadow-md">
        <Search className="text-muted-foreground" />
        <Input
          placeholder="Search for services"
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
};

export default Hero;
