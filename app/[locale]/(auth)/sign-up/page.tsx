// app/(auth)/sign-up/page.tsx   (or wherever your SignUpPage lives)
"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Component } from "@/components/etheral-shadow";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUser } from "@/actions/createUser";

// Import your createUser action (adjust path as needed)

//
// 1) SCHEMAS
//

// Step 1: only email
const EmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

// Step 2: add code + firstName + lastName
const CodeNameSchema = z
  .object({
    code: z.string().length(6, { message: "Code must be exactly 6 digits" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
  })
  .required();

type EmailFormData = z.infer<typeof EmailSchema>;
type CodeNameFormData = z.infer<typeof CodeNameSchema>;

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [savedEmail, setSavedEmail] = React.useState<string>(""); // keep email for createUser
  const router = useRouter();

  // Form #1: collect email
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email: "" },
  });

  // Form #2: collect code + firstName + lastName
  const codeNameForm = useForm<CodeNameFormData>({
    resolver: zodResolver(CodeNameSchema),
    defaultValues: { code: "", firstName: "", lastName: "" },
  });

  const handleEmailSubmit = async (data: EmailFormData) => {
    if (!isLoaded) return;

    try {
      await signUp.create({ emailAddress: data.email });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success("Verification code sent to your email.");
      setSavedEmail(data.email); // remember email for createUser later
      setVerifying(true); // switch to the code+name view
    } catch (err: any) {
      console.error("Error in signUp.create or prepareEmail:", err);
      toast.error(err?.errors?.[0]?.message || "Something went wrong.");
    }
  };

  // Step 2: verify code, then create user record, then log them in
  const handleCodeNameSubmit = async (data: CodeNameFormData) => {
    if (!isLoaded) return;

    try {
      // 3) Attempt to verify the code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignUp.status === "complete") {
        const sessionId = completeSignUp.createdSessionId;

        await setActive({ session: completeSignUp.createdSessionId });
        const clerkId = completeSignUp.createdUserId;
        try {
          const result = await createUser(
            savedEmail,
            data.firstName,
            data.lastName,
            clerkId
          );
          toast.success("Account verified & created!");
          console.log(result);
        } catch (err) {
          console.error("ERROR CREATING USER", err);
          toast.error("Something went wrong");
        }

        router.push("/"); // redirect to your home/dashboard
      } else {
        toast.error(
          "Verification not complete. Please check the code and try again."
        );
        console.log("Incomplete sign-up response:", completeSignUp);
      }
    } catch (err: any) {
      console.error("Error verifying code or creating user:", err);
      toast.error(err?.errors?.[0]?.message || "Invalid verification code.");
    }
  };

  //
  // 3) JSX
  //

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex flex-col justify-center px-6">
        <div className="max-w-sm w-full mx-auto space-y-6">
          <div id="clerk-captcha" />

          {!verifying ? (
            <>
              <div>
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <p className="text-muted-foreground">
                  Let&apos;s get started | create an account
                </p>
              </div>
              <hr />
              <form
                onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border rounded"
                    disabled={emailForm.formState.isSubmitting}
                    {...emailForm.register("email")}
                  />
                  {emailForm.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={emailForm.formState.isSubmitting}
                  className="w-full cursor-pointer bg-gradient-to-r from-pink-400 to-indigo-500"
                >
                  {emailForm.formState.isSubmitting ? "Sending..." : "Continue"}
                </Button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center">
                Verify & Personalize
              </h1>
              <p className="text-sm text-gray-600 text-center">
                We sent a 6-digit code to <strong>{savedEmail}</strong>. Enter
                it below, and tell us your name.
              </p>
              <form
                onSubmit={codeNameForm.handleSubmit(handleCodeNameSubmit)}
                className="space-y-4"
              >
                {/* CODE INPUT */}
                <div>
                  <label htmlFor="code" className="block text-sm font-medium">
                    OTP Code
                  </label>
                  <Input
                    type="text"
                    id="code"
                    className="w-full px-3 py-2 border rounded"
                    disabled={codeNameForm.formState.isSubmitting}
                    {...codeNameForm.register("code")}
                  />
                  {codeNameForm.formState.errors.code && (
                    <p className="text-sm text-red-500">
                      {codeNameForm.formState.errors.code.message}
                    </p>
                  )}
                </div>

                {/* FIRST NAME INPUT */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium"
                  >
                    First Name
                  </label>
                  <Input
                    type="text"
                    id="firstName"
                    className="w-full px-3 py-2 border rounded"
                    disabled={codeNameForm.formState.isSubmitting}
                    {...codeNameForm.register("firstName")}
                  />
                  {codeNameForm.formState.errors.firstName && (
                    <p className="text-sm text-red-500">
                      {codeNameForm.formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* LAST NAME INPUT */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium"
                  >
                    Last Name
                  </label>
                  <Input
                    type="text"
                    id="lastName"
                    className="w-full px-3 py-2 border rounded"
                    disabled={codeNameForm.formState.isSubmitting}
                    {...codeNameForm.register("lastName")}
                  />
                  {codeNameForm.formState.errors.lastName && (
                    <p className="text-sm text-red-500">
                      {codeNameForm.formState.errors.lastName.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={codeNameForm.formState.isSubmitting}
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  {codeNameForm.formState.isSubmitting
                    ? "Verifying & Creating..."
                    : "Verify & Create Account"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* ── RIGHT: Decorative animation ─────────────────────────────────────────────── */}
      <div className="md:flex hidden w-full h-screen justify-center items-center py-2 pr-2">
        <Component
          color="#6366f1"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
          className="rounded-md"
        />
      </div>
    </div>
  );
}
