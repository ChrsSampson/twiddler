import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "react-router";
import SideNav from "~/components/SideNav";
import { authenticator } from "~/services/auth.server";
import { json } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/prisma";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request);

    if (!user) {
        return redirect("/login?flash=You%20Must%20Login");
    }

    const fullUser = await prisma.user.findUnique({
        where: {
            id: Number(user.id),
        },
        include: {
            profile: true,
        },
    });

    return json({ user: fullUser });
}

export default function FeedLayout() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <section className="grid grid-cols-5 pt-4 px-[10em]">
            <SideNav title="Comments" user={user} />
            <Outlet />
        </section>
    );
}
