// /[username]

import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";
import { User, UserProfile, Post } from "@prisma/client";
import { prisma } from "~/prisma";
import { useLoaderData } from "@remix-run/react";
import PostFeed from "~/components/PostFeed";
import Button from "~/components/ui/Button";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const currentUser = await authenticator.isAuthenticated(request, {});

    const { username } = params;

    const profile = await prisma.userProfile.findUnique({
        where: {
            username: username,
        },
        include: {
            user: true,
        },
    });

    if (!profile) {
        return redirect("/404");
    }

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

    return json({ profile, userPosts: posts });
}

type LoaderData = {
    profile: UserProfile;
    userPosts: Post[];
};

export default function ProfilePage() {
    const { profile, userPosts } = useLoaderData<LoaderData>();

    return (
        <main className="flex flex-col p-6">
            <div className="flex p-4 gap-4 place-items-center justify-between bg-slate-300 rounded">
                <section className="flex p-4 gap-4 place-items-center bg-slate-300 rounded">
                    <img height={40} width={40} className="rounded-full" src={profile.avatar} />
                    <h3 className="text-lg">{profile.username}</h3>
                </section>
                {profile && <Button>Follow</Button>}
            </div>
            <section>
                <h3 className="text-2xl">Posts</h3>
                <PostFeed posts={userPosts} placeholder="This user has not made any posts yet." />
            </section>
        </main>
    );
}
