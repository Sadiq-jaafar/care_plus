"use server"
import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { log } from "console";
import { parseStringify } from "../utils";

export const createUser = async (user: {
  name: string;
  email: string;
  phone: string;
}) => {
  try {
    // Check if a user with the same email already exists
    const existingUsers = await users.list([Query.equal("email", [user.email])]);

    if (existingUsers.users.length > 0) {
      console.log("User already exists:", existingUsers.users[0]); // Debugging
      return existingUsers.users[0]; // Return the existing user
    }

    // If no existing user is found, create a new user
    const newUser = await users.create(
      ID.unique(), // Unique ID for the user
      user.email,  // User email
      user.phone,  // User phone number
      undefined,   // Password (undefined for no password)
      user.name    // User name
    );

    console.log("New user created:", newUser); // Debugging
    return newUser; // Return the created user object
  } catch (error: any) {
    console.error("Error creating user:", error); // Debugging
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const getUser =async (userId:string) =>{
  try {
    const user =await users.get(userId)

    return parseStringify(user)
    
  } catch (error) {
    console.log(error)
    
  }
}