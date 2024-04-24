import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

type Props = {};

export const About = (props: Props) => {
  return (
    <div className="font-mono space-y-4">
      <h2 className="font-bold text-xs">About</h2>
      <p>
        App made by{" "}
        <a
          target="_blank"
          className="underline"
          href="https://twitter.com/jordienr"
        >
          Jordi Enric
        </a>{" "}
        using Next.js 14, Tailwind CSS, and TypeScript.
      </p>
      <p>
        Source code available on{" "}
        <a
          target="_blank"
          className="underline"
          href="https://github.com/jordienr/printodo"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
};

export const AboutDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>About</DialogTrigger>
      <DialogContent>
        <About />
      </DialogContent>
    </Dialog>
  );
};
