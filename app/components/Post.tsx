import { Post, User } from "@prisma/client";
type PostProps = {
    id: number;
    title: string;
    body?: string;
    author: User;
};

export default function PostDisplay(data: PostProps) {
    return (
        <article className="border rounded p-4 border-slate-300">
            <div className="flex justify-between">
                <sub className="text-slate-500">{data.author.username}</sub>
            </div>
            <h3 className="font-bold ">{data.title}</h3>
            {data.body && <p>{data.body}</p>}
        </article>
    );
}
