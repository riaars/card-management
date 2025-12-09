import {
  useActivateCardMutation,
  useDeactivateCardMutation,
} from "@/features/cards/api/cardsApi";
import ContactSupportModal from "@/features/cards/components/ContactSupportModal";
import FreezeCardModal from "./FreezeCardModal";
import UnfreezeCardModal from "./UnfreezeCardModal";
import SpendBudgetBar from "@/features/spends/components/SpendBudgetBar";
import LatestTransactions from "@/features/transactions/components/LatestTransactions";

import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";

import type { CardType } from "@/features/cards/types/cards.types";
import { useGetLatestTransactionsByCardQuery } from "@/features/transactions/api/transactionsApi";
import { useGetSpendSummaryByCardQuery } from "@/features/spends/api/spendsApi";
import { AsyncBlock } from "@/shared/components/AsyncBlock";

interface CardDetailsPanelProps {
  card: CardType;
}

export function CardDetailsPanel({ card }: CardDetailsPanelProps) {
  const [activateCard] = useActivateCardMutation();
  const [deactivateCard] = useDeactivateCardMutation();

  const [openContact, setOpenContact] = useState(false);
  const [freezeOpen, setFreezeOpen] = useState(false);
  const [unfreezeOpen, setUnfreezeOpen] = useState(false);

  const {
    data: latestTrx = [],
    isLoading: latestTransactionLoading,
    error: latestTransactionError,
  } = useGetLatestTransactionsByCardQuery(
    card ? { cardId: card.id, limit: 5 } : skipToken
  );

  const {
    data: spend,
    isLoading: spendLoading,
    error: spendError,
  } = useGetSpendSummaryByCardQuery(card ? { cardId: card.id } : skipToken);

  const handleFreeze = () => {
    deactivateCard({ cardId: card.id });
    setFreezeOpen(false);
  };

  const handleUnfreeze = () => {
    activateCard({ cardId: card.id });
    setUnfreezeOpen(false);
  };

  return (
    <div>
      <AsyncBlock
        loading={spendLoading}
        error={!!spendError}
        loadingText="Loading budget..."
        errorText="Failed to load the remaining budget..."
      >
        <SpendBudgetBar
          spend={spend?.spentThisMonth ?? 0}
          budget={Number(card.creditLimit)}
          currency={card.currency}
        />
      </AsyncBlock>

      <AsyncBlock
        loading={latestTransactionLoading}
        error={!!latestTransactionError}
        loadingText="Loading latest transactions..."
        errorText="Failed to load latest transactions..."
      >
        <LatestTransactions latestTrx={latestTrx} />
      </AsyncBlock>
      <div className="w-full flex flex-col lg:items-center justify-center gap-4 mt-6">
        {card.status === "inactive" ? (
          <button
            className="btn bg-[#012d2f] text-white p-4 rounded-xl lg:w-[400px]"
            onClick={() => setUnfreezeOpen(true)}
          >
            Activate Card
          </button>
        ) : (
          <button
            className="btn border-red-600 text-red-600 p-4 rounded-xl lg:w-[400px]"
            onClick={() => setFreezeOpen(true)}
          >
            Freeze Card
          </button>
        )}

        <button
          className="btn bg-[#012d2f] text-white p-4 rounded-xl lg:w-[400px]"
          onClick={() => setOpenContact(true)}
        >
          Contact Support
        </button>
      </div>

      <ContactSupportModal
        open={openContact}
        onClose={() => setOpenContact(false)}
      />
      <FreezeCardModal
        isOpen={freezeOpen}
        onClose={() => setFreezeOpen(false)}
        onConfirm={handleFreeze}
        last4={card.maskedNumber}
      />
      <UnfreezeCardModal
        isOpen={unfreezeOpen}
        onClose={() => setUnfreezeOpen(false)}
        onConfirm={handleUnfreeze}
        last4={card.maskedNumber}
      />
    </div>
  );
}
