import { useState } from "react";
import { prisma } from "../prisma";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { useSubmit } from "@remix-run/react";
import { json } from "@remix-run/react";
import { Link } from "@remix-run/react";

type RequestProps = {
    email: string;
    password: string;
};

export async function action({ request }: ActionFunctionArgs) {
    try {
        if (request.method == "POST") {
            const data: Promise<RequestProps> = await request.json();

            const user = await prisma.user.create({
                data: { email: data.email, password: data.password },
            });

            return redirect("/login?flash=Account%20Created");
        }

        throw new Error("Unsupported Method");
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return json({ error: err.message, stack: err }, { status: 500 });
        }
    }
}

function matchPassword(p1: string, p2: string): boolean {
    if (p1 && p2) {
        return p1 === p2;
    }

    return false;
}

export default function RegisterPage() {
    const submit = useSubmit();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [error, setError] = useState<string>("");

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        if (error) {
            setError("");
        }

        try {
            if (!matchPassword(password, password2)) {
                throw new Error("Password do not match.");
            }

            if (!email) {
                throw new Error("Email cannot be empty.");
            }

            const data = { email, password };

            const res = await submit(data, { method: "POST", encType: "application/json" });

            console.log(res);
        } catch (err) {
            if (err instanceof Error) {
                console.log(err);
                setError(err.message);
            }
        }
    }

    return (
        <section className="min-h-screen grid place-items-center">
            <Form
                className="border border-gray-400 p-4 rounded-lg flex flex-col"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl">User Registration</h1>
                {error && <h3 className="text-red-500 text-xl">{error}</h3>}
                <Input label="Email" onChange={setEmail} value={email} />
                <Input type="password" label="Password" onChange={setPassword} value={password} />
                <Input
                    type="password"
                    label="Confirm Password"
                    onChange={setPassword2}
                    value={password2}
                />
                <Button type="submit" onClick={() => {}}>
                    Submit
                </Button>
                <Link to="/login" className="text-center text-slate-600 hover:text-slate-900">
                    <sub className="hover:underline">Already have an Account?</sub>
                </Link>
            </Form>
        </section>
    );
}
