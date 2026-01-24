import { BookCheck, BookText, ChartColumnBig, Eye, GraduationCap, Target, Users, Waypoints } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4">

            <div className="mb-[60px]">
                <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">About Engipedia</h2>
                <p className="text-center text-lg max-w-2xl mx-auto">Empowering the next generation of engineers through structured
                    learning and a unified platform.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] lg:gap-[60px] mb-[100px]">
                <div className="rounded-[24px] bg-[#EAEDFA] py-[16px] px-[20px] border border-white flex flex-col gap-2">
                    <div className="bg-[#D6DAF5] rounded-[16px] w-[48px] h-[48px] flex items-center justify-center text-[#2839A4]">
                        <Target />
                    </div>
                    <h2 className="text-xl font-bold">Our Mission</h2>
                    <p>To provide a unified, intuitive platform for accessible
                        engineering resources and student-led growth, ensuring no student is left behind in the rapidly evolving technical landscape.</p>
                </div>
                <div className="rounded-[24px] bg-[#EAEDFA] py-[16px] px-[20px] border border-white flex flex-col gap-2">
                    <div className="bg-[#D6DAF5] rounded-[16px] w-[48px] h-[48px] flex items-center justify-center text-[#2839A4]">
                        <Eye />
                    </div>
                    <h2 className="text-xl font-bold">Our Vision</h2>
                    <p>To become the global standard for student-led technical
                        education and engineering excellence, fostering a
                        community of innovators who solve real-world problems.</p>
                </div>
            </div>
            <h2 className="text-center mb-[40px] md:mb-[60px] text-2xl font-bold">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] lg:gap-[60px]">
                <div className="rounded-[24px] bg-[#EAEDFA] py-[16px] px-[20px] border border-white flex flex-col gap-2">
                    <div className="bg-[#D6DAF5] rounded-[16px] w-[48px] h-[48px] flex items-center justify-center text-[#2839A4]">
                        <GraduationCap />                    </div>
                    <h2>Structured Courses</h2>
                    <p>Organized curriculum paths tailored for specific engineering majors.</p>
                </div>
                <div className="rounded-[24px] bg-[#EAEDFA] py-[16px] px-[20px] border border-white flex flex-col gap-2">
                    <div className="bg-[#D6DAF5] rounded-[16px] w-[48px] h-[48px] flex items-center justify-center text-[#2839A4]">
                        <ChartColumnBig /></div>

                    <h2>Progress Tracking</h2>
                    <p>Organized curriculum paths tailored for specific engineering majors.</p>
                </div>
                <div className="rounded-[24px] bg-[#EAEDFA] py-[16px] px-[20px] border border-white flex flex-col gap-2">
                    <div className="bg-[#D6DAF5] rounded-[16px] w-[48px] h-[48px] flex items-center justify-center text-[#2839A4]">
                        <Users />                    </div>
                    <h2>Community Support</h2>
                    <p>Connect with peers and mentors to solve
                        complex problems together.</p>
                </div>

                <div className="rounded-[24px] bg-[#EAEDFA] py-[16px] px-[20px] border border-white flex flex-col gap-2">
                    <div className="bg-[#D6DAF5] rounded-[16px] w-[48px] h-[48px] flex items-center justify-center text-[#2839A4]">
                        <BookText /></div>
                    <h2>Resource Library</h2>
                    <p>Access a vast collection of textbooks and research papers</p>
                </div>
                <div className="rounded-[24px] bg-[#EAEDFA] py-[16px] px-[20px] border border-white flex flex-col gap-2">
                    <div className="bg-[#D6DAF5] rounded-[16px] w-[48px] h-[48px] flex items-center justify-center text-[#2839A4]">
                        <BookCheck /></div>
                    <h2>Mock Exams</h2>
                    <p>Prepare for finals with real-time
                        simulations and question banks</p>
                </div>
                <div className="rounded-[24px] bg-[#EAEDFA] py-[16px] px-[20px] border border-white flex flex-col gap-2">
                    <div className="bg-[#D6DAF5] rounded-[16px] w-[48px] h-[48px] flex items-center justify-center text-[#2839A4]">
                        <Waypoints /></div>
                    <h2>Peer Collaboration</h2>
                    <p>Real-time tools for group projects and
                        technical documentation.</p>
                </div>
            </div>

        </div>
    );
}