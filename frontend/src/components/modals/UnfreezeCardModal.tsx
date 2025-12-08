import React from "react";

interface UnfreezeCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  last4?: string;
}

const UnfreezeCardModal: React.FC<UnfreezeCardModalProps> = ({
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
          <h2 className="text-lg font-semibold text-slate-900">
            Activate card
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {last4 ? `... ${last4}` : null}
          </p>
        </div>

        <div className="mb-6 space-y-3 text-sm text-slate-600">
          <p>
            Once you activate this card, it can be used for new transactions
            immediately.
          </p>

          <p className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg p-3">
            Make sure this card is safe to use before reactivating it.
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
                       bg-blue-600 text-white hover:bg-blue-500 
                       transition shadow-sm"
          >
            Activate card
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnfreezeCardModal;
