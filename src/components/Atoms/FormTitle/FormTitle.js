import Tooltip from "@/components/Molecules/TextTooltip/TextTooltip"

export default function FormTitle({number, text, tooltiptext}) {
    return (
        <>
            <div className="flex gap-3 items-center mb-2 mt-10">
                <span className="inline-block h-5 w-5 flex items-center justify-center bg-green-500 rounded-full p-[3px] text-white text-[12px] md:text-[16px] md:h-[30px] md:w-[30px]">{number}</span>
                <h6 className="text-black text-[12px] font-semibold md:text-[21px]"> {text}</h6>
                {/* <span className="inline-block h-5 w-5 flex items-center justify-center text-lightgreen bg-[#F2F2F2] rounded-full text-[12px]">i</span> */}
                {
                    tooltiptext && (
                <Tooltip
                 text={tooltiptext}
                 >
                        <span className="inline-block h-5 w-5 flex items-center justify-center text-lightgreen bg-[#F2F2F2] rounded-full text-[12px]">i</span>
                </Tooltip>
                    )
                }
                
            </div>
        </>
    )
}