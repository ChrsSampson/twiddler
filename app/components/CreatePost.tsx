import { useSubmit, Form } from "@remix-run/react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useState } from "react";
import Textarea from "./ui/Textarea";

export default function CreatePost() {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");

    return (
        <Form className="border border-gray-400 rounded-lg p-2" method="POST" action="/posts">
            <div className="flex flex-col justify-center">
                <Input name="title" label="Title" value={title} onChange={setTitle} />
                <Textarea placeholder="Your Post..." name="body" value={body} onChange={setBody} />
            </div>
            <Button type="submit">➕</Button>
        </Form>
    );
}
