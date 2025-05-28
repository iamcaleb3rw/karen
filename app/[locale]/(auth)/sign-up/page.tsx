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
      await signUp.create({ emailAddress: data.email });
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
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex flex-col justify-center px-6">
        <div className="max-w-sm w-full mx-auto space-y-6">
          <div id="clerk-captcha" />
          {!verifying ? (
            <>
              <div>
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <p className="text-muted-foreground">
                  Let's get started - Create an account
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
              <h1 className="text-2xl font-bold text-center">Verify Code</h1>
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
                    disabled={codeForm.formState.isSubmitting}
                    {...codeForm.register("code")}
                  />
                  {codeForm.formState.errors.code && (
                    <p className="text-sm text-red-500">
                      {codeForm.formState.errors.code.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={codeForm.formState.isSubmitting}
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  {codeForm.formState.isSubmitting ? "Verifying..." : "Verify"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>

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
