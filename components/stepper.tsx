import React from "react";
import {
  MinusIcon,
  PlusIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@radix-ui/react-icons";

type Props = {
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  value: number;
};

const Stepper = (props: Props) => {
  return (
    <div>
      <div className="inline-flex items-center gap-0.5 bg-white border rounded-lg">
        <button
          className="bg-white h-7 w-7 flex items-center justify-center rounded-lg border-zinc-300 text-zinc-800"
          onClick={() => {
            if (props.value - props.step < props.min) return;
            props.onChange(props.value - props.step);
          }}
        >
          <MinusIcon />
        </button>
        <div className="w-10 h-7 text-center items-center flex justify-center font-mono bg-white text-zinc-800 text-xs">
          {props.value}
        </div>
        <button
          className="bg-white h-7 w-7 flex items-center justify-center rounded-lg border-zinc-300 text-zinc-800"
          onClick={() => {
            if (props.value + props.step > props.max) return;
            props.onChange(props.value + props.step);
          }}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default Stepper;
