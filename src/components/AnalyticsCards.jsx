import { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyticsCards() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const response = await axios.get("http://localhost:8000/deals/analytics");
        setAnalytics(response.data.response);
        setLoading(false);
      } catch (err) {
        setError("Failed to load analytics");
        setLoading(false);
        console.error("Analytics fetch error:", err);
      }
    }
    loadAnalytics();
  }, []);

  // Calculate totals across all deals
  const totals = analytics.reduce(
    (acc, deal) => {
      acc.bora.shipped += deal.bora_progress.shipped;
      acc.bora.total += deal.bora_progress.total;
      acc.flapSticker.completed += deal.flap_sticker_progress.completed;
      acc.flapSticker.total += deal.flap_sticker_progress.total;
      acc.gatePass.completed += deal.gate_pass_progress.completed;
      acc.gatePass.total += deal.gate_pass_progress.total;
      
      if (deal.frk_progress) {
        acc.frk.completed += deal.frk_progress.completed;
        acc.frk.total += deal.frk_progress.total;
        acc.frk.saudaNames.push(deal.sauda_name);
        acc.hasFRK = true;
      }
      
      return acc;
    },
    {
      bora: { shipped: 0, total: 0 },
      flapSticker: { completed: 0, total: 0 },
      gatePass: { completed: 0, total: 0 },
      frk: { completed: 0, total: 0, saudaNames: [] },
      hasFRK: false
    }
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Bora Progress Card */}
      <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderTop: "4px solid #F59E0B" }}>
        <div className="flex items-center justify-between mb-2">
          <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600" }}>Bora Progress</span>
          <span style={{ fontSize: "24px" }}>📦</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827" }}>
          {totals.bora.shipped.toLocaleString()}
          <span style={{ color: "#6B7280", fontSize: "20px", fontWeight: "400" }}>
            /{totals.bora.total.toLocaleString()}
          </span>
        </div>
        <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
          {(totals.bora.total - totals.bora.shipped).toLocaleString()} remaining
        </div>
      </div>

      {/* Flap Sticker Progress Card */}
      <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderTop: "4px solid #8B5CF6" }}>
        <div className="flex items-center justify-between mb-2">
          <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600" }}>Flap Sticker</span>
          <span style={{ fontSize: "24px" }}>🏷️</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827" }}>
          {totals.flapSticker.completed}
          <span style={{ color: "#6B7280", fontSize: "20px", fontWeight: "400" }}>
            /{totals.flapSticker.total}
          </span>
        </div>
        <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
          {totals.flapSticker.total - totals.flapSticker.completed} remaining
        </div>
      </div>

      {/* Gate Pass Progress Card */}
      <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderTop: "4px solid #10B981" }}>
        <div className="flex items-center justify-between mb-2">
          <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600" }}>Gate Pass</span>
          <span style={{ fontSize: "24px" }}>🚪</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827" }}>
          {totals.gatePass.completed}
          <span style={{ color: "#6B7280", fontSize: "20px", fontWeight: "400" }}>
            /{totals.gatePass.total}
          </span>
        </div>
        <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
          {totals.gatePass.total - totals.gatePass.completed} remaining
        </div>
      </div>

      {/* FRK Progress Card - Conditional */}
      {totals.hasFRK && (
        <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderTop: "4px solid #EF4444" }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600" }}>FRK Progress</span>
            <span style={{ fontSize: "24px" }}>🌾</span>
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827" }}>
            {totals.frk.completed}
            <span style={{ color: "#6B7280", fontSize: "20px", fontWeight: "400" }}>
              /{totals.frk.total}
            </span>
          </div>
          <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
            {totals.frk.total - totals.frk.completed} remaining
          </div>
          <div style={{ 
            fontSize: "14px", 
            color: "#2b5cdaff", 
            marginTop: "8px",
            fontWeight: "500"
          }}>
            {totals.frk.saudaNames.join(", ")}
          </div>
        </div>
      )}
    </div>
  );
}
