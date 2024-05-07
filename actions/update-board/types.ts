import { ActionState } from "@/lib/create-safe-actions";
import { UpdateSchema } from "./schema";
import { z } from "zod";
import { Board } from "@prisma/client";

export type InputType = z.infer<typeof UpdateSchema>;
export type ReturnType = ActionState<InputType, Board>;
