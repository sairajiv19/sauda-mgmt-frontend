import { useEffect, useState } from "react";
import { fetchLotDetails } from "../api/lots";
import LotDetailsModalContainer from "./LotDetailsModalContainer";
import EditLotModal from "./EditLotModal";
import Toast from "./Toast";

export default function LotDetailsModal({ dealId, lotId, onClose }) {
  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [toast, setToast] = useState(null);

  const loadLotDetails = async () => {
    try {
      const data = await fetchLotDetails(dealId, lotId);
      setLot(data);
    } catch (error) {
      console.error("Failed to load lot details:", error);
    }
  };

  useEffect(() => {
    async function loadInitial() {
      setLoading(true);
      await loadLotDetails();
      setLoading(false);
    }
    loadInitial();
  }, [dealId, lotId]);

  const handleEditSuccess = async (message, type = "success") => {
    setToast({ message, type });
    setShowEditModal(false);
    await loadLotDetails();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  if (loading) {
    return (
      <LotDetailsModalContainer onClose={onClose}>
        <div className="p-6 text-center" style={{ color: "#6B7280" }}>
          Loading lot details...
        </div>
      </LotDetailsModalContainer>
    );
  }

  if (!lot) {
    return (
      <LotDetailsModalContainer onClose={onClose}>
        <div className="p-6 text-center" style={{ color: "#6B7280" }}>
          Lot not found
        </div>
      </LotDetailsModalContainer>
    );
  }

  if (showEditModal) {
    return (
      <>
        <EditLotModal
          dealId={dealId}
          lot={lot}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
        />
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <LotDetailsModalContainer onClose={onClose} title={lot.rice_lot_no || "N/A"}>
        <div className="p-6">
          <button
            onClick={() => setShowEditModal(true)}
            className="w-full px-4 py-3 rounded-lg font-medium text-white transition hover:opacity-90 mb-6"
            style={{ backgroundColor: "#2563EB" }}
          >
            Edit Lot
          </button>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>Rice Pass Date</span>
                <span style={{ color: "#111827" }} className="font-medium">
                  {lot.rice_pass_date ? new Date(lot.rice_pass_date).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>Rice Deposit Centre</span>
                <span style={{ color: "#111827" }} className="font-medium">{lot.rice_deposit_centre || "N/A"}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>Fully Shipped</span>
                <span style={{ color: lot.is_fully_shipped ? "#10B981" : "#EF4444" }} className="font-medium">
                  {lot.is_fully_shipped ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>Total Bora Count</span>
                <span style={{ color: "#111827" }} className="font-medium">{lot.total_bora_count || 0}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>Shipped Bora Count</span>
                <span style={{ color: "#111827" }} className="font-medium">{lot.shipped_bora_count || 0}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>Remaining Bora Count</span>
                <span style={{ color: "#111827" }} className="font-medium">{lot.remaining_bora_count || 0}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>QTL (Quintals)</span>
                <span style={{ color: "#111827" }} className="font-medium">{lot.qtl || 0}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>Rice Bags Quantity</span>
                <span style={{ color: "#111827" }} className="font-medium">{lot.rice_bags_quantity || 0}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>Moisture Cut</span>
                <span style={{ color: "#111827" }} className="font-medium">{lot.moisture_cut || 0}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>Net Rice Bought</span>
                <span style={{ color: "#111827" }} className="font-medium">{lot.net_rice_bought || 0}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>QI Expense</span>
                <span style={{ color: "#111827" }} className="font-medium">₹{lot.qi_expense || 0}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>Dalali Expense</span>
                <span style={{ color: "#111827" }} className="font-medium">₹{lot.lot_dalali_expense || 0}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>Other Expenses</span>
                <span style={{ color: "#111827" }} className="font-medium">₹{lot.other_expenses || 0}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                <span style={{ color: "#6B7280" }}>Brokerage</span>
                <span style={{ color: "#111827" }} className="font-medium">{lot.brokerage || 0}%</span>
              </div>
              <div className="flex justify-between py-2" style={{ color: "#111827" }}>
                <span style={{ color: "#6B7280" }}>Net Amount</span>
                <span className="font-semibold" style={{ color: "#2563EB" }}>₹{lot.nett_amount || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </LotDetailsModalContainer>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
