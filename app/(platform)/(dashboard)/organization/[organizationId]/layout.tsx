import OrgControl from "./_components/org-control";

const OrganozationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganozationLayout;
