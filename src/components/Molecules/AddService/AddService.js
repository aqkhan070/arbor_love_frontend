import { useDispatch, useSelector } from "react-redux";
import { ServiceSelect } from "@/components/Atoms/ServiceSelect";
import { updateService } from "@/store/quoteSlice";
import Counter from "@/components/Atoms/Counter/Counter";

const AddService = ({ index, onRemove }) => {
  const dispatch = useDispatch();
  const service = useSelector((state) => state.quote.services[index]) || {
    serviceType: "",
    numOfTrees: 0,
  };

  const handleServiceChange = (event) => {
    dispatch(
      updateService({
        index,
        service: { ...service, serviceType: event.target.value },
      })
    );
  };

  return (
    <>
      <div className="mb-10">
        
        <div className="flex gap-3 items-center mb-2">
          <span className="inline-block h-5 w-5 flex items-center justify-center bg-green-500 rounded-full p-[3px] text-white text-[12px] md:h-[30px] md:w-[30px] md:text-[16px]">
            {index + 1}
          </span>
          <h6 className="text-black text-[12px] font-semibold md:text-[22px]">
            Service
          </h6>

          {index > 0 && (
            <button
              onClick={onRemove}
              className="hidden text-[#C0C0C0] text-[12px] font-semibold focus:outline-none md:flex md:text-[16px]"
            >
              X
            </button>
          )}
        </div>

        <div className="pl-[25px]">
          <div className="flex justify-between">
            <div className="w-[92%] md:w-auto">
              <ServiceSelect
                selectedService={service.serviceType}
                onChange={handleServiceChange}
              />
            </div>
            {index > 0 && (
              <button
                onClick={onRemove}
                className="text-[#C0C0C0] text-[14px]  font-semibold focus:outline-none md:hidden"
              >
                X
              </button>
            )}
          </div>

          {/* <p className="text-black text-[12px] mt-5 md:text-[16px]">
            How many trees do you have?
          </p> */}
          {/* <Counter index={index} count={service.numOfTrees} /> */}
          {/* <p className="text-[#8E8E8E] text-[9px] mt-3 md:text-[14px] w-[92%] md:w-auto">
            <span className="text-black font-semibold">Please note:</span> count
            only trees of the same size. If you have trees of different sizes,
            please add another service for them.
          </p> */}
        </div>
      </div>
    </>
  );
};

export default AddService;
