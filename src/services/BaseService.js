import { serverTimestamp } from "firebase/firestore";
import store from "../store";

export function getCurrentUserId() {
  return store.getState().loggedUser.user?.uid;
}

export function getAuditFields(isCreated) {
  const userId = getCurrentUserId();
  return {
    [isCreated ? "createdDate" : "modifiedDate"]: serverTimestamp(),
    [isCreated ? "createdBy" : "modifiedBy"]: userId,
  };
}

const defaults = {
  getCurrentUserId,
  getAuditFields,
};
export default defaults;