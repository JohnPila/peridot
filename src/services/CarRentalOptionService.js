import { getDocs, query, where } from "firebase/firestore";
import FirebaseConfig, { COLLECTIONS } from "../config/FirebaseConfig";
import { getAuditFields } from "./BaseService";

export function addRateOptionsUsingBatch(batch, ref, options) {
  for (const option of options) {
    const newRef = FirebaseConfig.createRef(COLLECTIONS.CAR_RENTAL_OPTIONS);
    batch.set(newRef, {
      ...option,
      car: ref,
      ...getAuditFields(true),
    });
  }
}

export async function getRateOptions(id) {
  try {
    const carRef = FirebaseConfig.getDocRef(COLLECTIONS.CAR_RENTALS, id);
    const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.CAR_RENTAL_OPTIONS), 
      where("car", "==", carRef));
    const result = await getDocs(q);
    return result.docs.map(d => ({id: d.id, ...d.data()}));
  } catch(err) {
    console.error("Failed to get car rate options.", err.message);
    throw err;
  }
}

export async function getSmallestCarOptionRate(id) {
  try {
    const carRef = FirebaseConfig.getDocRef(COLLECTIONS.CAR_RENTALS, id);
    const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.CAR_RENTAL_OPTIONS), 
      where("car", "==", carRef));
    const result = await getDocs(q);
    return result.docs.reduce((acc, doc) => {
      const rate = doc.data().rate;
      return !rate ? acc : 0 === acc ? rate : Math.min(acc, rate);
    }, 0);
  } catch(err) {
    console.error("Failed to get smallest car option rate.", err.message);
    throw err;
  }
}

const defaults = {
  addRateOptionsUsingBatch,
  getRateOptions,
  getSmallestCarOptionRate,
};
export default defaults;