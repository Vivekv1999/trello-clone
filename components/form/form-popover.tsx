"use client";

import { Children } from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { createBoard } from "@/actions/create-board";
import { useAction } from "@/Hooks/use-action";
import { toast } from "sonner";

interface FromPopOverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "end" | "center";
  sideOffset?: number;
}

export const FormPopOver = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FromPopOverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSucess: (data) => {
      console.log({ data });
      toast.success("Board created");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-bold text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormInput
              id="title"
              label="Board Title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
