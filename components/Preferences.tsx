"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().min(10),
  description: z.string().min(10),
  location: z.string().min(2),
  receiveNotifications: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface PreferencesStepProps {
  form: UseFormReturn<FormValues>;
}

export function PreferencesStep({ form }: PreferencesStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-medium text-gray-900">Preferences</h2>
        <p className="text-sm text-gray-500 mt-1">
          Set your preferences for how you'd like to be contacted about your
          complaint
        </p>
      </div>

      <FormField
        control={form.control}
        name="receiveNotifications"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Receive Notifications</FormLabel>
              <FormDescription>
                Get updates about the status of your complaint
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="rounded-md border p-4 bg-amber-50 border-amber-200">
        <p className="text-sm text-amber-800">
          By enabling notifications, you'll receive updates via SMS to the phone
          number you provided and verified.
        </p>
      </div>
    </div>
  );
}
