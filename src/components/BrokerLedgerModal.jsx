import { useEffect, useState } from "react";
import { fetchBrokerLedger } from "../api/brokers";


export default function BrokerLedgerModal({ brokerId, brokerName, onClose }) {
const [ledgerEntries, setLedgerEntries] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
async function loadLedger() {
try {
setLoading(true);
const data = await fetchBrokerLedger(brokerId);
// Sort by date, newest first
const sortedEntries = (data.response || []).sort(
(a, b) => new Date(b.date) - new Date(a.date)
);
setLedgerEntries(sortedEntries);
} catch (err) {
setError("Failed to load ledger");
console.error(err);
} finally {
setLoading(false);
}
}
loadLedger();
}, [brokerId]);


// Calculate running balance and totals
const calculateFinancials = () => {
let runningBalance = 0;
let totalDebits = 0;
let totalCredits = 0;
const entriesWithBalance = ledgerEntries.map((entry) => {
  if (entry.entry_type === "CREDIT") {
    runningBalance += entry.amount;
    totalCredits += entry.amount;
  } else if (entry.entry_type === "DEBIT") {
    runningBalance -= entry.amount;
    totalDebits += entry.amount;
  } else if (entry.entry_type === "ADJUSTMENT") {
    runningBalance += entry.amount; // Adjustments can be + or -
  }


  return { ...entry, runningBalance };
});


const closingBalance = totalCredits - totalDebits;


return {
  entriesWithBalance,
  totalDebits,
  totalCredits,
  closingBalance,
};
};


const { entriesWithBalance, totalDebits, totalCredits, closingBalance } =
calculateFinancials();


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


// Get entry type styling
const getEntryTypeStyle = (type) => {
switch (type) {
case "DEBIT":
return {
bgColor: "#FEE2E2",
textColor: "#EF4444",
rowBg: "#FEF2F2",
};
case "CREDIT":
return {
bgColor: "#D1FAE5",
textColor: "#10B981",
rowBg: "#F0FDF4",
};
case "ADJUSTMENT":
return {
bgColor: "#DBEAFE",
textColor: "#3B82F6",
rowBg: "#EFF6FF",
};
default:
return {
bgColor: "#F3F4F6",
textColor: "#6B7280",
rowBg: "#FFFFFF",
};
}
};


return (
<div
  className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  onClick={onClose}
  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
>
<div
className="bg-white rounded-lg shadow-xl overflow-hidden"
style={{ width: "80%", maxWidth: "1200px", maxHeight: "85vh" }}
onClick={(e) => e.stopPropagation()}
>
{/* Header */}
<div
  className="px-6 py-4 border-b flex items-center justify-between"
  style={{ backgroundColor: "#2563EB", borderColor: "#1E40AF" }}
>
  <div>
    <h2 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
      Broker Ledger
    </h2>
    <p className="text-sm" style={{ color: "#DBEAFE" }}>
      {brokerName} ({brokerId})
    </p>
  </div>
  <button 
    onClick={onClose} 
    className="text-white hover:text-gray-200 text-3xl font-bold leading-none"
  >
    ×
  </button>
</div>


    {/* Content */}
    <div
      className="overflow-y-auto"
      style={{ maxHeight: "calc(85vh - 200px)" }}
    >
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p style={{ color: "#6B7280" }}>Loading ledger...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p style={{ color: "#EF4444" }}>{error}</p>
        </div>
      ) : ledgerEntries.length === 0 ? (
        <div className="text-center py-12">
          <p style={{ color: "#6B7280" }}>No ledger entries found.</p>
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead
            style={{ backgroundColor: "#F9FAFB", position: "sticky", top: 0 }}
          >
            <tr style={{ borderBottom: "2px solid #E5E7EB" }}>
              <th
                className="px-4 py-3 text-left font-semibold"
                style={{ color: "#6B7280" }}
              >
                Date
              </th>
              <th
                className="px-4 py-3 text-center font-semibold"
                style={{ color: "#6B7280" }}
              >
                Entry Type
              </th>
              <th
                className="px-4 py-3 text-right font-semibold"
                style={{ color: "#6B7280" }}
              >
                Amount
              </th>
              <th
                className="px-4 py-3 text-left font-semibold"
                style={{ color: "#6B7280" }}
              >
                Sauda Name
              </th>
              <th
                className="px-4 py-3 text-center font-semibold"
                style={{ color: "#6B7280" }}
              >
                Mode
              </th>
              <th
                className="px-4 py-3 text-left font-semibold"
                style={{ color: "#6B7280" }}
              >
                Remarks
              </th>
              <th
                className="px-4 py-3 text-right font-semibold"
                style={{ color: "#6B7280" }}
              >
                Running Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {entriesWithBalance.map((entry, index) => {
              const style = getEntryTypeStyle(entry.entry_type);
              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor: style.rowBg,
                    borderBottom:
                      index !== entriesWithBalance.length - 1
                        ? "1px solid #E5E7EB"
                        : "none",
                  }}
                  className="hover:opacity-80 transition"
                >
                  <td className="px-4 py-3" style={{ color: "#111827" }}>
                    {formatDate(entry.date)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: style.bgColor,
                        color: style.textColor,
                      }}
                    >
                      {entry.entry_type}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-right font-medium"
                    style={{ color: style.textColor }}
                  >
                    ₹
                    {entry.amount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-3" style={{ color: "#2563EB", fontWeight: "500" }}>
                    {entry.deal_name || "—"}
                  </td>
                  <td
                    className="px-4 py-3 text-center"
                    style={{ color: "#6B7280" }}
                  >
                    {entry.mode || "—"}
                  </td>
                  <td className="px-4 py-3" style={{ color: "#6B7280" }}>
                    <div
                      className="truncate"
                      style={{ maxWidth: "300px" }}
                      title={entry.remarks || "—"}
                    >
                      {entry.remarks || "—"}
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 text-right font-bold"
                    style={{
                      color:
                        entry.runningBalance >= 0 ? "#10B981" : "#EF4444",
                      fontSize: "15px",
                    }}
                  >
                    {entry.runningBalance >= 0 ? "+" : ""}₹
                    {Math.abs(entry.runningBalance).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>


    {/* Footer - Summary */}
    {!loading && !error && ledgerEntries.length > 0 && (
      <div
        className="px-6 py-4 border-t"
        style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}
      >
        <div className="grid grid-cols-3 gap-6 mb-4">
          {/* Total Debits */}
          <div className="text-center">
            <p
              className="text-xs font-medium mb-1"
              style={{ color: "#6B7280" }}
            >
              Total Debits
            </p>
            <p
              className="text-xl font-bold"
              style={{ color: "#EF4444" }}
            >
              ₹
              {totalDebits.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>


          {/* Total Credits */}
          <div className="text-center">
            <p
              className="text-xs font-medium mb-1"
              style={{ color: "#6B7280" }}
            >
              Total Credits
            </p>
            <p
              className="text-xl font-bold"
              style={{ color: "#10B981" }}
            >
              ₹
              {totalCredits.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>


          {/* Closing Balance */}
          <div className="text-center">
            <p
              className="text-xs font-medium mb-1"
              style={{ color: "#6B7280" }}
            >
              Closing Balance
            </p>
            <p
              className="text-2xl font-bold"
              style={{
                color: closingBalance >= 0 ? "#10B981" : "#EF4444",
              }}
            >
              {closingBalance >= 0 ? "+" : ""}₹
              {Math.abs(closingBalance).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>


        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium text-white transition hover:opacity-90"
            style={{ backgroundColor: "#6B7280" }}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
</div>
);
}
