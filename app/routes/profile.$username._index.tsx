// /profile/[username]

import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { User, UserProfile, Post } from "@prisma/client";
import { prisma } from "~/prisma";
import { Form } from "@remix-run/react";
import Button from "~/components/ui/Button";
import PostFeed from "~/components/PostFeed";
import LogoutButton from "./logout";
import { useState } from "react";
import CommentList from "~/components/CommentList";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    const { username } = params;

    const profile = await prisma.userProfile.findUnique({
        where: {
            username: username,
        },
        include: {
            user: true,
        },
    });

    if (!profile || user.email != profile.user?.email) {
        return redirect(`/${username}`);
    }

    // if the authenticated user's email matches the user attached to the queried profile - show action buttons
    const isCurrentUser = user.email === profile.user.email;

    const posts = await prisma.post.findMany({
        where: {
            author_id: profile.user?.id,
        },
        include: {
            author: {
                include: {
                    profile: true,
                },
            },
        },
    });

    const comments = await prisma.comments.findMany({
        where: {
            author_id: Number(user.id),
        },
    });

    return json({ profile, posts, comments, isCurrentUser });
}

type LoaderData = {
    profile: UserProfile;
    posts: Post[];
    comments: Comment[];
    isCurrentUser: boolean;
};

export default function ProfilePage() {
    const { profile, posts, comments, isCurrentUser } = useLoaderData<LoaderData>();

    return (
        <main className="flex flex-col p-6 col-span-2">
            <section className="flex p-4 gap-4 place-items-center justify-between bg-slate-300 rounded">
                <div className="flex p-4 gap-4 place-items-center bg-slate-300 rounded">
                    <img height={40} width={40} className="rounded-full" src={profile.avatar} />
                    <h3 className="text-lg">
                        {profile.username} <strong>(YOU)</strong>
                    </h3>
                </div>
                <div>
                    <LogoutButton />
                </div>
            </section>
            <section className="py-6">
                <ContentSwitcher posts={posts} comments={comments} />
            </section>
        </main>
    );
}

type PageEnum = "posts" | "comments";

type SwitcherProps = {
    posts: Post[];
    comments: Comment[];
};

function ContentSwitcher({ posts, comments }: SwitcherProps) {
    const [page, setPage] = useState<PageEnum>("posts");

    function getPage() {
        switch (page) {
            case "posts":
                return <PostFeed posts={posts} placeholder="You have not made any posts yet." />;
            case "comments":
                return (
                    <CommentList
                        comments={comments}
                        placeholder="You have not commented on anything yet."
                    />
                );
        }
    }

    return (
        <>
            <div className="flex gap-2 my-2">
                <Button onClick={() => setPage("posts")}>Posts</Button>
                <Button onClick={() => setPage("comments")}>Comments</Button>
            </div>
            {getPage()}
        </>
    );
}
