import { addDoc, getDocs, query } from "firebase/firestore";
import FirebaseConfig, { COLLECTIONS } from "../config/FirebaseConfig";
import { getAuditFields } from "./BaseService";

export async function addPackage(data) {
  try {
    const q = FirebaseConfig.getCollectionRef(COLLECTIONS.PACKAGES);
    return await addDoc(q, {
      "name": data.name,
      "description": data.description,
      "city": data.city,
      "barangay": data.barangay,
      "options": data.options,
      ...getAuditFields(true),
    });
  } catch (error) {
    console.error("Failed to save package.", error);
    throw error;
  }
}

export async function getAllPackages() {
  try {
    const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.PACKAGES));
    const result = await getDocs(q);
    return result.docs.map(d => ({id: d.id, ...d.data()}));
  } catch(err) {
    console.error("Failed to all packages.", err.message);
    throw err;
  }
}

const defaults = {
  addPackage,
  getAllPackages,
};
export default defaults;