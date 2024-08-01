import { useState } from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { json } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { Link } from "@remix-run/react";
import { useActionData } from "@remix-run/react";

type RequestProps = {
    email: string;
    password: string;
};

export async function action({ request }: ActionFunctionArgs) {
    return await authenticator.authenticate("email", request, {
        successRedirect: "/feed",
        failureRedirect: "/login",
        throwOnError: true,
    });
}

export default function LoginPage() {
    const submitResponse = useActionData();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    console.log(submitResponse);

    return (
        <section className="min-h-screen grid place-items-center">
            <Form method="post" className="border border-gray-400 p-4 rounded-lg flex flex-col">
                <h1 className="text-2xl">Twiddler</h1>
                {error && <h3 className="text-red-500 text-xl">{error}</h3>}
                <Input name="email" label="Email" onChange={setEmail} value={email} />
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
                <Link to="/register" className="text-center text-slate-600 hover:text-slate-900">
                    <sub className="hover:underline">Don't have an account yet?</sub>
                </Link>
            </Form>
        </section>
    );
}
