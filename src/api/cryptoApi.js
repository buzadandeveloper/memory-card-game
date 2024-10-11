import axios from "axios";

const BASE_URL = `https://api.coingecko.com/api/v3/coins/markets`;

export const fetchCryptoData = async (group) => {
  const queryParams = `?vs_currency=usd&order=market_cap_desc&per_page=${group}&page=1&sparkline=false`;
  const url = BASE_URL + queryParams;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; 
  }
};
