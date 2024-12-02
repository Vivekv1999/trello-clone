"use client";
import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import Spinner from "@/components/ui/Spinner";
import { useState } from "react";
const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const MarketingPage = () => {
  const [isLoading, SetIsLoading] = useState(false);

  return (
    <div className="flex items-center justify-center flex-col p-0 text-center">
      <div className="mb-6 flex items-center justify-center border-2 shadow-md p-3 bg-amber-100 text-amber-700 rounded-full uppercase font-semibold tracking-wide">
        <Medal className="h-8 w-8 mr-3" />
        No 1 Task Management
      </div>

      <h1 className="text-3xl sm:text-5xl font-bold text-neutral-800 mb-6">
        Taskify helps teams move
      </h1>

      <div className="text-2xl sm:text-4xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-extrabold px-6 py-3 rounded-md shadow-lg mb-6 w-fit">
        Work Forward
      </div>

      <p className="text-base sm:text-xl text-neutral-600 mb-6 max-w-lg sm:max-w-3xl mx-auto leading-relaxed">
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is
        unique—accomplish it all with Taskify.
      </p>

      <Button
        className="mt-8 w-full sm:w-auto"
        size="lg"
        asChild
        disabled={isLoading}
        onClick={() => SetIsLoading(true)}
      >
        <Link
          href="/sign-up"
          className="text-center text-white bg-gradient-to-r from-green-500 to-teal-500 px-8 py-3 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg"
        >
          {isLoading && <Spinner />} &nbsp; Get Taskify for Free
        </Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
