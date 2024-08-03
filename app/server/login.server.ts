import { prisma } from "../prisma";
import { User } from "@prisma/client";

export async function login(email: string, password: string): Promise<User | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            const ok = password === user.password;

            if (ok) {
                return user;
            } else {
                return null;
            }
        }
    } catch (err) {
        return null;
    }
}
