import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import LightLogo from "@/public/lightlogo.svg";
import Categories from "@/components/Categories";

export default function Home() {
  return (
    <div>
      <header className="min-h-[50vh] border-b bg-indigo-500">
        <div className="relative overflow-hidden">
          <Navbar />
          <div className="h-[calc(50vh-20px)]">
            <Hero />
          </div>
          <Image
            src={LightLogo}
            alt="Logo Illustration"
            className="absolute -bottom-14 -right-10"
            width={200}
          />
        </div>
      </header>
      <main>
        <Categories />
      </main>
    </div>
  );
}
