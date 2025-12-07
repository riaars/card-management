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
      <div className="w-[90%] max-w-sm bg-zinc-900 text-white rounded-2xl p-6 shadow-2xl border border-zinc-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Contact Support</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-xl">
            <span className="text-zinc-400">Phone</span>
            <a
              href="tel:+46812345678"
              className="font-semibold text-white hover:text-purple-300"
            >
              +46 0 000 000
            </a>
          </div>

          <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-xl">
            <span className="text-zinc-400">Email</span>
            <a
              href="mailto:support@yourcompany.com"
              className="font-semibold text-white hover:text-purple-300"
            >
              support@qred.com
            </a>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-2 rounded-xl bg-white text-zinc-900 font-semibold hover:bg-zinc-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
