import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { Post } from "@prisma/client";
import { prisma } from "~/prisma";
import PostFeed from "~/components/PostFeed";
import { json } from "@remix-run/node";
import Button from "~/components/ui/Button";

export const meta: MetaFunction = () => {
    return [{ title: "Twiddler" }, { name: "description", content: "Whats Going On?" }];
};

// redirect member users to feed instead of public feed
export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        successRedirect: "/feed",
    });

    const posts = await prisma.post.findMany({
        orderBy: {
            created_at: "desc",
        },
        include: {
            author: {
                include: {
                    profile: true,
                },
            },
        },
    });

    return json({ posts });
}

type LoaderProps = {
    posts: Post[];
};

export default function Index() {
    const { posts } = useLoaderData<LoaderProps>();

    console.log(posts);

    return (
        <div className="font-sans px-6 py-4 grid grid-cols-3 gap-4">
            <section className="col-span-1 border-r-2 min-h-screen">
                <h1 className="text-3xl">Twidder</h1>
                <ul className="list-disc mt-4 pl-6 space-y-2">
                    <a href="login">
                        <Button type="button">Login</Button>
                    </a>
                </ul>
            </section>
            <section className="col-span-2 overflow-y-auto">
                <h1 className="text-2xl mb-4">What's going on</h1>
                <PostFeed posts={posts} placeholder="Woops, There is nothing here." />
            </section>
        </div>
    );
}
