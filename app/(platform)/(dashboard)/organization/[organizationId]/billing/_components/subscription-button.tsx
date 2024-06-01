"use client";

import { useAction } from "@/Hooks/use-action";
import { useProModal } from "@/Hooks/use-pro-modal";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface subscriptionButtonProps {
  isPro: Boolean;
}

export const SubscriptionButton = ({ isPro }: subscriptionButtonProps) => {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSucess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onUpgrade = () => {
    if (isPro) {
      //for manage subscription --go to stripe --> billing portal customer portal (Setting) -->active test link
      execute({});
    } else {
      proModal.onOpen();
    }
  };
  return (
    <Button variant={"primary"} onClick={onUpgrade} disabled={isLoading}>
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  );
};
