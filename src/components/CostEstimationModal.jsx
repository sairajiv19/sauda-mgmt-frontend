import { useState } from "react";
import { batchCostEstimation } from "../api/lots";

export default function CostEstimationModal({ brokerId, dealId, selectedLotIds, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    qi_expense: 0,
    lot_dalali_expense: 0,
    other_expenses: 0,
    brokerage: 3,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedLotIds.length === 0) {
      alert("Please select at least one lot");
      return;
    }

    try {
      setLoading(true);
      await batchCostEstimation(brokerId, dealId, Array.from(selectedLotIds), formData);
      onSuccess("Cost estimation applied successfully!");
    } catch (error) {
      alert("Failed to apply cost estimation: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "500px",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px",
            borderBottom: "2px solid #E5E7EB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#F59E0B",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "white", margin: 0 }}>
            💰 Cost Estimation
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "32px",
              cursor: "pointer",
              color: "white",
              fontWeight: "bold",
              padding: "0",
              lineHeight: "1",
            }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
          <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#FEF3C7", borderRadius: "8px" }}>
            <p style={{ margin: 0, color: "#92400E", fontSize: "14px", fontWeight: "600" }}>
              📦 Applying to {selectedLotIds.length} selected lot{selectedLotIds.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* QI Expense */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              QI Expense (₹)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.qi_expense}
              onChange={(e) => handleChange("qi_expense", e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Lot Dalali Expense */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Lot Dalali Expense (₹)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.lot_dalali_expense}
              onChange={(e) => handleChange("lot_dalali_expense", e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Other Expenses */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Other Expenses (₹)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.other_expenses}
              onChange={(e) => handleChange("other_expenses", e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Brokerage */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Brokerage (%)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={formData.brokerage}
              onChange={(e) => handleChange("brokerage", e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "12px 24px",
                backgroundColor: "#6B7280",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px 24px",
                backgroundColor: loading ? "#D1D5DB" : "#F59E0B",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Applying..." : "✅ Apply Cost Estimation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
