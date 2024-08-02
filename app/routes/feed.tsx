import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";
import { User, Post } from "@prisma/client";
import CreatePost from "~/components/CreatePost";
import { useSubmit } from "@remix-run/react";

type LoaderData = {
    user: User;
    posts?: Post[];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    const copy: User = { ...user } as Partial<User>;
    delete copy.password;

    return json({ user: copy });
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
    const { user } = useLoaderData<LoaderData>();
    const res = useActionData<typeof action>();

    return (
        <main className="">
            <h1 className="text-3xl">Your Feed</h1>
            {/* feed area */}
            {/* 2 modes - newest and following */}
            <section></section>
            <CreatePost submitFunc={submit} userId={user.id} />
        </main>
    );
}
