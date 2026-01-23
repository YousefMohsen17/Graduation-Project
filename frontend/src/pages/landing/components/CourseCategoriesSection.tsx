import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export default function CourseCategoriesSection() {
  const [openAccordion, setOpenAccordion] = useState(-1);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState("0px"); // initial height
  const accordions = [
    {
      id: 1,
      title: "Physics",
      content:
        "Learn the fundamentals of physics and explore related subjects like Electronics, Mobile Communications, Analog Systems, and Digital Communications.",
    },
    {
      id: 2,
      title: "Communications",
      content:
        "Build expertise in modern communication technologies such as Mobile Networks, Analog Communication, and Digital Communication Systems.",
    },
    {
      id: 3,
      title: "Software",
      content:
        "Enhance software capabilities with Advanced Programming and Computer-Aided Design to boost coding and design skills.",
    },
    {
      id: 4,
      title: "Hardware",
      content:
        "Develop a solid hardware background through Logic Design, Computer Architecture, Microprocessors, and Embedded Systems.",
    },
    {
      id: 5,
      title: "Personal Development",
      content:
        "Improve personal skills and productivity through learning fundamentals of physics, communication basics, and problem-solving techniques.",
    },
  ];
  useEffect(() => {
    if (openAccordion !== -1 && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [openAccordion]);
  return (
    <section className="mb-10 lg:mb-16">
      <div className="container mx-auto p-4">
        <div className="text-center mb-10 lg:mb-20">
          <h2 className="text-2xl lg:text-[31px] font-bold mb-4 lg:mb-8">
            Explore Our Course Categories
          </h2>
          <p className="text-[#141C52] max-w-[748px] mx-auto text-sm lg:text-base">
            A collection of essential subjects designed to build your knowledge,
            sharpen your skills, and support your academic journey.
          </p>
        </div>
        {accordions.map((accordion, index: number) => (
          <div
            className={`transition-transform duration-500 ${openAccordion === accordion.id
              ? "bg-[#0a0e29] flex flex-col gap-4 lg:gap-6  "
              : "bg-[#EAEDFA]"
              } py-6 lg:py-8 px-4 lg:px-5 rounded-[20px] lg:rounded-[45px] mb-4 lg:mb-8 border border-[#050715] `}
            key={index}
          >
            <div
              className={`flex items-center transition-transform duration-500 ${openAccordion === accordion.id
                ? "border-b border-b-[#EAEDFA] pb-4 lg:pb-6 -translate-y-2 lg:-translate-y-4"
                : ""
                } `}
            >
              <h2
                className={`${openAccordion === accordion.id ? "text-[#EAEDFA]" : ""
                  } font-bold text-xl lg:text-[31px] mr-2.5 `}
              >
                {accordion.id}
              </h2>
              <h3
                className={`${openAccordion === accordion.id ? "text-[#EAEDFA]" : ""
                  } font-bold text-[12px]! sm:text-[25px]!`}
              >
                {accordion.title}
              </h3>
              {openAccordion && (
                <Minus
                  className="text-[#EAEDFA] ml-auto size-8 lg:size-14 rounded-full border border-[#EAEDFA] cursor-pointer p-1 lg:p-2"
                  onClick={() => setOpenAccordion(-1)}
                />
              )}
              {openAccordion !== accordion.id && (
                <Plus
                  className="ml-auto size-10 lg:size-14 rounded-full border border-[#050715] cursor-pointer p-1 lg:p-2"
                  onClick={() =>
                    accordion.id === index + 1
                      ? setOpenAccordion(accordion.id)
                      : null
                  }
                />
              )}
            </div>
            {openAccordion === accordion.id && (
              <div
                ref={contentRef}
                style={{
                  height: height,
                  overflow: "hidden",
                  transition: "height 0.3s ease",
                }}
              >
                <p className="text-[#EAEDFA] text-sm lg:text-base">{accordion.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
