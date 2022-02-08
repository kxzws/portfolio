import { useEffect, useState } from "react";
import "./Garage.scss";
import Form from "./Form";
import Car from "./Car";
import { IGarageProps, car } from "./utils/interfaces";
import { getCars, createCar, deleteCar, updateCar } from "./api/async-race-api";

function Garage(props: IGarageProps) {
  const [carsState, setCarsState] = useState<car[]>();
  const [updCarId, setUpdCarId] = useState<number>();
  const [isUpdateDisable, setIsUpdateDisable] = useState<boolean>(true);

  useEffect(() => {
    handleGetCarsRequest();
  }, []);

  const handleGetCarsRequest = async () => {
    const allCars = await getCars();
    setCarsState(allCars);
  }

  if (!props.isOpen) {
    return <></>;
  }

  const handleCreateClick = async (name: string, color: string) => {
    let allCars = carsState;
    const newCar = await createCar(name, color);
    allCars?.push(newCar);
    // allCars = [...allCars, newCar];
    // allCars?.splice(allCars.length, 0, newCar);
    setCarsState(allCars);
  }

  const handleRemoveClick = (id: number) => {
    deleteCar(id);
    let allCars = carsState;
    allCars = allCars?.filter((item) => item.id !== id);
    setCarsState(allCars);
  }

  const handleSelectClick = (id: number) => {
    setUpdCarId(id);
    setIsUpdateDisable(!isUpdateDisable);
  }

  const handleUpdateClick = async (newName: string, newColor: string) => {
    const allCars = carsState;
    const updCar = await updateCar(newName, newColor, updCarId);
    for (const item of allCars as car[]) {
      if (item.id === updCarId) {
        item.color = updCar.color;
        item.name = updCar.name;
      }
    }
    setCarsState(allCars);
    setIsUpdateDisable(!isUpdateDisable); 
  }

  return (
    <>
      <Form handleCreateClick={handleCreateClick} handleUpdateClick={handleUpdateClick} isUpdateDisable={isUpdateDisable} />
      <div className="garage">
        <h2 className="garage__title">Garage ({carsState?.length})</h2>
        <h3 className="garage__subtitle">Page #1</h3>

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
}

export default Garage;
