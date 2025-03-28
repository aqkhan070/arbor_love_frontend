import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalContext } from "@/GlobalState/GlobalState";
import Image from "next/image";
import arrow from "../../../assets/selectArrow.svg";
import trees from "../../../assets/trees.svg";
import { FormTitle } from "@/components/Atoms/FormTitle";
import { fetchQuoteOptions } from "@/store/quoteSlice/thunk";
import { updateService } from "@/store/quoteSlice";
import { InfoIcon } from "@/components/Atoms/InfoIcon";

export function StyledButton({ isActive, onClick, children, buttonType }) {
  const isLargeButton = buttonType === "large";

  return (
    <button
      className={`text-black bg-[#F2F2F2] text-[12px] rounded-[10px] h-[40px] md:w-[118px] w-[75px] md:text-[16px] ${
        isActive ? "font-semibold border-lightgreen border-[2px]" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function TreeType({ onClick }) {
  const { setSelectedHeight, setTreeTypeVisible } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const [knowTreeType, setKnowTreeType] = useState(null);

  const {
    options: { TREE_TYPES = [], TREE_HEIGHTS = [], TREE_LOCATIONS = [] },
    services,
    index,
  } = useSelector((state) => state.quote);

  const currentService = services[index];

  useEffect(() => {
    dispatch(fetchQuoteOptions());

    // Auto-populate the Yes/No option based on existing data
    if (currentService?.treeType) {
      if (currentService.treeType === "Others") {
        setKnowTreeType(false);
      } else {
        setKnowTreeType(true);
      }
    } else {
      setKnowTreeType(null);
    }
  }, [dispatch, currentService?.treeType]);

  const handleUpdateService = (key, value) => {
    dispatch(updateService({ index, service: { [key]: value } }));
  };

  // Removed emergency cutting question so setting service value to false by default
  if (currentService?.emergencyCutting !== false) {
    handleUpdateService('emergencyCutting', false);
  }

  return (
    <>
      <div className="flex gap-3 items-center mb-2 mt-10">
        <span className="inline-block h-5 w-5 flex items-center justify-center bg-green-500 rounded-full p-[3px] text-white text-[12px] md:text-[16px] md:h-[30px] md:w-[30px]">
          1
        </span>
        <h6 className="text-black text-[12px] font-semibold md:text-[21px]">
          Do you know the type of your tree?
        </h6>
        <span
          className="inline-block h-5 w-5 flex items-center justify-center text-lightgreen bg-[#F2F2F2] rounded-full text-[12px] cursor-pointer"
          onClick={() => setTreeTypeVisible(true)}
        >
          i
        </span>
      </div>
<div className=" mt-5 mb-1 text-gray-600 text-[14px] px-[25px]">
      If you don’t know what type of tree you have, don’t worry our experts are here to help you.
Please select “I am not sure what kind of tree I have” from the drop down list.
      </div>
      <div className="relative inline-block pl-[25px] mt-2 ">
        <select
          value={currentService?.treeType || ""}
          onChange={(e) => handleUpdateService("treeType", e.target.value)}
          className="block w-full relative appearance-none text-gray-600 placeholder:text-[#BCBCBC] text-[12px] bg-white border border-[#C9C9C9] hover:border-gray-500 px-4 py-3 pr-[30px] rounded-[10px] shadow leading-tight focus:outline-none focus:shadow-outline md:w-[367px] md:h-[50px] md:text-[16px] cursor-pointer "
        >
          <option value="" disabled>
            Select a tree type
          </option>
          <option value="I am not sure what kind of tree I have">
            I am not sure what kind of tree I have
          </option>
          
          {TREE_TYPES.filter(
            (type) =>
              type !== "Others" &&
              type !== "I am not sure what kind of tree I have" &&
              type !== "My tree is not listed here"
          ).map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
          <option value="My tree is not listed here">
            My tree is not listed here
          </option>
          
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <Image src={arrow} alt="arrow" />
        </div>
      </div>

      {/* <div className=" mt-5 text-gray-600 text-[14px] px-[25px]">
      If you don’t know what type of tree you have, don’t worry our experts are here to help you.
Please select “I am not sure what kind of tree I have” from the drop down list.
      </div> */}
      <FormTitle number={2} text="Approximate Tree Height" />
      <div className="mt-[-15px]">
        <Image className="w-auto md:w-[740px]" src={trees} alt="trees" />
      </div>

      <div className="flex gap-2 pl-[25px] flex-wrap md:pl-[25px]  mt-3">
        {TREE_HEIGHTS.map((item) => (
          <StyledButton
            key={item}
            isActive={currentService?.treeHeight === item}
            onClick={() => {
              handleUpdateService("treeHeight", item);
              setSelectedHeight(item);
            }}
          >
            {item}
          </StyledButton>
        ))}
      </div>
      {/* FrontYard,Backyard */}
      <FormTitle number={3} text="Tree Location" />
      <div className="flex gap-2 pl-[25px] mt-3">
        {TREE_LOCATIONS.map((item) => (
          <StyledButton
            key={item}
            isActive={currentService?.treeLocation === item}
            onClick={() => handleUpdateService("treeLocation", item)}
            buttonType={"large"}
          >
            {item}
          </StyledButton>
        ))}
      </div>

      <FormTitle number={4} text="Is the tree within 10 feet of utility lines?" />
      <div className="flex gap-2 pl-[25px] mt-3">
        <StyledButton
          isActive={currentService?.utilityLines === false}
          onClick={() => handleUpdateService("utilityLines", false)}
        >
          No
        </StyledButton>
        <StyledButton
          isActive={currentService?.utilityLines === true}
          onClick={() => handleUpdateService("utilityLines", true)}
        >
          Yes
        </StyledButton>
      </div>

      {/* New Fields: Property Fenced, Equipment Access, Emergency Cutting */}
      <div className="flex gap-3 items-center mb-2 mt-10">
        <span className="inline-block h-5 w-5 flex items-center justify-center bg-green-500 rounded-full p-[3px] text-white text-[12px] md:text-[16px] md:h-[30px] md:w-[30px]">
          5
        </span>
        <h6 className="text-black text-[12px] font-semibold md:text-[21px]">
          Is there anything located below the tree?
        </h6>
        <InfoIcon className="inline-block h-5 w-5 flex" infoText="To help protect your property during the trimming or removal process, are there any objects that could be damaged or are in the path of falling branches? For example: fences, pools, parts of your house, pergolas, etc." />
      </div>
      
      <div className="flex gap-2 pl-[25px] mt-3">
        <StyledButton
          isActive={currentService?.propertyFenced === false}
          onClick={() => handleUpdateService("propertyFenced", false)}
        >
          No
        </StyledButton>
        <StyledButton
          isActive={currentService?.propertyFenced === true}
          onClick={() => handleUpdateService("propertyFenced", true)}
        >
          Yes
        </StyledButton>
      </div>

      <FormTitle number={6} text="Can machinery/equipment (approx. 12 FT wide) access the tree?" />
      <div className="flex gap-2 pl-[25px] mt-3">
        <StyledButton
          isActive={currentService?.equipmentAccess === false}
          onClick={() => handleUpdateService("equipmentAccess", false)}
        >
          No
        </StyledButton>
        <StyledButton
          isActive={currentService?.equipmentAccess === true}
          onClick={() => handleUpdateService("equipmentAccess", true)}
        >
          Yes
        </StyledButton>
      </div>
      

      {/* <FormTitle number={7} text="Do you need emergency cutting?" /> */}
      {/* <div className="flex gap-2 pl-[25px] mt-3">
        <StyledButton
          isActive={currentService?.emergencyCutting === false}
          onClick={() => handleUpdateService("emergencyCutting", false)}
        >
          No
        </StyledButton>
        <StyledButton
          isActive={currentService?.emergencyCutting === true}
          onClick={() => handleUpdateService("emergencyCutting", true)}
        >
          Yes
        </StyledButton>
      </div> */}

      

      {/* Additional Fields based on Tree Removal */}
      {currentService?.serviceType === "Tree Removal" && (
        <>
          <FormTitle number={8} text="Do you need stump removal?" />
          <div className="flex gap-2 pl-[25px] mt-3">
            <StyledButton
              isActive={currentService?.stumpRemoval === false}
              onClick={() => handleUpdateService("stumpRemoval", false)}
            >
              No
            </StyledButton>
            <StyledButton
              isActive={currentService?.stumpRemoval === true}
              onClick={() => handleUpdateService("stumpRemoval", true)}
            >
              Yes
            </StyledButton>
          </div>

          <FormTitle number={9} text="Has all or any part of the tree fallen down?" />
          <div className="flex gap-2 pl-[25px] mt-3">
            <StyledButton
              isActive={currentService?.fallenDown === false}
              onClick={() => handleUpdateService("fallenDown", false)}
            >
              No
            </StyledButton>
            <StyledButton
              isActive={currentService?.fallenDown === true}
              onClick={() => handleUpdateService("fallenDown", true)}
            >
              Yes
            </StyledButton>
          </div>
        </>
      )}
    </>
  );
}
