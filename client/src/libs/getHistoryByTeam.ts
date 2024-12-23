import axios from "axios";

export const getHistoryByTeam = async (token: string, teamID: string) => {
  try {
    const { data } = await axios.post(
      `https://safebite-production.up.railway.app/api/histories/team`,
      {
        team_id: teamID,
      },
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
