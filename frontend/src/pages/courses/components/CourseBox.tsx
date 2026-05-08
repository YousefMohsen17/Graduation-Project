import type { Subject } from "@/types/types";
import ButtonLink from "../../../components/ButtonLink";

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
        <p className="text-slate-500 text-xs mb-1">{subject.year}</p>
        <p className="text-slate-500 text-xs mb-4">{subject.lec}lec</p>
      </div>




      <ButtonLink
                                              to="/sign-up"
                                              children="Continue"
                                              variant="solid"
                                              className="py-2 px-5 h-[35px] w-fill mt-2 group-hover:from-[#141C52] group-hover:to-[#5B6CD7]"
                                              onClick={() => navigate(`/courses/${subject._id}`)}
                                            />
    </div>
  );
}
