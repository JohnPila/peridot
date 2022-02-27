import { serverTimestamp } from "firebase/firestore";
import store from "../store";

export function getAuditFields(isCreated) {
  const userId = store.getState().loggedUser.user?.uid;
  return {
    [isCreated ? "createdDate" : "modifiedDate"]: serverTimestamp(),
    [isCreated ? "createdBy" : "modifiedBy"]: userId,
  };
}

const defaults = {
  getAuditFields,
};
export default defaults;