import { useState, useEffect } from "react";
import { fetchBrokerDeals } from "../api/brokers";
import { createBrokerLedgerEntry } from "../api/brokers";

export default function AddTransactionModal({ brokers, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    broker_id: "",
    deal_id: "",
    date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD format only
    entry_type: "DEBIT",
    amount: "",
    mode: "",
    remarks: "",
    });


  const [deals, setDeals] = useState([]);
  const [loadingDeals, setLoadingDeals] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [brokerSearch, setBrokerSearch] = useState("");
  const [dealSearch, setDealSearch] = useState("");
  const [showBrokerDropdown, setShowBrokerDropdown] = useState(false);
  const [showDealDropdown, setShowDealDropdown] = useState(false);
  const [errors, setErrors] = useState({});

    useEffect(() => {
    async function loadDeals() {
        if (!formData.broker_id) {
        setDeals([]);
        return;
        }
        try {
        setLoadingDeals(true);
        const data = await fetchBrokerDeals(formData.broker_id);
        setDeals(data.response || []);
        } catch (error) {
        console.error("Failed to load deals:", error);
        setDeals([]);
        } finally {
        setLoadingDeals(false);
        }
    }
    loadDeals();
    }, [formData.broker_id]);


  // Filter brokers based on search
  const filteredBrokers = brokers.filter((broker) =>
    `${broker.name} (${broker.broker_id})`
      .toLowerCase()
      .includes(brokerSearch.toLowerCase())
  );

  // Filter deals based on search
  const filteredDeals = deals.filter((deal) =>
    (deal.name || "").toLowerCase().includes(dealSearch.toLowerCase())
  );

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleBrokerSelect = (brokerId, brokerName) => {
    console.log("Broker selected:", brokerId, brokerName); // Debug log
    setBrokerSearch(`${brokerName} (${brokerId})`);
    setShowBrokerDropdown(false);
    setDealSearch(""); // Reset deal search
    
    // Update formData for both broker and reset deal
    setFormData(prev => ({
        ...prev,
        broker_id: brokerId,
        deal_id: "" // Reset deal selection
    }));
    
    // Clear broker error
    if (errors.broker_id) {
        setErrors(prev => ({ ...prev, broker_id: null }));
    }
    };

  const handleDealSelect = (dealId, dealName) => {
    handleChange("deal_id", dealId);
    setDealSearch(dealName);
    setShowDealDropdown(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.broker_id) newErrors.broker_id = "Broker is required";
    if (!formData.deal_id) newErrors.deal_id = "Deal is required";
    if (!formData.date) newErrors.date = "Date & time is required";
    if (!formData.entry_type) newErrors.entry_type = "Entry type is required";
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.mode) newErrors.mode = "Mode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitting(true);

      const selectedDeal = deals.find((d) => d.public_id === formData.deal_id);

      const payload = {
        broker_id: formData.broker_id,
        deal_id: formData.deal_id,
        deal_name: selectedDeal?.name || null,
        date: new Date(formData.date).toISOString(),
        entry_type: formData.entry_type,
        amount: parseFloat(formData.amount),
        mode: formData.mode,
        remarks: formData.remarks || null,
      };

      await createBrokerLedgerEntry(formData.broker_id, payload);
      onSuccess("Transaction added successfully!");
    } catch (error) {
      onSuccess(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const getEntryTypeStyle = (type) => {
    switch (type) {
      case "DEBIT":
        return { bg: "#FEE2E2", text: "#EF4444", border: "#FCA5A5" };
      case "CREDIT":
        return { bg: "#D1FAE5", text: "#10B981", border: "#6EE7B7" };
      case "ADJUSTMENT":
        return { bg: "#DBEAFE", text: "#3B82F6", border: "#93C5FD" };
      default:
        return { bg: "#F3F4F6", text: "#6B7280", border: "#D1D5DB" };
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="bg-white rounded-lg shadow-xl overflow-hidden"
        style={{ width: "90%", maxWidth: "600px", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{ backgroundColor: "#2563EB", borderColor: "#1E40AF" }}
        >
          <h2 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
            Add Transaction
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-3xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 140px)" }}>
          <div className="p-6 space-y-4">
            {/* Broker Searchable Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Broker <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Search and select broker..."
                value={brokerSearch}
                onChange={(e) => {
                  setBrokerSearch(e.target.value);
                  setShowBrokerDropdown(true);
                }}
                onFocus={() => setShowBrokerDropdown(true)}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: errors.broker_id ? "#EF4444" : "#D1D5DB" }}
              />
              {showBrokerDropdown && (
                <div
                  className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto"
                  style={{ borderColor: "#D1D5DB" }}
                >
                  {filteredBrokers.length > 0 ? (
                    filteredBrokers.map((broker) => (
                      <div
                        key={broker.broker_id}
                        onClick={() => handleBrokerSelect(broker.broker_id, broker.name)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition"
                        style={{ color: "#111827" }}
                      >
                        {broker.name} ({broker.broker_id})
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2" style={{ color: "#6B7280" }}>
                      No brokers found
                    </div>
                  )}
                </div>
              )}
              {errors.broker_id && (
                <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
                  {errors.broker_id}
                </p>
              )}
            </div>

            {/* Deal Searchable Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Deal <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <input
                type="text"
                placeholder={!formData.broker_id ? "Select broker first" : "Search and select deal..."}
                value={dealSearch}
                onChange={(e) => {
                  setDealSearch(e.target.value);
                  setShowDealDropdown(true);
                }}
                onFocus={() => formData.broker_id && setShowDealDropdown(true)}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: errors.deal_id ? "#EF4444" : "#D1D5DB" }}
                disabled={!formData.broker_id || loadingDeals}
              />
              {showDealDropdown && formData.broker_id && (
                <div
                  className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto"
                  style={{ borderColor: "#D1D5DB" }}
                >
                  {loadingDeals ? (
                    <div className="px-3 py-2" style={{ color: "#6B7280" }}>
                      Loading deals...
                    </div>
                  ) : filteredDeals.length > 0 ? (
                    filteredDeals.map((deal) => (
                      <div
                        key={deal.public_id}
                        onClick={() => handleDealSelect(deal.public_id, deal.name)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition"
                        style={{ color: "#111827" }}
                      >
                        {deal.name}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2" style={{ color: "#6B7280" }}>
                      No deals found
                    </div>
                  )}
                </div>
              )}
              {errors.deal_id && (
                <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
                  {errors.deal_id}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Date <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
                type="date"
                value={formData.date.slice(0, 10)}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: errors.date ? "#EF4444" : "#D1D5DB" }}
            />
            {errors.date && (
                <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
                {errors.date}
                </p>
            )}
            </div>

            {/* Entry Type */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
                Entry Type <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <div className="flex gap-3">
                {["DEBIT", "CREDIT", "ADJUSTMENT"].map((type) => {
                  const style = getEntryTypeStyle(type);
                  const isSelected = formData.entry_type === type;
                  return (
                    <label key={type} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="entry_type"
                        value={type}
                        checked={isSelected}
                        onChange={(e) => handleChange("entry_type", e.target.value)}
                        className="hidden"
                      />
                      <div
                        className="px-4 py-2 rounded-lg text-center font-medium transition"
                        style={{
                          backgroundColor: isSelected ? style.bg : "#F9FAFB",
                          color: isSelected ? style.text : "#6B7280",
                          border: `2px solid ${isSelected ? style.border : "#E5E7EB"}`,
                        }}
                      >
                        {type}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Amount <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: errors.amount ? "#EF4444" : "#D1D5DB" }}
              />
              {errors.amount && (
                <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
                  {errors.amount}
                </p>
              )}
            </div>

            {/* Mode */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Mode <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Cash, Bank Transfer, Cheque"
                value={formData.mode}
                onChange={(e) => handleChange("mode", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: errors.mode ? "#EF4444" : "#D1D5DB" }}
              />
              {errors.mode && (
                <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
                  {errors.mode}
                </p>
              )}
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#374151" }}>
                Remarks
              </label>
              <textarea
                rows="3"
                placeholder="Optional notes..."
                value={formData.remarks}
                onChange={(e) => handleChange("remarks", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#D1D5DB" }}
              />
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 border-t flex justify-end gap-3"
            style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}
          >
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
              style={{ backgroundColor: "#E5E7EB", color: "#374151" }}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: "#10B981" }}
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
