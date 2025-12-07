import { useState } from "react";
import MasterCardLogo from "./MasterCardLogo";
import VisaLogo from "./VisaLogo";
import InvoiceModal from "./modals/InvoiceModal";

interface Invoice {
  id: string;
  status: "due" | "overdue" | "paid";
  amountDue: number;
  currency: string;
  dueDate: string;
}

interface CardProps {
  id: string;
  maskedNumber: string;
  status: string;
  creditLimit: number;
  currency: string;
  cardHolderName?: string;
  expiry: string;
  isActive?: boolean;
  cardType?: string;
  invoices?: Invoice[] | [];
  invoiceStatus?: string | null;
}

function Card(card: CardProps) {
  const [showInvoice, setShowInvoice] = useState(false);
  const hasDueInvoice = card.invoiceStatus && card.invoiceStatus === "due";
  const invoice = card.invoices && card.invoices[0];

  const getCardGradient = (card: CardProps) => {
    if (card.cardType === "visa") {
      return card.isActive
        ? "from-[#004e92] to-[#000428]"
        : "from-[#2c5d7d] to-[#0a2342]";
    }

    return card.isActive
      ? "from-[#1a1a1a] to-[#3b3b3b]"
      : "from-[#2a2a2a] to-[#4a4a4a]";
  };

  return (
    <div
      className={` relative w-[85%] snap-start shrink-0 rounded-2xl p-4 transition-all bg-gradient-to-br text-white rounded-2xl p-5 shadow-xl flex flex-col justify-between
      ${getCardGradient(card)}
      `}
    >
      {card.cardType === "visa" ? <VisaLogo /> : <MasterCardLogo />}

      {hasDueInvoice && (
        <button
          onClick={() => setShowInvoice(true)}
          className="
      absolute top-3 right-3 z-20
      px-3 py-1 rounded-full
      text-[11px] font-semibold
      bg-white/20 backdrop-blur-sm
      border border-white/30
      hover:bg-white/30 transition
    "
        >
          Invoice due
        </button>
      )}
      {card.status === "inactive" && (
        <div
          className="absolute inset-0 bg-black/50 rounded-2xl z-10 flex items-center justify-center
      "
        >
          <span className="text-white font-semibold text-lg">Inactive</span>
        </div>
      )}

      <div className="text-2xl tracking-widest font-mono">
        {card.maskedNumber}
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col text-sm">
          <span className="font-semibold">{card.cardHolderName}</span>
        </div>

        <div className="flex flex-col text-sm">
          <span className="font-semibold">{card.expiry}</span>
        </div>
      </div>

      {showInvoice && hasDueInvoice && invoice && (
        <InvoiceModal
          open={showInvoice}
          onClose={() => setShowInvoice(false)}
          invoice={invoice}
          maskedNumber={card.maskedNumber}
        />
      )}
    </div>
  );
}

export default Card;
