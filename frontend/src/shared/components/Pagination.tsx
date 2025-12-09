import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalItemsPerPage: number;
  totalItems: number;
  handleChange: (pageNumber: number) => void;
}
const Pagination = ({
  currentPage,
  totalItemsPerPage,
  totalItems,
  handleChange,
}: PaginationProps) => {
  const totalPage = Math.ceil(totalItems / totalItemsPerPage);

  const pageList: (number | string)[] = [];

  if (totalPage <= 3) {
    for (let i = 1; i <= totalPage; i++) {
      pageList.push(i);
    }
  } else {
    pageList.push(1);

    if (currentPage > 3) {
      pageList.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPage - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageList.push(i);
    }

    if (currentPage < totalPage - 2) {
      pageList.push("...");
    }

    pageList.push(totalPage);
  }

  const renderPageNumber = () => {
    return pageList.map((item, index) =>
      item === "..." ? (
        <div className="px-2 text-gray-400 select-none font-medium">{item}</div>
      ) : (
        <button
          key={index}
          onClick={() => handleChange(item as number)}
          className={`min-w-[36px] h-9 flex items-center justify-center rounded-md border text-sm font-medium transition
            ${
              currentPage === item
                ? "bg-[#012d2f] text-white border-[#012d2f]-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }
          `}
        >
          {item}
        </button>
      )
    );
  };

  const disabledLeft = currentPage === 1;
  const disabledRight = currentPage === totalPage;

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-6"
      aria-label="Pagination"
    >
      <button
        disabled={disabledLeft}
        onClick={() => !disabledLeft && handleChange(currentPage - 1)}
        className={`w-9 h-9 flex items-center justify-center rounded-md border transition
          ${
            disabledLeft
              ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
              : "border-gray-300 text-gray-600 hover:bg-gray-100"
          }
        `}
      >
        <MdChevronLeft className="text-xl" />
      </button>

      <div className="flex items-center gap-1">{renderPageNumber()}</div>
      <button
        disabled={disabledRight}
        onClick={() => !disabledRight && handleChange(currentPage + 1)}
        className={`w-9 h-9 flex items-center justify-center rounded-md border transition
          ${
            disabledRight
              ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
              : "border-gray-300 text-gray-600 hover:bg-gray-100"
          }
        `}
      >
        <MdChevronRight className="text-xl" />
      </button>
    </nav>
  );
};

export default Pagination;
