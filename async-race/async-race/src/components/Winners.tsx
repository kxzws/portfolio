import './Winners.scss';
import { IWinnersProps } from "./utils/interfaces";

function Winners(props: IWinnersProps) {
  if (!props.isOpen) {
    return <></>;
  }

  return (
    <div>There is nothing yet</div>
  );
}

export default Winners;
