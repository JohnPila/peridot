import { updateDoc } from "firebase/firestore";
import FirebaseConfig, { COLLECTIONS } from "../config/FirebaseConfig";
import { getAuditFields } from "./BaseService";

export async function addBooking(data, callback = async () => {}) {
  try {
    return await FirebaseConfig.writeTransaction(async (batch) => {
      const newRef = FirebaseConfig.createRef(COLLECTIONS.BOOKINGS);
      batch.set(newRef, {
        ...data,
        ...getAuditFields(true),
      });
      const otherData = await callback(batch, newRef);
      return {
        booking: newRef, 
        ...otherData,
      };
    });
  } catch (err) {
    console.error("Failed to add booking.", err.message);
    throw err;
  }
}

export async function saveBooking(id, data) {
  try {
    const d = FirebaseConfig.getDocRef(COLLECTIONS.BOOKINGS, id);
    const result = await updateDoc(d, {
      ...data,
      ...getAuditFields(false),
    });
    return result;
  } catch(err) {
    console.error("Failed to save booking.", err.message);
    throw err;
  }
}

const defaults = {
  addBooking,
  saveBooking,
};
export default defaults;