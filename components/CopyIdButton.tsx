// components/CopyIdButton.tsx
"use client"; // This is a Client Component

import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui Button
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyIdButtonProps {
  docId: string;
}

const CopyIdButton: React.FC<CopyIdButtonProps> = ({ docId }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(docId);
      toast.success("Complaint ID copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy ID:", err);
      toast.error("Failed to copy Complaint ID.");
    }
  };

  return (
    <Button onClick={handleCopy}>
      Copy Id
      <Copy className="ml-2 h-4 w-4" /> {/* Add some margin to the icon */}
    </Button>
  );
};

export default CopyIdButton;
