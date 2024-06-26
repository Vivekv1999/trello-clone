import { ActionState } from "@/lib/create-safe-actions";
import { UpdateCard } from "./schema";
import { z } from "zod";
import { Card } from "@prisma/client";

export type InputType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionState<InputType, Card>;
