import { useState } from "react";
import { updateLot } from "../api/lots";
import LotDetailsModalContainer from "./LotDetailsModalContainer";

export default function EditLotModal({ dealId, lot, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    rice_lot_no: lot.rice_lot_no || "",
    rice_pass_date: lot.rice_pass_date ? lot.rice_pass_date.split(" ")[0] : "",
    rice_deposit_centre: lot.rice_deposit_centre || "",
    qtl: lot.qtl || 0,
    rice_bags_quantity: lot.rice_bags_quantity || 0,
    moisture_cut: lot.moisture_cut || 0,
    net_rice_bought: lot.net_rice_bought || 0,
    qi_expense: lot.qi_expense || 0,
    lot_dalali_expense: lot.lot_dalali_expense || 0,
    other_expenses: lot.other_expenses || 0,
    brokerage: lot.brokerage || 0,
    total_bora_count: lot.total_bora_count || 0,
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) || 0 : value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
      rice_lot_no: formData.rice_lot_no || null,
      rice_pass_date: formData.rice_pass_date ? new Date(formData.rice_pass_date).toISOString() : null,
      rice_deposit_centre: formData.rice_deposit_centre || null,
      qtl: formData.qtl !== "" && formData.qtl !== null ? formData.qtl : null,
      rice_bags_quantity: formData.rice_bags_quantity !== "" && formData.rice_bags_quantity !== null ? formData.rice_bags_quantity : null,
      moisture_cut: formData.moisture_cut !== "" && formData.moisture_cut !== null ? formData.moisture_cut : null,
      net_rice_bought: formData.net_rice_bought !== "" && formData.net_rice_bought !== null ? formData.net_rice_bought : null,
      qi_expense: formData.qi_expense !== "" && formData.qi_expense !== null ? formData.qi_expense : null,
      lot_dalali_expense: formData.lot_dalali_expense !== "" && formData.lot_dalali_expense !== null ? formData.lot_dalali_expense : null,
      other_expenses: formData.other_expenses !== "" && formData.other_expenses !== null ? formData.other_expenses : null,
      brokerage: formData.brokerage !== "" && formData.brokerage !== null ? formData.brokerage : null,
      total_bora_count: formData.total_bora_count !== "" && formData.total_bora_count !== null ? formData.total_bora_count : null,
    };
      // Filter out null values before sending
      const cleanedData = Object.fromEntries(
        Object.entries(submitData).filter(([_, v]) => v !== null)
      );

      await updateLot(dealId, lot.public_id, cleanedData);
      onSuccess("Lot updated successfully!");
      onClose();
    } catch (error) {
      onSuccess("Failed to update lot", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LotDetailsModalContainer onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-6 text-sm">
        {/* Rice Info Section */}
        <div>
          <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Rice Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Rice Lot No
              </label>
              <input
                type="text"
                name="rice_lot_no"
                value={formData.rice_lot_no}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Rice Deposit Centre
              </label>
              <input
                type="text"
                name="rice_deposit_centre"
                value={formData.rice_deposit_centre}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Rice Pass Date
              </label>
              <input
                type="date"
                name="rice_pass_date"
                value={formData.rice_pass_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
          </div>
        </div>
        {/* Quantity Section */}
        <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
          <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Quantity</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Total Bora Count
              </label>
              <input
                type="number"
                name="total_bora_count"
                value={formData.total_bora_count}
                onChange={handleChange}
                step="1"
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                QTL (Quintals)
              </label>
              <input
                type="number"
                name="qtl"
                value={formData.qtl}
                onChange={handleChange}
                step="0.01"
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Rice Bags Quantity
              </label>
              <input
                type="number"
                name="rice_bags_quantity"
                value={formData.rice_bags_quantity}
                onChange={handleChange}
                step="1"
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
          </div>
        </div>

        {/* Quality Section */}
        <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
          <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Quality</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Moisture Cut
              </label>
              <input
                type="number"
                name="moisture_cut"
                value={formData.moisture_cut}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Net Rice Bought
              </label>
              <input
                type="number"
                name="net_rice_bought"
                value={formData.net_rice_bought}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
          </div>
        </div>

        {/* Expenses Section */}
        <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
          <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Expenses</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                QI Expense
              </label>
              <input
                type="number"
                name="qi_expense"
                value={formData.qi_expense}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Dalali Expense
              </label>
              <input
                type="number"
                name="lot_dalali_expense"
                value={formData.lot_dalali_expense}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Other Expenses
              </label>
              <input
                type="number"
                name="other_expenses"
                value={formData.other_expenses}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Brokerage
              </label>
              <input
                type="number"
                name="brokerage"
                value={formData.brokerage}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white transition hover:opacity-90 mt-6"
          style={{ backgroundColor: "#2563EB" }}
        >
          {loading ? "Updating..." : "Update Lot"}
        </button>
      </form>
    </LotDetailsModalContainer>
  );
}
