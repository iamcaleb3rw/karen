import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./Complaintform";
import { CheckCircle2 } from "lucide-react";

interface ReviewStepProps {
  form: UseFormReturn<FormValues>;
  photo: string | null;
  isEmailVerified: boolean;
}

export function ReviewStep({ form, photo, isEmailVerified }: ReviewStepProps) {
  const formValues = form.getValues();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-medium text-gray-900">Review Details</h2>
        <p className="text-sm text-gray-500 mt-1">
          Please verify all information before submitting
        </p>
      </div>

      <div className="space-y-4">
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Personal Information</h3>
          <p className="text-sm text-gray-700">
            <strong>Name:</strong> {formValues.firstName} {formValues.lastName}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Email address:</strong> {formValues.email}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Verification Status:</strong>{" "}
            {isEmailVerified ? (
              <span className="text-green-600 inline-flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1" /> Verified
              </span>
            ) : (
              <span className="text-red-600">Not Verified</span>
            )}
          </p>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Complaint Details</h3>
          <p className="text-sm text-gray-700">
            <strong>Location:</strong> {formValues.location}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Description:</strong> {formValues.description}
          </p>
          {photo && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Attached Photo:
              </p>
              <img
                src={photo}
                alt="Complaint visual"
                className="rounded-md max-h-48 object-cover border border-gray-200"
              />
            </div>
          )}
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Preferences</h3>
          <p className="text-sm text-gray-700">
            <strong>Notifications:</strong>{" "}
            {formValues.receiveNotifications ? "Enabled" : "Disabled"}
          </p>
        </div>
      </div>
    </div>
  );
}
