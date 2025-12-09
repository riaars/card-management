import { useEffect, useRef, useState } from "react";
import type { CardType } from "../types/cards.types";

export function useSwipeCarousel(cards: CardType[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasCards = Array.isArray(cards) && cards.length > 0;
  const activeCard = hasCards ? cards[activeIndex] : null;

  const carouselRef = useRef<HTMLDivElement | null>(null);

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
  return {
    carouselRef,
    activeIndex,
    activeCard,
    hasCards,
    handleIndicatorClick,
  };
}
