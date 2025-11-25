import { useState } from "react";
import { createBroker } from "../api/brokers";

export default function AddBrokerModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    broker_id: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createBroker(formData);
      onSuccess("Broker created successfully!");
      onClose();
    } catch (error) {
      onSuccess("Failed to create Broker", "error");
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
            Add New Broker
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
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
              Broker Name *
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
              Broker ID *
            </label>
            <input
              type="text"
              name="broker_id"
              required
              value={formData.broker_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              style={{ borderColor: "#E5E7EB", color: "#111827" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#2563EB" }}
          >
            {loading ? "Creating..." : "Create Broker"}
          </button>
        </form>
      </div>
    </div>
  );
}
