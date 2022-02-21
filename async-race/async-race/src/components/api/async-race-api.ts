import axios from "axios";
import { API_URL, START_POINT, END_POINT } from "../utils/constants";

export const getCars = async () => {
  const url = `${API_URL}/garage`;
  const response = await axios.get(url);

  return response.data;
}

export const createCar = async (name: string, color: string) => {
  const url = `${API_URL}/garage`;
  const response = await axios.post(url, {
        name: name,
        color: color,
      });

  return response.data;
}

export const deleteCar = async (id: number) => {
  const url = `${API_URL}/garage/${id}`;
  await axios.delete(url);
}

export const updateCar = async (newName: string, newColor: string, updCarId: number | undefined) => {
  const url = `${API_URL}/garage/${updCarId}`;
  const response = await axios.put(url, {
        name: newName,
        color: newColor,
      })
  
  return response.data;
}

export const startEngine = async (id: number, car: HTMLElement) => {
  const startUrl = `${API_URL}/engine?id=${id}&status=started`;
  await axios
    .patch(startUrl)
    .then((response) => {
      const velocity = response.data.velocity;
      const distance = response.data.distance;
      const driveTime = distance / velocity;

      const start = performance.now();
      let left = START_POINT;
      let timerId = requestAnimationFrame(function animateCar() {
      const interval = performance.now() - start;
      (car as HTMLElement).style.left = `${left}%`;
      left += END_POINT / driveTime;

      if (interval <= driveTime) {
        timerId = requestAnimationFrame(animateCar);
      }
      });

      // switchToDriveMode(id, timerId);
      const driveUrl = `${API_URL}/engine?id=${id}&status=drive`;
      axios
        .patch(driveUrl)
        .catch((error) => {    
          cancelAnimationFrame(timerId);
        });
    });
}

// export const switchToDriveMode = async (id: number, timerId: number) => {
//   const driveUrl = `${API_URL}/engine?id=${id}&status=drive`;
//   await axios
//     .patch(driveUrl)
//     .catch((error) => {    
//       cancelAnimationFrame(timerId);
//     });
// }

export const stopEngine = async (id: number, car: HTMLElement) => {
  const stopUrl = `${API_URL}/engine?id=${id}&status=stopped`;
  await axios
    .patch(stopUrl)
    .then((response) => {
      (car as HTMLElement).style.left = `initial`;
    });
  
}
