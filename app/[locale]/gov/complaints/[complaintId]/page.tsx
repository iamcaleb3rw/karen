// app/complaints/[complaintId]/page.tsx
import { getComplaintById } from "@/actions/complaints";
import ComplaintResponsePage from "@/components/ComplaintPage";
import { Complaint } from "@/types/complaint";

const ComplaintPage = async ({
  params,
}: {
  params: Promise<{ complaintId: string }>;
}) => {
  const { complaintId } = await params;
  const complaint = await getComplaintById(complaintId);

  if (!complaint) return <div>Complaint not found</div>;

  // Serialize dates to strings

  return <ComplaintResponsePage complaint={complaint} />;
};

export default ComplaintPage;
