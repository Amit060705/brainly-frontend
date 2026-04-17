import type { ReactElement } from "react";
interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}
const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}
const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150";
export function Button(props: ButtonProps) {
    return <button onClick={props.onClick} className={variantClasses[props.variant] + " " + defaultStyles + ` ${props.fullWidth ? " w-full flex justify-center items-center" : ""}`} disabled={props.loading}>
        <div className="pr-2">
            {props.startIcon}
        </div>
        {props.text}
    </button>
}