import UserBug from "./UserBug";
import { User } from "@prisma/client";
import Button from "./ui/Button";
import { NavLink } from "@remix-run/react";
import { FaKiwiBird } from "react-icons/fa";

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

function NavLinks() {
    return (
        <div className="flex flex-col text-2xl gap-4">
            <NavLink to="/feed">For You</NavLink>
            <NavLink to="/">Explore</NavLink>
            <NavLink to="/feed">Messages</NavLink>
            <NavLink to="/policy">Policy</NavLink>
        </div>
    );
}
