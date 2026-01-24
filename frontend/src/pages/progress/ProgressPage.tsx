import GlassButton from "@/components/GlassButton";
import { useStudentStats } from "@/lib/queries";
import { BookOpen, CheckCircle, Clock, Flame, Trophy } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function ProgressPage() {
    const { data: stats, isLoading } = useStudentStats();

    if (isLoading) {
        return <div className="p-10 text-center">Loading stats...</div>;
    }

    const { streak, coursesEnrolled, coursesCompleted, totalHours, weeklyActivity, coursesProgress } = stats?.data || {};

    return (
        <div className="container mx-auto pb-10">
            <h2 className="mb-8">Your Progress</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-[#EAEDFA] border border-white rounded-[24px] p-6 flex flex-col items-center justify-center gap-2">
                    <div className="bg-[#D6DAF5] p-3 rounded-2xl text-[#2839A4]">
                        <Flame size={32} />
                    </div>
                    <h3 className="text-3xl font-bold">{streak || 0} Days</h3>
                    <p className="opacity-60 text-sm">Study Streak</p>
                </div>

                <div className="bg-[#EAEDFA] border border-white rounded-[24px] p-6 flex flex-col items-center justify-center gap-2">
                    <div className="bg-[#D6DAF5] p-3 rounded-2xl text-[#2839A4]">
                        <BookOpen size={32} />
                    </div>
                    <h3 className="text-3xl font-bold">{coursesEnrolled || 0}</h3>
                    <p className="opacity-60 text-sm">Courses Enrolled</p>
                </div>

                <div className="bg-[#EAEDFA] border border-white rounded-[24px] p-6 flex flex-col items-center justify-center gap-2">
                    <div className="bg-[#D6DAF5] p-3 rounded-2xl text-[#2839A4]">
                        <Trophy size={32} />
                    </div>
                    <h3 className="text-3xl font-bold">{coursesCompleted || 0}</h3>
                    <p className="opacity-60 text-sm">Courses Completed</p>
                </div>

                <div className="bg-[#EAEDFA] border border-white rounded-[24px] p-6 flex flex-col items-center justify-center gap-2">
                    <div className="bg-[#D6DAF5] p-3 rounded-2xl text-[#2839A4]">
                        <Clock size={32} />
                    </div>
                    <h3 className="text-3xl font-bold">{totalHours || 0}h</h3>
                    <p className="opacity-60 text-sm">Total Study Time</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* Weekly Activity Chart */}
                <div className="lg:col-span-2 bg-[#EAEDFA] border border-white rounded-[24px] p-8">
                    <h3 className="text-xl font-bold mb-6">Weekly Activity</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyActivity || []}>
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#0a0e29', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    hide
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Bar
                                    dataKey="hours"
                                    fill="#2839A4"
                                    radius={[6, 6, 6, 6]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Achievements / Goals */}
                <div className="bg-[#EAEDFA] border border-white rounded-[24px] p-8">
                    <h3 className="text-xl font-bold mb-6">Achievements</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl">
                            <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                                <Trophy size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Early Bird</h4>
                                <p className="text-xs opacity-60">Completed 5 lessons before 9AM</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl">
                            <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Quiz Master</h4>
                                <p className="text-xs opacity-60">Scored 100% on 3 quizzes</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl">
                            <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                                <Flame size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Week Warrior</h4>
                                <p className="text-xs opacity-60">7 day streak maintained</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Progress List */}
            <div className="bg-[#EAEDFA] border border-white rounded-[24px] p-8">
                <h3 className="text-xl font-bold mb-6">Course Progress</h3>
                <div className="space-y-6">
                    {coursesProgress?.map((course: any) => {
                        return (
                            <div key={course.id} className="bg-white/40 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                    {course.code?.substring(0, 3) || "SUB"}
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="flex justify-between mb-2">
                                        <h4 className="font-semibold">{course.name}</h4>
                                        <span className="text-sm font-medium">{course.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#2839A4] rounded-full transition-all duration-1000"
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                </div>
                                <GlassButton className="!mt-0 !py-2 text-sm">Continue</GlassButton>
                            </div>
                        );
                    })}
                    {(!coursesProgress || coursesProgress.length === 0) && (
                        <p className="text-center opacity-60 py-8">No courses enrolled yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
