import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { formatTimeMS, formatTimeInSec } from "./service";
import Header from "./components/Header";
import Spinner from "./components/spinner";
import ButtonText from "./components/ButtonText";
import ButtonRound from "./components/ButtonRound";
function App() {
  interface IntervalRef {
    current: number | null;
  }
  var i = 1;
  const defaultTimerInterval = 0;
  const editableDialRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<IntervalRef["current"]>(null);
  const [duration, setDuration] = useState(defaultTimerInterval);
  let [remDuration, setRemDuration] = useState<string | number>(
    formatTimeMS(defaultTimerInterval)
  );
  const [isNewDuration, setIsNewDuration] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showEditDial, setShowEditDial] = useState(false);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Do something when Enter is pressed
      if (editableDialRef.current) {
        // Check if it's not null
        resetAnimation();
        resetTimer(Math.abs(Math.floor(Number(editableDialRef.current.value))));
      }
    }
  };
  const resetTimer = (duration: number) => {
    setShowEditDial(false);
    setIsNewDuration(false);
    setRemDuration(formatTimeMS(Number(duration)));
    setDuration(duration);
    resetAnimation();
  };
  const emptyMe = () => {
    setRemDuration(formatTimeMS(defaultTimerInterval));
    setShowEditDial(true);
    setTimeout(() => {
      if (editableDialRef.current) {
        editableDialRef.current.focus();
      }
    }, 100);
  };

  const addDuration = () => {
    let duration = Number(formatTimeInSec(String(remDuration))) + 60;
    resetTimer(duration);
    resetAnimation();
  };
  const pauseMe = () => {
    const svgElement = document.getElementById(
      "svg"
    ) as unknown as SVGSVGElement;
    if (!isPaused) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      if (svgElement && svgElement.pauseAnimations) {
        svgElement.pauseAnimations();
      }
      setIsPaused(true);
    } else {
      setDuration(duration);
      if (svgElement && svgElement.unpauseAnimations) {
        svgElement.unpauseAnimations();
      }
      setIsPaused(false);
      setShowEditDial(false);
    }
  };
  function overwriteTimer(e: React.ChangeEvent<HTMLInputElement>) {
    setRemDuration(Math.abs(Number(e.target.value)));
  }
  function resetAnimation() {
    const animation = document.getElementById(
      "rotateAnimation"
    ) as unknown as SVGAnimateTransformElement;

    if (animation && animation.beginElement) {
      animation.beginElement(); // Restart the animation
    }
  }

  function onClose(){
    alert("TBD for model")
  }
  useEffect(() => {
    if (duration > 0 && !isPaused) {
      setIsNewDuration(true);
      intervalRef.current = window.setInterval(function () {
        if (!showEditDial) {
          remDuration = Number(formatTimeInSec("" + remDuration)) - 1;
          if (remDuration >= 0) {
            setRemDuration(formatTimeMS(Number(remDuration)));
          }
        }
        if (i === duration) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
          }
          return;
        }
        i++;
      }, 1000);
      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [duration, isPaused]);
  return (
    <div className="timer">
      <Header callback = {onClose}></Header>
      <div className="radialBody">
      <Spinner
        isPaused={isPaused}
        isNewDuration={isNewDuration}
        duration={duration}
      ></Spinner>
      <div className="timerMark">
        {!showEditDial && (
          <input
            className="duration"
            type="text"
            value={remDuration}
            onClick={emptyMe}
            onKeyDown={emptyMe}
            readOnly
          ></input>
        )}
        {showEditDial && (
          <input
            ref={editableDialRef}
            className="duration"
            type="text"
            onChange={overwriteTimer}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setShowEditDial(false);
            }}
          ></input>
        )}
      </div>
      </div>
      
      <div className="footer">
        <ButtonText title="Add 1 minute duration" callback={addDuration}>+1:00</ButtonText>
        {!isPaused && <ButtonRound title="Pause Timer" callback={pauseMe}>&#9616;&#9616;</ButtonRound>}
        {isPaused && <ButtonRound title="Resume Timer" callback={pauseMe}>&nbsp; &#9658;</ButtonRound>}
        <ButtonText title="Reset Timer" callback={() => {resetTimer(defaultTimerInterval)}}>Reset</ButtonText>
      </div>
    </div>
  );
}

export default App
