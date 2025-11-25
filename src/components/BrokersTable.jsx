export default function BrokersTable({ brokers, onViewSaudas, onViewLedger }) {
if (brokers.length === 0) {
return (
<div className="bg-white rounded-lg shadow-sm p-8 text-center">
<p style={{ color: "#6B7280" }}>No brokers found.</p>
</div>
);
}

return (
<div className="bg-white rounded-lg shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-sm">
<thead style={{ backgroundColor: "#F9FAFB" }}>
<tr style={{ borderBottom: "2px solid #E5E7EB" }}>
<th className="px-6 py-4 text-left font-semibold" style={{ color: "#6B7280" }}>
Broker ID
</th>
<th className="px-6 py-4 text-left font-semibold" style={{ color: "#6B7280" }}>
Name
</th>
<th className="px-6 py-4 text-right font-semibold" style={{ color: "#6B7280" }}>
Total Debits
</th>
<th className="px-6 py-4 text-right font-semibold" style={{ color: "#6B7280" }}>
Total Credits
</th>
<th className="px-6 py-4 text-right font-semibold" style={{ color: "#6B7280" }}>
Balance
</th>
<th className="px-6 py-4 text-center font-semibold" style={{ color: "#6B7280" }}>
Linked Deals
</th>
<th className="px-6 py-4 text-center font-semibold" style={{ color: "#6B7280" }}>
Ledger
</th>
</tr>
</thead>
<tbody>
{brokers.map((broker, index) => {
const balance = (broker.total_credits || 0) - (broker.total_debits || 0);
const isPositive = balance >= 0;
          return (
            <tr 
              key={broker.broker_id}
              style={{ 
                borderBottom: index !== brokers.length - 1 ? "1px solid #E5E7EB" : "none"
              }}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4" style={{ color: "#2563EB", fontWeight: "600" }}>
                {broker.broker_id}
              </td>
              <td className="px-6 py-4" style={{ color: "#111827", fontWeight: "500" }}>
                {broker.name || "N/A"}
              </td>
              <td className="px-6 py-4 text-right" style={{ color: "#EF4444", fontWeight: "500" }}>
                ₹{(broker.total_debits || 0).toLocaleString('en-IN', { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}
              </td>
              <td className="px-6 py-4 text-right" style={{ color: "#10B981", fontWeight: "500" }}>
                ₹{(broker.total_credits || 0).toLocaleString('en-IN', { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}
              </td>
              <td className="px-6 py-4 text-right">
                <span 
                  style={{ 
                    color: isPositive ? "#10B981" : "#EF4444",
                    fontWeight: "600",
                    fontSize: "15px"
                  }}
                >
                  {isPositive ? "+" : ""}₹{Math.abs(balance).toLocaleString('en-IN', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onViewSaudas(broker.broker_id)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-white transition hover:opacity-90"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  View
                </button>
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onViewLedger(broker.broker_id)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-white transition hover:opacity-90"
                  style={{ backgroundColor: "#8B5CF6" }}
                >
                  View
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>
);
}