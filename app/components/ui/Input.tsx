type InputProps = {
    label?: string;
    value: any;
    onChange: (e: any) => void;
    type?: string;
    error?: boolean;
    disable?: boolean;
    autocomplete?: boolean;
    name?: string;
    placeholder?: string;
};

export default function Input(props: InputProps) {
    const singleLineStyle = "w-full";

    const groupStyle = "flex flex-col p-1";

    return (
        <div className={props.label ? groupStyle : singleLineStyle}>
            {props.label && <label className="text-lg">{props.label}</label>}
            <input
                name={props.name}
                placeholder={props.placeholder}
                autoComplete={String(props.autocomplete)}
                disabled={props.disable}
                className="p-2 border-gray-400 min-w-full border border-spacing-2 rounded bg-slate-200 focus:bg-slate-300"
                type={props.type || "text"}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
}
