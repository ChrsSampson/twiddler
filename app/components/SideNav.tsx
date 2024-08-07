import UserBug from "./UserBug";
import { User } from "@prisma/client";
import Button from "./ui/Button";
import { NavLink } from "@remix-run/react";

type NavProps = {
    title?: string;
    user?: User;
};

export default function SideNav({ title, user }: NavProps) {
    return (
        <nav className="flex flex-col gap-4 col-start-2 col-span-1">
            {title && <h1 className="text-3xl">{title}</h1>}
            {user ? (
                <UserBug user={user} />
            ) : (
                <Link to="/login">
                    <Button variant="button">Login</Button>
                </Link>
            )}
        </nav>
    );
}

function NavLinks() {
    return (
        <div>
            <NavLink to="/feed">New</NavLink>
        </div>
    );
}
