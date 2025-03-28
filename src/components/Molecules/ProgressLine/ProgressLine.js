import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

export default function ProgressLine() {
  const { index, services } = useSelector((state) => state.quote);
  const router = useRouter();
  const pathname = usePathname();

  const getStepNumber = () => {
    if (pathname === "/add-service") {
      return 1;
    } else if (pathname === "/service-details") {
      return 2 + index; // Each service is a sub-step within the service-details step
    } else if (pathname === "/confirm") {
      return 2 + services.length; // After all services, the confirm step is the last step
    } else {
      return 1;
    }
  };

  const step = getStepNumber();
  const totalSteps = 2 + services.length; // Add-service + all services + confirm

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <>
      <div className="h-[10px] bg-gray-200 rounded-full overflow-hidden mt-3 mb-1">
        <div
          className="h-full bg-[#7169A1]"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between pt-1">
        <h6 className="text-black text-[16px] font-semibold">
          {`Step ${step}:`}
          {pathname === "/service-details" && (
            <span className={"font-normal"}>
              &nbsp;Service {index + 1}, {services?.[index]?.serviceType}
            </span>
          )}
        </h6>
        <h6 className="text-black text-[16px] font-semibold">{`${step}/${totalSteps}`}</h6>
      </div>
    </>
  );
}
