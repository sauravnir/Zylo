import { NavigationBar } from "@/components/reusable/Navigation";
import { Footer } from "@/components/reusable/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SHIPPINGFAQS } from "@/objects/Objects";

export const Shipping = () => {
  return (
    <div className="min-h-screen">
      <NavigationBar />

      <div className="flex flex-col max-w-3xl mx-auto px-4 md:px-6 pt-40 pb-10">
        <h1 className="text-h3 text-main uppercase text-center">Shipping</h1>

        <Accordion type="single" collapsible className="w-full mt-12">
        {SHIPPINGFAQS.map((item)=>(
            <AccordionItem
                key={item.id} value={item.id}
            >
                <AccordionTrigger
                className="text-[16px] font-medium uppercase tracking-widest border-t"
                >
                    {item.question}
                </AccordionTrigger>

                <AccordionContent className="text-muted text-base items-center tracking-wide">
                    {item.answer}
                </AccordionContent>
            </AccordionItem>
        ))}
        </Accordion>
      </div>

      <Footer />
    </div>
  );
};
