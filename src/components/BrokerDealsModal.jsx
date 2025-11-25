import { useEffect, useState } from "react";
import { fetchBrokerDeals } from "../api/brokers";

export default function BrokerDealsModal({ brokerId, brokerName, onClose }) {
const [deals, setDeals] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
async function loadDeals() {
try {
setLoading(true);
const data = await fetchBrokerDeals(brokerId);
setDeals(data.response || []);
} catch (err) {
setError("Failed to load deals");
console.error(err);
} finally {
setLoading(false);
}
}
loadDeals();
}, [brokerId]);

return (
<div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      {/* ⚪ INNER DIV = the white modal card */}
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
{/* Header */}
<div
  className="px-6 py-4 border-b flex items-center justify-between"
  style={{ backgroundColor: "#2563EB", borderColor: "#1E40AF" }}
>
  <div>
    <h2 className="text-xl font-bold" style={{ color: "#FFFFFF" }}>
      Linked Saudas
    </h2>
    <p className="text-sm" style={{ color: "#DBEAFE" }}>
      Broker: {brokerName} ({brokerId})
    </p>
  </div>
  <button 
    onClick={onClose} 
    className="text-white hover:text-gray-200 text-2xl font-bold"
  >
    ×
  </button>
</div>
    {/* Content */}
    <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(80vh - 80px)" }}>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <p style={{ color: "#6B7280" }}>Loading deals...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p style={{ color: "#EF4444" }}>{error}</p>
        </div>
      ) : deals.length === 0 ? (
        <div className="text-center py-8">
          <p style={{ color: "#6B7280" }}>No deals found for this broker.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "#F9FAFB" }}>
              <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "#6B7280" }}>
                  Deal Name
                </th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal, index) => (
                <tr 
                  key={deal.public_id || index}
                  style={{ 
                    borderBottom: index !== deals.length - 1 ? "1px solid #E5E7EB" : "none"
                  }}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3" style={{ color: "#2563EB", fontWeight: "500" }}>
                    {deal.name || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

    {/* Footer */}
    <div 
      className="px-6 py-4 border-t flex justify-end"
      style={{ borderColor: "#E5E7EB" }}
    >
      <button
        onClick={onClose}
        className="px-4 py-2 rounded-lg font-medium text-white transition hover:opacity-90"
        style={{ backgroundColor: "#6B7280" }}
      >
        Close
      </button>
    </div>
  </div>
</div>
);
}