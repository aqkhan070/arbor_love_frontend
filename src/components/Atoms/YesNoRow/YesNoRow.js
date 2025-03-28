import { useState } from "react";

export default function YesNoRow({ onClickYes, onClickNo, focused = null }) {
  const [focusedButton, setFocusedButton] = useState(focused);

  const handleFocus = (button) => {
    setFocusedButton(button);
  };

  return (
    <div className="flex gap-3 pl-[25px]">
      <button
        className={`text-black text-[12px] bg-[#F2F2F2] h-[40px] rounded-[10px] ${
          focusedButton === "yes"
            ? "font-semibold border-lightgreen border-[2px]"
            : ""
        } w-[105px] md:h-[50px]`}
        onClick={onClickYes}
        onFocus={() => handleFocus("yes")}
      >
        Yes
      </button>
      <button
        className={`text-black text-[12px] bg-[#F2F2F2] h-[40px] rounded-[10px] ${
          focusedButton === "no"
            ? "font-semibold border-lightgreen border-[2px]"
            : ""
        } w-[105px] md:h-[50px]`}
        onClick={onClickNo}
        onFocus={() => handleFocus("no")}
      >
        No
      </button>
    </div>
  );
}
