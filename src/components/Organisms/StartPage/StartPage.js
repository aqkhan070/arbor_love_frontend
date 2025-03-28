"use client";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useGoPath } from "@/hooks/goPath";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceSelect } from "@/components/Atoms/ServiceSelect";
import { addService, resetQuote } from "@/store/quoteSlice";

export default function StartPage() {
  let [selectedService, setSelectedService] = useState("");
  const dispatch = useDispatch();
  const goPath = useGoPath();

  const selectService = (e) => {
    setSelectedService(e.target.value);
  };

  const getQuote = () => {
    // if (selectedService) { // commenting out because it's not used and removed the service selector
      dispatch(resetQuote());
      dispatch(
        addService({
          serviceType: selectedService,
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
      goPath("/add-service");
    // }
  };

  return (
    <>
      <div className="flex flex-col h-screen md:pl-[120px] md:pr-[120px]">
        <div className="mb-5">
          <Header />
        </div>
        <div className="flex flex-col justify-center flex-1 bg-white rounded-3xl mr-5 ml-5 p-5 h-full md:place-content-center ">
          <div className="flex flex-col md:items-center gap-5">
            <h1 className="text-violet text-[45px] leading-[40px] font-bold font-geologica md:text-center lg:text-[60px] gap-5" style={{lineHeight: '1em'}} >
            The most convenient tree service around
            </h1>
            <p className="text-black text-xs text-base/2 lg:text-[26px] lg:leading-[34px] lg:max-w-[877px] md:text-center">
            Get a tree trim quote fast, no paperwork needed.  Simply answer a few questions about your trees, share a photo and we will promptly send you a quote.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-5 mt-7 justify-center md:mt-[40px] w-full md:w-auto">
            <div className="w-full md:w-auto">
              {/* <ServiceSelect
                selectedService={selectedService}
                onChange={selectService}
              /> */}
            </div>

            <button
              // disabled={selectedService === ""}
              className="bg-lightgreen text-[12px] w-full md:w-auto rounded-lg pt-[12px] pb-[12px] pr-[20px] pl-[20px] disabled:opacity-50"
              onClick={getQuote}
            >
              Get Started
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
