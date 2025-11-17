import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const streamClient = StreamChat.getInstance(
  ENV.STREAM_API_KEY as string,
  ENV.STREAM_SECRET_KEY
);

export const upsertStreamUser = async (userData: {
  id: string;
  name: string;
  image: string;
}) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("Stream user upserted successfully:", userData.name);
  } catch (error) {
    console.log("Error upserting user", error);
  }
};

export const deleteStreamUser = async (id: string) => {
  try {
    await streamClient.deleteUser(id);
    console.log("Stream user deleted successfully", id);
  } catch (error) {
    console.log("Error deleting user from stream", error);
  }
};

export const generateToken = async (userId: string) => {
  try {
    const id = userId.toString();
    return streamClient.createToken(id);
  } catch (error) {
    console.log("Error generating token", error);
    return null;
  }
};
