import { Loader, Upload } from "lucide-react";
import { FormValues } from "./Complaintform";
import { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface ComplaintDetailsStepProps {
  form: UseFormReturn<FormValues>;
  photo: string | null;
  handlePhotoChange: (file: File | null) => void;
  removePhoto: () => void;
  isUploading: boolean;
}

export function ComplaintDetailsStep({
  form,
  photo,
  handlePhotoChange,
  removePhoto,
  isUploading,
}: ComplaintDetailsStepProps) {
  return (
    <div className="space-y-6">
      {/* ... other form fields */}
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
            <Image src={photo} alt="Proof Image" width={200} height={200} />
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-4">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <div className="text-sm text-gray-600">
                <label
                  htmlFor="photo-upload"
                  className="relative cursor-pointer text-primary hover:underline flex items-center justify-center gap-1"
                >
                  <span>{isUploading ? "Uploading..." : "Upload"}</span>
                  {isUploading && <Loader className="animate-spin h-4 w-4" />}
                  <input
                    id="photo-upload"
                    name="photo"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    disabled={isUploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handlePhotoChange(file);
                    }}
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
