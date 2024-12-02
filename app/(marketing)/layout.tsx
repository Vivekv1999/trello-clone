import { Children } from "react";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100 flex-1 flex justify-center items-center">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MarketingLayout;
