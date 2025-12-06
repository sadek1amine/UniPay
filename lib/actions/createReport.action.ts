
"use server";

import { createReport } from "@/lib/actions/reports.actions";

export async function handleCreateReport(formData: FormData) {
  const text = formData.get("text")?.toString() || "";
  if (text.trim()) {
    await createReport(text);
  }
}
