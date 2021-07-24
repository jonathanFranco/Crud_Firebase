import React from "react";
import { Props } from "./types";
import { AiFillDelete } from "react-icons/ai";
import { RiEditBoxFill } from "react-icons/ri";
import Loader from "react-loader-spinner";

const Button = ({ props }: Props) => {
    return (
        <button className={`${props.btnStyle} flex justify-center items-center space-x-2`}
            onClick={props.onClick}
            style={{ outline: "none" }}
        >
            {props?.loader &&
                <Loader
                    type="TailSpin"
                    color="#FFFFFF"
                    height={15}
                    width={15}
                    visible={props?.loader}
                />
            }
            {props?.icon === "edit" && <RiEditBoxFill size={`1.2rem`} />}
            {props?.icon === "delete" && <AiFillDelete size={`1.2rem`} />}
            {props?.icon === undefined && <p>{props.title}</p>}
        </button>
    )
}
export default Button;