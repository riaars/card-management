import { useRef, useState, useEffect } from "react";
import LatestTransactions from "../layout/LatestTransactions";
import {
  useActivateCardMutation,
  useDeactivateCardMutation,
  useGetLatestTransactionsByCardQuery,
  useGetSpendSummaryByCardQuery,
} from "@/service/api/cardApi";
import { skipToken } from "@reduxjs/toolkit/query";
import Card from "@/components/Card";
import SpendBudgetBar from "./SpendBudgetBar";
import type { CardType } from "@/service/api/type";
import FreezeCardModal from "@/components/modals/FreezeCardModal";
import UnfreezeCardModal from "@/components/modals/UnfreezeCardModal";
import ContactSupportModal from "@/components/modals/ContactSupportModal";

// interface SpendProps {
//   cardId: string;
//   spentThisMonth: number;
//   remaining: number;
//   currency: string;
// }

interface SwipeCarouselProps {
  cards: CardType[];
}

export default function SwipeCarousel({ cards }: SwipeCarouselProps) {
  const [activateCard] = useActivateCardMutation();
  const [deactivateCard] = useDeactivateCardMutation();
  const [openContactSupport, setOpenContactSupport] = useState(false);
  const [isFreezeOpen, setIsFreezeOpen] = useState(false);
  const [isUnfreezeOpen, setIsUnfreezeOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasCards = Array.isArray(cards) && cards.length > 0;
  const activeCard = hasCards ? cards[activeIndex] : null;

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const { data: latestTrx = [] } = useGetLatestTransactionsByCardQuery(
    activeCard
      ? {
          cardId: activeCard.id,
          limit: 5,
        }
      : skipToken
  );

  const {
    data: spendSummary,
    isLoading: spendLoading,
    error: spendError,
  } = useGetSpendSummaryByCardQuery(
    activeCard ? { cardId: activeCard.id } : skipToken
  );

  const spendForActiveCard = spendSummary;

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    function handleScroll() {
      if (!carousel) return;
      const slideWidth = carousel.clientWidth + 16;
      const index = Math.round(carousel.scrollLeft / slideWidth);
      setActiveIndex(index);
    }

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  const handleIndicatorClick = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const slideWidth = carousel.clientWidth + 16;

    carousel.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const handleFreeze = () => {
    if (!activeCard?.id) return;
    deactivateCard({ cardId: activeCard.id });
    setIsFreezeOpen(false);
  };

  const handleUnfreeze = () => {
    if (!activeCard?.id) return;
    activateCard({ cardId: activeCard?.id });
    setIsUnfreezeOpen(false);
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
        <div>
          <SpendBudgetBar
            spend={spendForActiveCard?.spentThisMonth || 0}
            budget={+activeCard.creditLimit || 0}
            currency={activeCard.currency}
          />
          <LatestTransactions latestTrx={latestTrx} />

          <div className="w-full flex flex-col md:flex-col lg:flex-col lg:items-center justify-center gap-4 mt-6">
            {activeCard.status === "inactive" ? (
              <button
                className="btn bg-[#012d2f] text-white p-4 rounded-xl full-width font-semibold lg:w-[400px] cursor-pointer"
                onClick={() => setIsUnfreezeOpen(true)}
              >
                Activate Card
              </button>
            ) : (
              <button
                className="btn border-red-600 text-red-600 p-4 rounded-xl full-width font-semibold cursor-pointer"
                onClick={() => setIsFreezeOpen(true)}
              >
                Freeze Card
              </button>
            )}

            <button
              className="btn bg-[#012d2f] text-white p-4 rounded-xl full-width font-semibold lg:w-[400px] cursor-pointer"
              onClick={() => setOpenContactSupport(true)}
            >
              Contact Qred's Support
            </button>
          </div>

          <ContactSupportModal
            open={openContactSupport}
            onClose={() => setOpenContactSupport(false)}
          />

          <FreezeCardModal
            isOpen={isFreezeOpen}
            onClose={() => setIsFreezeOpen(false)}
            onConfirm={handleFreeze}
            last4={activeCard.maskedNumber}
          />

          <UnfreezeCardModal
            isOpen={isUnfreezeOpen}
            onClose={() => setIsUnfreezeOpen(false)}
            onConfirm={handleUnfreeze}
            last4={activeCard.maskedNumber}
          />
        </div>
      )}
    </div>
  );
}
