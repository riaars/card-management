import { useRef, useState, useEffect } from "react";
import LatestTransactions from "../layout/LatestTransactions";
import {
  useActivateCardMutation,
  useDeactivateCardMutation,
  useGetLatestTransactionsByCardQuery,
} from "@/service/api/cardApi";
import { skipToken } from "@reduxjs/toolkit/query";
import Card from "@/components/Card";
import SpendBudgetBar from "./SpendBudgetBar";
import type { CardType } from "@/service/api/type";

interface SpendProps {
  cardId: string;
  spentThisMonth: number;
  remaining: number;
  currency: string;
}

interface SwipeCarouselProps {
  cards: CardType[];
  spends: SpendProps[];
}

export default function SwipeCarousel({ cards, spends }: SwipeCarouselProps) {
  const [activateCard] = useActivateCardMutation();
  const [deactivateCard] = useDeactivateCardMutation();

  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCard = cards[activeIndex];

  const spendForActiveCard = spends.find(
    (spend) => spend.cardId === activeCard?.id
  );

  const { data: latestTrx } = useGetLatestTransactionsByCardQuery({
    cardId: activeCard.id ?? skipToken,
    limit: 5,
  });

  const latestTrxForActiveCard = latestTrx?.filter(
    (trx) => trx.cardId === activeCard?.id
  );

  useEffect(() => {
    const carousel = carouselRef.current;

    function handleScroll() {
      const slideWidth = carousel?.clientWidth + 16;
      const index = Math.round(carousel?.scrollLeft / slideWidth);
      setActiveIndex(index);
    }

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  const handleIndicatorClick = (index) => {
    const carousel = carouselRef.current;
    const slideWidth = carousel.clientWidth + 16;

    carousel.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-4 pb-4
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {cards.map((card, index) => (
          <Card {...card} key={card.id} isActive={activeIndex === index} />
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

      {activeCard && (
        <SpendBudgetBar
          spend={spendForActiveCard?.spentThisMonth || 0}
          budget={+activeCard.creditLimit || 0}
          currency={activeCard.currency}
        />
      )}

      {activeCard && (
        <LatestTransactions latestTrx={latestTrxForActiveCard || []} />
      )}

      <div className="w-full flex flex-col md:flex-row lg:flex-row justify-center gap-4 mt-4">
        {activeCard.status === "inactive" ? (
          <button
            className="btn bg-[#012d2f] text-white p-4 rounded-xl full-width font-semibold lg:w-[400px]"
            onClick={() => activateCard({ cardId: activeCard.id })}
          >
            Activate Card
          </button>
        ) : (
          <button
            className="btn border-red-600 text-red-600 p-4 rounded-xl full-width font-semibold"
            onClick={() => deactivateCard({ cardId: activeCard.id })}
          >
            Freeze Card
          </button>
        )}
      </div>
    </div>
  );
}
