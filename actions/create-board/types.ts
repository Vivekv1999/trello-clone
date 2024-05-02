import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-actions";
import { CreateBoard } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, Board>;
