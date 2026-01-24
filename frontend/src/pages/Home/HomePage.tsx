import { CircleUserRound } from "lucide-react";
import subjectImage from "../../assets/subject-image.jpg"
import { useAuth, useSubjects } from "../../lib/queries";
import GlassButton from "../../components/GlassButton";
import { SkeletonCard } from "../../components/Skeleton";
export default function HomePage() {
    const { data, isLoading, error } = useSubjects()
    const { data: user } = useAuth()
    return (
        <div className="container mx-auto px-4">

            <div className="flex justify-between items-center mb-10 lg:mb-20">
                <div >
                    <h2 >Welcome {user?.data?.name}</h2>
                    <h4>Choose a course and complete your learning path</h4>
                </div>



            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-20">
                {data?.data?.map((subject: any) => (
                    <>
                        {subject && !isLoading && !error && (
                            <div className="flex flex-col justify-between  pt-[12px] pb-[12px] px-[16px] rounded-[24px] overflow-hidden bg-[#CCD1F3] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] border border-white">
                                {/* Course Image */}
                                <div className="overflow-hidden rounded-xl mb-3">
                                    <img
                                        src={subjectImage}
                                        alt="Computer Architecture"
                                        className=" w-full object-cover"
                                    />
                                </div>



                                {/* Course Title */}
                                <h3 className="text-sm font-semibold text-gray-900">
                                    {subject.name}
                                </h3>

                                {/* Course Description */}
                                <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                                    {subject.description}
                                </p>

                                {/* Instructor */}
                                <div className="mt-3 flex items-center gap-2">

                                    <span className="text-xs font-medium text-gray-800 flex items-center gap-2">
                                        <CircleUserRound className="size-8" />
                                        <span className="font-bold">
                                            {subject.instructor}
                                        </span>
                                    </span>
                                </div>

                                {/* Continue Button */}
                                <GlassButton >
                                    Continue
                                </GlassButton>
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
        </div>
    );
}
