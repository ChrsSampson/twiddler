import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Post } from "@prisma/client";
import { Link, useLoaderData } from "@remix-run/react";
import { useSubmit } from "@remix-run/react";
import { AiOutlineLike } from "react-icons/ai";
import { GoReport } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { useRouteError } from "@remix-run/react";
import IconButton from "~/components/ui/IconButton";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
    // const user = await authenticator.isAuthenticated(request);

    // return json({ user });

    return null;
}

type PostProps = {
    data: Post;
};

type PostRequestProps = {
    key: string;
    userId: number;
};

// this is used directly in a prisma query so it must match the key in prisma
type KeyType = "likes" | "reports";

export default function Post({ data }: PostProps) {
    const submit = useSubmit();
    const date = new Date(data.created_at).toLocaleDateString();

    async function handleSubmit(key: KeyType) {
        const submit_data: PostRequestProps = {
            key: key,
            userId: Number(data.author_id),
        };

        await submit(submit_data, {
            encType: "application/x-www-form-urlencoded",
            method: "POST",
            action: `/posts/${data.id}`,
            navigate: false,
        });
    }

    return (
        <article className="border w-full rounded  border-slate-300">
            <section className="p-6 mb-4">
                <div className="flex justify-between mb-4">
                    <Link to={`/${data.author.profile.username}`}>
                        <sub className="text-slate-500 hover:underline hover:font-bold">
                            {data.author?.profile.username}
                        </sub>
                    </Link>
                    <sub>{date}</sub>
                </div>
                <h3 className="font-bold text-lg">{data.title}</h3>
                {data.body && <p>{data.body}</p>}
            </section>
            <div className="flex justify-evenly p-2 bg-slate-300">
                <IconButton onClick={() => handleSubmit("likes")}>
                    <div className="flex place-items-center gap-1">
                        <AiOutlineLike size={"1.5em"} />
                        <span>{data.likes}</span>
                    </div>
                </IconButton>
                <Link to={`/posts/${data.id}/comments`}>
                    <IconButton variant="submit">
                        <FaRegComment size={"1.5em"} />
                    </IconButton>
                </Link>
                <IconButton onClick={() => handleSubmit("reports")} variant="danger">
                    <GoReport size={"1.5em"} />
                </IconButton>
            </div>
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
