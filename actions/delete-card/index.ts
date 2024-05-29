"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-actions";
import { DeleteCard } from "./schema";
import { redirect } from "next/navigation";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unathrized",
    };
  }

  const { id, boardId } = data;
  let card;

  try {
    card = await db.card.delete({
      where: {
        id,
        List: {
          board: {
            orgId,
          },
        },
      },
    });

    await CreateAuditLog({
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      entityId: card.id,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to Delete",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
