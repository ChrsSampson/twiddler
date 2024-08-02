// /profile/[username]

import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "@prisma/client";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    const { username } = params;

    return json({ current: user });
}

type LoaderData = {
    currentUser: User;
    profileUser?: User;
};

export default function ProfilePage() {
    const { user } = useLoaderData();

    return (
        <main>
            <h1>Profile</h1>
        </main>
    );
}
