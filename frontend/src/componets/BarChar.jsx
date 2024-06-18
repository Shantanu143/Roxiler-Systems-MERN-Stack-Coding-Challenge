import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import axios from 'axios';
const BarChar = ({ month }) => {
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
        `http://localhost:5000/api/bar-chart?month=${selectedMonth}`
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
    chart: {
      title: "Sales by Price Range",
      subtitle: "Based on sales count",
    },
  };

  return (
    <div>
      <h2>Sales by Price Range for {month}</h2>
      {loading ? (
        <div>Loading Chart...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="Bar"
          data={[
            ["Range", "Count"],
            ...chartData.map((item) => [item.range, item.count]),
          ]}
          options={options}
          loader={<div>Loading Chart...</div>} // Optional: Loader component if chart is still loading
        />
      )}
    </div>
  );
};

export default BarChar;
