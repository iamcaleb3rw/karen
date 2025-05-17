"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Upload, X } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().min(10),
  description: z.string().min(10),
  location: z.string().min(2),
  receiveNotifications: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface ComplaintDetailsStepProps {
  form: UseFormReturn<FormValues>;
  photo: string | null;
  handlePhotoChange: (file: File | null) => void;
  removePhoto: () => void;
}

export function ComplaintDetailsStep({
  form,
  photo,
  handlePhotoChange,
  removePhoto,
}: ComplaintDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-medium text-gray-900">
          Complaint Details
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Please provide detailed information about your complaint
        </p>
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Please provide details about your complaint..."
                className="min-h-[120px] resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input
                placeholder="123 Main St, City, State"
                {...field}
                className="h-11"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Photo Evidence (Optional)
        </label>
        <div className="flex flex-col items-center justify-center border border-gray-200 rounded-md p-4 transition-all hover:border-gray-300">
          {photo ? (
            <div className="relative w-full">
              <div className="relative aspect-video w-full overflow-hidden rounded-md">
                <Image
                  src={photo || "/placeholder.svg"}
                  alt="Uploaded photo"
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                onClick={removePhoto}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove photo</span>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-4">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <div className="text-sm text-gray-600">
                <label
                  htmlFor="photo-upload"
                  className="relative cursor-pointer text-primary hover:underline"
                >
                  <span>Upload a file</span>
                  <input
                    id="photo-upload"
                    name="photo"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) =>
                      handlePhotoChange(e.target.files?.[0] || null)
                    }
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
