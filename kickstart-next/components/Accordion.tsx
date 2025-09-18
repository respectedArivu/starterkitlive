"use client";
import { useState } from "react";
import DOMPurify from "dompurify";
import { Accordion as AccordionType } from "@/lib/types";

interface AccordionProps {
  data: AccordionType;
}

export default function Accordion({ data }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto py-12 px-4 bg-gray-300 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-4">{data.title}</h2>
      {data.description && <p className="text-center text-gray-600 mb-6">{data.description}</p>}

      <div className="space-y-4">
        {data.faq_items.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div key={idx} className="border-b pb-3">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex justify-between w-full text-left font-semibold items-center"
              >
                {faq.question}
                <span className={`ml-2 transition-transform duration-300 inline-block ${isOpen ? "rotate-180" : ""}`}>
                  v
                </span>
              </button>

              {isOpen && (
                <div
                  className="mt-2 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer) }}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
