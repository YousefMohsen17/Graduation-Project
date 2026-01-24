import GlassButton from "@/components/GlassButton";
import { useAuth } from "@/lib/queries";
import { CircleUserRound } from "lucide-react";
import { useUserPosts } from "@/lib/queries";
import PostItem from "./components/PostItem";
import type { Post } from "@/types/types";
import { useEnrolledCourses } from "@/lib/queries";

export default function UserActivity() {
    const { data: user } = useAuth()
    const { data: posts } = useUserPosts(user?.data?._id)
    const { data: enrolledCourses } = useEnrolledCourses()
    return (
        <div className="container mx-auto px-4">
            <div className="mb-[40px] md:mb-[60px] rounded-[24px] bg-[#EAEDFA] py-[16px] px-[20px] border border-white ">
                <div className="flex flex-col md:flex-row items-center gap-[16px] text-center md:text-left">
                    <div>
                        <CircleUserRound className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]" />
                    </div>
                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <h2>{user?.data?.name}</h2>
                        <p className="opacity-60 mb-2 md:mb-5">CCE Student</p>
                        <p className="max-w-md">Passionate about Computer Engineering and Hardware Design. Building efficient systems from the silicon up.</p>
                    </div>
                </div>
                <div className="flex items-center justify-center md:justify-end mt-4 md:mt-0">
                    <GlassButton>Edit Profile</GlassButton>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] mb-[60px] md:mb-[80px]">
                <GlassButton className="flex flex-col items-center "><h2>{posts?.data?.length}</h2> <span>Total Posts</span></GlassButton>
                <GlassButton className="flex flex-col items-center"><h2>{enrolledCourses?.data?.length}</h2> <span>Courses Enrolled</span></GlassButton>
            </div>
            <h2 className="mb-[60px]">Recent Activity</h2>
            <div>
                {posts?.data?.map((post: Post) => (
                    <PostItem key={post._id} post={post} currentUser={user} />
                ))}
            </div>
        </div>
    );
}