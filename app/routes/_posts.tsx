import { ActionFunctionArgs } from "@remix-run/node";
import { Post } from "@prisma/client";
import { Link } from "@remix-run/react";
import { useSubmit } from "@remix-run/react";
import { AiOutlineLike } from "react-icons/ai";
import { GoReport } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { useRouteError } from "@remix-run/react";

export async function loader() {
    return null;
}

export async function action({ request }: ActionFunctionArgs) {}

type PostProps = {
    data: Post;
};

type PostRequestProps = {
    key: string;
    userId: number;
};

export default function Post({ data }: PostProps) {
    const submit = useSubmit();
    const date = new Date(data.created_at).toLocaleDateString();

    async function handleSubmit(key: string) {
        const data: PostRequestProps = {
            key: key,
            userId: Number(data.author_id),
        };

        await submit(data, {
            encType: "application/x-www-form-urlencoded",
            method: "POST",
            action: `/posts/${id}`,
        });
    }

    return (
        <article className="border w-full rounded  border-slate-300">
            <section className="p-6 mb-4">
                <div className="flex justify-between mb-4">
                    <Link to={`/${data.author.profile.username}`}>
                        <sub className="text-slate-500">
                            {data.author?.profile.username}
                        </sub>
                    </Link>
                    <sub>{date}</sub>
                </div>
                <h3 className="font-bold text-lg">{data.title}</h3>
                {data.body && <p>{data.body}</p>}
            </section>
            <div className="flex justify-evenly p-2 bg-slate-300">
                <button className="hover:text-blue-500 hover:bg-slate-700 rounded-full p-2">
                    <AiOutlineLike size={"1.5em"} />
                </button>
                <button
                    type="button"
                    className="hover:text-blue-500 hover:bg-slate-700 rounded-full p-2"
                >
                    <Link to={`/posts/${data.id}/comments`}>
                        <FaRegComment size={"1.5em"} />
                    </Link>
                </button>
                <button
                    onClick={() => handleSubmit("report")}
                    className="hover:text-blue-500 hover:bg-slate-700 rounded-full p-2"
                >
                    <GoReport size={"1.5em"} />
                </button>
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
