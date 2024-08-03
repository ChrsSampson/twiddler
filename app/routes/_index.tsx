import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    return user;
}

export default function Index() {
    return (
        <div className="font-sans p-4">
            <h1 className="text-3xl">Welcome to Twidder</h1>
            <ul className="list-disc mt-4 pl-6 space-y-2">
                <a href="login">Login</a>
            </ul>
        </div>
    );
}
