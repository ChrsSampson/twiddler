import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "react-router";
import { prisma } from "~/prisma";
import profanityFilter from "~/lib/profanityFilter";
import { authenticator } from "~/services/auth.server";
import { Post } from "@prisma/client";
import { Link } from "@remix-run/react";
import { useSubmit } from "@remix-run/react";
import { AiOutlineLike } from "react-icons/ai";
import { GoReport } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";

// this page should not allow people to browse to it
export async function loader() {
    return null;
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

type PostProps = {
    data: Post;
};

export default function PostDisplay({ data }: PostProps) {
    const submit = useSubmit();
    const date = new Date(data.created_at).toLocaleDateString();

    return (
        <article className="border w-full rounded  border-slate-300">
            <section className="p-6 mb-4">
                <div className="flex justify-between mb-4">
                    <Link to={`/${data.author.profile.username}`}>
                        <sub className="text-slate-500">{data.author?.profile.username}</sub>
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
                    <Link to={`/posts/${data.id}`}>
                        <FaRegComment size={"1.5em"} />
                    </Link>
                </button>
                <button className="hover:text-blue-500 hover:bg-slate-700 rounded-full p-2">
                    <GoReport size={"1.5em"} />
                </button>
            </div>
        </article>
    );
}
