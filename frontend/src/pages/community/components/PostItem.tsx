import { useState } from "react";
import { CircleUserRound, Heart, MessageCircle, Send, Trash2, X } from "lucide-react";
import type { Post } from "@/types/types";
import { useLikePost, useCommentPost, useDeletePost } from "@/lib/queries";
import InputGlass from "../../../components/InputGlass";
import GlassButton from "../../../components/GlassButton";
interface PostItemProps {
    post: Post;
    currentUser?: any;
}

export default function PostItem({ post, currentUser }: PostItemProps) {
    const { mutate: likePost } = useLikePost();
    const { mutate: commentPost, isPending: isCommenting } = useCommentPost();
    const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
    const [showComments, setShowComments] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [showFullImage, setShowFullImage] = useState(false);

    const isLiked = post.likes.some((like) => like.user === currentUser?.data?._id);
    const isOwner = post.user === currentUser?.data?._id;

    function handleLike() {
        likePost(post._id);
    }

    function handleDelete() {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost(post._id);
        }
    }

    function handleCommentSubmit() {
        if (!commentValue.trim()) return;
        commentPost(
            { id: post._id, commentContent: { text: commentValue, name: currentUser?.data?.name, user: currentUser?.data._id, content: commentValue } },
            {
                onSuccess: () => {
                    setCommentValue("");
                },
            }
        );
    }


    return (
        <div className="py-4 px-5 rounded-[8px] border border-white bg-[#EAEDFA] mb-[40px]">
            <div className="flex items-center mb-[24px] gap-5 justify-between">
                <div className="flex items-center gap-5">
                    <CircleUserRound className="w-[48px] h-[48px]" />
                    <div className="flex flex-col">
                        <span className="font-bold">{`${post.user.name}`}</span>
                        <span className="opacity-60">CCE Student</span>
                    </div>
                </div>
                {isOwner && (
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        title="Delete Post"
                    >
                        <Trash2 size={20} />
                    </button>
                )}
            </div>

            <div className="mb-6">
                <p className="mb-4">{post.content}</p>
                {post.image && (
                    <img
                        src={post.image}
                        alt="Post content"
                        className="w-full max-h-[450px] object-cover rounded-[8px] cursor-pointer hover:opacity-95 transition-opacity"
                        onClick={() => setShowFullImage(true)}
                    />
                )}

            </div>

            <div className="flex items-center pb-4 border-b border-white/20 mb-4">
                <button
                    onClick={handleLike}
                    className={`mr-[32px] flex items-center gap-3 cursor-pointer transition-colors ${isLiked ? 'text-red-500' : ''}`}
                >
                    <Heart className={isLiked ? "fill-current" : ""} />
                    <span>{post.likes.length}</span>
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="mr-[32px] flex items-center gap-3 cursor-pointer hover:text-blue-500 transition-colors"
                >
                    <MessageCircle />
                    <span>{post.comments.length}</span>
                </button>

            </div>

            {showComments && (
                <div className="space-y-4">
                    <div className="flex gap-2 items-center">
                        <div className="flex-1">
                            <InputGlass
                                value={commentValue}
                                onChange={(e) => setCommentValue(e.target.value)}
                                placeholder="Write a comment..."
                                className="h-10 py-2"
                            />
                        </div>
                        <GlassButton
                            onClick={handleCommentSubmit}
                            disabled={isCommenting || !commentValue.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white !py-2 !px-4 h-10 flex items-center justify-center"
                        >
                            <Send size={16} />
                        </GlassButton>
                    </div>

                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {post.comments.map((comment) => (
                            <div key={comment._id} className="flex gap-3 bg-white/30 p-3 rounded-lg">
                                <CircleUserRound className="w-8 h-8 flex-shrink-0 opacity-70" />
                                <div>
                                    <div className="font-semibold text-sm">User</div>
                                    <p className="text-sm opacity-90">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                        {post.comments.length === 0 && (
                            <p className="text-center opacity-50 text-sm py-2">No comments yet</p>
                        )}
                    </div>
                </div>
            )}
            {showFullImage && post.image && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setShowFullImage(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowFullImage(false);
                        }}
                    >
                        <X size={32} />
                    </button>
                    <img
                        src={post.image}
                        alt="Full size"
                        className="max-w-full max-h-[90vh] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
