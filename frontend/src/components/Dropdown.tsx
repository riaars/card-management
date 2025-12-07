import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
  options?: string[];
}
const Dropdown = ({ options }: DropdownProps) => {
  const [selectedCompany, setSelectedCompany] = React.useState("All");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.id === selectedCompany);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full text-left px-4 py-2.5 pr-10
          bg-white border border-slate-200 rounded-lg
          text-sm font-medium text-slate-700
          flex items-center justify-between
          focus:outline-none focus:ring-2 focus:ring-purple-500
        "
      >
        {selected?.name || "Select company"}

        <svg
          className={`w-4 h-4 text-slate-500 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className="
            absolute left-0 right-0 mt-2
            bg-white border border-slate-200 rounded-lg shadow-lg
            text-sm overflow-hidden z-50
          "
        >
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSelectedCompany(option.id);
                setOpen(false);
              }}
              className="
                w-full px-4 py-2 text-left
                hover:bg-slate-100
                text-slate-700
              "
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
