import { useEffect, useState } from "react";
import { prisma } from "../prisma";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { useSubmit } from "@remix-run/react";
import { json } from "@remix-run/react";
import { Link } from "@remix-run/react";
import generateName from "~/lib/generateName";

type RequestProps = {
    email: string;
    username: string;
    password: string;
};

type RegisterPage1Props = {
    emailState: [string, (e: any) => void];
    usernameState: [string, (e: any) => void];
    advance: () => void;
};

type RegisterPage2Props = {
    passwordState: [string, (e: any) => void];
    passwordState2: [string, (e: any) => void];
    onSubmit: Function;
    previous: () => void;
};

export async function action({ request }: ActionFunctionArgs) {
    try {
        if (request.method == "POST") {
            const data: Promise<RequestProps> = await request.json();

            const name = data.username || generateName(data.email);
            data.email = data.email.toLowerCase();

            const user = await prisma.user.create({
                data: {
                    email: data.email,
                    password: data.password,
                    username: name,
                },
            });

            console.log(user);

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
    const result = useActionData();

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [error, setError] = useState<string>("");

    const actionError = result ? result.error : null;

    console.log(actionError);

    const [currentPage, setPage] = useState<number>(0);

    const pages = [
        <RegisterPage1
            advance={() => setPage(1)}
            emailState={[email, setEmail]}
            usernameState={[username, setUsername]}
        />,
        <RegisterPage2
            passwordState={[password, setPassword]}
            passwordState2={[password2, setPassword2]}
            onSubmit={handleSubmit}
            previous={() => setPage(0)}
        />,
    ];

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        if (error) {
            setError("");
        }

        try {
            if (!matchPassword(password, password2)) {
                throw new Error("Passwords do not match.");
            }

            if (!email) {
                throw new Error("Email cannot be empty.");
            }

            const data = { email, password };

            const res = await submit(data, {
                method: "POST",
                encType: "application/json",
            });

            console.log(res);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setError("");
        }, 5000);
    }, [error]);

    return (
        <section className="min-h-screen grid place-items-center bg-slate-300">
            <Form
                className="border border-gray-400 p-5 rounded-lg flex flex-col bg-white"
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1 className="text-2xl">User Registration</h1>
                {error && <h3 className="text-red-500 text-xl">{error}</h3>}
                {actionError && (
                    <h3 className="text-red-500 text-xl">{actionError}</h3>
                )}
                {pages[currentPage]}
                <Link
                    to="/login"
                    className="text-center text-slate-600 hover:text-slate-900"
                >
                    <sub className="hover:underline">
                        Already have an Account?
                    </sub>
                </Link>
            </Form>
        </section>
    );
}

function RegisterPage1({
    emailState,
    usernameState,
    advance,
}: RegisterPage1Props) {
    const [email, setEmail] = emailState;
    const [username, setUsername] = usernameState;

    const [valid, setValid] = useState<boolean>(false);

    useEffect(() => {
        if (email) {
            setUsername(generateName(email));

            if (email && username == "") {
                setValid(true);
            } else {
                setValid(false);
            }
        }
    }, [email]);

    return (
        <div>
            <Input label="Email" onChange={setEmail} value={email} />
            <Input
                label="Display Name"
                onChange={setUsername}
                value={username}
            />
            <div className="flex justify-end">
                <Button type="button" onClick={() => advance()} disable={valid}>
                    Next
                </Button>
            </div>
        </div>
    );
}

function RegisterPage2({
    passwordState,
    passwordState2,
    onSubmit,
    previous,
}: RegisterPage2Props) {
    const [password, setPassword] = passwordState;
    const [password2, setPassword2] = passwordState2;
    const [reveal, setReveal] = useState<boolean>(false);

    return (
        <div>
            <Input
                type={reveal ? "text" : "password"}
                label="Password"
                onChange={setPassword}
                value={password}
            />
            <div className="flex justify-center">
                <Input
                    label="Confirm Password"
                    onChange={setPassword2}
                    value={password2}
                    type={reveal ? "text" : "password"}
                />
            </div>
            <div className="flex justify-between">
                <Button type="button" onClick={() => previous()}>
                    Back
                </Button>
                <Button type="button" onClick={() => setReveal(!reveal)}>
                    👁️
                </Button>
                <Button type="submit" onClick={() => onSubmit()}>
                    Submit
                </Button>
            </div>
        </div>
    );
}
