"use server";

import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const userId = auth().userId;
  if (!userId) {
    return {
      error: "Unautorized",
    };
  }

  const { title } = data;

  let board;
  try {
    // throw new Error("intentional error");
    board = await db.board.create({
      data: {
        title: title,
      },
    });
  } catch (err) {
    return {
      error: { err } + "Database Error",
    };
  }

  revalidatePath(`board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
