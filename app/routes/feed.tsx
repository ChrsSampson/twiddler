import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";
import { User, Post } from "@prisma/client";
import CreatePost from "~/components/CreatePost";
import { useSubmit } from "@remix-run/react";
import { prisma } from "~/prisma";
import PostDisplay from "~/components/Post";

type LoaderData = {
    user: User;
    posts?: Post[];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    const posts = await prisma.post.findMany({
        include: {
            author: true,
        },
    });

    return json({ user, posts });
}

export async function action({ request }: ActionFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    const data = await request.formData();

    return json({ message: "ok" });
}

export default function FeedPage() {
    const submit = useSubmit();
    const { user, posts } = useLoaderData<LoaderData>();
    const res = useActionData<typeof action>();

    return (
        <main className="grid grid-cols-5 ">
            {/* feed area */}
            <section className="grid-span-1 p-4">
                <h1 className="text-3xl">Your Feed</h1>
            </section>
            <section className="flex flex-col gap-2 p-4 grid-span-4">
                {/* 2 modes - newest and following */}
                {posts &&
                    posts.map((post) => {
                        return PostDisplay(post);
                    })}
            </section>
            <CreatePost submitFunc={submit} userId={user.id} />
        </main>
    );
}
