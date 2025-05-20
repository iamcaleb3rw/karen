"use client";

import { useEffect, useState } from "react";
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
  Mail,
  FileText,
  Bell,
  Loader2,
  AlertTriangle, // Import AlertTriangle for error icon
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ComplaintDetailsStep } from "./ComplaintDetail";
import { PreferencesStep } from "./Preferences";
import { ReviewStep } from "./Review";
import { PersonalInfoStep } from "./Personalinfo";
import { createUser } from "@/actions/createUser";
import { createComplaint } from "@/actions/createComplaint";
import { useRouter } from "next/navigation";
import { useAuth, useSignUp, useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUserInfo } from "@/actions/getUserinfo";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().min(10, { message: "Please enter a email address." }),
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
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uid, setUid] = useState("");
  const { isSignedIn, isLoaded: authLoaded, userId } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();

  const [showRedirectDialog, setShowRedirectDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps: Step[] = [
    {
      id: 1,
      title: "Personal Information",
      icon: <Mail className="h-5 w-5" />,
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
      email: "",
      description: "",
      location: "",
      receiveNotifications: false,
    },
    mode: "onChange",
  });

  const { trigger, getValues, reset, setValue } = form;
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (authLoaded && userLoaded && isSignedIn && userId) {
        // Set email/phone from Clerk
        const primaryEmail = user?.emailAddresses.find(
          (email) => email.id === user?.primaryEmailAddressId
        );
        if (primaryEmail) {
          setValue("email", primaryEmail.emailAddress);
        }
        const primaryPhoneNumber = user?.phoneNumbers.find(
          (phone) => phone.id === user?.primaryPhoneNumberId
        );
        if (primaryPhoneNumber) {
          setValue("email", primaryPhoneNumber.phoneNumber); // Assuming email field is for phone
        }

        // Fetch first and last names from your database
        try {
          const userInfo = await getUserInfo(userId);
          if (userInfo) {
            setValue("firstName", userInfo.firstName || "");
            setValue("lastName", userInfo.lastName || "");
            setUid(userId);
            setIsEmailVerified(true);
          } else {
            console.warn(
              "User info not found in database for Clerk ID:",
              userId
            );
            setUid(userId);
            setIsEmailVerified(true);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
          // Handle error fetching user info
          toast.error("Failed to load user information.");
          // You might want to handle this case by keeping fields editable
          // or showing an error message.
          setUid(userId); // Still use clerkUserId as a fallback UID on error
          setIsEmailVerified(true); // Still assume verified via Clerk
        }
      } else if (authLoaded && userLoaded && !isSignedIn) {
        // Reset form for signed-out users
        reset({
          firstName: "",
          lastName: "",
          email: "",
          description: "",
          location: "",
          receiveNotifications: false,
        });
        setIsEmailVerified(false);
        setUid("");
      }
    };

    fetchUserInfo();

    // Add dependencies: authLoaded, userLoaded, isSignedIn, clerkUserId, user, setValue
  }, [authLoaded, userLoaded, isSignedIn, userId, user, setValue, reset]);
  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "email"];
        const step1Valid = await trigger(fieldsToValidate);
        if (step1Valid) {
          if (!isEmailVerified) {
            toast.error(
              "Please verify your Email address number before proceeding"
            );
            return;
          }
          setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        } else {
          toast.error("Please fill in all required fields for Personal Info.");
        }
        break;
      case 2:
        fieldsToValidate = ["description", "location"];
        const step2Valid = await trigger(fieldsToValidate);
        if (step2Valid) {
          setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        } else {
          toast.error(
            "Please fill in all required fields for Complaint Details."
          );
        }
        break;
      case 3:
        setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        break;
      default:
        setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        break;
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  async function onSubmit(values: FormValues) {
    if (!uid) {
      toast.error("Please complete email verification before submitting.");
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);
    setShowRedirectDialog(true);

    try {
      const response = await createComplaint(
        title,
        values.description,
        photo,
        departmentId,
        categoryId,
        values.location,
        uid
      );

      setTimeout(() => {
        router.push(`/success/${response.id}`);
      }, 1000);
    } catch (error: any) {
      console.error("Submission error:", error);
      setShowRedirectDialog(false);
      toast.error(`Submission failed: ${error.message || "Unknown error"}`);
      setIsSubmitting(false);
    }
  }

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    const email = getValues("email");
    const isEmailValid = await trigger("email");

    if (!isEmailValid) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSendingOTP(true);
    toast.info("Sending verification code...", {
      description: `A verification code will be sent to ${email}`,
    });

    try {
      await signUp.create({
        emailAddress: email,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      toast.success("Verification code sent", {
        description: "Please enter the code to verify email address",
      });
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast.error(
        `Failed to send verification code: ${
          error.errors?.[0]?.message || error.message || "Unknown error"
        }`
      );
    } finally {
      setIsSendingOTP(false);
    }
  };

  const verifyOTPandCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;
    setIsVerifyingOTP(true);
    toast.info("Verifying code...");
    if (otpCode.length < 6) {
      toast.error("Please enter a valid verification code");
      setIsVerifyingOTP(false);
      return;
    }

    try {
      const email = getValues("email");
      const firstName = getValues("firstName");
      const lastName = getValues("lastName");

      const signUpAttempt = await signUp?.attemptEmailAddressVerification({
        code: otpCode,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        const clerkId = signUp.createdUserId;
        const user = await createUser(email, firstName, lastName, clerkId);
        console.log("Created User:", user);
        setUid(user.id); // Set the obtained UID

        setIsEmailVerified(true);
        toast.success("Email verified successfully");
        setOtpCode(""); // Clear OTP input
      } else {
        console.error(
          "Verification failed:",
          JSON.stringify(signUpAttempt, null, 2)
        );
        toast.error(`Verification failed: Invalid code`);
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error(`Failed to verify email : ${JSON.stringify(error, null, 2)}`);
    } finally {
      setIsVerifyingOTP(false);
    }
  };

  const handlePhotoChange = async (file: File | null) => {
    if (!file) {
      setPhoto(null);
      toast.info("File selection cancelled.");
      return;
    }

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

    const maxFileSizeMB = 5;
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
        console.log("Upload successful:", response.data);
        setPhoto(response.data);
        toast.success("File uploaded successfully");
      } else {
        console.error("Image Upload Failed - Response:", response);
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`Failed to upload file: ${error.message || "Unknown error"}`);
    } finally {
      setIsUploading(false);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    toast.info("Photo removed.");
  };

  const isButtonDisabled =
    isSubmitting || isSendingOTP || isVerifyingOTP || isUploading;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div id="clerk-captcha" />
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
                  isEmailVerified={isEmailVerified}
                  isVerifying={isSendingOTP || isVerifyingOTP}
                  otpCode={otpCode}
                  setOtpCode={setOtpCode}
                  sendOTP={sendOTP}
                  isSignedIn={isSignedIn}
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
                  isEmailVerified={isEmailVerified}
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
                disabled={isButtonDisabled}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}

            {currentStep === steps.length ? (
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isButtonDisabled || !isEmailVerified}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit Complaint
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                disabled={isButtonDisabled}
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
                  "Provide your contact information and verify your emil number."}
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
