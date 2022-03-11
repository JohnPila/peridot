import { documentId, getDoc, getDocs, query, where } from "firebase/firestore";
import FirebaseConfig, { COLLECTIONS } from "../config/FirebaseConfig";
import { getAuditFields } from "./BaseService";

export async function getPackageOption(id) {
  try {
    const result = await getDoc(FirebaseConfig.getDocRef(COLLECTIONS.PACKAGE_OPTIONS, id));
    if (!result.exists()) {
      throw new Error("Package option does not exist.");
    }
    return {id: result.id, ...result.data()};
  } catch(err) {
    console.error("Failed to get package option.", err.message);
    throw err;
  }
}

export async function getPackageOptions(id) {
  try {
    const packageRef = FirebaseConfig.getDocRef(COLLECTIONS.PACKAGES, id);
    const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.PACKAGE_OPTIONS), 
      where("package", "==", packageRef), 
      where("isSubOption", "==", false));
    const result = await getDocs(q);
    return result.docs.map(d => ({id: d.id, ...d.data()}));
  } catch(err) {
    console.error("Failed to get package options.", err.message);
    throw err;
  }
}

export async function getPackageSubOptions(id, filterIds = []) {
  try {
    const parentOptionRef = FirebaseConfig.getDocRef(COLLECTIONS.PACKAGE_OPTIONS, id);
    const whereIds = filterIds.length > 0 ? [where(documentId(), "in", filterIds)] : [];
    const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.PACKAGE_OPTIONS), 
      where("parentOption", "==", parentOptionRef),
      where("isSubOption", "==", true),
      ...whereIds);
    const result = await getDocs(q);
    return result.docs.map(d => ({id: d.id, ...d.data()}));
  } catch(err) {
    console.error("Failed to get sub options.", err.message);
    throw err;
  }
}

export function addPackageOptionsUsingBatch(batch, ref, options) {
  for (const option of options) {
    const {subOptions, ...optionData} = option;
    const newRef = FirebaseConfig.createRef(COLLECTIONS.PACKAGE_OPTIONS);
    batch.set(newRef, {
      ...optionData,
      package: ref,
      ...getAuditFields(true),
    });
    if (option.hasSubOptions) { 
      addPackageSubOptionsUsingBatch(batch, newRef, subOptions);
    }
  }
}

export function addPackageSubOptionsUsingBatch(batch, ref, options) {
  for (const option of options) {
    const newRef = FirebaseConfig.createRef(COLLECTIONS.PACKAGE_OPTIONS);
    batch.set(newRef, {
      ...option,
      parentOption: ref,
      ...getAuditFields(true),
    });
  }
}

export async function getSmallestPackageOptionPrice(id) {
  try {
    const packageRef = FirebaseConfig.getDocRef(COLLECTIONS.PACKAGES, id);
    const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.PACKAGE_OPTIONS), 
      where("package", "==", packageRef));
    const result = await getDocs(q);
    return result.docs.reduce((acc, doc) => {
      const price = doc.data().price;
      return !price ? acc : 0 === acc ? price : Math.min(acc, price);
    }, 0);
  } catch(err) {
    console.error("Failed to get smallest package option price.", err.message);
    throw err;
  }
}

const defaults = {
  getPackageOptions,
  addPackageOptionsUsingBatch,
  addPackageSubOptionsUsingBatch,
};
export default defaults; 