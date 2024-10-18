import React from "react";
import './index.css'
export interface Props {
  callback: () => void;
  children:string;
  title ?: string;
}

export default function ButtonText(props: Props) {
  return (
    <>
      <button title = {props.title} className="textButton" onClick={props.callback}>{props.children}</button>
    </>
  );
}
