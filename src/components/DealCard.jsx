import { useState } from "react";
import { useNavigate } from "react-router-dom";

const statusOptions = [
  "Initialized",
  "Ready for pickup",
  "In transport",
  "Shipped",
  "Completed",
];

const statusColors = {
  Initialized: "text-gray-600",
  "Ready for pickup": "text-blue-600",
  "In transport": "text-amber-600",
  Shipped: "text-purple-600",
  Completed: "text-emerald-600",
};

const statusBgColors = {
  Initialized: "bg-gray-50",
  "Ready for pickup": "bg-blue-50",
  "In transport": "bg-amber-50",
  Shipped: "bg-purple-50",
  Completed: "bg-emerald-50",
};

export default function DealCard({ deal, onStatusUpdate }) {
  const [status, setStatus] = useState(deal.status);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    setIsOpen(false);
    setLoading(true);
    try {
      await onStatusUpdate(deal.public_id, newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
      setStatus(deal.status);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/deals/${deal.public_id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer" 
      style={{ backgroundColor: "#F9FAFB" }}
    >
      <div className="bg-blue-600 text-white px-3 py-2.5 rounded-lg mb-4 flex justify-between items-center" style={{ backgroundColor: "#2563EB" }}>
        <h2 className="text-base font-semibold truncate">
          {deal.name}
        </h2>
        <span className="bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-full ml-2 flex-shrink-0">
          {deal.total_lots}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB", color: "#111827" }}>
          <span style={{ color: "#6B7280" }}>Party</span>
          <span className="font-medium truncate ml-2" style={{ color: "#111827" }}>{deal.party_name}</span>
        </div>
        <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB", color: "#111827" }}>
          <span style={{ color: "#6B7280" }}>Broker ID</span>
          <span className="font-medium" style={{ color: "#111827" }}>{deal.broker_id}</span>
        </div>
        <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB", color: "#111827" }}>
          <span style={{ color: "#6B7280" }}>Date</span>
          <span className="font-medium" style={{ color: "#111827" }}>
            {new Date(deal.purchase_date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between py-2" style={{ color: "#111827" }}>
          <span style={{ color: "#6B7280" }}>Rate</span>
          <span className="font-semibold" style={{ color: "#2563EB" }}>₹{deal.rate}</span>
        </div>
      </div>

      <div className="relative mt-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={loading}
          className={`w-full px-3 py-2 rounded-lg text-sm font-medium border text-left flex justify-between items-center transition ${
            statusBgColors[status]
          } ${statusColors[status]} ${
            loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-md"
          }`}
          style={{ borderColor: "#2563EB" }}
        >
          <span>{status}</span>
          <span className={`transition ${isOpen ? "rotate-180" : ""}`}>▼</span>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10" style={{ borderColor: "#2563EB", border: "2px solid #2563EB" }}>
            {statusOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => handleStatusChange(opt)}
                className={`w-full text-left px-3 py-2 text-sm transition first:rounded-t-lg last:rounded-b-lg ${
                  opt === status
                    ? "text-white font-medium"
                    : "hover:shadow-sm"
                }`}
                style={{
                  backgroundColor: opt === status ? "#2563EB" : "transparent",
                  color: opt === status ? "white" : "#111827",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
