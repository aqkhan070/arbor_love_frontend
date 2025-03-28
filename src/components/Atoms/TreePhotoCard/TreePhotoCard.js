import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "@/GlobalState/GlobalState";
import oak from "../../../assets/tree_photo/oak.png";

export default function TreePhotoCard({ photo, name, onClick }) {
  const { setIsModalOpen } = useContext(GlobalContext);
  return (
    <>
      <div className="flex flex-col gap-2 items-center" onClick={onClick}>
        <Image src={photo} alt={photo} />
        <h6 className="text-black text-[16px]">{name}</h6>
      </div>
    </>
  );
}
