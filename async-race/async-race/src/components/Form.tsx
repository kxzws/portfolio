import "./Form.scss";

function Form() {
  return (
    <div className="form">
      <div className="form__row">
        <input type="text" className="form__input" placeholder="Car model" />
        <input type="color" className="form__input input_color" />
        <button className="form__btn">Create</button>
      </div>
      <div className="form__row">
        <input type="text" className="form__input" placeholder="Car model" />
        <input type="color" className="form__input input_color" />
        <button className="form__btn">Update</button>
      </div>
      <div className="form__row">
        <button className="form__btn btn_race">Race</button>
        <button className="form__btn btn_race">Reset</button>
        <button className="form__btn">Generate cars</button>
      </div>
    </div>
  );
}

export default Form;
