import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { User } from "@prisma/client";
import { FormStrategy } from "remix-auth-form";
import { login } from "~/server/login.server";

let authenticator = new Authenticator<User>(sessionStorage);

const formStrategy = new FormStrategy(async ({ form }) => {
    try {
        const email = form.get("email") as string;
        const password = form.get("password") as string;

        const user = await login(email, password);

        if (!user) {
            throw new AuthorizationError("Invalid Credentials");
        }

        return user;
    } catch (err) {
        return null;
    }
});

authenticator.use(formStrategy, "email");

export { authenticator };
