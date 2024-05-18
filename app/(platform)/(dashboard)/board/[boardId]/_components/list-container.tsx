"use client";

import { List } from "@prisma/client";
import { ListForm } from "./list-form";
import { ListWithCards } from "@/types";
import { useEffect, useState } from "react";
import { ListItem } from "./list-items";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/Hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order copy";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}
export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSucess: (data) => {
      toast.success("List Reordered Successfully");
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSucess: (data) => {
      toast.success("Card Reordered Successfully");
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    //if drop in the same position
    if (
      destination.droppableId === source.droppableId &&
      source.index == destination.index
    ) {
      return;
    }

    //User move list
    if (type === "list") {
      const items = reOrder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    }

    if (type === "card") {
      let newOrderdData = [...orderedData];

      //Source and destination list
      const sourceList = newOrderdData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderdData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      //Check if cards exist on the sourcelist
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      //Check if cards exist on the sourcelist
      if (!destList.cards) {
        destList.cards = [];
      }

      //moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reOrderCards = reOrder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reOrderCards.forEach((card, index) => {
          card.order = index;
        });
        sourceList.cards = reOrderCards;

        setOrderedData(newOrderdData);
        executeUpdateCardOrder({ boardId, items: reOrderCards });

        //user moves the card to another list
      } else {
        //remove card from source list

        const [moveCard] = sourceList.cards.splice(source.index, 1);

        //assoign the new listId to the moved card
        moveCard.listId = destination.droppableId;

        //ADD card to destination list
        destList.cards.splice(destination.index, 0, moveCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        //Update the order for each card in the destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderdData);
        executeUpdateCardOrder({ boardId, items: destList.cards });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provider) => (
          <ol
            {...provider.droppableProps}
            ref={provider.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provider.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
