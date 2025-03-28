import { useDispatch } from 'react-redux';
import Image from 'next/image';
import countUp from '../../../assets/arrowUp.svg';
import countDown from '../../../assets/selectArrow.svg';
import { updateService } from '@/store/quoteSlice';

const Counter = ({ index, count }) => {
    const dispatch = useDispatch();

    const increment = () => {
        dispatch(updateService({ index, service: { numOfTrees: count + 1 } }));
    };

    const decrement = () => {
        if (count > 1) {
            dispatch(updateService({ index, service: { numOfTrees: count - 1 } }));
        }
    };

    return (
        <div className="border w-[90px] h-[40px] rounded-lg p-2 pl-4 flex items-center justify-between md:w-[142px] md:h-[50px]">
            <span className="text-[12px] text-black md:text-[16px]">{count}</span>
            <div className='flex flex-col gap-[5px]'>
                <button
                    onClick={increment}
                    className="text-gray-700 px-3 py-1 rounded-full focus:outline-none"
                >
                    <Image src={countUp} alt="countUp" />
                </button>
                <button
                    onClick={decrement}
                    className="text-gray-700 px-3 py-1 rounded-full focus:outline-none"
                >
                    <Image src={countDown} alt="countDown" />
                </button>
            </div>
        </div>
    );
};

export default Counter;
