import axios from "axios";

const API_URL = "/api/v1/login";

export const login = async (username: string, password: string) => {
  const response = await axios.post(API_URL, { username, password });
  console.log("Login response:", response.data);
  return response.data;
};