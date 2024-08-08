import { Comments } from "@prisma/client";
import CommentDisplay from "~/routes/_comments";

type Props = {
    comments: Comments[];
    placeholder: String;
};

export default function CommentList({ comments, placeholder }: Props) {
    if (comments.length < 1) {
        return <Placeholder message={placeholder} />;
    }

    return (
        <section className="flex flex-col">
            <section className="flex flex-col gap-2">
                {comments &&
                    comments.map((item) => {
                        return <CommentDisplay key={item.id + item.author_id} comment={item} />;
                    })}
            </section>
        </section>
    );
}

type PlaceholderProps = {
    message?: string;
};

function Placeholder({ message }: PlaceholderProps) {
    return (
        <article className="border border-dashed rounded p-4 min-h-[20em] grid place-items-center border-slate-300">
            <p className="text-2xl text-slate-500 text-center">
                {message || "There is nothing here."}
            </p>
        </article>
    );
}
