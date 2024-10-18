import React from "react";
import './index.css'
export interface Props{
  isPaused : boolean, 
  isNewDuration: boolean, 
  duration:number
}
export default function Spinner(props: Props) {
  const { isPaused, isNewDuration, duration } = props;
  return (
    <svg width="300" height="300" id="svg" data-testid="spinner">
      <circle
        stroke="white"
        strokeWidth="9"
        r="100"
        cx="150"
        cy="150"
        fill="none"
      />
      <path
        id="base-timer-path-remaining"
        fill="none"
        className={`${isPaused ? "paused" : ""} base-timer__path-remaining`}
        d="M 95, 150 m -45, 0 a 45,45 0 1,0 200,0 a 45,45 0 1,0 -200,0"
        style={{
          animation: !isNewDuration ? "none" : `draw ${duration}s linear`,
        }}
      ></path>
      <circle id="dot" r="12" cx="150" cy="50" fill="white" restart="always" />
      <animateTransform
        id="rotateAnimation"
        href="#dot"
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 150 150"
        to="360 150 150"
        dur={duration + "s"}
        repeatCount="1"
        restart="always"
      />
    </svg>
  );
}
