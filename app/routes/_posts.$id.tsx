import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "react-router";
import { prisma } from "../prisma";
import profanityFilter from "~/lib/profanityFilter";
import { authenticator } from "~/services/auth.server";

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

// like posts
// reports posts - delete posts upon recieving 10 reports
export async function action({ request, params }: ActionFunctionArgs) {
    try {
        const user = await authenticator.isAuthenticated(request);

        const { id } = params;
        const formData = await request.formData();
        const key = formData.get("key");

        const post = await voteOnPost(Number(id), String(key));

        if (post && key == "likes") {
            await prisma.likedPosts.create({
                data: {
                    user_id: Number(user?.id),
                    post_id: Number(id),
                },
            });
        }

        if (post && key == "reports") {
            if (post.reports > 10) {
                await deleteOne(Number(id));
            }
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

async function voteOnPost(id: number, value: string) {
    try {
        return await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                [value]: { increment: 1 },
            },
        });
    } catch (err) {
        console.log(err);
        return null;
    }
}
