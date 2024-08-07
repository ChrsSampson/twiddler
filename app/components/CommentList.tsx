import { Comment } from "@prisma/client";

type Props = {
    comments: Comment[];
};

export default function CommentList({ comments }: Props) {
    return (
        <section>
            <h1>This is a list of comments</h1>
            {comments &&
                comments.map((item) => {
                    return (
                        <article key={item.id}>
                            <p>{item.body}</p>
                        </article>
                    );
                })}
        </section>
    );
}
