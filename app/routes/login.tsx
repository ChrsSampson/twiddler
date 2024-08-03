import { useState } from "react";
import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { authenticator } from "~/services/auth.server";
import { Link } from "@remix-run/react";
import { useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import { useSearchParams } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {});

    if (user) {
        return redirect("/feed");
    } else {
        return null;
    }
}

// DO NOT PUT TRY/CATCH IN HERE
export async function action({ request, context }: ActionFunctionArgs) {
    const result = await authenticator.authenticate("email", request, {
        successRedirect: "/feed",
        throwOnError: true,
        context,
    });
    return result;
}

export default function LoginPage() {
    const submitResponse = useActionData();
    const submit = useSubmit();
    const [params] = useSearchParams();
    const flash = params.get("flash") || "";

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const error = submitResponse ? submitResponse.error : null;

    return (
        <section className="min-h-screen grid place-items-center bg-slate-300">
            <Form
                method="post"
                className="border border-gray-400 p-4 rounded-lg flex flex-col bg-white"
            >
                <h1 className="text-2xl">Twiddler</h1>
                {error && <h3 className="text-red-500 text-xl">{error}</h3>}
                {flash && (
                    <h3 className="text-blue-600 text-center text-lg">
                        {flash}
                    </h3>
                )}
                <Input
                    name="email"
                    label="Email"
                    onChange={setEmail}
                    value={email}
                />
                <Input
                    name="password"
                    type="password"
                    label="Password"
                    onChange={setPassword}
                    value={password}
                />
                <Button type="submit" onClick={() => {}}>
                    Submit
                </Button>
                <Link
                    to="/register"
                    className="text-center text-slate-600 hover:text-slate-900"
                >
                    <sub className="hover:underline">
                        Don't have an account yet?
                    </sub>
                </Link>
            </Form>
        </section>
    );
}
