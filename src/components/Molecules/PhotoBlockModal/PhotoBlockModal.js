import { TreePhotoCard } from "@/components/Atoms/TreePhotoCard";
import { treeData } from "@/data/treeData";
import { useContext } from "react";
import { GlobalContext } from "@/GlobalState/GlobalState";
import Image from "next/image";
import { TreeModal } from "@/components/Atoms/TreeModal";
import { Header } from "@/components/Header";


export default function PhotoBlockModal({ isOpen, onClose }) {
    const { isModalOpen,
            setIsModalOpen,
            setSelectedPhoto,
            selectedPhoto} = useContext(GlobalContext)
    // if (!isOpen) return null;
    const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    return (
        <div className="md:hidden fixed inset-0 z-50 flex items-center justify-center bg-[#434343] bg-opacity-80">
        <div className=" flex-1 bg-white rounded-[20px] shadow-lg p-5 mx-5 mt-[130px] mb-[100px]  max-h-full overflow-y-auto w-full md:w-auto">
            <div className="flex justify-between items-center">
                <h6 className="text-black text-[22px] font-semibold md:text-[21px]">Tree Type</h6>
                <button
                    onClick={onClose}
                    className="inline-block h-5 w-5 flex items-center justify-center bg-green-500 rounded-full p-[3px] text-white text-[12px] md:text-[16px] md:h-[30px] md:w-[30px]"
                >
                    x
                </button>
            </div>
            <h6 className="text-[#8E8E8E] text-[14px] mb-[15px]"><span className="text-black font-semibold">Please note:</span> you can click on an image to enlarge</h6>
            <div className="grid grid-cols-3 gap-4 items-center">
                {treeData.map((tree, index) => (
                    <div key={index} className="mb-4">
                        <TreePhotoCard 
                         key={index}
                         photo={tree.photo}
                          name={tree.name}
                          onClick={() => {
                            setSelectedPhoto(tree.photoLarge)
                            setIsModalOpen(true)
                            console.log("hello")
                        }}
                           />
                    </div>
                ))}
                    {
                                    isModalOpen && selectedPhoto && (
                                        <TreeModal photo={selectedPhoto} onClose={handleCloseModal} />
                                    )
                                }
            </div>
        </div>
    </div>
    )
}