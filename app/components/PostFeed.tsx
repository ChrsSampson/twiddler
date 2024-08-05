import { Post } from "@prisma/client";
import PostDisplay from "./PostDisplay";
import { useId } from "react";

export default function PostFeed({ posts }: { posts: Post[] }) {
    if (posts.length < 1) {
        return (
            <section className="min-w-screen">
                <Placeholder />
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

function Placeholder() {
    return (
        <article className="border border-dashed rounded p-4 border-slate-300">
            <p className="text-lg text-center">There is nothing here</p>
        </article>
    );
}
