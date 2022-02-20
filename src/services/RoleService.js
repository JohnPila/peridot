import { addDoc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import FirebaseConfig, { COLLECTIONS } from "../config/FirebaseConfig";

class RolesService {

  async createUserRole(roleId, userId) {
    try {
      const q = FirebaseConfig.getCollectionRef(COLLECTIONS.USER_ROLES);
      const result = await addDoc(q, {
        "role": FirebaseConfig.getDocRef(COLLECTIONS.ROLES, roleId),
        "user_id": userId,
      });
      return result;
    } catch(err) {
      console.error("Failed to create a role for user.", err.message);
      throw err;
    }
  }

  async getRoleById(roleId) {
    try {
      const q = FirebaseConfig.getDocRef(COLLECTIONS.ROLES, roleId);
      const result = await getDoc(q);
      if (!result.exists()) {
        throw new Error("Role not found.");
      }
      return result.data();
    } catch(err) {
      console.error("Failed to get role.", err.message);
      throw err;
    }
  }

  async getRoleByUserId(userId) {
    try {
      const q = query(FirebaseConfig.getCollectionRef(COLLECTIONS.USER_ROLES), 
        where("user_id", "==", userId), limit(1));
      const result = await getDocs(q);
      if (result.empty) {
        throw new Error("User role not found.");
      }
      return await this.getRoleById(result.docs.at(0).data().role.id);
    } catch(err) {
      console.error("Failed to get user role.", err.message);
      throw err;
    }
  }
}

export default new RolesService();