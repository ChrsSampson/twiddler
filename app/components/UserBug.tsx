import { User } from "@prisma/client";
import { Link } from "@remix-run/react";

export default function UserBug({ user }: User) {
    return (
        <Link to={`/profile/${user.profile.username}`}>
            <section className="bg-slate-300 hover:bg-slate-500 hover:text-white rounded p-[1em] flex gap-2 justify-between place-items-center">
                <img className="rounded-full" height={30} width={30} src={user.profile.avatar} />
                <h4 className="text-lg">{user.profile.username}</h4>
            </section>
        </Link>
    );
}
