const Product = require("../models/productModel");
const moment = require("moment");
const initializeDatabase = async (req, res) => {
  try {
    const { data } = await axios.get(process.env.API_URL);
    await Product.insertMany(data);
    res.status(200).send("Database initialized with seed data");
  } catch (error) {
    res.status(500).send("Error initializing database");
  }
};

const getTransactions = async (req, res) => {
    const { month, search = "", page = 1, perPage = 10 } = req.query;
  
    let startDate2021, endDate2021, startDate2022, endDate2022;
    if (month) {
      startDate2021 = new Date(`2021-${month}-01`);
      endDate2021 = new Date(startDate2021);
      endDate2021.setMonth(endDate2021.getMonth() + 1);
  
      startDate2022 = new Date(`2022-${month}-01`);
      endDate2022 = new Date(startDate2022);
      endDate2022.setMonth(endDate2022.getMonth() + 1);
    }
  
    const searchQuery = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };
  
    if (startDate2021 && endDate2021 && startDate2022 && endDate2022) {
      searchQuery.$and = [
        {
          $or: [
            { dateOfSale: { $gte: startDate2021, $lt: endDate2021 } },
            { dateOfSale: { $gte: startDate2022, $lt: endDate2022 } },
          ],
        },
      ];
    }
  
    try {
      const transactions = await Product.find(searchQuery)
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));
  
      res.status(200).json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  };


const getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    // Validate month parameter
    if (!month || !/^\d{2}$/.test(month)) {
      return res.status(400).json({
        error:
          "Invalid month format. Please provide a valid month in MM format.",
      });
    }

    // Define the years to include
    const years = [2021, 2022];

    // Initialize variables to store total statistics
    let totalSaleAmount = 0;
    let totalSoldItems = 0;
    let totalNotSoldItems = 0;

    // Iterate over each year
    for (let year of years) {
      // Parse month into a format that matches the dateOfSale format
      const parsedMonth = moment(`${year}-${month}`, "YYYY-MM").format(
        "YYYY-MM"
      );

      // Calculate start and end dates for the month
      const startDate = new Date(parsedMonth);
      const endDate = new Date(
        moment(parsedMonth, "YYYY-MM").endOf("month").format()
      );

      // Match dates within the parsed month and year
      const yearTotalSaleAmount = await Product.aggregate([
        {
          $match: {
            dateOfSale: {
              $gte: startDate, // Start of the month
              $lte: endDate, // End of the month
            },
            sold: true,
          },
        },
        { $group: { _id: null, totalAmount: { $sum: "$price" } } },
      ]);

      // Add the total sale amount for the current year to the cumulative total
      totalSaleAmount +=
        yearTotalSaleAmount.length > 0 ? yearTotalSaleAmount[0].totalAmount : 0;

      // Count sold and not sold items within the parsed month and year
      const yearTotalSoldItems = await Product.countDocuments({
        dateOfSale: {
          $gte: startDate, // Start of the month
          $lte: endDate, // End of the month
        },
        sold: true,
      });

      const yearTotalNotSoldItems = await Product.countDocuments({
        dateOfSale: {
          $gte: startDate, // Start of the month
          $lte: endDate, // End of the month
        },
        sold: false,
      });

      // Accumulate sold and not sold items for the overall total
      totalSoldItems += yearTotalSoldItems;
      totalNotSoldItems += yearTotalNotSoldItems;
    }

    // Return the combined statistics for both years in the response
    res.status(200).json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    // Log error for debugging
    console.error("Error fetching statistics:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getBarChartData = async (req, res) => {
  const { month } = req.query;

  // Ensure month parameter is provided and valid
  if (!month || !/^\d{2}$/.test(month)) {
    return res
      .status(400)
      .send("Invalid month format. Please provide a valid month in MM format.");
  }

  // Calculate start and end dates for the month
  const startDate = new Date(`2021-${month}-01`);
  const endDate = new Date(`2022-${month}-31`);

  const ranges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  try {
    const barData = await Promise.all(
      ranges.map(async (range) => {
        const count = await Product.countDocuments({
          dateOfSale: { $gte: startDate, $lte: endDate }, // Filter by date range
          price: { $gte: range.min, $lt: range.max },
        });
        return { range: range.range, count };
      })
    );

    // console.log(barData);
    res.status(200).json(barData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error.message);
    res.status(500).send("Error fetching bar chart data");
  }
};

const getPieChartData = async (req, res) => {
  const { month } = req.query;

  // Validate month parameter
  if (!month || !/^\d{2}$/.test(month)) {
    return res.status(400).json({
      error: "Invalid month format. Please provide a valid month in MM format.",
    });
  }

  try {
    // Calculate start and end dates for the month

    const startDate = moment(month, "MM").startOf("month");
    const endDate = moment(month, "MM").endOf("month");

    console.log(startDate);
    // Aggregate data to group by category and count occurrences
    const pieData = await Product.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
          sold: true, // Only consider sold items
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // Format response data with category and count
    const formattedData = pieData.map((entry) => ({
      category: entry._id,
      count: entry.count,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).send("Error fetching pie chart data");
  }
};

const getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      axios.get(`http://localhost:5000/api/transactions?month=${month}`),
      axios.get(`http://localhost:5000/api/statistics?month=${month}`),
      axios.get(`http://localhost:5000/api/bar-chart?month=${month}`),
      axios.get(`http://localhost:5000/api/pie-chart?month=${month}`),
    ]);

    res.status(200).json({
      transactions: transactions.data,
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    });
  } catch (error) {
    res.status(500).send("Error fetching combined data");
  }
};

module.exports = {
  initializeDatabase,
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData,
};
