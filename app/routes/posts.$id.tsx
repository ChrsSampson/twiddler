import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "react-router";
import { prisma } from "../prisma";
import profanityFilter from "~/lib/profanityFilter";

// this page should not allow people to browse to it
export function loader() {
    // return redirect("/feed");
    return null;
}

// this nees to go away - remix does not supoprt "rest api" style routes

// make changes to one post
// read One
// update
// delete
export async function action({ request, params }: ActionFunctionArgs) {
    try {
        const { id } = params;
        const formData = await request.formData();
        const key = formData.get("key");

        console.log(id, key);

        return null;
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return json({ error: err.message, status: 500 }, { status: 500 });
        }
    }
}

async function getOne(id: number) {
    try {
        const post = await prisma.post.findUniqueOrThrow({
            where: {
                id: Number(id),
            },
            include: {
                author: {
                    include: {
                        profile: true,
                    },
                },
            },
        });

        return post;
    } catch (err) {
        return null;
    }
}

async function deleteOne(id: number) {
    try {
        const post = await prisma.post.delete({
            where: {
                id: Number(id),
            },
        });

        return post;
    } catch (err) {
        return null;
    }
}
