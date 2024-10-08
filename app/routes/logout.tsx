import { Form } from "@remix-run/react";
import Button from "~/components/ui/Button";
import { authenticator } from "~/services/auth.server";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export async function loader() {
    return redirect("/");
}

export async function action({ request }: ActionFunctionArgs) {
    return await authenticator.logout(request, {
        redirectTo: "/",
    });
}

export default function LogoutButton() {
    return (
        <Form method="POST" action="/logout">
            <Button variant="submit" type="submit">
                Logout
            </Button>
        </Form>
    );
}
