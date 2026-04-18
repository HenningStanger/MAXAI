import { LeadStatus } from "@/generated/prisma/enums";
import { z } from "zod";

export const leadCreateSchema = z.object({
  name: z.string().trim().min(2, "Navn må ha minst 2 tegn."),
  company: z.string().trim().min(2, "Firmanavn må ha minst 2 tegn."),
  email: z.email("Ugyldig e-postadresse."),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  sourcePage: z.string().trim().min(1).max(120)
});

export const leadUpdateSchema = z.object({
  status: z.enum(LeadStatus),
  notes: z.string().trim().max(4000).optional().or(z.literal(""))
});

export type LeadCreateInput = z.infer<typeof leadCreateSchema>;
export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>;
