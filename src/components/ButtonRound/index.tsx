import React from "react";
import './index.css'
export interface Props {
  callback: () => void;
  children:string;
  title ?: string;
}

export default function ButtonRound(props: Props) {
  return (
    <>
      <button title={props.title} className="rountButton" onClick={props.callback}>{props.children}</button>
    </>
  );
}
