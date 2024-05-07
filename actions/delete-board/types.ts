import { ActionState } from "@/lib/create-safe-actions";
import { DeleteBoard } from "./schema";
import { z } from "zod";
import { Board } from "@prisma/client";

export type InputType = z.infer<typeof DeleteBoard>;
export type ReturnType = ActionState<InputType, Board>;
