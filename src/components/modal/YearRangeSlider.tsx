import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMinYear, setMaxYear } from "../redux/yearSlice";
import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

const YearRangeSlider = () => {
  const minYear = useAppSelector((state) => state.year.minYear);
  const maxYear = useAppSelector((state) => state.year.maxYear);
  const dispatch = useAppDispatch();

  const min = 1980;
  const max = new Date().getFullYear();

  const [minVal, setMinVal] = useState(minYear);
  const [maxVal, setMaxVal] = useState(maxYear);

  const handleSliderChange = (event: any) => {
    const [min, max] = event;
    dispatch(setMinYear(min));
    dispatch(setMaxYear(max));
    setMinVal(min);
    setMaxVal(max);

  };

  return (
    <>
      <div className="flex flex-row">
        <h1 className=" font-bold text-xl mb-8">Select Year Range:</h1>
        <Tooltip text="Select the range of years for the endless game mode" />
      </div>
      <form>
        <Slider.Root
          className="relative flex items-center select-none touch-none h-5"
          onValueChange={handleSliderChange}
          defaultValue={[minVal, maxVal]}
          min={min}
          max={max}
          step={1}
        >
          <Slider.Track className="bg-zinc-700 relative grow rounded-full h-[2px]">
            <Slider.Range className=" absolute bg-white rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className=" relative block w-4 h-4 bg-white rounded-full cursor-pointer outline-none border-none">
            <div className="absolute -top-5 -left-1 w-20 text-xs text-white">
              {minVal}
            </div>
          </Slider.Thumb>
          <Slider.Thumb className=" relative block w-4 h-4 bg-white rounded-full cursor-pointer outline-none border-none">
            <div className="absolute -top-5 -left-1 w-20 text-xs text-white">
              {maxVal}
            </div>
          </Slider.Thumb>
        </Slider.Root>
      </form>
    </>
  );
};

const Tooltip = ({ text }: { text: string }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        className="ml-2 mt-2 flex items-center justify-center rounded-full text-sm w-5 h-5 border border-zinc-700"
        onClick={() => setShow(!show)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        aria-label="Toggle Information"
      >
        ?
      </button>
      <div
        className={`absolute right-14 bg-zinc-700 text-white p-2 rounded-lg w-40 text-xs mt-2 transition-opacity duration-300 ease-in-out ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="pointer-events-none">{text}</span>
      </div>
    </>
  );
};



export default YearRangeSlider;
