import { create } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";

const OrganizationIdPage = () => {
  return (
    <div>
      <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board Tile"
          className="border-black border p-1 mr-2"
        />
        <Button type="submit" size={"sm"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default OrganizationIdPage;
