interface Invoice {
  id: string;
  status: "due" | "overdue" | "paid";
  amountDue: number;
  currency: string;
  dueDate: string;
}

interface InvoiceModalProps {
  open: boolean;
  onClose: () => void;
  invoice: Invoice;
  maskedNumber: string;
}
const InvoiceModal = ({
  open,
  onClose,
  invoice,
  maskedNumber,
}: InvoiceModalProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[90%] max-w-sm rounded-2xl bg-white  text-slate-600 p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Pending invoice</h2>
          <button
            onClick={onClose}
            className="text-xs text-slate-600 hover:text-zinc-200"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-slate-600">Card</span>
            <span className="font-medium">{maskedNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Amount Due</span>
            <span className="font-semibold">
              {invoice.currency} {invoice.amountDue}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Due date</span>
            <span className="font-medium">
              {" "}
              {new Date(invoice.dueDate).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}{" "}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Status</span>
            <span className="font-medium capitalize">{invoice.status}</span>
          </div>
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
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg 
                       bg-slate-900 text-white hover:bg-slate-800 
                       transition shadow-sm"
          >
            Pay Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
