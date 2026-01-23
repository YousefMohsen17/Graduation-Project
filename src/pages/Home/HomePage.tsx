import { CircleUserRound, Clock } from "lucide-react";
import subjectImage from "../../assets/subject-image.jpg"
import { useAuth, useSubjects } from "../../lib/queries";
import GlassButton from "../../components/GlassButton";
import { SkeletonCard } from "../../components/Skeleton";
export default function HomePage() {
    const { data, isLoading, error, isPending } = useSubjects()
    const { data: user } = useAuth()
    return (
        <div className="container mx-auto">

            <div className="flex justify-between items-center mb-20">
                <div >
                    <h2 >Welcome {user?.data?.name}</h2>
                    <h4>Choose a course and begin your learning path</h4>
                </div>

                <div className="w-full max-w-[520px] rounded-xl bg-white/70 backdrop-blur-md border border-[#EAE0FA] px-4 py-3 shadow-sm">

                    {/* Top text */}
                    <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-gray-700 font-medium">
                            Your progress
                        </span>
                        <span className="text-gray-500 text-xs flex items-center gap-2">
                            <Clock /> 39 min
                        </span>
                    </div>

                    {/* Percentage */}
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                        75% to complete
                    </p>

                    {/* Progress bar */}
                    <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-green-500 transition-all duration-500"
                            style={{ width: `75%` }}
                        />
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-3 gap-20">
                {data?.data?.map((subject: any) => (
                    <>
                        {data && !isLoading && !error && (
                            <div className="flex flex-col justify-between  pt-[12px] pb-[12px] px-[16px] rounded-[24px] overflow-hidden bg-[#CCD1F3] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] border border-white">
                                {/* Course Image */}
                                <div className="overflow-hidden rounded-xl mb-3">
                                    <img
                                        src={subjectImage}
                                        alt="Computer Architecture"
                                        className=" w-full object-cover"
                                    />
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-3">
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className="h-full w-[60%] rounded-full bg-green-500"
                                        />
                                    </div>
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
