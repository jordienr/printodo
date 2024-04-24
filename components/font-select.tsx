import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Font, fonts } from "@/lib/constants";
import { Label } from "./ui/label";

type Props = {
  onChange: (font: Font) => void;
  value: string;
};

const FontSelect = (props: Props) => {
  return (
    <>
      <Label>Font</Label>
      <Select value={props.value} onValueChange={props.onChange}>
        <SelectTrigger>
          <span>{props.value}</span>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(fonts).map(([key, value]) => (
            <SelectItem
              key={key}
              value={value}
              className={fonts[key as keyof typeof fonts]}
            >
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default FontSelect;
