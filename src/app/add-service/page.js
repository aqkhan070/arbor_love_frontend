"use client";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "@/components";
import { PageTitle } from "@/components/Atoms";
import { ProgressLine } from "@/components/Molecules/ProgressLine";
import { useGoPath } from "@/hooks/goPath";
import Image from "next/image";
import next from "../../assets/nextStep.svg";
import { addService, removeService } from "@/store/quoteSlice";
import AddService from "@/components/Molecules/AddService/AddService";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function ServicesPage() {
  const goPath = useGoPath();
  const dispatch = useDispatch();
  const services = useSelector((state) => state.quote.services);
  const totalSteps = 3;

  const cancel = () => {
    goPath("/");
  };

  const nextStep = () => {
    const allJobTypesSelected = services.every(
      (service) => service.serviceType !== ""
    );
    if (allJobTypesSelected) {
      goPath("/service-details");
    } else {
      toast.error(
        "Please select a job type for each service before proceeding."
      );
    }
  };

  const handleAddService = () => {
    dispatch(
      addService({
        serviceType: "",
        numOfTrees: 1,
        treeLocation: "",
        treeType: "",
        treeHeight: "",
        imageUrls: [],
        utilityLines: "",
        stumpRemoval: "",
        fallenDown: "",
        propertyFenced: "",
        equipmentAccess: "",
        emergencyCutting: "",
      })
    );
  };

  const handleRemoveService = (index) => {
    dispatch(removeService(index));
  };

  useEffect(() => {
    if (services.length === 0)    goPath("/");
  }, [services]);

  return (
    <>
      <main className="flex flex-col min-h-screen bg-lightgreen bg-gradient-to-t from-darkgreen md:pl-[120px] md:pr-[120px]">
        <div className="mb-5">
          <Header />
        </div>

        <div className="flex flex-col flex-1 justify-between bg-white rounded-3xl mr-5 ml-5 p-5">
          <div>
            <PageTitle />
            <div className="mb-8">
              <ProgressLine
                progress={1}
                step={1}
                totalSteps={totalSteps}
                text={"Services"}
              />
            </div>
            <div><p className="text-black semi-bold mb-10">Add a service below for each individual tree you would like trimmed or removed.  For example, if I want to have 5 trees trimmed I will add 5 services below.</p></div>

            <div>
              {services.map((service, index) => (
                <AddService
                  key={index}
                  index={index}
                  onRemove={() => handleRemoveService(index)}
                />
              ))}
            </div>
            <div className="flex gap-3 mb-5">
              <span className="inline-block h-5 w-5 flex items-center justify-center bg-green-500 rounded-full p-[3px] text-white text-[15px] md:h-[30px] md:w-[30px] md:text-[20px]">
                +
              </span>
              <button
                className="text-lightgreen text-[12px] md:text-[16px]"
                onClick={handleAddService}
              >
                Add Service
              </button>
            </div>
          </div>

          <div className="border-t-2 pt-4 flex justify-between md:border-none md:pl-[40px] md:pb-[20px] md:pr-[40px]">
            <button
              className="text-[#C0C0C0] text-[12px] md:text-[#15B427] md:text-[16px]"
              onClick={cancel}
            >
              Cancel
            </button>
            <button
              className="flex items-center gap-2 bg-lightgreen pt-[12px] pr-[20px] pl-[20px] pb-[12px] rounded-[10px] text-[12px]"
              onClick={nextStep}
            >
              Next Step
              <Image src={next} alt="button" />
            </button>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
