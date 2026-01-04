import { useState } from "react";
import { parseDeliveryData, revalidateData } from "../utils/tableParser";
import { batchDeliveryUpdate } from "../api/lots";

export default function DeliveryCompleteModal({ dealId, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1: Paste, 2: Edit/Preview
  const [pastedText, setPastedText] = useState("");
  const [parsedData, setParsedData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [allValid, setAllValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleParse = () => {
    const result = parseDeliveryData(pastedText);
    
    if (!result.success || result.data.length === 0) {
      alert(result.error || "Failed to parse data");
      return;
    }

    setParsedData(result.data);
    setSummary(result.summary);
    setAllValid(result.allValid);
    setStep(2);
  };

  const handleFieldChange = (index, field, value) => {
    const updated = [...parsedData];
    updated[index][field] = value;
    setParsedData(updated);

    // Re-validate all data
    const revalidated = revalidateData(updated);
    setParsedData(revalidated.data);
    setSummary(revalidated.summary);
    setAllValid(revalidated.allValid);
  };

  const handleDeleteRow = (index) => {
  const updated = parsedData.filter((_, idx) => idx !== index);
  setParsedData(updated);

  // Re-validate after deletion
  const revalidated = revalidateData(updated);
  setParsedData(revalidated.data);
  setSummary(revalidated.summary);
  setAllValid(revalidated.allValid);
  };

  const handleConfirm = async () => {
    if (!allValid) {
      alert("Please fix all errors before confirming");
      return;
    }

    try {
      setLoading(true);
      
      // Prepare data for API (remove metadata)
      const updates = parsedData.map(row => ({
        rice_lot_no: row.rice_lot_no,
        rice_pass_date: row.rice_pass_date ? `${row.rice_pass_date}T00:00:00` : null, // Add time
        rice_deposit_centre: row.rice_deposit_centre || null,
        qtl: parseFloat(row.qtl) || 0,
        rice_bags_quantity: parseInt(row.rice_bags_quantity) || 0,
        moisture_cut: parseFloat(row.moisture_cut) || 0
        }));


      await batchDeliveryUpdate(dealId, updates);
      onSuccess();
    } catch (error) {
      alert("Failed to update lots: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setPastedText(`LOT001\t2025-11-10\tRaipur Warehouse\t45.5\t90\t2.1
LOT002\t2025-11-11\tBilaspur Depot\t62.3\t125\t1.8
LOT003\t2025-11-12\tDurg Storage\t38.7\t75\t2.5`);
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
          maxWidth: "1200px",
          maxHeight: "90vh",
          overflow: "auto",
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
            backgroundColor: "#1037b9ff",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "white", margin: 0 }}>
            🚚 Delivery Complete
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

        <div style={{ padding: "24px" }}>
          {/* Step 1: Paste Data */}
          {step === 1 && (
            <>
              <p style={{ color: "#6B7280", marginBottom: "20px" }}>
                Paste table data from Excel/CSV with 6 columns: Lot No, Pass Date, Centre, QTL, Bags, Moisture Cut
              </p>
              
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your data here (tab or comma separated)..."
                style={{
                  width: "100%",
                  height: "200px",
                  padding: "15px",
                  border: "2px solid #E5E7EB",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  marginBottom: "15px",
                  resize: "vertical",
                }}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleParse}
                  disabled={!pastedText.trim()}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: pastedText.trim() ? "#2563EB" : "#D1D5DB",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: pastedText.trim() ? "pointer" : "not-allowed",
                  }}
                >
                  📊 Parse Data
                </button>
                <button
                  onClick={loadExample}
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
                  📋 Load Example
                </button>
              </div>
            </>
          )}

          {/* Step 2: Edit & Preview */}
          {step === 2 && (
            <>
              {/* Summary */}
              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", gap: "20px", color: "#374151" }}>
                  <span><strong>Total:</strong> {summary.total}</span>
                  <span style={{ color: "#10B981" }}><strong>Valid:</strong> {summary.valid}</span>
                  <span style={{ color: "#EF4444" }}><strong>Invalid:</strong> {summary.invalid}</span>
                </div>
                {!allValid && (
                  <p style={{ color: "#DC2626", marginTop: "10px", fontWeight: "600" }}>
                    ⚠️ Please fix all errors (highlighted in red) before confirming
                  </p>
                )}
              </div>

              {/* Editable Table */}
              <div style={{ overflowX: "auto", marginBottom: "20px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "2px solid #E5E7EB" }}>
                      <th style={{ padding: "12px", textAlign: "left", color: "#6B7280" }}>Status</th>
                      <th style={{ padding: "12px", textAlign: "left", color: "#6B7280" }}>Lot No</th>
                      <th style={{ padding: "12px", textAlign: "left", color: "#6B7280" }}>Pass Date</th>
                      <th style={{ padding: "12px", textAlign: "left", color: "#6B7280" }}>Centre</th>
                      <th style={{ padding: "12px", textAlign: "left", color: "#6B7280" }}>QTL</th>
                      <th style={{ padding: "12px", textAlign: "left", color: "#6B7280" }}>Bags</th>
                      <th style={{ padding: "12px", textAlign: "left", color: "#6B7280" }}>Moisture</th>
                      <th style={{ padding: "12px", textAlign: "center", color: "#6B7280" }}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {parsedData.map((row, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: "1px solid #E5E7EB",
                          backgroundColor: row.isValid ? "white" : "#FEE2E2",
                        }}
                      >
                        <td style={{ padding: "12px" }}>
                          {row.isValid ? (
                            <span style={{ color: "#10B981", fontWeight: "600" }}>✅</span>
                          ) : (
                            <span style={{ color: "#EF4444", fontWeight: "600", fontSize: "12px" }}>
                              ⚠️ {row.errors.length}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input
                            type="text"
                            value={row.rice_lot_no}
                            onChange={(e) => handleFieldChange(idx, "rice_lot_no", e.target.value)}
                            style={{
                              width: "100%",
                              padding: "6px",
                              border: row.errors.some(e => e.includes("lot")) ? "2px solid #EF4444" : "1px solid #E5E7EB",
                              borderRadius: "4px",
                            }}
                          />
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input
                            type="date"
                            value={row.rice_pass_date}
                            onChange={(e) => handleFieldChange(idx, "rice_pass_date", e.target.value)}
                            style={{
                              width: "100%",
                              padding: "6px",
                              border: row.errors.some(e => e.includes("date")) ? "2px solid #EF4444" : "1px solid #E5E7EB",
                              borderRadius: "4px",
                            }}
                          />
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input
                            type="text"
                            value={row.rice_deposit_centre}
                            onChange={(e) => handleFieldChange(idx, "rice_deposit_centre", e.target.value)}
                            style={{
                              width: "100%",
                              padding: "6px",
                              border: "1px solid #E5E7EB",
                              borderRadius: "4px",
                            }}
                          />
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input
                            type="number"
                            value={row.qtl}
                            onChange={(e) => handleFieldChange(idx, "qtl", e.target.value)}
                            style={{
                              width: "100%",
                              padding: "6px",
                              border: row.errors.some(e => e.includes("qtl")) ? "2px solid #EF4444" : "1px solid #E5E7EB",
                              borderRadius: "4px",
                            }}
                          />
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input
                            type="number"
                            value={row.rice_bags_quantity}
                            onChange={(e) => handleFieldChange(idx, "rice_bags_quantity", e.target.value)}
                            style={{
                              width: "100%",
                              padding: "6px",
                              border: row.errors.some(e => e.includes("bags")) ? "2px solid #EF4444" : "1px solid #E5E7EB",
                              borderRadius: "4px",
                            }}
                          />
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input
                            type="number"
                            value={row.moisture_cut}
                            onChange={(e) => handleFieldChange(idx, "moisture_cut", e.target.value)}
                            style={{
                              width: "100%",
                              padding: "6px",
                              border: row.errors.some(e => e.includes("moisture")) ? "2px solid #EF4444" : "1px solid #E5E7EB",
                              borderRadius: "4px",
                            }}
                          />
                        </td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <button
                            onClick={() => handleDeleteRow(idx)}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "#EF4444",
                              color: "white",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: "600",
                              transition: "opacity 0.2s",
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
                            onMouseLeave={(e) => e.target.style.opacity = "1"}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setStep(1)}
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
                  ← Back
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!allValid || loading}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: allValid && !loading ? "#10B981" : "#D1D5DB",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: allValid && !loading ? "pointer" : "not-allowed",
                  }}
                >
                  {loading ? "Updating..." : allValid ? "✅ Confirm & Update Lots" : "⚠️ Fix errors first"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
