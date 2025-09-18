"use client";

import DOMPurify from "dompurify";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBtestenties, getPage, initLivePreview } from "@/lib/contentstack";
import { Page } from "@/lib/types";
import ContentstackLivePreview, { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";
import Custo from "@/components/test";
import { testt } from "@/lib/types";
// 👇 Import Accordion + type + data helper
import Accordion from "@/components/Accordion";
import { getAccordion } from "@/lib/contentstack";
import { Accordion as AccordionType } from "@/lib/types";

export default function Home() {
    const [page, setPage] = useState<Page>();
    const [accordionData, setAccordionData] = useState<AccordionType | null>(null); // this is
    const [news,setnews] = useState<testt[]>([]);

    const getContent = async () => {
          const pageData = await getPage("/");
          setPage(pageData);

          const accData = await getAccordion();
          setAccordionData(accData);

          const newsdata = await getBtestenties();
          setnews(newsdata);
  };

         useEffect(() => {
           initLivePreview();
           ContentstackLivePreview.onEntryChange(getContent);
           getContent();
         }, 
         []);

  return (
    <main className="max-w-(--breakpoint-md) mx-auto">
      <section className="p-4">
        
        {page?.title && (
          <h1 className="text-4xl font-bold mb-4 text-center" {...(page?.$ && page?.$.title)}>
            {page.title} with Next
          </h1>
        )}

        {page?.description && (
          <p className="mb-4 text-center" {...(page?.$ && page?.$.description)}>
            {page.description}
          </p>
        )}

        

        {page?.rich_text && (
          <div
            {...(page?.$ && page?.$.rich_text)}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.rich_text) }}
          />
        )}


       
        
{/* // this will show only latest {news.length > 0 && <Custo news={news[0]} />} */}

        {accordionData && (
          <div className="mt-12">
            <Accordion data={accordionData} />
          </div>
        )}

        
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
       Latest News
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {news.map((item, index) => (
      <div
        key={index}
        className="bg-white  shadow-md hover:shadow-xl transition duration-300 overflow-hidden p-6"
      >
        <Custo news={item} />
      </div>
      ))}
      </div>
    </section>

      
    </main>
  );
}
