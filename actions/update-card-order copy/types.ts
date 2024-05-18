import { ActionState } from "@/lib/create-safe-actions";
import { Card } from "@prisma/client";
import { z } from "zod";
import { UpdateCardOrder } from "./schema";

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputType, Card[]>;
