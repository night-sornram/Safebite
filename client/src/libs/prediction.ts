import axios from "axios";

export const prediction = async (
  userId: string,
  image: string,
  allergy: string[]
) => {
  try {
    const { data } = await axios.post(
      "https://atonality123-food-classifier.hf.space/predict/",
      {
        userId,
        image,
        allergy,
      }
    );
    return data;
  } catch (error) {
    throw error;
    return null;
  }
};
