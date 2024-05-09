import { ActionState } from "@/lib/create-safe-actions";
import { CreateList } from "./schema";
import { z } from "zod";
import { Board, List } from "@prisma/client";

export type InputType = z.infer<typeof CreateList>;
export type ReturnType = ActionState<InputType, List>;
