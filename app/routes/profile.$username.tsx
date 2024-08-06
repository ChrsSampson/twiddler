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
import LogoutButton from "./logout/route";

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

    return json({ profile, posts });
}

export async function action({ request }: ActionFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    if (request.method == "POST") {
        return await authenticator.logout(request, {
            redirectTo: "/",
        });
    } else if (request.method == "DELETE") {
        const res = await prisma.user.delete({
            where: {
                id: user?.id,
            },
            include: {
                profile: true,
            },
        });

        return await authenticator.logout(request, {
            redirectTo: "/",
        });
    }

    return null;
}

type LoaderData = {
    profile: UserProfile;
    posts: Post[];
};

export default function ProfilePage() {
    const { profile, posts } = useLoaderData<LoaderData>();

    return (
        <main className="flex flex-col p-6">
            <h1 className="text-2xl">Profile</h1>
            <section className="flex p-4 gap-4 place-items-center justify-between bg-slate-300 rounded">
                <div className="flex p-4 gap-4 place-items-center bg-slate-300 rounded">
                    <img height={40} width={40} className="rounded-full" src={profile.avatar} />
                    <h3 className="text-lg">
                        {profile.username} <strong>(YOU)</strong>
                    </h3>
                </div>
                <section>
                    <LogoutButton />
                </section>
            </section>
            <section className="py-6">
                <PostFeed posts={posts} placeholder="You have not made any posts yet." />
            </section>
            <div className="flex gap-2">
                <section className=" flex gap-5 p-4 place-items-center rounded-lg border border-red-400">
                    <h4 className="text-red-400 font-bold text-lg">Danger Zone</h4>
                    <Form method="delete">
                        <Button variant="danger" type="submit">
                            Delete Account
                        </Button>
                    </Form>
                </section>
            </div>
        </main>
    );
}

function ProfileWidget(user: User) {}
