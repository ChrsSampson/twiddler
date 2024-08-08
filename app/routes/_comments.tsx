import { Comment } from "@prisma/client";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { MdReportGmailerrorred } from "react-icons/md";

export default function CommentDisplay({ comment }) {
    console.log(comment.author);

    return (
        <article className="border rounded border-slate-300">
            <div className="px-2 py-4">
                <h5>{comment.author}</h5>
                <p>{comment.body}</p>
            </div>
            <div className="flex justify-between bg-slate-300 p-2">
                <button className="flex">
                    <CiHeart size={"1.5em"} /> {comment.likes}
                </button>
                <button>
                    <MdReportGmailerrorred size="1.5em" />
                </button>
            </div>
        </article>
    );
}
