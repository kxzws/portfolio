import "./Nav.scss";
import { INavProps } from "./utils/interfaces";

function Nav(props: INavProps) {
  return (
    <div className="nav">
      <button 
        id="garage"
        className="nav__btn" 
        onClick={props.onClick}
      >
        To garage
      </button>
      <button 
        id="winners"
        className="nav__btn" 
        onClick={props.onClick}
      >
        To winners
      </button>
    </div>
  );
}

export default Nav;
