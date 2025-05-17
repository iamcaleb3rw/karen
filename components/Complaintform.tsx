"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form"; // Keep the import
import { toast } from "sonner";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Phone,
  FileText,
  Bell,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ComplaintDetailsStep } from "./ComplaintDetail";
import { PreferencesStep } from "./Preferences";
import { ReviewStep } from "./Review";
import { PersonalInfoStep } from "./Personalinfo";

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

export default function ComplaintForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpCode, setOtpCode] = useState("");

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

  const { trigger, getValues } = form;

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "phoneNumber"];
        if (!isPhoneVerified) {
          toast.error("Please verify your phone number before proceeding");
          return;
        }
        break;
      case 2:
        fieldsToValidate = ["description", "location"];
        break;
      case 3:
        break;
      default:
        break;
    }

    const isValid =
      fieldsToValidate.length > 0 ? await trigger(fieldsToValidate) : true;

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  function onSubmit(values: FormValues) {
    console.log({ ...values, photo });
    toast.success("Complaint submitted", {
      description: "We've received your complaint and will review it shortly.",
    });
    form.reset();
    setPhoto(null);
    setCurrentStep(1);
    setIsPhoneVerified(false);
  }

  const sendOTP = () => {
    const phoneNumber = getValues("phoneNumber");
    if (phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsVerifying(true);
    toast.info("Sending verification code...", {
      description: `A verification code will be sent to ${phoneNumber}`,
    });

    setTimeout(() => {
      toast.success("Verification code sent", {
        description: "Please enter the code to verify your phone number",
      });
      setIsVerifying(false);
    }, 1500);
  };

  const verifyOTP = () => {
    if (otpCode.length < 6) {
      toast.error("Please enter a valid verification code");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      if (otpCode.length === 6) {
        setIsPhoneVerified(true);
        toast.success("Phone number verified");
      } else {
        toast.error("Invalid verification code");
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handlePhotoChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => setPhoto(null);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col mt-2 lg:flex-row gap-8">
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Submit a Complaint
            </h1>
            <p className="text-gray-500 mt-2">
              Please complete all steps to submit your complaint
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
                  isVerifying={isVerifying}
                  otpCode={otpCode}
                  setOtpCode={setOtpCode}
                  sendOTP={sendOTP}
                  verifyOTP={verifyOTP}
                />
              )}

              {currentStep === 2 && (
                <ComplaintDetailsStep
                  form={form}
                  photo={photo}
                  handlePhotoChange={handlePhotoChange}
                  removePhoto={removePhoto}
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
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}

            {currentStep === steps.length ? (
              <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                Submit Complaint
              </Button>
            ) : (
              <Button type="button" onClick={nextStep} disabled={isVerifying}>
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
    </div>
  );
}
