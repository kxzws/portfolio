import './Garage.scss';
import Form from "./Form";
import { IGarageProps } from "./utils/interfaces";

function Garage(props: IGarageProps) {
  if (!props.isOpen) {
    return <></>;
  }

  return (
    <>
    <Form />
    <div className="garage">
      Garage
    </div>
    </>
  );
}

export default Garage;
