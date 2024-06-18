import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import axios from "axios";
import { API_BASE_URL } from "../../config/ApiConfig";

import PropTypes from "prop-types";

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChartData(month);
  }, [month]);

  const fetchChartData = async (selectedMonth) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/bar-chart?month=${selectedMonth}`
      );

      setChartData(response.data);
      setError(null); // Reset error state on successful fetch
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setError("Error fetching chart data. Please try again later."); // Set error message
    } finally {
      setLoading(false); // Always set loading state to false, regardless of success or failure
    }
  };

  const options = {
    legend: "none",
    chart: {
      title: "Sales by Price Range",
      subtitle: "Based on sales count",
    },

    options: {
      backgroundColor: "#c93535",
    },
    series: {
      0: { color: "#72F2F2" },
    },
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
    <div className="my-10 ">
      <h1 className="text-3xl py-2 font-bold ">
        Bar Chart State - {getMonthName(month)}
      </h1>
      {loading ? (
        <div>Loading Chart...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Chart
          className="flex items-center justify-center p-10"
          width={"100%"}
          height={"400px"}
          chartType="Bar"
          data={[
            ["Range", "Count"],
            ...chartData.map((item) => [item.range, item.count]),
          ]}
          options={options}
          loader={<div>Loading Chart...</div>}
        />
      )}
    </div>
  );
};

// Add prop validation
BarChart.propTypes = {
  month: PropTypes.string.isRequired,
};
export default BarChart;
