"use client";

import { useAction } from "@/Hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { FormInput } from "./form-input";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSucess: (data) => {
      console.log(data, "Sucess");
    },
    onError: (error) => {
      console.log(error, "Error");
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <FormInput errors={fieldErrors} />
      <Button type="submit" size={"sm"}>
        Submit
      </Button>
    </form>
  );
};
