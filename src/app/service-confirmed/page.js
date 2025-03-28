"use client";
import { Footer, Header } from "@/components";
import Image from "next/image";
import confirmed from "../../assets/confirmed.svg";
import { useGoPath } from "@/hooks/goPath";

export default function Page() {
  const goPath = useGoPath();
  return (
    <>
      <main className="flex flex-col min-h-screen bg-lightgreen bg-gradient-to-t from-darkgreen">
        <div className="mb-5">
          <Header />
        </div>
        <div className="flex flex-col justify-between flex-1 bg-white rounded-3xl mr-5 ml-5 p-5 md:items-center">
          <div></div>
          <div>
            <div>
              <div className="flex gap-5 pl-4 md:justify-center">
                <h1 className="text-[45px] text-[#7169A2] font-geologica font-semibold md:text-[42px]">
                  Perfect
                </h1>
                <Image src={confirmed} alt="confirmed" />
              </div>
              <div className="pl-4 mt-[14px] md:mt-[42px] md:text-center">
                <p className="text-black text-[12px] leading-[20px] md:text-[26px] md:leading-[30px]">
                Thank you for contacting Arbor Love.
                </p>
                <p className="text-black text-[12px] leading-[20px] md:text-[26px] md:leading-[30px]">
                We will reach out to your quote within 24 to 48 hours.
                </p>
              </div>

            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="gap-2 bg-lightgreen pt-[12px] pr-[38px] pl-[38px] pb-[12px] rounded-[10px] text-[12px]"
              onClick={() => goPath("/")}
            >
              Home
            </button>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
