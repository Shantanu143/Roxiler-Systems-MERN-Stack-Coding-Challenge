import { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChar";

const App = () => {
  // State hooks for managing month and search input
  const [month, setMonth] = useState("03");
  const [search, setSearch] = useState("");

  return (
    <div className="container p-10 bg-[aqua]">
      {/* Header section */}

      <div className="flex justify-center items-center">
        <div className="w-60 h-60 rounded-full bg-white flex justify-center items-center">
          <h2 className="text-4xl text-center">Transactions Dashboard</h2>
        </div>
      </div>

      {/* Search and Month selection section */}
      <div className="flex md:flex-col flex-col lg:flex-row justify-between items-center m-10">
        {/* Search input */}
        <input
          type="text"
          className="rounded-full px-5 py-2 bg-yellow-300 font-bold mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions"
        />

        {/* Month selection dropdown */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-l-lg px-5 py-2 bg-yellow-500 font-bold mb-4"
        >
          {/* Generate options for each month */}
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* TransactionsTable component with month and search props */}
      <TransactionsTable month={month} search={search} />

      {/* Statistics component with month prop */}
      <Statistics month={month} />

      {/* BarChart component with month prop */}
      <BarChart month={month} />
    </div>
  );
};

export default App;
