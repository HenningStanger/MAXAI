import { LeadStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import type { LeadCreateInput, LeadUpdateInput } from "./schema";

export async function createLead(input: LeadCreateInput) {
  const lead = await prisma.lead.create({
    data: {
      name: input.name,
      company: input.company,
      email: input.email,
      message: input.message || null,
      sourcePage: input.sourcePage
    }
  });

  await prisma.leadActivity.create({
    data: {
      leadId: lead.id,
      type: "created",
      message: "Lead registrert via nettskjema."
    }
  });

  return lead;
}

export async function listLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function getLeadById(id: string) {
  return prisma.lead.findUnique({
    where: { id },
    include: {
      activities: {
        orderBy: { createdAt: "desc" }
      }
    }
  });
}

export async function updateLead(id: string, input: LeadUpdateInput) {
  const previous = await prisma.lead.findUnique({ where: { id } });
  if (!previous) {
    return null;
  }

  const updated = await prisma.lead.update({
    where: { id },
    data: {
      status: input.status,
      notes: input.notes || null
    }
  });

  const statusChanged = previous.status !== input.status;
  const notesChanged = (previous.notes ?? "") !== (input.notes ?? "");

  if (statusChanged) {
    await prisma.leadActivity.create({
      data: {
        leadId: id,
        type: "status",
        message: `Status endret fra ${statusLabel(previous.status)} til ${statusLabel(input.status)}.`
      }
    });
  }

  if (notesChanged) {
    await prisma.leadActivity.create({
      data: {
        leadId: id,
        type: "note",
        message: "Notat oppdatert i admin."
      }
    });
  }

  return updated;
}

export function statusLabel(status: LeadStatus) {
  switch (status) {
    case LeadStatus.ny:
      return "Ny";
    case LeadStatus.kontaktet:
      return "Kontaktet";
    case LeadStatus.mote_booket:
      return "Møte booket";
    case LeadStatus.kunde:
      return "Kunde";
    case LeadStatus.tapt:
      return "Tapt";
    default:
      return "Ukjent";
  }
}
