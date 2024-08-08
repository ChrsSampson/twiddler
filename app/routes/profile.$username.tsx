// /profile/[username]

import { useState } from "react";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { User, UserProfile, Post } from "@prisma/client";
import { prisma } from "~/prisma";
import { Form } from "@remix-run/react";
import Button from "~/components/ui/Button";
import LogoutButton from "./logout/route";
import { useSubmit } from "@remix-run/react";

import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import SideNav from "~/components/SideNav";

export const meta: MetaFunction = () => {
    return [
        { title: "Kiwi | Your Profile" },
        { name: "Kiwi Profile Page", content: "Whats Going On?" },
    ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    if (!user) {
        return redirect("/login?flash=You%20Must%20Login");
    }

    const fullUser = await prisma.user.findUnique({
        where: {
            id: Number(user.id),
        },
        include: {
            profile: true,
        },
    });

    return json({ user: fullUser });
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
        // delete user comments
        const c1 = await prisma.comments.deleteMany({
            where: {
                author_id: user.id,
            },
        });

        // Delete all user posts
        const p1 = await prisma.post.deleteMany({
            where: {
                author_id: user.id,
            },
        });

        // delete user and user profile
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
    user: User;
};

export default function ProfilePage() {
    const { user } = useLoaderData<LoaderData>();

    return (
        <section className="grid grid-cols-6 pt-4 px-[10em]">
            <SideNav title="Profile" user={user} />
            <Outlet />
            <ProfileActionButtons user={user} />
        </section>
    );
}

// Right now this is just the profile Danger section
function ProfileActionButtons({ user }: User) {
    const [confirm, setConfirm] = useState(false);
    const submit = useSubmit();

    async function handleDelete(e: React.SyntheticEvent) {
        e.preventDefault();

        if (!confirm) {
            setConfirm(true);
        } else {
            const data = {
                id: user.id,
            };

            const res = await submit(data, {
                encType: "application/x-www-form-urlencoded",
                method: "DELETE",
                action: `/profile/${user.profile.username}`,
            });

            console.log(res);
        }
    }

    return (
        <section className="col-span-1 py-6 flex flex-col gap-4">
            <div className="flex gap-2">
                <section className=" flex flex-col gap-5 p-4 place-items-center rounded-lg border border-red-400">
                    <h4 className="text-red-400 font-bold text-lg">
                        {confirm ? "Delete Forever?" : "Danger Zone"}
                    </h4>
                    <Form onSubmit={(e) => handleDelete(e)} method="delete">
                        <Button variant="danger" type="submit">
                            {confirm ? "Are You Sure?" : "Delete Account"}
                        </Button>
                    </Form>
                </section>
            </div>
        </section>
    );
}
