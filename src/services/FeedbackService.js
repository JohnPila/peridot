import { getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import FirebaseConfig, { COLLECTIONS } from "../config/FirebaseConfig";
import { getAuditFields } from "./BaseService";

export async function addFeedback(data) {
    try {
      return await FirebaseConfig.writeTransaction((batch) => {
        const {feedback} = data; 
        const newRef = FirebaseConfig.createRef(COLLECTIONS.FEEDBACK);
        batch.set(newRef, {
          feedback,
          ...getAuditFields(true),
        });
        //addPackageOptionsUsingBatch(batch, newRef, options);
        return newRef;
      });
    } catch (err) {
      console.error("Failed to save feedback.", err.feedback);
      throw err;
    }
  }
  const defaults = {
    addFeedback
  };
  export default defaults;