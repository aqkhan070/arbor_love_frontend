"use client";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/GlobalState/GlobalState";
import { useRouter } from "next/navigation";
import { Footer, Header } from "@/components";
import { PageTitle } from "@/components/Atoms";
import { ProgressLine } from "@/components/Molecules/ProgressLine";
import { TreeType } from "@/components/Molecules/TreeType";
import { TreeTrimm } from "@/components/Molecules/TreeTrimm";
import Image from "next/image";
import next from "../../assets/nextStep.svg";
import previous from "../../assets/previousStep.svg";
import { BushTrimm } from "@/components/Molecules/BushTrimm";
import TreeRemoval from "@/components/Molecules/TreeRemoval/TreeRemoval";
import { TreePhotoCard } from "@/components/Atoms/TreePhotoCard";
import { treeData } from "@/data/treeData";
import { TreeModal } from "@/components/Atoms/TreeModal";
import PhotoBlockModal from "@/components/Molecules/PhotoBlockModal/PhotoBlockModal";
import { useDispatch, useSelector } from "react-redux";
import { setServiceIndex } from "@/store/quoteSlice";
import toast from "react-hot-toast";
import { useGoPath } from "@/hooks/goPath";

export default function Page() {
  const {
    selectedHeight,
    hideHeightForm,
    treeTypeVisible,
    setTreeTypeVisible,
    photoInfoVisible,
    setPhotoInfoVisible,
    isModalOpen,
    setIsModalOpen,
    selectedPhoto,
    setSelectedPhoto,
    isPhotoModalOpen,
    setIsPhotoModalOpen,
  } = useContext(GlobalContext);

  const router = useRouter();
  const dispatch = useDispatch();
  const goPath = useGoPath();

  const handlePreviousStep = () => {
    if (index > 0) {
      dispatch(setServiceIndex(index - 1));
    } else {
      router.push("/add-service");
    }
  };

  const { index } = useSelector((state) => state.quote);
  const currentService = useSelector((state) => state.quote.services[index]);
  const services = useSelector((state) => state.quote.services);

  const scrollToTop = ()=> {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });
  }


  const handleNextStep = () => {
    
    // Scroll to top of page
    scrollToTop();
    const isTreeRemoval = currentService.serviceType === "Tree Removal";

    const isServiceValid =
      currentService.treeType &&
      currentService.treeHeight &&
      currentService.treeLocation &&
      currentService.utilityLines !== "" &&
      currentService.propertyFenced !== "" &&
      currentService.equipmentAccess !== "" &&
      // currentService.emergencyCutting !== "" &&
      Object.values(currentService.imageUrls).length >=
        currentService.numOfTrees &&
      Object.values(currentService.imageUrls).every((arr) => arr.length > 0) &&
      (!isTreeRemoval ||
        (currentService.stumpRemoval !== "" &&
          currentService.fallenDown !== ""));

    if (!isServiceValid) {
      toast.error(
        "Please provide full information and images required for this service."
      );
      return;
    }

    if (index < services.length - 1 && isServiceValid) {
      dispatch(setServiceIndex(index + 1));
    } else {
      router.push("/confirm");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClosePhotoModal = () => {
    setIsPhotoModalOpen(false);
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

        <div className="flex flex-col justify-between flex-1 bg-white rounded-3xl mr-5 ml-5 p-5">
          <div>
            <PageTitle />
            <div>
              <ProgressLine />
            </div>
            <div className="flex gap-10 items-stretch">
              <div
               className="md:w-[60%]"
              >
                <TreeType />
                <div>
                  <TreeTrimm key={index} />
                </div>
              </div>
              <div className="md:hidden lg:flex flex flex-col justify-between">
                {treeTypeVisible && (
                  <div className="hidden md:flex md:flex-col md:bg-[#ECECEC] md:rounded-[15px] md:p-5 md:mt-5">
                    <div className="flex gap-3 items-center justify-between mb-2">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-block h-5 w-5 flex items-center justify-center text-lightgreen bg-[#F2F2F2] rounded-full text-[12px] md:text-[18px] md:h-6 md:w-6">
                          i
                        </span>
                        <h6 className="text-black text-[12px] font-semibold md:text-[21px]">
                          {" "}
                          Tree Type
                        </h6>
                      </div>

                      <button
                        onClick={() => {
                          setTreeTypeVisible(false);
                        }}
                        className="inline-block h-5 w-5 flex items-center justify-center bg-green-500 rounded-full p-[3px] text-white text-[12px] md:text-[16px] md:h-[30px] md:w-[30px]"
                      >
                        x
                      </button>
                    </div>
                    <div className="pr-5 pl-5">
                      <h6 className="text-[#8E8E8E] text-[14px] mb-[15px]">
                        <span className="text-black font-semibold">
                          Please note:
                        </span>{" "}
                        you can click on an image to enlarge
                      </h6>

                      <div className="hidden md:grid md:grid-cols-3 md:gap-4 md:items-center">
                        {treeData.map((tree, index) => (
                          <TreePhotoCard
                            key={index}
                            photo={tree.photo}
                            name={tree.name}
                            onClick={() => {
                              setSelectedPhoto(tree.photoLarge);
                              setIsModalOpen(true);
                              console.log(tree.photo);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {isModalOpen && selectedPhoto && (
                  <TreeModal photo={selectedPhoto} onClose={handleCloseModal} />
                )}

                {isPhotoModalOpen && (
                  <PhotoBlockModal
                    isOpen={isPhotoModalOpen}
                    onClose={handleClosePhotoModal}
                    treeData={treeData}
                  />
                )}

                {/* <div className="flex-grow flex flex-col justify-end"> */}
                {photoInfoVisible && (
                  <div className="hidden md:flex md:flex-col md:max-w-[420px] mt-auto  md:bg-[#ECECEC] md:rounded-[15px] md:p-5">
                    <div className="flex gap-3 items-center justify-between mb-2">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-block h-5 w-5 flex items-center justify-center text-lightgreen bg-[#F2F2F2] rounded-full text-[12px] md:text-[18px] md:h-6 md:w-6">
                          i
                        </span>
                        <h6 className="text-black text-[12px] font-semibold md:text-[21px]">
                          {" "}
                          Photos
                        </h6>
                      </div>

                      <button
                        onClick={() => {
                          setPhotoInfoVisible(false);
                        }}
                        className="inline-block h-5 w-5 flex items-center justify-center bg-green-500 rounded-full p-[3px] text-white text-[12px] md:text-[16px] md:h-[30px] md:w-[30px]"
                      >
                        x
                      </button>
                    </div>
                    <div className="p-5">
                      <p className="text-black text-[16px] mb-3">
                        You can select three images per tree and maximum size of
                        every image should be 20mb.
                      </p>
                      <p className="text-black text-[16px]">
                        Please select the images showing each tree from
                        different angles, that would help us to understand the
                        scope of work.
                      </p>
                    </div>
                  </div>
                )}
                {/* </div> */}
              </div>
            </div>
          </div>

          <div className="border-t-2 pt-4 flex justify-between md:border-none md:pl-[40px] md:pb-[20px] md:pr-[40px] md:mt-0 mt-6">
            <button
              className="flex items-center gap-2 text-lightgreen text-[12px]"
              onClick={handlePreviousStep}
            >
              <Image src={previous} alt="previous" />
              Previous Step
            </button>
            <button
              className=" flex items-center gap-2 bg-lightgreen pt-[12px] pr-[20px] pl-[20px] pb-[12px] rounded-[10px] text-[12px]"
              onClick={handleNextStep}
            >
              Next Step
              <Image src={next} alt="next" />
            </button>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
