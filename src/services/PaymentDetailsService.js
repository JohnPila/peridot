import { getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import FirebaseConfig, { COLLECTIONS } from "../config/FirebaseConfig";
import { getAuditFields } from "./BaseService";
import { getGcashPaymentLink } from "./PaymentService";

export async function getPaymentDetailsByBooking(refOrId) {
  try {
    const bookingRef = "document" === refOrId?.type ? refOrId : 
      FirebaseConfig.getDocRef(COLLECTIONS.BOOKINGS, refOrId);
    const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.PAYMENT_DETAILS), 
      where("booking", "==", bookingRef),
      orderBy("createdDate", "desc"),
      limit(1));
    const result = await getDocs(q);
    if (result.empty) {
      throw new Error("Payment details not found.");
    }
    return result.docs.map(d => ({id: d.id, ...d.data()}))[0];
  } catch(err) {
    console.error("Failed to get payment details by booking.", err.message);
    throw err;
  }
}

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
  getPaymentDetailsByBooking,
};
export default defaults;