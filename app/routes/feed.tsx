import { LoaderFunctionArgs } from "@remix-run/node";
import {
    Links,
    Meta,
    Scripts,
    ScrollRestoration,
    MetaFunction,
    useLoaderData,
} from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import SideNav from "~/components/SideNav";
import { User } from "@prisma/client";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/node";
import { prisma } from "~/prisma";

export const meta: MetaFunction = () => {
    return [
        { title: "Twiddler | Your Feed" },
        { name: "Twiddler Feed", content: "Whats Going On?" },
    ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request);

    const fullUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            profile: true,
        },
    });

    return json({ user: fullUser });
}

type LoaderProps = {
    user: User;
};

export default function FeedLayout() {
    const { user } = useLoaderData<LoaderProps>();

    return (
        <section className="grid grid-cols-5 pt-4 px-[10em]">
            <SideNav title="Your Feed" user={user} />
            <Outlet />
        </section>
    );
}
