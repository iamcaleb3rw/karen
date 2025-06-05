import React, { useState, useEffect } from "react";

import { updateStatus } from "@/actions/complaints";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComplaintStatus } from "@/types/complaint";
import { toast } from "sonner";

interface StatusUpdateProps {
  complaintId: string;
  currentStatus: string;
}

const allStatuses = ["pending", "in_progress", "resolved"];

/** Utility to turn `"in_progress"` → `"In Progress"` */
function formatLabel(status: string) {
  return status
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const StatusUpdate: React.FC<StatusUpdateProps> = ({
  complaintId,
  currentStatus,
}) => {
  // Local state to track which status is currently selected in the dropdown
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  // Sync local state if parent prop changes
  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus]);

  // Called when the user picks a new status from the dropdown
  const onStatusChange = async (newValue: string) => {
    const newStatus = newValue as ComplaintStatus;
    // Optimistically update the dropdown UI
    setSelectedStatus(newStatus);

    try {
      toast.info("Updating status...");
      const result = await updateStatus(complaintId, newStatus);
      toast.success("Status updated!");
      // Optionally: show a toast or notification of success
    } catch (err) {
      console.error("Error updating status:", err);
      // Roll back the selectedStatus if the API call fails
      setSelectedStatus(currentStatus);
      // Optionally: show an error notification
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor={`status-select-${complaintId}`}
        className="text-sm font-medium"
      >
        Status:
      </label>

      <Select
        onValueChange={onStatusChange}
        value={selectedStatus}
        defaultValue={selectedStatus}
      >
        {/* The trigger is the “button” you click to open the dropdown */}
        <SelectTrigger
          id={`status-select-${complaintId}`}
          className="
            w-full
            rounded-md 
            border-gray-300 
            bg-white 
            px-3 
            py-2 
            text-sm 
            font-normal 
            text-gray-700 
            shadow-sm 
            focus:border-blue-500 
            focus:outline-none 
            focus:ring-1 
            focus:ring-blue-500 
            dark:border-gray-600 
            dark:bg-gray-800 
            dark:text-gray-200 
            dark:focus:border-blue-400 
            dark:focus:ring-blue-400
          "
        >
          {/* This shows the currently selected status (or placeholder) */}
          <SelectValue placeholder="Select status..." />
        </SelectTrigger>

        {/* The dropdown content */}
        <SelectContent>
          {allStatuses.map((status) => (
            <SelectItem key={status} value={status} className="capitalize">
              {formatLabel(status)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusUpdate;
