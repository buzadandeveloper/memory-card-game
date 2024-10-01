import axios from "axios";

const BASE_URL = "https://narutodb.xyz/api/character?page=1&limit=20";

export const fetchNarutoData = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
