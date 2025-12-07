import { useState, useEffect } from "react";
import { MdSearch, MdClose } from "react-icons/md";

interface SearchInputProps {
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  debounce?: number;
  className?: string;
}

const SearchInput = ({
  value = "",
  placeholder = "Search...",
  onChange,
  debounce = 300,
  className = "",
}: SearchInputProps) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const delay = setTimeout(() => {
      onChange(internalValue);
    }, debounce);

    return () => clearTimeout(delay);
  }, [internalValue]);

  const clearSearch = () => {
    setInternalValue("");
    onChange("");
  };

  return (
    <div
      className={`flex items-center gap-2 border rounded-md bg-white px-3 py-2 shadow-sm 
        focus-within:ring-2 focus-within:ring-blue-500 transition ${className}`}
    >
      <MdSearch className="text-gray-500 text-xl" />

      <input
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 outline-none text-gray-700 placeholder-gray-400"
      />

      {internalValue !== "" && (
        <button onClick={clearSearch}>
          <MdClose className="text-gray-400 hover:text-gray-600 text-lg" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
