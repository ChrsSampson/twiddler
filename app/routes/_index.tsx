import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { Post } from "@prisma/client";
import { prisma } from "~/prisma";
import PostFeed from "~/components/PostFeed";
import { json } from "@remix-run/node";
import Button from "~/components/ui/Button";
import { FaKiwiBird } from "react-icons/fa";

// redirect member users to feed instead of public feed
export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        successRedirect: "/feed",
    });

    if (user) {
        return user;
    }

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

    return (
        <div className="font-sans px-6 py-4 grid grid-cols-3 gap-4">
            <section className="col-span-1 border-r-2 border-slate-300 min-h-screen">
                <div className="flex gap-4 place-items-center">
                    <h1 className="text-4xl">Kiwi</h1>
                    <FaKiwiBird size="2.5em" />
                </div>
                <ul className="list-disc mt-4 pl-6 space-y-2">
                    <a href="login">
                        <Button variant="submit" type="button">
                            Login
                        </Button>
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
