"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-actions";
import { DeleteList } from "./schema";
import { redirect } from "next/navigation";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { CreateAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unathrized",
    };
  }

  const { id, boardId } = data;
  let list;
  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });

    await CreateAuditLog({
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      entityId: list.id,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to Delete",
    };
  }

  revalidatePath(`/boARD/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
