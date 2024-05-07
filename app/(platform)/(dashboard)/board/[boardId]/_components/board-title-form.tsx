"use client";

import { useAction } from "@/Hooks/use-action";
import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSucess: (data) => {
      toast.success(`Board "${data.title}" updated`);
      setTitle(data.title);
      disableEditig();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  const enabledEditig = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditig = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, id: data.id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={() => onBlur()}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      variant="transparent"
      onClick={enabledEditig}
      className="font-bold text-lg h-auto w-uto p-1 px-2"
    >
      {title}
    </Button>
  );
};
