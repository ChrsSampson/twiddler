import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useRouteError } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";
import { User, Post } from "@prisma/client";
import CreatePost from "~/components/CreatePost";
import { useSubmit } from "@remix-run/react";
import { prisma } from "~/prisma";
import PostFeed from "~/components/PostFeed";
import UserBug from "~/components/UserBug";

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
            author: {
                include: {
                    profile: true,
                },
            },
        },
    });

    const completeUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            profile: true,
        },
    });

    return json({ user: completeUser, posts });
}

// THIS IS DOING NOTHING RIGHT NOW
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
        <main className="col-span-2">
            <section className="flex flex-col gap-2 p-4 overflow-y-auto">
                <PostFeed posts={posts} />
            </section>
            <CreatePost submitFunc={submit} userId={user.id} />
        </main>
    );
}

export function ErrorBoundry() {
    const error = useRouteError();
    return (
        <main>
            <div>
                <h1>🚽 Oh Poop 💩</h1>
                <h3>Something Went Wrong</h3>
                <p>{JSON.stringify(error)}</p>
            </div>
        </main>
    );
}
