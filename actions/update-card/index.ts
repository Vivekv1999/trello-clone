"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-actions";
import { UpdateCard } from "./schema";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { CreateAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unathrized",
    };
  }

  const { boardId, id, ...values } = data;
  let card;
  try {
    card = await db.card.update({
      where: {
        id,
        List: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });

    await CreateAuditLog({
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      entityId: card.id,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to update",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
