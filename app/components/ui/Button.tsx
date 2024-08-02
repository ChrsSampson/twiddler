type ButtonProps = {
    children?: React.ReactNode;
    onClick?: () => void;
    disable?: boolean;
    type?: "button" | "submit" | "reset";
};

export default function Button(props: ButtonProps) {
    const clickHandler =
        props.onClick ||
        function () {
            return;
        };

    function getStyle() {
        const baseStyle = "text-center rounded px-[1em] py-[.5em] hover:text-slate-200";

        // the trailing spaces are important here
        const submitStyle = "bg-blue-500 hover:bg-blue-600 ";
        const normalStyle = "bg-green-500 hover:bg-green-700 ";
        // override the interactive styles
        const normalDisabled = "bg-slate-300 text-slate-400 hover:text-slate-400 ";

        switch (props.type) {
            case "submit":
                return submitStyle + baseStyle;
            default:
                if (props.disable) {
                    return normalDisabled + baseStyle;
                } else {
                    return normalStyle + baseStyle;
                }
        }
    }

    return (
        <button
            className={getStyle()}
            disabled={props.disable}
            type={props.type || "button"}
            onClick={() => clickHandler()}
        >
            {props.children}
        </button>
    );
}
