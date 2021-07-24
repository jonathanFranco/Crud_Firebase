import React from "react";
import { Props } from "./types";

const Input = ({ props }: Props) => {
    return (
        <div className="col-span-12 w-full">
            <p className={props?.titleStyle}>{props?.title}</p>
            <input
                type={props?.type || "text"}
                name={props?.name || ""}
                required
                autoComplete="off"
                className={props?.inputStyle || ""}
                value={props?.value || ""}
                onChange={props?.onChange}
            />
        </div>
    )
}
export default Input;
