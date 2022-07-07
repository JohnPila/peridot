import { getDoc, getDocs, onSnapshot, query, updateDoc } from "firebase/firestore";
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

export async function savePackage(id, data) {
  try {
    const d = FirebaseConfig.getDocRef(COLLECTIONS.PACKAGES, id);
    const result = await updateDoc(d, {
      ...data,
      ...getAuditFields(false),
    });
    return result;
  } catch(err) {
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

export async function listenAllPackages(callback = () => {}) {
  const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.PACKAGES));
  return onSnapshot(q, 
    (query) => {
      const packages = [];
      query.forEach((d) => {
        packages.push({id: d.id, ...d.data()});
      });
      callback(packages);
    });
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
  savePackage,
  getAllPackages,
  getPackage,
  listenAllPackages,
};
export default defaults;