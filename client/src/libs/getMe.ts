import axios from "axios";

export const getMe = async (token: string) => {
  try {
    const { data } = await axios.get(
      `https://safebite-production.up.railway.app/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
