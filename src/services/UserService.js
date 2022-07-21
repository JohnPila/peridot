
import { updateProfile } from "firebase/auth";
import { getDoc, increment, updateDoc } from "firebase/firestore";
import FirebaseConfig, { COLLECTIONS, USER_COUNT_ID } from "../config/FirebaseConfig";

class UserService {

  async updateUser(data) {
    try {
      await updateProfile(FirebaseConfig.auth.currentUser, data);
    } catch(err) {
      console.error("Failed to update user.", err.message);
      throw err;
    }
  }

  async getUserCount() {
    try {
      const d = FirebaseConfig.getDocRef(COLLECTIONS.USER_COUNT, USER_COUNT_ID);
      const result = await getDoc(d);
      return result.data().count;
    } catch(err) {
      console.error("Failed to get user count.", err.message);
      throw err;
    }
  }

  async addUserCount() {
    try {
      const d = FirebaseConfig.getDocRef(COLLECTIONS.USER_COUNT, USER_COUNT_ID);
      const result = await updateDoc(d, {
        count: increment(1),
      });
      return result;
    } catch(err) {
      console.error("Failed to add user count.", err.message);
      throw err;
    }
  }
}

export default new UserService();