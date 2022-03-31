import { getDoc, getDocs, query } from "firebase/firestore";
import FirebaseConfig, { COLLECTIONS } from "../config/FirebaseConfig";
import { getAuditFields } from "./BaseService";
import { addPackageOptionsUsingBatch } from "./PackageOptionService";

export async function addPackage(data) {
  try {
    return await FirebaseConfig.writeTransaction((batch) => {
      const {options, ...packageData} = data; 
      const newRef = FirebaseConfig.createRef(COLLECTIONS.PACKAGES);
      batch.set(newRef, {
        ...packageData,
        ...getAuditFields(true),
      });
      addPackageOptionsUsingBatch(batch, newRef, options);
      return newRef;
    });
  } catch (err) {
    console.error("Failed to save package.", err.message);
    throw err;
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

export async function getPackage(refOrId) {
  try {
    const result = await getDoc("document" === refOrId?.type ? refOrId : 
      FirebaseConfig.getDocRef(COLLECTIONS.PACKAGES, refOrId));
    if (!result.exists()) {
      throw new Error("Package does not exist.");
    }
    return {id: result.id, ...result.data()};
  } catch(err) {
    console.error("Failed to get package details.", err.message);
    throw err;
  }
}

const defaults = {
  addPackage,
  getAllPackages,
  getPackage,
};
export default defaults;