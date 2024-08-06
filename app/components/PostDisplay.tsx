import { Post, User } from "@prisma/client";
import { Link } from "react-router-dom";
type PostProps = {
    data: Post;
};

export default function PostDisplay({ data }: PostProps) {
    const date = new Date(data.created_at).toLocaleDateString();

    return (
        <article className="border w-full rounded p-6 border-slate-300">
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
        </article>
    );
}
