// generat a random username for new users - simple
export default function generateName(email: string) {
    const splitAt = email.indexOf("@");

    const num = Math.floor(Math.random() * 9999);

    const baseName = email.slice(0, splitAt);

    return `${baseName}_${num}`;
}
