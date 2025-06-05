// types/complaint.ts
export type ComplaintStatus = "pending" | "in_progress" | "resolved";

export type User = {
  firstName: string | null;
  lastName: string | null;
  email: string;
};

export type Category = {
  name: string;
};

// Updated Response type to include responder name
export type Response = {
  id: string; // Add an ID for mapping in lists
  message: string;
  createdAt: Date;
  responder: {
    email: string;
    firstName: string;
  }; // To display if needed
};

export type Responder = {
  firstName: string;
  email: string;
};

export type Complaint = {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  departmentId: string;
  status: ComplaintStatus;
  categoryId: string;
  location: string;
  clerkId: string;
  // Changed from 'response: Response;' to 'responses?: Response[];'
  responses?: {
    id: string;
    createdAt: Date;
    message: string;
    responder: { firstName: string; email: string };
  }[]; // Now an optional array of responses
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  user: User;
  followUp?: boolean;
};
