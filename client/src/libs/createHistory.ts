import axios from "axios";

export const createHistory = async (
  token: string,
  picture: string,
  food_name: string,
  food_ingredients: string,
  alert_message: string,
  is_eatable: boolean
) => {
  try {
    const { data } = await axios.post(
      `http://127.0.0.1:8080/api/histories`,
      {
        picture,
        food_name,
        food_ingredients,
        alert_message,
        is_eatable,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
    return null;
  }
};
