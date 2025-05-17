import ComplaintForm from "@/components/Complaintform";
import Image from "next/image";
import React from "react";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Complaint = async ({
  params,
}: {
  params: Promise<{ locale: string; subName: string }>;
}) => {
  const { subName } = await params;
  const title = decodeURIComponent(subName);
  return (
    <div>
      <div className="border-b flex items-center justify-between px-14 sticky top-0 z-[999] bg-muted/30 backdrop-blur-md">
        <div className="flex items-center text-lg font-semibold ">
          <Image src={Logo} alt="Karen CMS" className="" />
          <p>Karen</p>
        </div>
        <div>
          <Link href={"/"}>
            <Button
              variant={"outline"}
              className="cursor-pointer hover:text-indigo-500 hover:bg-white"
            >
              <Home />
              Back to Home
            </Button>
          </Link>
        </div>
        <div>TOS</div>
      </div>
      <ComplaintForm />
    </div>
  );
};

export default Complaint;
