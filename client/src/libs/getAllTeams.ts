import axios from "axios";

export const getAllTeams = async (token: string) => {
  try {
    const { data } = await axios.get(`http://127.0.0.1:8080/api/teams`, {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
