import type { Subject } from "@/types/types";

export default function CourseBox({
  subject,
  navigate,
}: {
  subject: Subject;
  navigate: (path: string) => void;
}) {
  return (
    <div
      key={subject._id}
      className="flex flex-col pt-[12px] pb-[12px] px-[16px] rounded-[24px] overflow-hidden bg-[#CCD1F3] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] border border-white justify-between"
    >
      <div>
        <h3 className="font-bold text-lg mb-1">{subject.name}</h3>
        <p className="text-slate-600 text-sm mb-1">{subject.instructor}</p>
        <p className="text-slate-500 text-xs mb-4">{subject.year}</p>
      </div>
      <button
        onClick={() => navigate(`/courses/${subject._id}`)}
        className="
                                    w-full mt-2 h-[44px] 
                                    flex items-center justify-center
                                    rounded-[16px]
                                    bg-linear-to-b from-[#d0d5f3] to-[#ced2f2]
                                    backdrop-blur-2xl
                                    shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
                                    text-slate-800 font-medium transition-all active:scale-95
                                    border border-white hover:brightness-105
                                "
      >
        CONTINUE
      </button>
    </div>
  );
}
