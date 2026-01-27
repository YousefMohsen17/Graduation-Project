import GlassButton from "@/components/GlassButton";
import InputGlass from "@/components/InputGlass";
import PostItem from "@/pages/community/components/PostItem";
import { useAuth, usePost, usePosts } from "@/lib/queries";
import type { Post } from "@/types/types";

import { CircleUserRound, Images } from "lucide-react";
import { useRef, useState } from "react";

export default function CommunityPage() {
    const postInput = useRef<HTMLInputElement | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [postValue, setPostValue] = useState("")
    const [selectedImage, setSelectedImage] = useState<File | null>(null)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPostValue(e.target.value)

    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0])
        }
    }

    const { data: user } = useAuth()
    const { mutate, isPending } = usePost()
    const { data: posts, isLoading } = usePosts()
    // function handlePost() {
    //     if (!postValue.trim() && !selectedImage) return;

    //     const post = {
    //         content: postValue,
    //         user: user?.data?._id,
    //         image: selectedImage
    //     };

    //     mutate(post);

    //     setPostValue("");
    //     setSelectedImage(null);
    // }
    function handlePost() {
        if (!postValue.trim() && !selectedImage) return;

        const formData = new FormData();
        formData.append("content", postValue);
        if (selectedImage) formData.append("image", selectedImage);

        mutate(formData);

        setPostValue("");
        setSelectedImage(null);
    }



    return (
        <div className="container mx-auto px-4">
            <h3 className="mb-8 md:mb-[63px]">Recent Activity</h3>
            <div className="border border-white rounded-2xl py-4 px-5 bg-[#EAEDFA] mb-[60px]">
                <div className="flex items-center mb-4 justify-between gap-2">
                    <div>

                        <CircleUserRound className="w-[48px] h-[48px]" />
                    </div>
                    <div className="flex-1">
                        <InputGlass onChange={handleChange} value={postValue} ref={postInput} type="text" placeholder="Share an update or ask a question" />

                    </div>
                </div>
                {selectedImage && (
                    <div className="mb-4 relative w-fit">
                        <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="h-32 w-auto rounded-lg object-cover" />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
                        >
                            X
                        </button>
                    </div>
                )}
                <div className="pt-4 flex justify-between items-center">
                    <div className="flex items-center cursor-pointer hover:text-blue-600 transition-colors" onClick={() => fileInputRef.current?.click()}>
                        <span><Images /></span>
                        <span className="ms-2">Media</span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    <div>
                        <GlassButton
                            onClick={handlePost}
                            disabled={isPending || (!postValue.trim() && !selectedImage)}
                        >
                            {isPending ? "Posting..." : "Post It"}
                        </GlassButton>
                    </div>
                </div>
            </div>
            <div>
                {isLoading && <div className="text-center">Loading...</div>}
                {posts?.data?.map((post: Post) => (
                    <PostItem key={post._id} post={post} currentUser={user} />
                ))}

            </div>

        </div>
    )
}