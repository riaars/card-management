import type { Company } from "../types/companies.types";

interface CompanyListProps {
  selectedCompany: string | null;
  setSelectedCompany: (company: string) => void;
  companies: Company[] | undefined;
}
const CompanyList = ({
  selectedCompany,
  setSelectedCompany,
  companies,
}: CompanyListProps) => {
  return (
    <div className="relative w-full lg:w-[450px] flex items-center justify-center mx-auto">
      <select
        value={selectedCompany ?? ""}
        onChange={(e) => setSelectedCompany(e.target.value)}
        className="w-full  appearance-none
      px-4 py-2.5 pr-10
      text-sm font-medium
      rounded-lg
      bg-white
      border border-slate-200
      text-slate-700
      focus:outline-none
      focus:ring-2 focus:ring-[#012d2f]-500 focus:border-[#012d2f]-500 cursor-pointer"
      >
        {companies?.map((company) => (
          <option
            key={company.id}
            value={company.id}
            className="w-full lg:w-[450px] cursor-pointer"
          >
            {company.name}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg
          className="w-4 h-4 text-slate-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
};

export default CompanyList;
