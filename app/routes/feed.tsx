import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";
import { User } from "@prisma/client";

type LoaderData = {
    message: string;
    user: User;
};

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    const copy: User = { ...user } as Partial<User>;
    delete copy.password;

    return json({ message: "ok", user: copy });
}

export default function FeedPage() {
    const { user, message } = useLoaderData<LoaderData>();

    return (
        <main>
            <h1>{user.email}'s Feed</h1>
        </main>
    );
}
