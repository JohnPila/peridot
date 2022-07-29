import { getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import FirebaseConfig, { COLLECTIONS } from "../config/FirebaseConfig";
import { getAuditFields } from "./BaseService";
import { addRateOptionsUsingBatch } from "./CarRentalOptionService";

export async function addCar(data) {
  try {
    return await FirebaseConfig.writeTransaction((batch) => {
      const {options, ...carData} = data; 
      const newRef = FirebaseConfig.createRef(COLLECTIONS.CAR_RENTALS);
      batch.set(newRef, {
        ...carData,
        isDeleted: false,
        isAvailable: true,
        ...getAuditFields(true),
      });
      addRateOptionsUsingBatch(batch, newRef, options);
      return newRef;
    });
  } catch (err) {
    console.error("Failed to save car.", err.message);
    throw err;
  }
}

export async function saveCar(id, data) {
  try {
    const {options, ...carData} = data; 
    const d = FirebaseConfig.getDocRef(COLLECTIONS.CAR_RENTALS, id);
    const result = await updateDoc(d, {
      ...carData,
      ...getAuditFields(false),
    });
    // TODO: save package options
    return result;
  } catch(err) {
    console.error("Failed to save car.", err.message);
    throw err;
  }
}

export async function getCar(refOrId) {
  try {
    const result = await getDoc("document" === refOrId?.type ? refOrId : 
      FirebaseConfig.getDocRef(COLLECTIONS.CAR_RENTALS, refOrId));
    if (!result.exists()) {
      throw new Error("Car does not exist.");
    }
    return {id: result.id, ...result.data()};
  } catch(err) {
    console.error("Failed to get car details.", err.message);
    throw err;
  }
}

export async function getAllCars() {
  try {
    const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.CAR_RENTALS));
    const result = await getDocs(q);
    return result.docs.map(d => ({id: d.id, ...d.data()}));
  } catch(err) {
    console.error("Failed to all cars.", err.message);
    throw err;
  }
}

export async function listenAllCars(includeDeleted = false, callback = () => {}) {
  const q = includeDeleted ? query(FirebaseConfig.getCollectionRef(COLLECTIONS.CAR_RENTALS)) : 
    query(FirebaseConfig.getCollectionRef(COLLECTIONS.CAR_RENTALS), 
      where("isDeleted", "!=", true), 
      where("isAvailable", "==", true));
  return onSnapshot(q, 
    (query) => {
      const cars = [];
      query.forEach((d) => {
        cars.push({id: d.id, ...d.data()});
      });
      callback(cars);
    });
}

const defaults = {
  addCar,
  getCar,
  saveCar,
  getAllCars,
  listenAllCars,
};
export default defaults;