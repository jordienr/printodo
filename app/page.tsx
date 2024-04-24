"use client";

import Link from "next/link";
import { useState } from "react";
import WeekDay from "./WeekDay";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import FontSelect from "@/components/font-select";
import { Font } from "@/lib/constants";
import { AboutDialog } from "@/components/about";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SingleAccordion } from "@/components/single-accordion";
import Stepper from "@/components/stepper";
import { cn } from "@/lib/utils";

const WEEK = [
  {
    full: "Monday",
    short: "Mon",
    initial: "M",
    value: 1,
    className: "monday",
  },
  {
    full: "Tuesday",
    short: "Tue",
    initial: "T",
    value: 2,
    className: "tuesday",
  },
  {
    full: "Wednesday",
    short: "Wed",
    initial: "W",
    value: 3,
    className: "wednesday",
  },
  {
    full: "Thursday",
    short: "Thu",
    initial: "T",
    value: 4,
    className: "thursday",
  },
  {
    full: "Friday",
    short: "Fri",
    initial: "F",
    value: 5,
    className: "friday",
  },
];

const WEEKEND = [
  {
    full: "Saturday",
    short: "Sat",
    initial: "S",
    value: 6,
    className: "saturday",
  },
  {
    full: "Sunday",
    short: "Sun",
    initial: "S",
    value: 7,
    className: "sunday",
  },
];

type WeekNameFormat = "short" | "full" | "initial";

const PAPER_SIZES = {
  a4: {
    key: "A4",
    value: 1 / 1.414,
  },
  letter: {
    key: "US Letter",
    value: 1 / 1.2941,
  },
  test: {
    key: "16:9",
    value: 16 / 9,
  },
};
type Border = "solid" | "dotted" | "dashed";
type Config = {
  lines: number;
  weeksPerPage: number;
  font: Font;
  paperSize: {
    key: string;
    value: number;
  };
  zoom: number;
  showLines: boolean;
  weekNameFormat: WeekNameFormat;
  showWeekend: boolean;
  border: Border;
};

