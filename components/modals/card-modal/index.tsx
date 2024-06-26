"use client";

import { useCardModal } from "@/Hooks/use-card-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { fetcher } from "@/lib/fetch";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { Description } from "./decription";
import { Actions } from "./actions";
import { Auditlog } from "@prisma/client";
import { Activity } from "./activity";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const onClose = useCardModal((state) => state.onClose);
  const isOpen = useCardModal((state) => state.isOpen);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });
  const { data: auditLogsData } = useQuery<Auditlog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity data={auditLogsData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
