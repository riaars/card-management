import React from "react";
import CardItem from "./CardItem";
import { useSwipeCarousel } from "../hooks/useSwipeCarousel";
import type { CardType } from "@/features/cards/types/cards.types";

interface CardCarouselProps {
  cards: CardType[];
  onActiveIndexChange: (index: number, card: CardType | null) => void;
}

export function CardCarousel({
  cards,
  onActiveIndexChange,
}: CardCarouselProps) {
  const { carouselRef, activeIndex, activeCard, handleIndicatorClick } =
    useSwipeCarousel(cards);

  React.useEffect(() => {
    onActiveIndexChange(activeIndex, activeCard);
  }, [activeIndex, activeCard, onActiveIndexChange]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-4 pb-4
                 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {cards.map((card, index) => (
          <CardItem {...card} key={card.id} isActive={activeIndex === index} />
        ))}
      </div>

      <div className="flex justify-center space-x-2 mt-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-2 h-2 rounded-full transition-all 
                ${
                  activeIndex === index
                    ? "bg-[#012d2f] scale-120"
                    : "bg-[#012d2f] opacity-50 hover:opacity-75"
                }`}
          />
        ))}
      </div>
    </div>
  );
}
