import { auth } from "@clerk/nextjs/server";
import OrgControl from "./_components/org-control";
import { title } from "process";
import { startCase } from "lodash";

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "Organization"),
  };
}

const OrganozationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganozationLayout;
