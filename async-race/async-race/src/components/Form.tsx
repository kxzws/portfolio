import React, { useState } from "react";
import "./Form.scss";
import { IFormProps } from "./utils/interfaces";

function Form(props: IFormProps) {
  const [newName, setNewName] = useState<string>('');
  const [newColor, setNewColor] = useState<string>('#b4ceff');
  const [updName, setUpdName] = useState<string>('');
  const [updColor, setUpdColor] = useState<string>('#b4ceff');

  return (
    <div className="form">
      <div className="form__row">
        <input
          id="newName"
          type="text"
          className="form__input"
          placeholder="Car model"
          onChange={onChangeInput}
        />
        <input
          id="newColor"
          type="color"
          className="form__input input_color"
          onChange={onChangeInput}
        />
        <button className="form__btn" onClick={onCreateClick}>
          Create
        </button>
      </div>
      <div className="form__row">
        <input
          id="updName"
          type="text"
          className="form__input"
          placeholder="Car model"
          onChange={onChangeInput}
          disabled
        />
        <input
          id="updColor"
          type="color"
          className="form__input input_color"
          onChange={onChangeInput}
          disabled
        />
        <button className="form__btn" disabled>Update</button>
      </div>
      <div className="form__row">
        <button className="form__btn btn_race">Race</button>
        <button className="form__btn btn_race">Reset</button>
        <button className="form__btn">Generate cars</button>
      </div>
    </div>
  );

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const target = e.target.id;
    const value = e.target.value;
    switch (target) {
      case 'newName':
        setNewName(value);
        break;
      case 'newColor':
        setNewColor(value);
        break;
      case 'updName':
        setUpdName(value);
        break;
      case 'updColor':
        setUpdColor(value);
        break;
    }
  }

  function onCreateClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    props.handleCreateClick(newName, newColor);
  }
}

export default Form;
