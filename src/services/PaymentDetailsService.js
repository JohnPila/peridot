import { onSnapshot } from "firebase/firestore";
import FirebaseConfig, { COLLECTIONS } from "../config/FirebaseConfig";
import { getAuditFields } from "./BaseService";
import { getGcashPaymentLink } from "./PaymentService";

export function waitForPaymentTransaction(id, callback = () => {}) {
  return onSnapshot(FirebaseConfig.getDocRef(COLLECTIONS.PAYMENT_DETAILS, id), 
    (doc) => {
      callback(doc.data());
    });
}

export async function addPaymentDetailsForGCashUsingBatch(batch, ref, method, amount, addData) {
  const newRef = FirebaseConfig.createRef(COLLECTIONS.PAYMENT_DETAILS);
  const request = await getGcashPaymentLink(newRef.id, amount, addData);
  batch.set(newRef, {
    booking: ref,
    request,
    method,
    ...getAuditFields(true),
  });
  return {paymentDetails: newRef, otherData: request};
}

const defaults = {
  waitForPaymentTransaction,
  addPaymentDetailsForGCashUsingBatch,
};
export default defaults;