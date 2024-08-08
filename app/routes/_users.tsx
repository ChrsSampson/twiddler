import { ActionFunctionArgs } from "react-router";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/prisma";
import { json } from "react-router";
import { redirect } from "@remix-run/node";

export async function action({ request, params }: ActionFunctionArgs) {
    const user = await authenticator.isAuthenticated(request);

    console.log(request);

    if (request.method == "delete") {
        const id = (await request.formData()).get("id");

        if (Number(user) === Number(id)) {
            const res = await prisma.user.delete({
                where: {
                    id: Number(id),
                },
            });
        }

        return redirect("/");
    }

    return null;
}
