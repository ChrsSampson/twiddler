// outsourced to dicebear.com

import { createAvatar } from "@dicebear/core";
import { glass } from "@dicebear/collection";
import baseAvatar from "../img/avatar.svg";

// fetch url - https://api.dicebear.com/9.x/glass/svg?seed=[FILL ME IN]&svg?rotate=[random Int 0-360]

// return img/svg
export default function getAvatar() {
    const rotate = randomInt();
    const seed = randomSeed();

    const avatar = createAvatar(glass, {
        rotate,
        seed,
        size: 256,
    });

    return avatar.toDataUri();
}

function randomInt(max = 360): number {
    return Math.floor(Math.random() * max);
}

function randomSeed(): string {
    return (Math.random() + 1).toString(36).substring(7);
}
