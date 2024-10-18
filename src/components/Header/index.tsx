import React from "react";
import "./index.css";
import ButtonText from "../ButtonText";
interface Props{
    callback: ()=> void
}
export default function Header(props:Props) {
  return (
    <>
      <header>
        <h1>Timer</h1>
        <ButtonText title="close" callback={props.callback}>&#10006;</ButtonText>
      </header>
    </>
  );
}
