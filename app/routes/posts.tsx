import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "react-router";
import { prisma } from "../prisma";

// this page should not allow people to browse to it
export function loader() {
    return redirect("/feed");
}

// this nees to go away - remix does not supoprt "rest api" style routes

// this is the post route for the CreatePost Component so it can post from anywhere in the app
export async function action({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        const title = formData.get("title") as string;
        const postBody = formData.get("body") as string;
        const userId = formData.get("userId") as string;

        const result = await prisma.post.create({
            data: { title, body: postBody, author_id: Number(userId) },
        });

        return json({ status: 201, result });
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return json({ error: err.message, status: 500 }, { status: 500 });
        }
    }
}
