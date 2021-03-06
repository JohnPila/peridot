import { updateDoc, getDocs, query, where, getDoc, onSnapshot } from "firebase/firestore";
import FirebaseConfig, { COLLECTIONS } from "../config/FirebaseConfig";
import { BOOKING_STATUS } from "../utils/constants";
import { getAuditFields, getCurrentUserId } from "./BaseService";

function getDateByBookingStatus(status) {
  let dateKey;
  switch (status) {
    case BOOKING_STATUS.CANCELLED:
      dateKey = "cancelledDate";
      break;
    case BOOKING_STATUS.DECLINED:
      dateKey = "declinedDate";
      break;
    case BOOKING_STATUS.PAID:
      dateKey = "paidDate";
      break;
    default:
      return null;
  }
  return {
    [dateKey]: new Date(),
  };
}

export async function getAllBookings() {
  try {
    const q = FirebaseConfig.getCollectionRef(COLLECTIONS.BOOKINGS);
    const result = await getDocs(q);
    return result.docs.map(d => ({id: d.id, ...d.data()}));
  } catch(err) {
    console.error("Failed to get bookings.", err.message);
    throw err;
  }
}

export async function getAllBookingsByCurrentUser() {
  try {
    const userId = getCurrentUserId();
    const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.BOOKINGS), 
      where("createdBy", "==", userId));
    const result = await getDocs(q);
    return result.docs.map(d => ({id: d.id, ...d.data()}));
  } catch(err) {
    console.error("Failed to get bookings.", err.message);
    throw err;
  }
}

export async function getBooking(refOrId) {
  try {
    const result = await getDoc("document" === refOrId?.type ? refOrId : 
      FirebaseConfig.getDocRef(COLLECTIONS.BOOKINGS, refOrId));
    if (!result.exists()) {
      throw new Error("Booking does not exist.");
    }
    return {id: result.id, ...result.data()};
  } catch(err) {
    console.error("Failed to get booking details.", err.message);
    throw err;
  }
}

export async function getAllBookingsByPackageAndDateRange(packageId, dateFrom, dateTo) {
  console.log(dateFrom, dateTo)
  try {
    const packageRef = FirebaseConfig.getDocRef(COLLECTIONS.PACKAGES, packageId);
    const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.BOOKINGS), 
      where("package", "==", packageRef),
      where("date", ">=", dateFrom),
      where("date", "<=", dateTo));
    const result = await getDocs(q);
    return result.docs.map(d => ({id: d.id, ...d.data()}));
  } catch(err) {
    console.error("Failed to get bookings by package and date range.", err.message);
    throw err;
  }
}

export async function addBooking(packageId, data, callback = async () => {}) {
  try {
    return await FirebaseConfig.writeTransaction(async (batch) => {
      const newRef = FirebaseConfig.createRef(COLLECTIONS.BOOKINGS);
      batch.set(newRef, {
        package: FirebaseConfig.getDocRef(COLLECTIONS.PACKAGES, packageId),
        ...data,
        ...getAuditFields(true),
      });
      const otherData = await callback(batch, newRef);
      return {
        booking: newRef, 
        ...otherData,
      };
    });
  } catch (err) {
    console.error("Failed to add booking.", err.message);
    throw err;
  }
}

export async function saveBooking(id, data) {
  try {
    const d = FirebaseConfig.getDocRef(COLLECTIONS.BOOKINGS, id);
    const result = await updateDoc(d, {
      ...data,
      ...(data.status && getDateByBookingStatus(data.status)),
      ...getAuditFields(false),
    });
    return result;
  } catch(err) {
    console.error("Failed to save booking.", err.message);
    throw err;
  }
}

export function listenForBookingChanges(id, callback = () => {}) {
  return onSnapshot(FirebaseConfig.getDocRef(COLLECTIONS.BOOKINGS, id), 
    (doc) => {
      callback({
        id: doc.id,
        ...doc.data(),
      });
    });
}

const defaults = {
  addBooking,
  saveBooking,
  getAllBookings,
  getAllBookingsByCurrentUser,
  getAllBookingsByPackageAndDateRange,
  getBooking,
  listenForBookingChanges,
};
export default defaults;