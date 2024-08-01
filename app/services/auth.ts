import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session";
import { User } from "@prisma/client";
import { FormStrategy } from "remix-auth-form";
import { login } from "~/server/login";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage, {
    sessionErrorKey: "Auth-Error",
});

authenticator.use(
    new FormStrategy(async ({ form }) => {
        const email = form.get("email");
        const password = form.get("password");

        const user = await login(email, password);

        return user;
    }),
    "email"
);
