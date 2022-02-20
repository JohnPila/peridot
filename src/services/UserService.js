import { updateProfile } from "firebase/auth";
import FirebaseConfig from "../config/FirebaseConfig";

class UserService {

  async updateUser(data) {
    try {
      await updateProfile(FirebaseConfig.auth.currentUser, data);
    } catch(err) {
      console.error("Failed to update user.", err.message);
      throw err;
    }
  }
}

export default new UserService();