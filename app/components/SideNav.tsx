import UserBug from "./UserBug";
import { User } from "@prisma/client";
import Button from "./ui/Button";
import { NavLink } from "@remix-run/react";
import { FaKiwiBird } from "react-icons/fa";
import { useLocation } from "@remix-run/react";

type NavProps = {
    title?: string;
    user?: User;
};

export default function SideNav({ title, user }: NavProps) {
    return (
        <nav className="flex flex-col min-h-screen col-start-2 col-span-1">
            <section className="flex flex-col gap-4 justify-between ">
                <div>
                    <div className="flex gap-3">
                        <h1 className="text-3xl sm-none font-bold">{title}</h1>
                        <FaKiwiBird size="2.5em" />
                    </div>
                    <NavLinks />
                </div>
                <div>
                    {user ? (
                        <UserBug user={user} />
                    ) : (
                        <Link to="/login">
                            <Button variant="button">Login</Button>
                        </Link>
                    )}
                </div>
            </section>
        </nav>
    );
}

// feed - only things user follows show up here
// export - all posts sorted by likes here
// message - DMs

function NavLinks() {
    const location = useLocation();

    const pages = [
        {
            text: "Feed",
            link: "/feed",
        },
        {
            text: "Expore",
            link: "/",
        },
        {
            text: "Messages",
            link: "/messages",
        },
        {
            text: "Policy",
            link: "/policy",
        },
    ];

    const active = "font-bold";
    const base = "hover:underline";

    return (
        <div className="flex flex-col text-2xl gap-4">
            {pages.map((page, i) => {
                return (
                    <NavLink
                        className={location.pathname == page.link ? active : base}
                        key={page.link + page.text + i}
                        to={page.link}
                    >
                        {page.text}
                    </NavLink>
                );
            })}
        </div>
    );
}
