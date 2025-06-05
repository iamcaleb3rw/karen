import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import React from "react";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default async function ComplaintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await checkRole("admin");
  const isStaff = await checkRole("staff");
  console.log("IS ADMIN", isAdmin);
  console.log("IS STAFF", isStaff);

  if (!isAdmin && !isStaff) {
    return redirect("/");
  }
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
