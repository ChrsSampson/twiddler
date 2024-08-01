import { prisma } from "../prisma";

export async function login(email: string, password: string) {
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
