type ButtonProps = {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
};

export default function Button(props: ButtonProps) {
    const clickHandler =
        props.onClick ||
        function () {
            return;
        };

    function getStyle() {
        const baseStyle = "rounded px-[1em] py-[.5em] hover:text-slate-200";

        const submitStyle = "bg-blue-500 hover:bg-blue-600 ";
        const normalStyle = "bg-green-500 hover:bg-green-700 ";

        switch (props.type) {
            case "submit":
                return submitStyle + baseStyle;
            default:
                return normalStyle + baseStyle;
        }
    }

    return (
        <button className={getStyle()} type={props.type || "button"} onClick={() => clickHandler()}>
            {props.children}
        </button>
    );
}
