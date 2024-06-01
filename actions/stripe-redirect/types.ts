import { ActionState } from "@/lib/create-safe-actions";
import { z } from "zod";
import { StripeRedirect } from "./schema";

export type InputType = z.infer<typeof StripeRedirect>;
export type ReturnType = ActionState<InputType, string>;
