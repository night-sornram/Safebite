import axios from "axios";

export const getAllTeams = async (token: string) => {
  try {
    const { data } = await axios.get(
      `https://safebite-production.up.railway.app/api/teams`,
      {
        headers: {
          "Cache-Control": "no-cache",
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
