import { ID } from "react-native-appwrite";
import { account } from "./appwrite";

const authService = {
  // Register User
  async register(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (error) {
      return {
        error: error.message || "Registration Failed! Please try again.",
      };
    }
  },
  //Login User
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      return {
        error: error.message || "Login Failed! Please check your credentials.",
      };
    }
  },
  //Get Logged in User
  async getUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  },
  //Logout User
  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      return {
        error: error.message || "Logout Failed! Please try again.",
      };
    }
  },
};

export default authService;
