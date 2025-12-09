interface ContactSupportModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactSupportModal({
  open,
  onClose,
}: ContactSupportModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-sm bg-white text-slate-600 rounded-2xl p-6 shadow-2xl border border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Contact Support</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-xs leading-none"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2 text-sm mb-6 px-3">
          <div className="flex justify-between items-center p-2  bg-white-800 rounded-xl">
            <span className="text-slate-400">Phone</span>
            <a
              href="tel:+46812345678"
              className="font-semibold text-slate-600 hover:text-slate-600"
            >
              +46 0 000 000
            </a>
          </div>

          <div className="flex justify-between items-center p-2 bg-white-800 rounded-xl">
            <span className="text-slate-400">Email</span>
            <a
              href="mailto:support@yourcompany.com"
              className="font-semibold text-slate-600 hover:text-slate-600"
            >
              support@qred.com
            </a>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg 
                       bg-slate-900 text-white hover:bg-slate-800 
                       transition shadow-sm"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
