import axios from "axios";

export const userLogin = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(
      `https://safebite-production.up.railway.app/login`,
      {
        email,
        password,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
