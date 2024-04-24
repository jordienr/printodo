import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  name: string;
  className?: string;
  showLines?: boolean;
  lines: number;
};

export const WeekDay = ({
  name,
  className,
  showLines = false,
  lines,
}: Props) => {
  return (
    <div
      className={cn(`week-day p-4 h-full transition-all ${className}`)}
      key={name}
    >
      {name}
      {showLines && (
        <div className="divide-y grid gap-8">
          {Array.from({ length: lines + 1 }).map((_, i) => (
            <div key={i}></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeekDay;
