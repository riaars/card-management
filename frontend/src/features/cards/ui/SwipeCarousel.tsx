import { useState } from "react";

import type { CardType } from "@/features/cards/types/cards.types";
import { CardCarousel } from "./CardCarousel";
import { CardDetailsPanel } from "./CardDetailsPanel";

interface SwipeCarouselProps {
  cards: CardType[];
}

export default function SwipeCarousel({ cards }: SwipeCarouselProps) {
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  return (
    <div className="w-full max-w-md mx-auto">
      <CardCarousel
        cards={cards}
        onActiveIndexChange={(_, card) => setActiveCard(card)}
      />

      {activeCard && <CardDetailsPanel card={activeCard} />}
    </div>
  );
}
