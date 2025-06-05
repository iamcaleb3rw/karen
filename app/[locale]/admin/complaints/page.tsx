import React from "react";
import { ComplaintsTable } from "@/components/data-table";
import { z } from "zod";
import { getComplaints } from "@/actions/createComplaint";

// 1) Update schema to expect string UUIDs and top-level email
const complaintSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  location: z.string(),
  status: z.enum(["pending", "in_progress", "resolved"]),
});

const ComplaintsPage = async () => {
  const complaints = await getComplaints();

  // 2) Flatten the nested `user.email` into `email`
  const normalized = complaints.map((item) => ({
    id: item.id,
    name: item.name,
    location: item.location,
    status: item.status,
    email: item.user.email,
  }));

  // 3) Validate the new shape
  const validatedComplaints = normalized.map((c) => complaintSchema.parse(c));

  return (
    <div className="my-4">
      <ComplaintsTable data={validatedComplaints} />
    </div>
  );
};

export default ComplaintsPage;
