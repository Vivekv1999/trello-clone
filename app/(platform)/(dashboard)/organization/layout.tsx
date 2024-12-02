import { Sidebar } from "../_component/sidebar";

const organizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-20 px-0">
      {/* mx=auto */}
      <div className="flex gap-x-7 px-3">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default organizationLayout;
