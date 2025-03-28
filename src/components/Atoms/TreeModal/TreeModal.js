import Image from "next/image"

export default function TreeModal({photo, onClose}) {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#434343] bg-opacity-80">
                    <div className="max-w-4xl rounded-lg shadow-lg relative transition ease-in-out delay-150">
                        <Image className="rounded-[20px] ease-in duration-300 w-96" src={photo} alt="Enlarged Photo" />
                        <button className="absolute top-2 right-2 inline-block h-5 w-5 flex items-center justify-center bg-green-500 rounded-full p-[3px] text-white text-[12px] md:text-[16px] md:h-[25px] md:w-[25px]" onClick={onClose}>X</button>
                    </div>
            </div>
        </>
    )
}