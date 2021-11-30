import axios from "axios";
import moment from "moment";

const formatSparkline = (numbers: []) => {
  const sevenDaysAgo = moment().subtract(7, 'days').unix();
  return numbers.map((item, index) => {
    return {
      x: sevenDaysAgo + (index + 1) * 3600,
      y: item,
    }
  });
}

const formatMarketData = (data: any) => {
  let formattedData: any[] = [];

  data.forEach((item: any) => {
    const formattedSparkline = formatSparkline(item.sparkline_in_7d.price);

    const formattedItem = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkline
      }
    }

    formattedData.push(formattedItem);
  });

  return formattedData
}

export const getMarketdata = async () => {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d'
  try {
    // This is where the API call will go
    const response = await axios.get(url);
    const data = response.data;

    return formatMarketData(data);

  } catch (e) {
    console.error(e);
  }
}