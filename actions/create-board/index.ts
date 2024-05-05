"use server";

import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const userId = auth().userId;
  const orgId = auth().orgId;
  if (!userId || !orgId) {
    return {
      error: "Unautorized",
    };
  }

  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageFullUrl ||
    !imageThumbUrl ||
    !imageUserName ||
    !imageLinkHTML
  ) {
    return {
      error: "Missng fields. Failed to create board",
    };
  }
  let board;
  try {
    // throw new Error("intentional error");
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });
  } catch (err) {
    console.error(err, "error creating board");
    return {
      error: { err } + "Database Error",
    };
  }

  revalidatePath(`board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
