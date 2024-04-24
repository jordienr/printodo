import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type Props = {
  label: string;
  children: React.ReactNode;
};
export const SingleAccordion = (props: Props) => {
  return (
    <Accordion type="multiple">
      <AccordionItem value={props.label}>
        <AccordionTrigger className="px-4">{props.label}</AccordionTrigger>
        <AccordionContent className="space-y-1">
          {props.children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
