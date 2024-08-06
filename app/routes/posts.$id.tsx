import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "react-router";
import { prisma } from "../prisma";
import profanityFilter from "~/lib/profanityFilter";

// this page should not allow people to browse to it
export function loader() {
    return redirect("/feed");
}

// this nees to go away - remix does not supoprt "rest api" style routes

// make changes to one post
// read One
// update
// delete
export async function action({ request, params }: ActionFunctionArgs) {
    try {
        const { id } = params;

        if (request.method == "GET") {
            const post = await getOne(Number(id));

            return json({ post }, { status: 200 });
        } else if (request.method == "DELETE") {
            const res = await deleteOne(Number(id));

            return json({ status: 204 }, { status: 204 });
        }

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
