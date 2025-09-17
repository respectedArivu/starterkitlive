"use client";
import React, { useState } from "react";
import DOMPurify from "dompurify";
import { Accordion as AccordionType } from "@/lib/types"; // import your type

interface AccordionProps {
  data: AccordionType;
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-4">{data.title}</h2>
      {data.description && (
        <p className="text-center text-gray-600 mb-6">{data.description}</p>
      )}
      <div className="space-y-4">
        {data.faq_items.map((faq, index) => (
          <div key={index} className="border-b pb-3">
            <button
              onClick={() => toggle(index)}
              className="flex justify-between w-full text-left font-semibold items-center"
            >
              {faq.question}
              {/* ✅ Updated arrow with rotation */}
              <span
                className={`ml-2 transition-transform duration-300 inline-block ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div
                className="mt-2 text-gray-700"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer) }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Accordion;
