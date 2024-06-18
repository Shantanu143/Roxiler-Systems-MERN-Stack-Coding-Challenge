import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/ApiConfig";

// eslint-disable-next-line react/prop-types
const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/api/statistics`, {
      params: { month },
    });
    setStatistics(data);
  };
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[monthNumber - 1];
  };

  return (
    <div className="my-10">
      <h1 className="text-3xl py-2 font-bold">
        Statistics - {getMonthName(month)}{" "}
      </h1>
      <div className="p-10 rounded-lg lg:w-[30rem] w-[15rem] md:w-[10rem] bg-yellow-300 grid grid-cols-2 gap-4">
        <span>Total Sale Amount </span>
        <span>{statistics.totalSaleAmount}</span>
        <span>Total Sold Items </span>
        <span>{statistics.totalSoldItems}</span>
        <span>Total Not Sold Items </span>{" "}
        <span>{statistics.totalNotSoldItems}</span>
      </div>
    </div>
  );
};

export default Statistics;
