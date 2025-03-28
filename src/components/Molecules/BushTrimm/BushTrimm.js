import { useState } from "react";
import { FormTitle } from "@/components/Atoms/FormTitle";
import Image from "next/image";
import small from "../../../assets/bushSmall.png";
import medium from "../../../assets/bushMedium.png";
import large from "../../../assets/bushLarge.png";
import plus from "../../../assets/plus.svg";
import minus from "../../../assets/minus.svg";
import photoIcon from "../../../assets/photoIcon.svg";
import { useSelector } from "react-redux";

export default function BushTrimm() {
  const [smallTreeCount, setSmallTreeCount] = useState(0);
  const [mediumTreeCount, setMediumTreeCount] = useState(0);
  const [largeTreeCount, setLargeTreeCount] = useState(0);
  const [bushArea, setBushArea] = useState(0);

  const { index } = useSelector((state) => state.quote);
  const currentService = useSelector((state) => state.quote.services[index]);

  const smallTreeDecrement = () => {
    if (smallTreeCount > 0) {
      setSmallTreeCount(smallTreeCount - 1);
    }
  };

  const mediumTreeDecrement = () => {
    if (mediumTreeCount > 0) {
      setMediumTreeCount(mediumTreeCount - 1);
    }
  };

  const largeTreeDecrement = () => {
    if (largeTreeCount > 0) {
      setLargeTreeCount(largeTreeCount - 1);
    }
  };

  return (
    <>
      {/* <FormTitle number={3} text={"Approximate Working Area"} />
            <div className="flex gap-3 items-center pl-[25px]">
            <input
                type="text"
                className="w-[50px] h-40px] border border-gray-300 text-[11px] rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="m3"
                value={bushArea}
                onChange={(e) => setBushArea(e.target.value)}
            />
            <span className="text-black text-[12px]">square feet</span>
            </div> */}
      <div>
        <FormTitle number={3} text={"Bush Volume"} />
        <div className="flex items-end gap-10 justify-center ">
          <div className="flex flex-col items-center gap-4">
            <Image className="md:w-[203px]" src={small} alt="smalll" />

            <div className="flex gap-2">
              <button onClick={smallTreeDecrement}>
                <Image src={minus} alt="minus" />
              </button>

              <span className="flex items-center justify-center text-black text-[12px] w-[40px] h-[40px] border-[1px] border-[#C9C9C9] rounded-[10px]">
                {smallTreeCount}
              </span>
              <button onClick={() => setSmallTreeCount(smallTreeCount + 1)}>
                <Image src={plus} alt="plus" />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Image className="md:w-[203px]" src={medium} alt="medium" />
            <div className="flex gap-2 ">
              <button onClick={mediumTreeDecrement}>
                <Image src={minus} alt="minus" />
              </button>
              <span className="flex items-center justify-center text-black text-[12px] w-[40px] h-[40px] border-[1px] border-[#C9C9C9] rounded-[10px]">
                {mediumTreeCount}
              </span>
              <button onClick={() => setMediumTreeCount(mediumTreeCount + 1)}>
                <Image src={plus} alt="plus" />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Image className="md:w-[208px]" src={large} alt="large" />
            <div className="flex gap-2 ">
              <button onClick={largeTreeDecrement}>
                <Image src={minus} alt="minus" />
              </button>
              <span className="flex items-center justify-center text-black text-[12px] w-[40px] h-[40px] border-[1px] border-[#C9C9C9] rounded-[10px]">
                {largeTreeCount}
              </span>
              <button onClick={() => setLargeTreeCount(largeTreeCount + 1)}>
                <Image src={plus} alt="plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <FormTitle
        number={4}
        text={"Bush Photos"}
        tooltiptext={" Nullam suscipit, ligula et scelerisqs"}
      />
      <div className="pl-[42px] flex flex-col gap-4">
        {[...Array(currentService?.numOfTrees)].map((_, idx) => (
          <div key={idx}>
            <h6 className="text-black text-[12px] mb-2">Tree {idx + 1}</h6>
            <div className={"flex gap-3"}>
              {[...Array(1)].map((_, idx) => (
                <button
                  key={idx}
                  className="bg-[#F2F2F2] p-[24px] rounded-[10px]"
                >
                  <Image src={photoIcon} alt="photo" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </>
  );
}
