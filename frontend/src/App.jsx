import { useState } from "react";
import TransactionsTable from "./componets/TransactionsTable";
import Statistics from "./componets/Statistics";
import BarChart from "./componets/BarChar";

const App = () => {
  const [month, setMonth] = useState("03");

  return (
    <div>
      <h1>Product Transactions Dashboard</h1>
      <div>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                {new Date(0, i).toLocaleString("en", { month: "long" })}
              </option>
            ))} 
          </select>
      </div>
      <TransactionsTable month={month} />
      <Statistics month={month} />
      <BarChart month={month} />
    </div>
  );
};

export default App;
