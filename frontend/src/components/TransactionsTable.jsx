import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { API_BASE_URL } from "../config/ApiConfig";
// TransactionsTable component
const TransactionsTable = ({ month, search }) => {
  // State hooks for managing transactions data and pagination
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch transactions when month, search, or page changes
  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  // Function to fetch transactions from the server
  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/transactions`, {
        params: { month, search, page },
      });
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="my-10 overflow-x-auto">
      {/* Table to display transactions */}
      <table className="border-collapse border-3 rounded-lg border-slate-500 bg-yellow-300 w-full">
        <thead>
          <tr>
            <th className="border-3 border-slate-600 p-3">Title</th>
            <th className="border-3 border-slate-600 p-3">Description</th>
            <th className="border-3 border-slate-600 p-3">Price</th>
            <th className="border-3 border-slate-600 p-3">Date of Sale</th>
            <th className="border-3 border-slate-600 p-3">Category</th>
            <th className="border-3 border-slate-600 p-3">Sold</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each transaction row */}
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className="border-3 border-slate-700 p-3">
                {transaction.title}
              </td>
              <td className="border-3 border-slate-700 p-3">
                {transaction.description}
              </td>
              <td className="border-3 border-slate-700 p-3">
                {transaction.price}
              </td>
              <td className="border-3 border-slate-700 p-3">
                {new Date(transaction.dateOfSale).toLocaleDateString()}
              </td>
              <td className="border-3 border-slate-700 p-3">
                {transaction.category}
              </td>
              <td className="border-3 border-slate-700 p-3">
                {transaction.sold ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex md:flex-row justify-between p-10 font-bold">
        <p>Page {page}</p>
        <div>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
            Previous
          </button>
          <span className="mx-10">-</span>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
        <p>Per page: 10</p>
      </div>
    </div>
  );
};

// Add prop validation
TransactionsTable.propTypes = {
  month: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

export default TransactionsTable;
