"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().min(10),
  description: z.string().min(10),
  location: z.string().min(2),
  receiveNotifications: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface PersonalInfoStepProps {
  form: UseFormReturn<FormValues>;
  isEmailVerified: boolean;
  isVerifying: boolean;
  otpCode: string;
  isSignedIn: boolean | undefined;
  setOtpCode: (code: string) => void;
  sendOTP: (e: React.FormEvent) => void;
  verifyOTP: (e: React.FormEvent) => void;
}

export function PersonalInfoStep({
  form,
  isEmailVerified,
  isVerifying,
  otpCode,
  setOtpCode,
  sendOTP,
  verifyOTP,
  isSignedIn,
}: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-medium text-gray-900">
          Personal Information
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Please provide your contact information. We'll verify your email
          address for security.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
                  {...field}
                  className="h-11"
                  disabled={isSignedIn}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Doe"
                  {...field}
                  className="h-11"
                  disabled={isSignedIn}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    className="h-11"
                    disabled={isEmailVerified}
                  />
                </FormControl>
                {!isEmailVerified ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={sendOTP}
                    disabled={isVerifying}
                    className="whitespace-nowrap"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Code"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    disabled
                    className="whitespace-nowrap"
                  >
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Verified
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isEmailVerified && (
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Verification Code
            </label>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter 6-digit code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="h-11"
                maxLength={6}
                disabled={isEmailVerified}
              />
              <Button
                type="button"
                onClick={verifyOTP}
                disabled={isVerifying || otpCode.length < 6}
                className="whitespace-nowrap"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter the 6-digit code sent to your email
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
