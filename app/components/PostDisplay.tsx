import { Post, User } from "@prisma/client";
type PostProps = {
    id: number;
    title: string;
    body?: string;
    author: User;
};

export default function PostDisplay({ data }: PostProps) {
    return (
        <article className="border w-full rounded p-6 border-slate-300">
            <div className="flex justify-between mb-4">
                <sub className="text-slate-500">{data.author?.username}</sub>
            </div>
            <h3 className="font-bold text-lg">{data.title}</h3>
            {data.body && <p>{data.body}</p>}
        </article>
    );
}
