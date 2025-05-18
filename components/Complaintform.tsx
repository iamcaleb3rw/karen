"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import axios from "axios";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Phone,
  FileText,
  Bell,
  Loader2, // Import Loader2 for the dialog
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ComplaintDetailsStep } from "./ComplaintDetail";
import { PreferencesStep } from "./Preferences";
import { ReviewStep } from "./Review";
import { PersonalInfoStep } from "./Personalinfo";
import { createUser } from "@/actions/createUser";
import { createComplaint } from "@/actions/createComplaint";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Assuming shadcn/ui Dialog

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  receiveNotifications: z.boolean(),
});

export type FormValues = z.infer<typeof formSchema>;

type Step = {
  id: number;
  title: string;
  icon: React.ReactNode;
};
interface ComplaintFormProps {
  title: string;
  departmentId: string;
  categoryId: string;
}
export default function ComplaintForm({
  title,
  departmentId,
  categoryId,
}: ComplaintFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [photo, setPhoto] = useState<string | null | any>(null);
  // const [docId, setDocId] = useState(""); // docId can be obtained from the submission response
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  // Let's use separate states for sending and verifying OTP for clarity
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uid, setUid] = useState(""); // User ID after phone verification

  // New state for the redirecting dialog
  const [showRedirectDialog, setShowRedirectDialog] = useState(false);
  // New state for the submission loading indicator (optional, dialog covers this)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps: Step[] = [
    {
      id: 1,
      title: "Personal Information",
      icon: <Phone className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Complaint Details",
      icon: <FileText className="h-5 w-5" />,
    },
    { id: 3, title: "Preferences", icon: <Bell className="h-5 w-5" /> },
    {
      id: 4,
      title: "Review & Submit",
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      description: "",
      location: "",
      receiveNotifications: false,
    },
    mode: "onChange",
  });

  const { trigger, getValues, reset } = form; // Get reset from form hook

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "phoneNumber"];
        // Validate fields for step 1
        const step1Valid = await trigger(fieldsToValidate);
        if (step1Valid) {
          // Check phone verification after field validation
          if (!isPhoneVerified) {
            toast.error("Please verify your phone number before proceeding");
            return; // Stop if not verified
          }
          setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        }
        break;
      case 2:
        fieldsToValidate = ["description", "location"];
        // Validate fields for step 2
        const step2Valid = await trigger(fieldsToValidate);
        if (step2Valid) {
          setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        }
        break;
      case 3:
        // No specific field validation needed for preferences step
        setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        break;
      default:
        // For review or any other step without specific validation
        setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        break;
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  async function onSubmit(values: FormValues) {
    // Check if UID is available before submitting
    if (!uid) {
      toast.error("Please complete phone verification before submitting.");
      // You might want to navigate back to step 1 or highlight the issue
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true); // Set submitting state
    setShowRedirectDialog(true); // Show the dialog

    try {
      const response = await createComplaint(
        title,
        values.description,
        photo,
        departmentId,
        categoryId,
        values.location,
        uid // Use the obtained uid
      );

      // No success toast here, the dialog covers the immediate feedback

      // Introduce a small delay before redirecting
      setTimeout(() => {
        router.push(`/success/${response.id}`);
      }, 1000); // 1000 milliseconds = 1 second delay
    } catch (error: any) {
      console.error("Submission error:", error);
      setShowRedirectDialog(false); // Hide dialog on error
      toast.error(`Submission failed: ${error.message || error}`);
      setIsSubmitting(false); // Reset submitting state on error
    }
    // The finally block is not strictly necessary here if the dialog is hidden on error
    // and the redirect happens on success.
    // The dialog will close automatically when the route changes on successful redirect.
  }

  const sendOTP = async () => {
    const phoneNumber = getValues("phoneNumber");

    // Validate phone number before sending OTP
    const isPhoneNumberValid = await trigger("phoneNumber");
    if (!isPhoneNumberValid) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSendingOTP(true); // Set sending OTP state
    toast.info("Sending verification code...", {
      description: `A verification code will be sent to ${phoneNumber}`,
    });

    try {
      // *** Replace with your actual API call to send OTP ***
      // Example using axios:
      // const response = await axios.post('/api/send-otp', { phoneNumber });
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      toast.success("Verification code sent", {
        description: "Please enter the code to verify your phone number",
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send verification code. Please try again.");
    } finally {
      setIsSendingOTP(false); // Reset sending OTP state
    }
  };

  const verifyOTPandCreateUser = async () => {
    if (otpCode.length < 6) {
      toast.error("Please enter a valid verification code");
      return;
    }

    setIsVerifyingOTP(true); // Set verifying OTP state
    toast.info("Verifying code...");

    try {
      const phoneNumber = getValues("phoneNumber");
      const firstName = getValues("firstName");
      const lastName = getValues("lastName");

      // *** Replace with your actual API call to verify OTP and create user ***
      // Example:
      // const verificationResponse = await verifyOTPAction(phoneNumber, otpCode);
      // const user = await createUser(phoneNumber, firstName, lastName);

      // Simulate user creation after successful verification
      const user = await createUser(phoneNumber, firstName, lastName); // Assuming createUser action handles user creation
      console.log("USER", user); // Log the created user or its ID
      setUid(user.id); // Set the obtained UID
      setIsPhoneVerified(true); // Mark as verified
      toast.success("Phone number verified successfully");
      setOtpCode(""); // Clear OTP input
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error(`Failed to verify phone number: ${error.message || error}`);
    } finally {
      setIsVerifyingOTP(false); // Reset verifying OTP state
    }
  };

  const handlePhotoChange = async (file: File | null) => {
    if (!file) {
      setPhoto(null); // Clear photo if selection is canceled or invalid
      return;
    }

    // Basic file type validation (optional but recommended)
    const acceptedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!acceptedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Please upload an image (JPG, PNG, GIF, WEBP)."
      );
      return;
    }

    // Basic file size validation (optional but recommended)
    const maxFileSizeMB = 5; // Example: 5MB
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      toast.error(`File size exceeds the maximum limit of ${maxFileSizeMB}MB.`);
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/files", formData);
      if (response.status === 200 && response.data) {
        // Check for response.data
        console.log("Upload successful:", response.data);
        // Assuming response.data contains the URL or identifier of the uploaded file
        setPhoto(response.data);
        toast.success("File uploaded successfully");
      } else {
        console.error("Image Upload Failed - Response:", response);
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const removePhoto = () => setPhoto(null);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col mt-2 lg:flex-row gap-8">
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            <p className="text-gray-500 mt-2">
              Please complete all steps to submit your {title} complaint
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-center mb-8">
              <div className="relative flex items-center w-full max-w-3xl justify-between">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center z-10"
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white ${
                        currentStep > step.id
                          ? "bg-green-500 border-green-500 text-white"
                          : currentStep === step.id
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        currentStep >= step.id
                          ? "text-primary"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                ))}
                <div className="absolute top-5 left-0 w-full px-5 flex">
                  {steps.slice(0, -1).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 flex items-center justify-center"
                    >
                      <div
                        className={`h-2 w-full ${
                          currentStep > i + 1 ? "bg-green-500" : "bg-gray-200"
                        } rounded-full`}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <Form {...form}>
            <form className="space-y-6">
              {currentStep === 1 && (
                <PersonalInfoStep
                  form={form}
                  isPhoneVerified={isPhoneVerified}
                  isVerifying={isSendingOTP || isVerifyingOTP} // Pass combined loading state
                  otpCode={otpCode}
                  setOtpCode={setOtpCode}
                  sendOTP={sendOTP}
                  verifyOTP={verifyOTPandCreateUser}
                />
              )}

              {currentStep === 2 && (
                <ComplaintDetailsStep
                  form={form}
                  photo={photo}
                  handlePhotoChange={handlePhotoChange}
                  removePhoto={removePhoto}
                  isUploading={isUploading}
                />
              )}

              {currentStep === 3 && <PreferencesStep form={form} />}

              {currentStep === 4 && (
                <ReviewStep
                  form={form}
                  photo={photo}
                  isPhoneVerified={isPhoneVerified}
                />
              )}
            </form>
          </Form>

          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={
                  isSubmitting || isSendingOTP || isVerifyingOTP || isUploading
                } // Disable during any process
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}

            {currentStep === steps.length ? (
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSubmitting || !isPhoneVerified} // Disable submit if submitting or phone not verified
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> // Show loader
                )}
                Submit Complaint
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                disabled={
                  isSubmitting || isSendingOTP || isVerifyingOTP || isUploading
                } // Disable next during any process
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[350px] bg-gray-50 rounded-lg p-6 lg:p-8 h-fit sticky top-14">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Complaint Process
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-md border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Current Step: {steps[currentStep - 1]?.title}
              </h3>
              <p className="text-sm text-gray-600">
                {currentStep === 1 &&
                  "Provide your contact information and verify your phone number."}
                {currentStep === 2 &&
                  "Describe your complaint and provide relevant details."}
                {currentStep === 3 && "Choose how you want to receive updates."}
                {currentStep === 4 &&
                  "Verify all information before submitting."}
              </p>
            </div>

            <div className="bg-white rounded-md border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                What to Expect
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    24-hour response time
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Case tracking number provided
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    SMS/email notifications
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* The Redirecting Dialog */}
      <Dialog open={showRedirectDialog} onOpenChange={setShowRedirectDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Submitting Your Complaint</DialogTitle>
            <DialogDescription>
              Please wait while we process your submission. You will be
              redirected shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
