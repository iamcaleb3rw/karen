import React from "react";

import CopyIdButton from "@/components/CopyIdButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TickAnimation from "@/components/LottieAnimation";

const DocSuccessPage = async ({
  params,
}: {
  params: Promise<{ docId: string }>;
}) => {
  const { docId } = await params;

  return (
    <div className="flex items-center flex-col text-center justify-center min-h-screen">
      <TickAnimation />
      {/* Assuming LottieAnimation is also a Client Component if it uses browser APIs */}
      <p className="text-xl font-bold">
        You complaint was received by the governing body.
      </p>
      <div>
        Use this Id to track the progress of your complaint: <br />
        <div className="flex flex-col gap-3">
          <div className="bg-muted p-2 font-bold rounded-sm border shadow-sm">
            {docId}
          </div>
          {/* Use the Client Component and pass the docId */}
          <CopyIdButton docId={docId} />
        </div>
      </div>
      <div className="mt-14">
        <Link href={"/"}>
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default DocSuccessPage;
