"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-actions";
import { UpdateSchema } from "./schema";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { CreateAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unathrized",
    };
  }

  const { title, id } = data;
  let board;
  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title: title,
      },
    });

    await CreateAuditLog({
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      entityId: board.id,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to update",
    };
  }

  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateSchema, handler);
