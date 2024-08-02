type AreaProps = {
    label?: string;
    value: any;
    onChange: (e: any) => void;
    error?: boolean;
    disable?: boolean;
    autocomplete?: boolean;
    name?: string;
    placeholder?: string;
};

export default function Textarea(props: AreaProps) {
    const singleLineStyle = "flex p-2";

    const groupStyle = "flex flex-col p-1";

    return (
        <div className={props.label ? groupStyle : singleLineStyle}>
            {props.label && <label className="text-lg">{props.label}</label>}
            <textarea
                name={props.name}
                autoComplete={String(props.autocomplete)}
                disabled={props.disable}
                className="p-2 border-gray-400 border border-spacing-2 rounded bg-slate-200 focus:bg-slate-300"
                value={props.value}
                placeholder={props.placeholder}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
}
