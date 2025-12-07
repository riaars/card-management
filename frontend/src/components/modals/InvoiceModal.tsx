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
      <div className="w-[90%] max-w-sm rounded-2xl bg-zinc-900 text-white p-5 shadow-2xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold">Pending invoice</h2>
          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-zinc-200"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Card</span>
            <span className="font-medium">{maskedNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Amount Due</span>
            <span className="font-semibold">
              {invoice.currency} {invoice.amountDue}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Due date</span>
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
            <span className="text-zinc-400">Status</span>
            <span className="font-medium capitalize">{invoice.status}</span>
          </div>
        </div>

        <button
          className="mt-4 w-full py-2  rounded-xl bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-100 transition"
          onClick={onClose}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default InvoiceModal;
