"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCardIcon } from "lucide-react";
import Image from "next/image";

interface InfoProps {
  isPro: Boolean;
}

const Info = ({ isPro }: InfoProps) => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <Info.Skeleton />;
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          fill
          src={organization?.imageUrl!}
          alt="organization"
          className="rounded-md object-cover"
        />
      </div>
      <div className="spzce-y-1">
        <p className="font-semibold text-xl">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCardIcon className="h-3 w-3 mr-1" />
          {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

export default Info;

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <div className="spzce-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center h-3 mt-2">
          <Skeleton className="h-4 w-4 mr-1" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
