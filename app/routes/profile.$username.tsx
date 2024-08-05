// /profile/[username]

import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { User, UserProfile } from "@prisma/client";
import { prisma } from "~/prisma";
import { Form } from "@remix-run/react";
import Button from "~/components/ui/Button";

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

    if (!profile) {
        return redirect("/404");
    }

    return json({ profile });
}

export async function action({ request }: ActionFunctionArgs) {
    return await authenticator.logout(request, {
        redirectTo: "/",
    });
}

type LoaderData = {
    profile: UserProfile;
    profileUser?: User;
};

export default function ProfilePage() {
    const { profile } = useLoaderData<LoaderData>();

    return (
        <main className="flex flex-col">
            <h1 className="text-2xl">Profile</h1>
            <section className="flex p-4 gap-4 place-items-center bg-slate-300 rounded">
                <img height={40} width={40} className="rounded-full" src={profile.avatar} />
                <h3 className="text-lg">{profile.username}</h3>
            </section>
            <section>
                <Form>
                    <Button type="submit">Logout</Button>
                </Form>
            </section>
        </main>
    );
}

function ProfileWidget(user: User) {}
