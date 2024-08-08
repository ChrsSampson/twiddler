type ButtonProps = {
    children?: React.ReactNode;
    onClick?: () => void;
    disable?: boolean;
    type?: "button" | "submit" | "reset";
    variant?: "button" | "submit" | "danger";
};

export default function IconButton(props: ButtonProps) {
    const clickHandler =
        props.onClick ||
        function () {
            return;
        };

    function getStyle() {
        const baseStyle = "rounded-full p-2";

        // the trailing spaces are important here

        // reference
        // hover:text-blue-500 hover:bg-slate-700 rounded-full p-2

        const submitStyle = "hover:text-blue-500 hover:bg-slate-700 ";
        const normalStyle = "hover:text-green-500 hover:bg-slate-700 ";
        const dangerStyle = "hover:text-red-500 hover:bg-slate-700 ";
        // override the interactive styles
        const normalDisabled = "text-slate-400 hover:text-slate-400 ";

        switch (props.variant) {
            case "submit":
                return submitStyle + baseStyle;
            case "danger":
                return dangerStyle + baseStyle;
            default:
                if (props.disable) {
                    return normalDisabled + baseStyle;
                } else {
                    return normalStyle + baseStyle;
                }
        }
    }

    return (
        <button onClick={() => clickHandler()} className={getStyle()}>
            {props.children}
        </button>
    );
}
