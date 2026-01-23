import { useParams } from "react-router";
import { useSubject } from "../../lib/queries";
import { Loader } from "lucide-react";
import GlassButton from "../../components/GlassButton";

export default function SubjectDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useSubject(id || "");

    if (isLoading) {
        return (
            <div className="h-[50vh] flex items-center justify-center">
                <Loader className="animate-spin text-blue-600 w-8 h-8" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-[50vh] flex items-center justify-center text-red-500">
                Error loading subject details.
            </div>
        );
    }

    const subject = data?.data;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">{subject?.name}</h2>
                <h4 className="text-lg text-slate-600">{subject?.code}</h4>
            </div>

            <div className="bg-[#CCD1F3] rounded-[24px] p-8 shadow-lg border border-white max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Subject Information</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-slate-500">Instructor</p>
                                <p className="font-medium">{subject?.instructor || "Unknown"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Department</p>
                                <p className="font-medium">{subject?.department}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Year/Level</p>
                                <p className="font-medium">{subject?.year}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Description</h3>
                        <p className="text-slate-700 leading-relaxed">
                            {subject?.description}
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-300">
                    <h3 className="text-xl font-semibold mb-4">Resources</h3>
                    <div className="flex gap-4">
                        {subject?.driveLink && (
                            <GlassButton
                                onClick={() => window.open(subject.driveLink, "_blank")}
                            >
                                Access Drive/Resources
                            </GlassButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
