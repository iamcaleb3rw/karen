"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { format } from "date-fns";
import { Avatar, AvatarFallback } from "./ui/avatar";
import axios from "axios";
import { toast } from "sonner";
import { Complaint, Response as ResponseType } from "@/types/complaint"; // Alias Response to avoid conflict

// Import the new ResponseHistory component
import ResponseHistory from "@/components/ResponseHistory";
import { DropdownMenu } from "./ui/dropdown-menu";
import StatusUpdate from "./StatusUpdate";

export default function ComplaintResponsePage({
  complaint: initialComplaint, // Rename prop to initialComplaint
}: {
  complaint: Complaint;
}) {
  // Use local state to manage the complaint data
  const [complaint, setComplaint] = useState<Complaint>(initialComplaint);

  const [responseText, setResponseText] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [sendEmailCopy, setSendEmailCopy] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine if there are existing responses to show follow-up form
  const hasExistingResponses =
    complaint.responses && complaint.responses.length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      complaintId: complaint.id,
      message: responseText,
      isFollowUp: hasExistingResponses,
    };

    try {
      const result = await axios.post("/api/respond", dataToSend);

      if (result.status === 200 && result.data) {
        console.log("createdAt from API:", result.data.createdAt);
        console.log("message from API:", result.data.message);
        const newResponse: ResponseType = {
          id: result.data.id, // Use the ID returned from your backend
          message: result.data.message, // Use the message returned from your backend
          createdAt: new Date(result.data.createdAt),
          // Convert string to Date object
          responder: {
            firstName: result.data.responderFirstName || "Unknown Responder",
            email: result.data.responderEmail || "unknown@example.com",
          },
        };

        // Update the local state of the complaint
        setComplaint((prevComplaint) => ({
          ...prevComplaint,
          // Append the new response to the existing responses array
          responses: [...(prevComplaint.responses || []), newResponse],
        }));

        toast.success(
          hasExistingResponses
            ? "Follow-up was sent successfully!"
            : "Response was sent successfully!"
        );
        setResponseText(""); // Clear the input field after successful submission
      } else {
        toast.error(
          "Failed to send response: No data returned or unexpected status."
        );
      }
    } catch (e) {
      console.error("Error sending response:", e);
      toast.error("Error sending response/follow-up. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg">
      {/* Header */}
      <div className="border-t-0 border grid grid-cols-1 lg:grid-cols-2 sticky top-0 bg-white z-10">
        <p className="text-sm md:text-lg p-2 font-bold border-r">
          Complaint Response Portal
        </p>
        <div className="p-2 flex items-center justify-center">
          <p className="text-xs  border flex gap-2 rounded-full bg-accent items-center w-fit px-3 font-medium">
            <span className="bg-blue-500 h-2.5 w-2.5 rounded-full"></span>
            Complaint ID: {complaint.id}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 items-start">
        {/* Complaint Details and History */}
        <div className="space-y-4">
          <Card className="h-full flex rounded-none shadow-none flex-col">
            <CardHeader className="border-b">
              <CardTitle>{complaint.name}</CardTitle>
              <CardDescription>
                Submitted at {format(new Date(complaint.createdAt), "PPP")}{" "}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-6 py-4 flex-1 overflow-y-auto">
              <div>
                <Label className="font-medium">Description</Label>
                <p className="text-muted-foreground bg-muted p-2 rounded-md">
                  {complaint.description}
                </p>
              </div>
              <div>
                <Label className="font-medium">Location</Label>
                <p className="text-muted-foreground bg-muted p-2 rounded-md">
                  {complaint.location}
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t flex flex-col gap-4 items-start p-6">
              <p className="text-sm">Submitted by</p>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarFallback className="bg-pink-500">
                    {complaint.user.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {complaint.user.firstName} {complaint.user.lastName}
                  </p>
                  <p className="text-xs font-semibold">
                    {complaint.user.email}
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Response History Section */}
          {complaint.responses && complaint.responses.length > 0 && (
            <Card className="rounded-none shadow-none p-6">
              <ResponseHistory responses={complaint.responses} />
            </Card>
          )}
        </div>

        {/* Complaint Response/Follow-up Form - FIXED HEIGHT */}
        <Card className="h-[450px] sticky top-12 rounded-none shadow-none flex flex-col">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <CardHeader className="border-b mb-4">
              <CardTitle>
                {hasExistingResponses
                  ? "Send Follow-up"
                  : "Respond to Complaint"}
              </CardTitle>
              <CardDescription>
                {hasExistingResponses
                  ? "Your follow-up will be added to the complaint history."
                  : "Your response will be sent to the complainant."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-6 py-4 flex-1 overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="response" className="text-lg">
                  {hasExistingResponses ? "Follow-up Message" : "Response"}
                </Label>
                <Textarea
                  className="min-h-[140px]"
                  id="response"
                  placeholder={
                    hasExistingResponses
                      ? "Write your follow-up here..."
                      : "Write your response here..."
                  }
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  required
                />
              </div>
              <StatusUpdate
                complaintId={complaint.id}
                currentStatus={complaint.status}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="emailCopy"
                  checked={sendEmailCopy}
                  onCheckedChange={(checked) =>
                    setSendEmailCopy(Boolean(checked))
                  }
                />
                <Label htmlFor="emailCopy">Send email copy to user</Label>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting
                  ? hasExistingResponses
                    ? "Sending Follow-up..."
                    : "Sending Response..."
                  : hasExistingResponses
                  ? "Submit Follow-up"
                  : "Submit Response"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
