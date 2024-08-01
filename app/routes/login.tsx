import { useState } from "react";
import { prisma } from "../prisma";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import Input from "~/components/Input";
import Button from "~/components/Button";
import { json } from "@remix-run/react";
import { authenticator } from "~/services/auth";

type RequestProps = {
    email: string;
    password: string;
};

export async function action({ request }: ActionFunctionArgs) {
    try {
        const res = await authenticator.authenticate("email", request, {
            successRedirect: "/feed",
            failureRedirect: "/login",
            throwOnError: true,
        });

        console.log(res);

        return res;
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            return json({ error: err.message });
        }
    }
}

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    return (
        <section className="min-h-screen grid place-items-center">
            <Form method="post" className="border border-gray-400 p-4 rounded-lg flex flex-col">
                <h1 className="text-2xl">Twiddler</h1>
                {error && <h3 className="text-red-500 text-xl">{error}</h3>}
                <Input label="Email" onChange={setEmail} value={email} />
                <Input type="password" label="Password" onChange={setPassword} value={password} />
                <Button type="submit" onClick={() => {}}>
                    Submit
                </Button>
                <a href="/register" className="text-center text-slate-600 hover:text-slate-900">
                    <sub className="hover:underline">Don't have an account yet?</sub>
                </a>
            </Form>
        </section>
    );
}
