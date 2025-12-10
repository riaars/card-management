import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as PATH from "@/routes/Path";

const BackButton = ({ label = "Back" }: { label?: string }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(PATH.DASHBOARD)}
      className="inline-flex items-center gap-2  py-2 text-gray-700 
                 hover:text-gray-900 rounded-md transition cursor-pointer"
    >
      <MdArrowBack className="text-xl" />
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default BackButton;
