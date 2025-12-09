import React from "react";

interface FreezeCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cardLabel?: string;
  last4?: string;
}

const FreezeCardModal: React.FC<FreezeCardModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  last4,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6 animate-[fadeIn_0.15s_ease-out]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Freeze card</h2>
          <p className="mt-1 text-sm text-slate-500">
            {last4 ? ` ${last4}` : null}
          </p>
        </div>

        <div className="mb-6 space-y-3 text-sm text-slate-600">
          <p>
            When you freeze this card, all new transactions will be blocked.
            Existing subscriptions or recurring payments may still go through.
          </p>
          <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg p-3">
            You can unfreeze the card at any time from the card details page.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 
                       rounded-lg hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-lg 
                       bg-slate-900 text-white hover:bg-slate-800 
                       transition shadow-sm"
          >
            Freeze card
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreezeCardModal;
