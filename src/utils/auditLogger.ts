import {prisma} from "@/lib/prisma";
import { Action, Resource ,  } from "@prisma/client";

interface LogAuditParams {
  userId: string;
  action: Action;
  resource?: Resource;
  resourceId?: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
}

export async function logAudit({
  userId,
  action,
  resource,
  resourceId,
  details,
  ipAddress,
  userAgent,
}: LogAuditParams) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        resource,
        resourceId,
        details,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    console.error("[audit-log] Erreur lors de la journalisation :", error);
  }
}
