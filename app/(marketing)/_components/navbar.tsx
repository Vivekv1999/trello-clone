"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [isLoading, SetIsLoading] = useState(false);
  const [isSignUp, SetIsSignUp] = useState(false);
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button
            size="sm"
            variant={"outline"}
            asChild
            disabled={isLoading}
            onClick={() => SetIsLoading(true)}
          >
            <Link href="/sign-in">{isLoading && <Spinner />} &nbsp; Login</Link>
          </Button>
          <Button
            size="sm"
            asChild
            disabled={isLoading}
            onClick={() => SetIsSignUp(true)}
          >
            <Link href={"/sign-up"}>
              {isSignUp && <Spinner />} &nbsp; Get Taskify for free
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
