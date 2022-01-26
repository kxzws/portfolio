import './Car.scss';
import { ICarProps } from "./utils/interfaces";

function Car(props: ICarProps) {
  return (
    <div className="car">
      {props.name} - {props.color}
    </div>
  );
}

export default Car;
