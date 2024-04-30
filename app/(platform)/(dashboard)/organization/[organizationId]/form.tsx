"use client";

import { State, create } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";

export const Form = () => {
  const intialState = { message: null, errors: {} } as State;
  const [state, dispatch] = useFormState(create, intialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board Tile"
          className="border-black border p-1 mr-2"
        />
        {state?.errors?.title?.map((error: string) => (
          <p key={error} className="text-rose-500 text-xs">
            {error}
          </p>
        ))}
      </div>
      <Button type="submit" size={"sm"}>
        Submit
      </Button>
    </form>
  );
};
