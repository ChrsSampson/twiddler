import { Form, SubmitFunction, useActionData, useSubmit } from "@remix-run/react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useState } from "react";
import Textarea from "./ui/Textarea";

type Props = {
    submitFunc: SubmitFunction;
    userId: number;
};

export default function CreatePost({ submitFunc, userId }: Props) {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [message, setmessage] = useState<string>("");

    async function handleSubmit() {
        const data = { title, body, userId };
        const res = await submitFunc(data, {
            action: "/posts",
            method: "POST",
            encType: "application/x-www-form-urlencoded",
        });
    }

    if (show) {
        return (
            <section className="min-h-screen w-screen absolute bottom-[0] grid  place-items-center bg-[#c2c2c2] bg-opacity-75 ">
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
                className=" absolute p-2 border rounded-full text-2xl bg-blue-500 hover:bg-blue-600"
            >
                ➕
            </button>
        );
    }
}
