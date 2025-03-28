import { FormTitle } from "@/components/Atoms/FormTitle";
import { YesNoRow } from "@/components/Atoms/YesNoRow";
import Image from "next/image";
import photoIcon from "../../../assets/photoIcon.svg";

export default function TreeRemoval() {
  return (
    <>
      <div>
        <div>
          <FormTitle number={3} text={"Has all or any part of the tree fallen down?"} />
          <YesNoRow />
        </div>
        <div>
          <FormTitle
            number={4}
            text={"Is the tree within 10 feet of utility lines?"}
          />
          <YesNoRow />
        </div>
        <div>
          <FormTitle number={5} text={"Do you need stump removal?"} />
          <YesNoRow />
        </div>
        <div>
          <FormTitle number={6} text={"Do You Want Debris Removal?"} />
          <YesNoRow />
        </div>
        <div>
          <FormTitle number={7} text={"Is the Cutting an Emergency?"} />
          <YesNoRow />
        </div>
        <div>
          <FormTitle number={8} text={"Tree Photos"} />
          <div className="pl-[25px] mt-3 mb-10">
            <button className="bg-[#F2F2F2] p-[24px] rounded-[10px]">
              <Image src={photoIcon} alt="photo" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
