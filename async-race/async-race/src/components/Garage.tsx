import { useEffect, useState } from "react";
import axios from "axios";
import "./Garage.scss";
import Form from "./Form";
import Car from "./Car";
import { IGarageProps, car } from "./utils/interfaces";
import { API_URL } from "./utils/constants";

function Garage(props: IGarageProps) {
  const [carsState, setCarsState] = useState<car[]>();
  const [carsAmount, setCarsAmount] = useState<number>();
  const [updCarId, setUpdCarId] = useState<number>();
  const [isUpdateDisable, setIsUpdateDisable] = useState<boolean>(true);

  useEffect(() => {
    const url = `${API_URL}/garage`;
    axios.get(url).then((response) => {
      const allCars = response.data;
      setCarsState(allCars);
      setCarsAmount(allCars.length);
    });
  }, [setCarsState]);

  const pageNum = 1;

  if (!props.isOpen) {
    return <></>;
  }

  return (
    <>
      <Form handleCreateClick={handleCreateClick} handleUpdateClick={handleUpdateClick} isUpdateDisable={isUpdateDisable} />
      <div className="garage">
        <h2 className="garage__title">Garage ({carsAmount})</h2>
        <h3 className="garage__subtitle">Page #{pageNum}</h3>

        {carsState?.map((item: car) => (
          <Car 
            key={item.id} 
            num={item.id} 
            name={item.name} 
            color={item.color} 
            handleRemoveClick={handleRemoveClick} 
            handleSelectClick={handleSelectClick} 
          />
        ))}

        <button className="garage__btn" disabled>
          Next
        </button>
        <button className="garage__btn" disabled>
          Prev
        </button>
      </div>
    </>
  );

  function handleCreateClick(name: string, color: string) {
    const url = `${API_URL}/garage`;
    axios
      .post(url, {
        name: name,
        color: color,
      })
      .then((response) => {
        const allCars = carsState;
        allCars?.push(response.data);
        setCarsState(allCars);
        setCarsAmount(allCars?.length);
      });
  }

  function handleRemoveClick(id: number) {
    const url = `${API_URL}/garage/${id}`;
    axios.delete(url).then((response) => {
      let allCars = carsState;
      allCars = allCars?.filter((item) => item.id !== id);
      setCarsState(allCars);
      setCarsAmount(allCars?.length);
    });
  }

  function handleSelectClick(id: number) {
    setUpdCarId(id);
    setIsUpdateDisable(!isUpdateDisable);
  }

  function handleUpdateClick(newName: string, newColor: string) {
    const url = `${API_URL}/garage/${updCarId}`;
    axios
      .put(url, {
        name: newName,
        color: newColor,
      })
      .then((response) => {
        const allCars = carsState;
        allCars?.forEach((item) => {
          if (item.id === updCarId) {
            item.color = response.data.color;
            item.name = response.data.name;
          }
        });
        setCarsState(allCars);
        setIsUpdateDisable(!isUpdateDisable);
      });
  }
}

export default Garage;
