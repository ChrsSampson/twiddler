import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Twiddler | Policy" },
        { name: "User Content Policy", content: "Welcome to Remix!" },
    ];
};

export default function PolicyPage() {
    return (
        <main className="grid place-items-center p-6 ">
            <section className="border border-slate-300 rounded-lg p-6 max-w-[65%]">
                <h1 className="text-2xl">FAQ and Policies</h1>
                <Article title="About">
                    <p>
                        This app was made to mimic a certain other website that shall not be named.
                        The goal was to get as many features as possible while keeping running costs
                        to a minimiuma and performance high.This is developed and maintained part
                        time by a single developer so don't be surprised if things break or become
                        unavailable every once in a while. Currentley this project is not Open
                        Source and most likely never will be.
                    </p>
                    <p>
                        If there are any ads displayed on the site they are stricley there to
                        contribute to the operating costs of the plaform.
                    </p>
                    <p>
                        <strong>
                            The community generated content of this site do not reflect the thoughts
                            or opinions of the developer.
                        </strong>
                    </p>
                </Article>
                <Article title={"Community Content Guidelines"}>
                    <p>
                        The main source of moderation will be peer review and a simple profanity
                        filter. If that spirals out of control in the future I will see about making
                        something stronger.
                    </p>
                    <p>
                        User Accounts will be subjected to a community ban upon recieving a high
                        amount or reports. User Accounts are also subject to manual review on a case
                        by case basis. Posts will be subjected to community moderation and
                        subsiquently banned upon recieving a high amount of reports from other users
                    </p>
                    <p>
                        Currently there is no appeal proccess so all bans and content removals are
                        final.
                    </p>
                    <p>1:) No hate speech</p>
                    <p>2:) No Death Threats</p>
                    <p>4:) No Illegal Content</p>
                    <p>5:) Users who consistently break the rules will be muted or banned.</p>
                    <p>
                        6:) Abusing platform or exploiting resources will result in a permanent bad.
                    </p>
                    <p>7:) No sharing or distributing copyrighted content.</p>
                    <p>
                        The Devloper reverves the right to remove or banish any content that would
                        make the owner of this placeform liable
                    </p>
                </Article>
                <Article title="Privacy Policy">
                    <p>
                        <strong>How is your data used? Its not.</strong> This is a small independent
                        project developed by a single developer. I don't want your data or the
                        responsibilies that come with it. Anything posted on this platform will stay
                        on this platform unless it is scaped by a 3rd party. I shouln't have to say
                        this but don't put any personal information on this site.
                    </p>
                </Article>
            </section>
        </main>
    );
}

type ArticleProps = {
    children: React.ReactNode;
    title: string;
};

function Article({ children, title }: ArticleProps) {
    return (
        <article className="text-lg flex flex-col gap-3 my-4">
            <h2 className="text-3xl text-center underline font-bold mb-3">{title}</h2>
            <section className="flex flex-col gap-3">{children}</section>
        </article>
    );
}
