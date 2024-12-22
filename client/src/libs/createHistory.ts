import axios from "axios";

export const createHistory = async (token: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/histories`,
      {
        picture: "example.jpg",
        food_name: "Pizza",
        food_ingredients: "Cheese, Tomato, Dough",
        alert_message: "Contains dairy",
        is_eatable: true,
      },
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
