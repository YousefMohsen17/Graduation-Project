import { Bot, HelpCircle, IdCard, Send, Sparkles } from "lucide-react";

const features = [
  {
    bordered: false,
    icon: (
      <Sparkles
        className="text-indigo-500"
        strokeWidth={2}
        size={26}
        aria-hidden
      />
    ),
    title: "Summarize Lessons",
    description:
      "Instantly condense long lectures into concise study notes.",
  },
  {
    bordered: true,
    icon: <HelpCircle strokeWidth={2} size={22}  />,
    title: "Generate Questions",
    description:
      "Challenge yourself with AI-generated mock exams based on your syllabus.",
  },
  {
    bordered: true,
    icon: <IdCard strokeWidth={2} size={22} />,
    title: "CV Builder",
    description:
      "Automated career guidance and template generator for tech interns.",
  },
];

const footerCards = [
  {
    title: "AI Study Helper",
    subtitle: "24/7 technical tutoring",
  },
  {
    title: "Smart Summaries",
    subtitle: "Save 60% of study time",
  },
  {
    title: "Quiz Generator",
    subtitle: "Adaptive learning tests",
  },
  {
    title: "CV Builder Tool",
    subtitle: "Professional templates",
  },
];

function AiSection() {
  return (
    <section className="box-border w-full px-4 py-12 text-left sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10 lg:mb-20 px-4">
        <h2 className="text-2xl lg:text-[31px] font-bold mb-4 lg:mb-8">AI-Powered Assistant</h2>
        <p className="text-[#141C52] max-w-[748px] mx-auto text-base lg:text-lg text-[#141C52]">
          A smart assistant designed to help CCE students study more
            efficiently and build professional CVs.
        </p>
      </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <ul className="flex flex-col gap-8 lg:gap-10">
            {features.map((item) => (
              <li key={item.title} className="flex gap-4">
                <div className="flex shrink-0 items-start pt-0.5">
                  {item.bordered ? (
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-indigo-400 text-indigo-500"
                      aria-hidden
                    >
                      {item.icon}
                    </div>
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center">
                      {item.icon}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="font-sans text-base font-bold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-[#141C52]">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div
            className="relative overflow-hidden rounded-2xl border border-indigo-100/80 bg-gradient-to-b from-white via-indigo to-[#ADB5EB] shadow-xl shadow-indigo-200/40"
            role="img"
            aria-label="Engipidia AI Assistant chat preview"
          >
            <div className="flex items-center gap-3 border-b border-indigo-100/80 px-5 py-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white">
                <Bot strokeWidth={2} size={22} aria-hidden />
              </div>
              <div>
                <p className="font-sans text-sm font-bold text-slate-900">
                  Engipidia AI- Assistant
                </p>
                <p className="text-xs font-medium text-indigo-500">
                  Always Online
                </p>
              </div>
            </div>

            <div className="space-y-3 px-5 py-4">
              <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-[#ADB5EB] px-4 py-2.5 text-sm leading-relaxed text-[#0A0E29] drop-shadow-xl">
                Hi! How can I help with your Digital Logic homework today?
              </div>
              <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-md bg-[#8490E1] px-4 py-2.5 text-sm leading-relaxed text-[#0A0E29] drop-shadow-xl">
                Can you summarize the Karnaugh map minimization rules?
              </div>
              <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-[#ADB5EB] px-4 py-2.5 text-sm leading-relaxed text-[#0A0E29] drop-shadow-xl">
                Certainly! K-map minimization follows 3 main rules: 1. Group in
                powers of 2...{" "}
                <span
                  className="ml-0.5 animate-pulse font-mono font-semibold text-indigo-600"
                  aria-hidden
                >
                  |
                </span>
              </div>
            </div>

            <div className="px-4 pb-5 pt-1">
              <div className="flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-4 py-2.5 shadow-sm">
                <span className="min-w-0 flex-1 truncate text-left text-sm text-slate-400">
                  Ask about Microprocessors...
                </span>
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white transition hover:bg-indigo-600"
                  aria-label="Send message"
                >
                  <Send strokeWidth={2} size={18} className="-translate-x-px" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-4 ">
          {footerCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl py-4 px-2 border-[1px] border-gradient-to-t from-[#D6DAF5] to-[#FAFAFA] bg-gradient-to-t from-[#D6DAF5] to-[#FFFFFF] text-center max-w-[305px] max-h-[84px] hover:from-[#8490E1] hover:to-[#FDFDFD] drop-shadow-xl"
            >
              <p className="font-sans text-sm font-bold text-slate-900">
                {card.title}
              </p>
              <p className="mt-1 text-xs text-[#141C52]">{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AiSection;






























