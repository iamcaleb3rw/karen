"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Button } from "./ui/button";

// Zod schemas for different steps
const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const codeSchema = z.object({
  code: z.string().min(6, { message: "Code must be 6 characters" }),
});

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [otpSent, setOtpSent] = React.useState(false);
  const [pendingEmail, setPendingEmail] = React.useState("");

  // Form for email input
  const {
    register: emailRegister,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
  });

  // Form for code verification
  const {
    register: codeRegister,
    handleSubmit: handleCodeSubmit,
    formState: { errors: codeErrors, isSubmitting: isCodeSubmitting },
  } = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
  });

  const handleSendOTP = async (data: z.infer<typeof emailSchema>) => {
    if (!isLoaded) return;

    try {
      // Create sign-in attempt
      const signInAttempt = await signIn.create({
        identifier: data.email,
        strategy: "email_code",
      });

      // Find email factor
      const emailFactor = signInAttempt.supportedFirstFactors.find(
        (f) => f.strategy === "email_code"
      );

      if (!emailFactor || !("emailAddressId" in emailFactor)) {
        throw new Error("Email code strategy not available");
      }

      // Prepare for verification
      await signIn.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId: emailFactor.emailAddressId,
      });

      setPendingEmail(data.email);
      setOtpSent(true);
      toast.success("Verification code sent", {
        description: "Check your email for the verification code",
      });
    } catch (err) {
      const stringError = JSON.stringify(err);
      toast.error(stringError);s
    }
  };

  const handleVerifyOTP = async (data: z.infer<typeof codeSchema>) => {
    if (!isLoaded) return;

    try {
      // Attempt verification
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: data.code,
      });

      if (signInAttempt.status === "complete") {
        // Set active session
        if (setActive) {
          await setActive({ session: signInAttempt.createdSessionId });
          toast.success("Signed in successfully");
          router.push("/");
        }
      }
    } catch (err) {
      toast.error("Invalid verification code. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Sign in</h1>

      {!otpSent ? (
        <form onSubmit={handleEmailSubmit(handleSendOTP)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              {...emailRegister("email")}
              className="w-full"
            />
            {emailErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {emailErrors.email.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isEmailSubmitting}
            className="w-full disabled:opacity-50"
          >
            {isEmailSubmitting ? "Sending code..." : "Send Verification Code"}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={handleCodeSubmit(handleVerifyOTP)}
          className="space-y-4"
        >
          <div>
            <p className="mb-4">Code sent to {pendingEmail}</p>
            <label htmlFor="code" className="block mb-2">
              Verification Code
            </label>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              placeholder="123456"
              {...codeRegister("code")}
              className="w-full"
            />
            {codeErrors.code && (
              <p className="text-red-500 text-sm mt-1">
                {codeErrors.code.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isCodeSubmitting}
            className="w-full disabled:opacity-50"
          >
            {isCodeSubmitting ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      )}
    </div>
  );
}
