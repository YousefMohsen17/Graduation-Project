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
      className="group flex flex-col pt-[12px] pb-[12px] px-[16px] rounded-[24px] overflow-hidden bg-gradient-to-t from-[#D6DAF5] to-[#FFFFFF] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] border border-white justify-between hover:from-[#8490E1] hover:to-[#FDFDFD]"
    >
      <div>
        <h3 className="font-bold text-lg mb-1">{subject.name}</h3>
        <p className="text-slate-600 text-sm mb-1">{subject.instructor}</p>
        <p className="text-slate-500 text-xs mb-1">{subject.year}</p>
        
      </div>




      <button
        onClick={() => navigate(`/courses/${subject._id}`)}
        className="
                                    w-full mt-2 h-[44px] 
                                    flex items-center justify-center
                                    rounded-[25px]
                                    bg-gradient-to-t from-[#0A0E29] to-[#1E2A7B] text-[#fafafa] 
                                    hover:from-[#141C52] hover:to-[#5B6CD7]
                                    backdrop-blur-2xl
                                    shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
                                     font-medium transition-all active:scale-95
                                    border border-white hover:brightness-105
                                "
      >
        CONTINUE
      </button>
    </div>
  );
}
