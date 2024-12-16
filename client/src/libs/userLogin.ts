import axios from "axios";

export const userLogin = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(`${process.env.BACKEND_URL}/login`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
