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

  export async function getAllFeedback() {
    try {
        const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.FEEDBACK));
        const result = await getDocs(q);
        return result.docs.map(d => ({id: d.id, ...d.data()}));
      } catch(err) {
        console.error("Failed to all cars.", err.message);
        throw err;
      }
  }
  export async function listenAllFeedback(callback = () => {}) {
    const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.FEEDBACK));
    return onSnapshot(q, 
      (query) => {
        const feedback = [];
        query.forEach((d) => {
          feedback.push({id: d.id, ...d.data()});
        });
        callback(feedback);
      });
  }

  const defaults = {
    addFeedback,
    getAllFeedback,
    listenAllFeedback
  };

  
  export default defaults;