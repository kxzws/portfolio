import React, { useState } from "react";
import "./Car.scss";
import { ICarProps } from "./utils/interfaces";
import { startEngine, stopEngine } from "./api/async-race-api";

function Car(props: ICarProps) {
  const [isStart, setIsStart] = useState<boolean>(false);

  const carId = `car${props.num}`;

  const onRemoveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.handleRemoveClick(props.num);
  }

  const onSelectClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.handleSelectClick(props.num);
  }

  const onStartClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsStart(!isStart);

    const car = document.getElementById(carId) as HTMLElement;
    startEngine(props.num, car);
  }

  const onStopClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsStart(!isStart);

    const car = document.getElementById(carId) as HTMLElement;
    stopEngine(props.num, car);
  }

  return (
    <>
      <div className="controls">
        <button className="controls__btn" onClick={onSelectClick}>
          Select
        </button>
        <button className="controls__btn" onClick={onRemoveClick}>
          Remove
        </button>
        <span className="controls__name">{props.name}</span>
      </div>
      <div className="track">
        <button id="start" className="track__pedal" onClick={onStartClick} disabled={isStart}>
          A
        </button>
        <button id="stop" className="track__pedal" onClick={onStopClick} disabled={!isStart}>
          B
        </button>
        <svg id={carId} className="track__car" fill={props.color}>
          <use xlinkHref="./icons.svg#car"></use>
        </svg>
        <svg className="track__finish">
          <use xlinkHref="./icons.svg#flag"></use>
        </svg>
      </div>
    </>
  );
}

export default Car;
