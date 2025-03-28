"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuote, fetchQuoteOptions } from "@/store/quoteSlice/thunk";
import { useRouter } from "next/navigation";
import { Footer, Header } from "@/components";
import { PageTitle } from "@/components/Atoms";
import { ProgressLine } from "@/components/Molecules/ProgressLine";
import { FormTitle } from "@/components/Atoms/FormTitle";
import { YesNoRow } from "@/components/Atoms/YesNoRow";
import Image from "next/image";
import photoIcon from "../../assets/photoIcon.svg";
import arrow from "../../assets/selectArrow.svg";
import done from "../../assets/done.svg";
import previous from "../../assets/previousStep.svg";
import { updateClientDetails, updateService } from "@/store/quoteSlice";
import toast from "react-hot-toast";
import { useGoPath } from "@/hooks/goPath";
import { StyledButton } from "@/components/Molecules/TreeType/TreeType";

const replaceImageUrlsWithLinks = (services) => {
  return services.map((service) => {
    let allLinks = [];
    for (const key in service.imageUrls) {
      if (Array.isArray(service.imageUrls[key])) {
        allLinks = allLinks.concat(service.imageUrls[key]);
      }
    }
    // Replace imageUrls with the array of links
    return {
      ...service,
      imageUrls: allLinks,
    };
  });
};



export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const goPath = useGoPath();
  const { index } = useSelector((state) => state.quote);

  const selectOptions = useSelector(
    (state) => state.quote.options.JOB_TIMINGS || []
  );
  const services = useSelector((state) => state.quote.services);
  const clientDetails = useSelector((state) => state.quote.clientDetails);

  useEffect(() => {
    dispatch(fetchQuoteOptions());
  }, [dispatch]);

  const goBack = () => {
    router.back();
  };

  const handleInputChange = (field, value) => {
    dispatch(updateClientDetails({ [field]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    console.log("services", services);
    const { name, email, address, phone, propertyOwner } = clientDetails;

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (name && email && address && phone && propertyOwner !== "") {
      const refactorServices = replaceImageUrlsWithLinks(services);
      dispatch(
        createQuote({
          clientDetails,
          services: refactorServices,
        })
      ).then((data) => {
        // Clear console and console.log the price
        // console.clear();
        console.log(`Total Amount: ${data.payload.amount}`);
        router.push(`/service-confirmed`);
      });
    } else {
      toast.error("Please fill in all the required fields.");
    }
  };

  useEffect(() => {
    if (services.length === 0) goPath("/");
  }, [services]);

  return (
    <>
      <main className="flex flex-col min-h-screen bg-lightgreen bg-gradient-to-t from-darkgreen">
        <div className="mb-5">
          <Header />
        </div>
        <div className="flex flex-col flex-1 bg-white rounded-3xl mr-5 ml-5 p-5">
          <div>
            <PageTitle />
          </div>
          <div className="mb-5">
            <ProgressLine progress={1} step={1} />
          </div>
          <div>
            <h6 className="text-black text-[12px] font-semibold">
              Quote Summary
            </h6>
            <ul className="list-disc pl-5">
              {services.map((service, index) => (
                <li key={index} className="text-black text-[12px] mb-2">
                  {`Service ${index + 1}: ${service.serviceType}, ${
                    service.treeType
                  }, ${service.treeHeight}`}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <FormTitle
              number={1}
              text={"Are you the property owner where the tree is located?"}
            />
            <h6 className="text-[#8E8E8E] text-[9px] pl-[30px] mt-[-8px] mb-3 md:text-[14px]">
              We may request documents on-site
            </h6>
            <div className="flex gap-2 pl-[25px] mt-3">
              <StyledButton
                isActive={clientDetails?.propertyOwner === false}
                onClick={() => handleInputChange("propertyOwner", false)}
              >
                No
              </StyledButton>
              <StyledButton
                isActive={clientDetails?.propertyOwner === true}
                onClick={() => handleInputChange("propertyOwner", true)}
              >
                Yes
              </StyledButton>
            </div>
          </div>

          <div>
            <FormTitle number={2} text={"Contact Information"} />
            <h6 className="text-[#8E8E8E] text-[9px] pl-[30px] mt-[-8px] mb-3 md:text-[14px]">
              How we will provide you with a quote
            </h6>
            <div className="pl-[25px] flex flex-col mb-6">
              <label className="text-black text-[12px]">Your name</label>
              <input
                type="text"
                className="w-[240px] h-[40px] border border-gray-300 text-[11px] rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 md:w-[367px] md:h-[55px] text-black"
                value={clientDetails.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="pl-[25px] flex flex-col mb-6">
              <label className="text-black text-[12px]">Your email</label>
              <input
                type="text"
                className="w-[240px] h-[40px] border border-gray-300 text-[11px] rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 md:w-[367px] md:h-[55px] text-black"
                value={clientDetails.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="pl-[25px] flex flex-col mb-6">
              <label className="text-black text-[12px]">Your phone</label>
              <input
                type="text"
                className="w-[240px] h-[40px] border border-gray-300 text-[11px] rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 md:w-[367px] md:h-[55px] text-black"
                value={clientDetails.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className="pl-[25px] flex flex-col mb-6">
              <label className="text-black text-[12px]">Your address</label>
              <input
                type="text"
                className="w-[240px] h-[40px] border border-gray-300 text-[11px] rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 md:w-[367px] md:h-[55px] text-black"
                value={clientDetails.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </div>
          <div>
            <FormTitle number={3} text={"Additional information"} />
            <h6 className="text-[#8E8E8E] text-[9px] pl-[30px] mt-[-8px] mb-3 md:text-[14px]">
              Share with us any additional important information
            </h6>
            <div className="pl-[25px]">
              <textarea
                type="text"
                className="w-[240px] text-black h-[140px] border border-gray-300 text-[11px] rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 md:w-[367px] md:h-[226px]"
                onChange={(e) =>
                  handleInputChange("additionalInfo", e.target.value)
                }
              />
            </div>
          </div>
          <div className="border-t-2 pt-4 mt-8 flex justify-between">
            <button
              className="flex items-center gap-2 text-lightgreen text-[12px]"
              onClick={goBack}
            >
              <Image src={previous} alt="previous" />
              Previous Step
            </button>
            <button
              className="flex items-center gap-2 bg-lightgreen pt-[12px] pr-[20px] pl-[20px] pb-[12px] rounded-[10px] text-[12px]"
              onClick={handleSubmit}
            >
              <Image src={done} alt="done" />
              Send Request
            </button>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
