import { ActionState } from "@/lib/create-safe-actions";
import { UpdateListOrder } from "./schema";
import { z } from "zod";
import { Board, List } from "@prisma/client";

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionState<InputType, List[]>;
