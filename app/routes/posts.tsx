import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "react-router";
import { prisma } from "../prisma";
import profanityFilter from "~/lib/profanityFilter";
import { authenticator } from "~/services/auth.server";

// this page should not allow people to browse to it
export function loader() {
    return redirect("/feed");
}

// this is the post route for the CreatePost Component so it can post from anywhere in the app
export async function action({ request }: ActionFunctionArgs) {
    const user = authenticator.isAuthenticated(request, {});

    if (!user) {
        return redirect("/login");
    }

    try {
        const formData = await request.formData();
        const title = formData.get("title") as string;
        const postBody = formData.get("body") as string;
        const userId = formData.get("userId") as string;

        const filteredtitle = profanityFilter(title);
        const filteredbody = profanityFilter(postBody);

        const result = await prisma.post.create({
            data: {
                title: filteredtitle,
                body: filteredbody,
                author_id: Number(userId),
            },
        });

        return json({ status: 201, result });
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return json({ error: err.message, status: 500 }, { status: 500 });
        }
    }
}
