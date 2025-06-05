// components/ResponseHistory.tsx
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Response } from "@/types/complaint"; // Assuming your Response type is here

export default function ResponseHistory({
  responses,
}: {
  responses: Response[];
}) {
  if (!responses || responses.length === 0) {
    return null; // Don't render if no responses
  }

  // Sort responses by creation date, newest first
  const sortedResponses = [...responses].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">
        Response History
      </h3>
      <div className="relative pl-1">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {sortedResponses.map((response, index) => (
            <li className="mb-10 ms-4" key={response.id}>
              <div className="absolute w-3 h-3 bg-green-500 ring-2 ring-green-500/20 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {format(
                  new Date(response.createdAt),
                  "MMM dd, yyyy 'at' HH:mm"
                )}
              </time>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-pink-500 flex items-center justify-center rounded-full">
                  {response.responder.firstName.charAt(0)}
                </div>
                <div className=" flex flex-col">
                  <p className="text-sm text-muted-foreground">
                    {response.responder.firstName}
                  </p>
                  <p className="text-sm font-semibold">
                    {response.responder.email}
                  </p>
                </div>
              </div>
              <p className="mb-4 text-sm italic mt-2 font-normal text-gray-500 dark:text-gray-400">
                {response.message}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
