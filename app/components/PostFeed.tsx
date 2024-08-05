import { Post } from "@prisma/client";
import PostDisplay from "./PostDisplay";
import { useId } from "react";

type FeedProps = {
    posts: Post[];
    placeholder?: string;
};

export default function PostFeed({ posts, placeholder }: FeedProps) {
    if (posts && posts.length < 1) {
        return (
            <section className="min-w-screen">
                <Placeholder message={placeholder} />
            </section>
        );
    } else {
        return (
            <section className="flex flex-col gap-3">
                {posts.map((post: Post) => {
                    return <PostDisplay key={useId()} data={post} />;
                })}
            </section>
        );
    }
}

type PlaceholderProps = {
    message?: string;
};

function Placeholder({ message }: PlaceholderProps) {
    return (
        <article className="border border-dashed rounded p-4 min-h-[20em] grid place-items-center border-slate-300">
            <p className="text-2xl text-slate-500 text-center">
                {message || "There is nothing here."}
            </p>
        </article>
    );
}
