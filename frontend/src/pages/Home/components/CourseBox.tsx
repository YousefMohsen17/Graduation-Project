import subjectImage from "../../../assets/subject-image.jpg"
import { SkeletonCard } from "../../../components/Skeleton";
import ProgressBarCard from "../../../components/ProgressBar";
import ButtonLink from "../../../components/ButtonLink";
import { useSubjects } from "../../../lib/queries";
import type { Subject } from "@/types/types";

export default function CourseBox() {
    const { data, isLoading, error } = useSubjects()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-20">
            {data?.data?.map((subject: Subject) => (
                <>
                    {subject && !isLoading && !error && (
                        <div className="group flex flex-col justify-between pt-[12px] pb-[12px] px-[16px] rounded-[24px] overflow-hidden bg-gradient-to-t from-[#D6DAF5] to-[#FFFFFF] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] border border-white hover:from-[#8490E1] hover:to-[#FDFDFD]">
                            {/* Course Image */}
                            <div className="overflow-hidden rounded-xl mb-3 h-1/2">
                                <img
                                    src={subjectImage}
                                    alt="Computer Architecture"
                                    className=" w-full object-cover"
                                />
                            </div>
                            <ProgressBarCard />
                            {/* Course Title */}
                            <h3 className="text-sm font-semibold text-gray-900">
                                {subject.name}
                            </h3>

                            {/* Course Description */}
                            <p className="mt-1 text-base text-[#0A0E29] leading-relaxed">
                                {subject.description}
                            </p>

                            {/* Instructor */}
                            <div className=" flex items-center gap-2 h-[40px]">

                                <span className="text-xs font-medium text-gray-800 flex items-center gap-2">
                                     <img src="/src/assets/userimages/doctor.png" alt="user-image" className="w-10 h-10 rounded-4xl"/>
                                    <span className="font-bold text-lg">
                                        {subject.instructor}
                                    </span>
                                </span>
                            </div>
                            <ButtonLink
                                        to="/sign-up"
                                        children="Continue"
                                        variant="solid"
                                        className="py-2 px-5 h-[35px] w-fill mt-2 group-hover:from-[#141C52] group-hover:to-[#5B6CD7]"
                                      />
                        </div>
                    )}
                </>
            ))}
            {isLoading && (
                <>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}

                </>
            )}
        </div>
    )
}