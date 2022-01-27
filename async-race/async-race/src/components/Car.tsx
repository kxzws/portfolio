import React, { useState } from "react";
import axios from "axios";
import "./Car.scss";
import { ICarProps } from "./utils/interfaces";
import { API_URL } from "./utils/constants";

function Car(props: ICarProps) {
  const [isStart, setIsStart] = useState<boolean>(false);

  const carId = `car${props.num}`;

  return (
    <>
      <svg display="none">
        <symbol id="flag" viewBox="0 0 485.213 485.212">
          <g>
            <path
              d="M470.052,136.467c-62.343,22.953-109.84,39.299-151.629,90.978c-37.229,46.05-90.98,62.011-151.628,31.657v165.457h-30.329
		V15.163C136.465,6.781,143.247,0,151.628,0c8.38,0,15.166,6.781,15.166,15.163c33.67,48.953,92.189,59.795,151.628,60.653
		C409.398,77.146,470.052,136.467,470.052,136.467z M197.116,337.612v30.854c35.775,7.318,60.653,22.841,60.653,40.936
		c0,25.113-47.534,45.49-106.141,45.49c-58.609,0-106.139-20.377-106.139-45.495c0-18.09,24.875-33.612,60.649-40.931v-30.854
		c-55.081,9.535-90.978,36.249-90.978,71.784c0,44.631,56.121,75.816,136.467,75.816c80.344,0,136.468-31.186,136.468-75.816
		C288.097,373.861,252.197,347.147,197.116,337.612z"
            />
          </g>
        </symbol>

        <symbol id="car">
          <g>
            <path
              d="M15.532,56.706c-3.977,0-7.213-3.242-7.213-7.197c0-3.998,3.236-7.224,7.213-7.224
		c3.987,0,7.226,3.226,7.226,7.224C22.758,53.463,19.519,56.706,15.532,56.706z M15.532,45.604c-2.128,0-3.876,1.75-3.876,3.883
		c0,2.129,1.748,3.879,3.876,3.879c2.141,0,3.886-1.75,3.886-3.879C19.418,47.354,17.673,45.604,15.532,45.604z M64.137,56.706
		c-3.987,0-7.219-3.242-7.219-7.197c0-3.998,3.231-7.224,7.219-7.224c3.977,0,7.208,3.226,7.208,7.224
		C71.345,53.463,68.113,56.706,64.137,56.706z M64.137,45.604c-2.144,0-3.895,1.75-3.895,3.883c0,2.129,1.751,3.879,3.895,3.879
		c2.139,0,3.884-1.75,3.884-3.879C68.021,47.354,66.275,45.604,64.137,45.604z M78.138,44.091c0-7.011-4.365-7.842-4.365-7.842
		c-6.426-0.912-17.496-1.38-17.496-1.38c-1.016-1.766-5.707-12.039-8.44-12.039c-0.911,0-20.508,0-23.975,0
		c-3.472,0-9.167,10.024-10.413,12.285c0,0-4.36,0.758-6.416,1.219c-1.142,0.265-4.301,0.324-4.301,9.155H0v3.997h6.654
		c0-4.908,3.982-8.885,8.878-8.885c4.914,0,8.886,3.977,8.886,8.885h30.827c0-4.908,3.967-8.885,8.892-8.885
		c4.898,0,8.875,3.977,8.875,8.885h6.524v-5.396H78.138z M35.589,34.191H21.751c1.872-5.831,5.339-9.994,6.801-9.994
		c1.841,0,7.037,0,7.037,0V34.191z M38.168,34.191v-9.994c0,0,7.141,0,8.974,0c1.854,0,5.893,8.461,7.032,10.625L38.168,34.191z"
            />
          </g>
        </symbol>
      </svg>

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
          <use xlinkHref="#car"></use>
        </svg>
        <svg className="track__finish">
          <use xlinkHref="#flag"></use>
        </svg>
      </div>
    </>
  );

  function onRemoveClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    props.handleRemoveClick(props.num);
  }

  function onSelectClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    props.handleSelectClick(props.num);
  }

  function onStartClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsStart(!isStart);

    const car = document.getElementById(carId);

    const startUrl = `${API_URL}/engine?id=${props.num}&status=started`;
    axios
      .patch(startUrl)
      .then((response) => {
        const velocity = response.data.velocity;
        const distance = response.data.distance;
        const driveTime = distance / velocity;

        const start = performance.now();
        let left = 0;
        let timerId = requestAnimationFrame(function animateCar() {
        const interval = performance.now() - start;
        (car as HTMLElement).style.left = `${left}%`;
        left += 1420 / driveTime;

        if (interval <= driveTime) {
          timerId = requestAnimationFrame(animateCar);
        }
        });

        const driveUrl = `${API_URL}/engine?id=${props.num}&status=drive`;
        axios
          .patch(driveUrl)
          .catch((error) => {    
            cancelAnimationFrame(timerId);
          });
      });
  }

  function onStopClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsStart(!isStart);

    const car = document.getElementById(carId);

    const startUrl = `${API_URL}/engine?id=${props.num}&status=stopped`;
    axios
      .patch(startUrl)
      .then((response) => {
        (car as HTMLElement).style.left = `initial`;
      });
  }
}

export default Car;
