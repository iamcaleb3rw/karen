"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Zod schemas
const EmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const CodeSchema = z.object({
  code: z.string().length(6, { message: "Code must be 6 digits" }),
});

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const router = useRouter();

  const emailForm = useForm({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email: "" },
  });

  const codeForm = useForm({
    resolver: zodResolver(CodeSchema),
    defaultValues: { code: "" },
  });

  const handleEmailSubmit = async (data: z.infer<typeof EmailSchema>) => {
    if (!isLoaded) return;

    try {
      // Step 1: Create sign up with identifier (email only)
      await signUp.create({
        emailAddress: data.email,
      });

      // Step 2: Send OTP code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      toast.success("Verification code sent to your email.");
      setVerifying(true);
    } catch (err: any) {
      toast.error(err?.errors?.[0]?.message || "Something went wrong.");
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleCodeSubmit = async (data: z.infer<typeof CodeSchema>) => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("Account verified!");
        router.push("/");
      } else {
        toast.error("Verification not complete. Please check your code.");
        console.log(completeSignUp);
      }
    } catch (err: any) {
      toast.error(err?.errors?.[0]?.message || "Invalid verification code.");
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <div id="clerk-captcha" />
      <div className="max-w-sm mx-auto mt-10 p-4 border rounded-xl shadow space-y-6">
        {!verifying ? (
          <>
            <h1 className="text-xl font-bold text-center">Sign Up</h1>
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
              className="space-y-4"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded"
                  {...emailForm.register("email")}
                />
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                Continue
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-center">Verify Code</h1>
            <form
              onSubmit={codeForm.handleSubmit(handleCodeSubmit)}
              className="space-y-4"
            >
              <div>
                <label htmlFor="code" className="block text-sm font-medium">
                  OTP Code
                </label>
                <input
                  type="text"
                  id="code"
                  className="w-full px-3 py-2 border rounded"
                  {...codeForm.register("code")}
                />
                {codeForm.formState.errors.code && (
                  <p className="text-sm text-red-500">
                    {codeForm.formState.errors.code.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                Verify
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
