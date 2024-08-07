import { LoaderFunctionArgs } from "react-router";
import { prisma } from "~/prisma";
import PostDisplay from "./_posts";
import { User, Post } from "@prisma/client";
import { authenticator } from "~/services/auth.server";
import { redirect, json, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useRouteError, useSubmit } from "@remix-run/react";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { Form } from "@remix-run/react";
import { useState } from "react";
import CommentList from "~/components/CommentList";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const user = authenticator.isAuthenticated(request);

    const { id } = params;

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
            comments: true,
        },
    });

    if (!user) {
        return redirect("/login?flash=You%20Must%20Login");
    }

    return json({ user, post });
}

type PageProps = {
    user: User;
    post: Post;
};

export default function PostCommentsPage() {
    const submit = useSubmit();
    const { user, post } = useLoaderData<PageProps>();

    const [comment, setComment] = useState<string>("");

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            body: comment,
            author_id: Number(user.id),
        };

        await submit(data, {
            encType: "application/x-www-form-urlencoded",
            method: "post",
            action: `/posts/${post.id}/comments`,
            replace: true,
            navigate: false,
        });

        setComment("");
    }

    return (
        <main className="col-span-2">
            <section className="p-2">
                {post && <PostDisplay data={post} />}
            </section>
            <section className="p-2">
                {post.comments ? (
                    <CommentList comments={post.comments} />
                ) : (
                    <CommentPlaceholder />
                )}
            </section>
            <section className="p-2">
                <Form
                    className="flex place-items-center gap-2 p-2 justify-between border rounded border-spacing-2 border-slate-300"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <Input
                        onChange={setComment}
                        value={comment}
                        placeholder="Put in your 2 cents?"
                    />
                    <Button type="submit" variant="submit">
                        Submit
                    </Button>
                </Form>
            </section>
        </main>
    );
}

function CommentPlaceholder() {
    return (
        <article className="border border-dashed rounded p-4 min-h-[20em] grid place-items-center border-slate-300">
            <section>
                <p className="text-2xl text-slate-500 text-center">
                    Looks like there is nothing here.
                </p>
                <p className="text-2xl text-slate-500 text-center">
                    Be the first to comment.
                </p>
            </section>
        </article>
    );
}

export function ErrorBoundry() {
    const error = useRouteError();
    return (
        <main>
            <div>
                <h1>🚽 Oh Poop 💩</h1>
                <h3>Something Went Wrong</h3>
                <p>{JSON.stringify(error)}</p>
            </div>
        </main>
    );
}
