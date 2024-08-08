import { ActionFunctionArgs } from "@remix-run/node";
import { Form, SubmitFunction, useActionData, useSubmit } from "@remix-run/react";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { useState } from "react";
import Textarea from "~/components/ui/Textarea";
import { authenticator } from "~/services/auth.server";
import { redirect } from "@remix-run/node";
import profanityFilter from "~/lib/profanityFilter";
import { prisma } from "~/prisma";
import { FaPlus } from "react-icons/fa";
import { json } from "@remix-run/node";

type Props = {
    userId: number;
};

export async function action({ request, params }: ActionFunctionArgs) {
    const user = authenticator.isAuthenticated(request, {});

    if (!user) {
        return redirect("/login");
    }

    try {
        const formData = await request.formData();
        const title = formData.get("title") as string;
        const postBody = formData.get("body") as string;
        const userId = formData.get("userId") as string;

        const filteredtitle = profanityFilter(title);
        const filteredbody = profanityFilter(postBody);

        const result = await prisma.post.create({
            data: {
                title: filteredtitle,
                body: filteredbody,
                author_id: Number(userId),
            },
        });

        return json({ status: 201, result });
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            return json({ error: err.message, status: 500 }, { status: 500 });
        }
    }
}

// the submit with need changed, I can not get any data back from the submit even because its posting to a non-sibling route
// the submit event will just get called here and defined in the parent component
// at least thats what the docs say

export default function CreatePost({ userId }: [Props]) {
    const submit = useSubmit();

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [message, setmessage] = useState<string>("");

    async function handleSubmit() {
        const data = { title, body, userId };
        const res = await submit(data, {
            action: "/feed/posts",
            method: "POST",
            encType: "application/x-www-form-urlencoded",
            navigate: false,
            replace: true,
        });

        setShow(false);
    }

    if (show) {
        return (
            <section className="min-h-screen w-screen absolute bottom-[0] left-0 grid  place-items-center bg-[#c2c2c2] bg-opacity-75 ">
                <Form
                    className="border bg-white border-gray-400 rounded-lg p-2 w-1/3"
                    action="/posts"
                    navigate={false}
                    onSubmit={handleSubmit}
                >
                    <div>
                        <button
                            className="hover:bg-[#c2c2c2] rounded-full p-2"
                            onClick={() => setShow(false)}
                        >
                            ❌
                        </button>
                    </div>
                    <div className="flex flex-col justify-center">
                        <Input name="title" label="Title" value={title} onChange={setTitle} />
                        <Textarea
                            placeholder="Whats Happening?"
                            name="body"
                            value={body}
                            onChange={setBody}
                        />
                    </div>
                    {message && <p className="">{message}</p>}
                    <div className="flex justify-end gap-2">
                        <Button type="submit">Post</Button>
                    </div>
                </Form>
            </section>
        );
    } else {
        return (
            <button
                onClick={() => setShow(!show)}
                className="sticky bottom-20 left-20 p-4 border rounded-full hover:text-white text-2xl bg-blue-500 hover:bg-blue-600"
            >
                <FaPlus />
            </button>
        );
    }
}
