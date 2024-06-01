"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-actions";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { decreseAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const isPro = await checkSubscription();

  if (!userId || !orgId) {
    return {
      error: "Unathrized",
    };
  }

  const { id } = data;
  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    //if user delete board thqan remove from free board count
    if (!isPro) {
      await decreseAvailableCount();
    }

    await CreateAuditLog({
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      entityId: board.id,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to Delete",
    };
  }

  revalidatePath(`/organization/${orgId}`); //TODO
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
