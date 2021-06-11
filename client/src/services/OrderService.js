import configData from "../config.json";
const axios = require("axios");

export const GetAllOrders = async () => {
  try {
    const response = await axios.get(
      `${configData.SERVER_URL}/orders/getallOrders`
    );

    let sum_of_freight = response.data.reduce(
      (n, { freight }) => n + freight,
      0
    );

    return {
      data: response.data,
      totalOrders: response.data.length,
      totalShip: sum_of_freight,
      avgShip: sum_of_freight / response.data.length,
    };
  } catch (error) {
    console.log(`error: ${error}`);
  }
};
