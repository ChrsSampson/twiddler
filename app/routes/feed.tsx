import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth";
import { json } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
}

export default function FeedPage() {
    const user = useLoaderData();

    console.log(user);

    return (
        <main>
            <h1>Your Feed</h1>
        </main>
    );
}
