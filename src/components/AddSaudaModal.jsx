import { useState } from "react";
import { createSauda } from "../api/deals";

export default function AddSaudaModal({ onClose, onSuccess, brokers }) {
  const [formData, setFormData] = useState({
    name: "",
    broker_id: "",
    party_name: "",
    purchase_date: "",
    total_lots: 0,
    rate: 0,
    rice_type: "",
    rice_agreement: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        purchase_date: new Date(formData.purchase_date).toISOString(),
      };
      await createSauda(submitData);
      onSuccess("Sauda created successfully!");
      onClose();
    } catch (error) {
      onSuccess("Failed to create Sauda", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-[60vw] max-w-2xl p-6"
        style={{ backgroundColor: "#F9FAFB" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: "#E5E7EB" }}>
          <h2 className="text-xl font-bold" style={{ color: "#111827" }}>
            Add New Sauda
          </h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold hover:opacity-70"
            style={{ color: "#6B7280" }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                    Broker *
                </label>
                <select
                    name="broker_id"
                    required
                    value={formData.broker_id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    style={{ borderColor: "#E5E7EB", color: "#111827" }}
                >
                    <option value="">Select Broker</option>
                    {brokers.map((broker) => (
                    <option key={broker.broker_id} value={broker.broker_id}>
                        {broker.name} ({broker.broker_id})
                    </option>
                    ))}
                </select>
            </div>


            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Party Name *
              </label>
              <input
                type="text"
                name="party_name"
                required
                value={formData.party_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Purchase Date *
              </label>
              <input
                type="date"
                name="purchase_date"
                required
                value={formData.purchase_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Total Lots *
              </label>
              <input
                type="number"
                name="total_lots"
                required
                min="1"
                value={formData.total_lots}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Rate *
              </label>
              <input
                type="number"
                name="rate"
                required
                min="1.00"
                step="0.01"
                value={formData.rate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Rice Type
              </label>
              <input
                type="text"
                name="rice_type"
                value={formData.rice_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Rice Agreement
              </label>
              <input
                type="text"
                name="rice_agreement"
                value={formData.rice_agreement}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#2563EB" }}
          >
            {loading ? "Creating..." : "Create Sauda"}
          </button>
        </form>
      </div>
    </div>
  );
}
