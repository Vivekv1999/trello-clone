"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-actions";
import { CreateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unathorized",
    };
  }

  const { title, boardId } = data;
  let list;
  try {
    //this will prevent any outside to craete new list
    const board = await db.board.findUnique({
      where: { id: boardId, orgId },
    });

    if (!board) {
      return {
        error: "Unable to find board",
      };
    }

    //find last add list number
    const lastList = await db.list.findFirst({
      where: {
        boardId: boardId,
      },
      orderBy: { order: "desc" },
      select: { order: true }, //only this field show in response
    });
    console.log(lastList, "lastList");
    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
