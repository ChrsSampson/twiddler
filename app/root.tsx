import {
    Links,
    Meta,
    Link,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from "@remix-run/react";
import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundry() {
    const error = useRouteError();

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Uh Oh!</title>
                <Meta />
                <Links />
            </head>
            <body>
                <p>{JSON.stringify(error)}</p>
                <ScrollRestoration />
                <Scripts />
                <footer>
                    <Link className="text-3xl" to="/policy">
                        Policies
                    </Link>
                    <Link to="/">Home</Link>
                </footer>
            </body>
        </html>
    );
}
