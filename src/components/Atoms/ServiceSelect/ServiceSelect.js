import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuoteOptions } from "@/store/quoteSlice/thunk";
import Image from "next/image";
import arrow from "../../../assets/selectArrow.svg";

export default function ServiceSelect({ selectedService, onChange }) {
  const dispatch = useDispatch();
  const jobTypes = useSelector((state) => state.quote.options.JOB_TYPES || []);

  useEffect(() => {
    dispatch(fetchQuoteOptions());
  }, [dispatch]);

  return (
    <div className="relative inline-block w-full md:w-auto">
      <select
        value={selectedService}
        onChange={onChange}
        className="block w-full relative appearance-none text-gray-600 placeholder:text-[#BCBCBC] text-[12px] bg-white border border-[#C9C9C9] hover:border-gray-500 px-4 py-3 pr-[30px] rounded-[10px] shadow leading-tight focus:outline-none focus:shadow-outline md:w-[367px] md:h-[50px] md:text-[16px] cursor-pointer"
      >
        <option value="" disabled selected hidden>
          Select service
        </option>
        {jobTypes.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute top-4 right-2 md:top-0 md:inset-y-0 flex items-center px-2 text-gray-700">
        <Image className="fill-current" src={arrow} alt="current" />
      </div>
    </div>
  );
}