export default function Home() {
  const [config, setConfig] = useState<Config>({
    lines: 4,
    weeksPerPage: 2,
    font: "font-sans",
    paperSize: PAPER_SIZES.a4,
    zoom: 90,
    showLines: true,
    weekNameFormat: "short",
    showWeekend: true,
    border: "solid",
  });

  const setPaperSize = (size: "a4" | "letter") => {
    const paperSize = PAPER_SIZES[size];
    setConfig({ ...config, paperSize });
  };
  const setFont = (font: Font) => {
    setConfig({ ...config, font });
  };
  const setShowLines = (showLines: boolean) => {
    setConfig({ ...config, showLines });
  };
  const setWeekNameFormat = (weekNameFormat: WeekNameFormat) => {
    setConfig({ ...config, weekNameFormat });
  };

  return (
    <div className="h-screen flex">
      <aside className="w-80 border-r p-1.5 print:hidden">
        <h2 className="tracking-tight flex items-center font-medium p-3">
          <span className="text-xl mr-2">🖨️</span>
          Printodo
          <span className="text-zinc-300">.app</span>
        </h2>
        <div className="space-y-2">
          <SingleAccordion label="Page">
            <Label>Paper size</Label>
            <Select
              value={config.paperSize.toString()}
              onValueChange={(val) => setPaperSize(val as "a4" | "letter")}
            >
              <SelectTrigger>{config.paperSize.key}</SelectTrigger>
              <SelectContent>
                {Object.keys(PAPER_SIZES).map((key) => (
                  <SelectItem key={key} value={key}>
                    {
                      (
                        PAPER_SIZES as {
                          [key: string]: { key: string; value: number };
                        }
                      )[key].key
                    }
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FontSelect value={config.font} onChange={setFont} />
            <Label>Border</Label>
            <Select
              value={config.border}
              onValueChange={(v) => {
                setConfig({ ...config, border: v as Border });
              }}
            >
              <SelectTrigger>{config.border}</SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
              </SelectContent>
            </Select>
          </SingleAccordion>
          <SingleAccordion label="Weeks">
            <Label>Day name format</Label>
            <Select
              value={config.weekNameFormat}
              onValueChange={(v) => {
                setWeekNameFormat(v as WeekNameFormat);
              }}
            >
              <SelectTrigger>{config.weekNameFormat}</SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="initial">Initial</SelectItem>
              </SelectContent>
            </Select>
            <Label className="flex items-center gap-2 p-2">
              <input
                type="checkbox"
                checked={config.showWeekend}
                className="size-4"
                onChange={(e) => {
                  setConfig({ ...config, showWeekend: e.target.checked });
                }}
              />
              Show weekend
            </Label>
            <Label>Weeks per page</Label>
            <Stepper
              min={2}
              max={4}
              step={1}
              value={config.weeksPerPage}
              onChange={(weeksPerPage) => {
                setConfig({ ...config, weeksPerPage });
              }}
            />
          </SingleAccordion>
          <SingleAccordion label="List">
            <Label className="flex items-center gap-2 p-2">
              <input
                type="checkbox"
                checked={config.showLines}
                className="size-4"
                onChange={(e) => {
                  setShowLines(e.target.checked);
                }}
              />
              Show lines
            </Label>
            <Label>Lines per day</Label>
            <Stepper
              min={1}
              max={10}
              step={1}
              value={config.lines}
              onChange={(lines) => {
                setConfig({ ...config, lines });
              }}
            />
          </SingleAccordion>
        </div>
      </aside>
      <main className="bg-zinc-100 bg-dot-zinc-300 w-full h-screen overflow-auto flex flex-col px-8 pb-8 print:p-0 text-zinc-800 text-xs">
        <nav className="flex items-center sticky top-0 p-1 justify-between [&_a]:p-2 print:hidden">
          <div>
            <Stepper
              min={30}
              max={100}
              onChange={(zoom) => {
                setConfig({ ...config, zoom });
              }}
              step={10}
              value={config.zoom}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <AboutDialog />
            <Link
              target="_blank"
              className="flex gap-1 font-mono"
              title="Star us on GitHub"
              href="https://github.com/jordienr/printodo"
            >
              <GitHubLogoIcon />
              <div className="sr-only">Star us on GitHub</div>
            </Link>
            <Button
              className="sticky top-0"
              onClick={() => {
                window.print();
              }}
            >
              Print
            </Button>
          </div>
        </nav>
        <div
          className="transition-all print:!scale-100"
          style={{
            transform: `scale(${config.zoom / 100})`,
          }}
        >
          <AspectRatio
            ratio={config.paperSize.value}
            className={cn(
              ` bg-white divide-y-2 divide-dashed flex-col flex ${config.font}`
            )}
          >
            {Array.from({ length: config.weeksPerPage }).map((_, i) => (
              <div key={i} className="flex flex-grow flex-col h-full">
                <div
                  className={cn("flex h-full divide-x", {
                    "border-b": config.showWeekend,
                  })}
                >
                  {WEEK.map((day, i) => (
                    <WeekDay
                      showLines={config.showLines}
                      name={day[config.weekNameFormat]}
                      key={day.short}
                      lines={config.lines}
                    />
                  ))}
                </div>
                {config.showWeekend && (
                  <div className="flex divide-x min-h-[33%]">
                    {WEEKEND.map((day, i) => (
                      <WeekDay
                        showLines={config.showLines}
                        className="flex-grow"
                        name={day[config.weekNameFormat]}
                        key={day.short}
                        lines={0}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* <div className="flex flex-col h-full">
              <div className="flex h-full divide-x border-b">
                {WEEK.map((day, i) => (
                  <WeekDay
                    showLines={config.showLines}
                    name={day[config.weekNameFormat]}
                    key={day.short}
                  />
                ))}
              </div>
              {config.showWeekend && (
                <div className="flex divide-x min-h-[33%]">
                  {WEEKEND.map((day, i) => (
                    <WeekDay
                      showLines={config.showLines}
                      className="flex-grow"
                      name={day[config.weekNameFormat]}
                      key={day.short}
                    />
                  ))}
                </div>
              )}
            </div> */}
          </AspectRatio>
        </div>
      </main>
    </div>
  );
}
