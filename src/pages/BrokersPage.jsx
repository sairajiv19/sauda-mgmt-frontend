import { useEffect, useState } from "react";
import BrokersTable from "../components/BrokersTable";
import Navbar from "../components/Navbar";
import BrokerDealsModal from "../components/BrokerDealsModal";
import BrokerLedgerModal from "../components/BrokerLedgerModal";
import AddTransactionModal from "../components/AddTransactionModal";
import Toast from "../components/Toast";

export default function BrokersPage({ brokers, refreshBrokers }) {
  const [filteredBrokers, setFilteredBrokers] = useState([]);
  const [loading, setLoading] = useState(!brokers || brokers.length === 0);
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [showDealsModal, setShowDealsModal] = useState(false);
  const [selectedLedgerBroker, setSelectedLedgerBroker] = useState(null);
  const [showLedgerModal, setShowLedgerModal] = useState(false);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (brokers) {
      setFilteredBrokers(brokers);
      setLoading(false);
    }
  }, [brokers]);

  const handleSearch = (query) => {
    const filtered = brokers.filter((broker) =>
      broker.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBrokers(filtered);
  };

  const handleViewSaudas = (brokerId) => {
    const broker = brokers.find((b) => b.broker_id === brokerId);
    setSelectedBroker(broker);
    setShowDealsModal(true);
  };

  const handleViewLedger = (brokerId) => {
    const broker = brokers.find((b) => b.broker_id === brokerId);
    setSelectedLedgerBroker(broker);
    setShowLedgerModal(true);
  };

  const handleCloseModal = () => {
    setShowDealsModal(false);
    setSelectedBroker(null);
  };

  const handleCloseLedgerModal = () => {
    setShowLedgerModal(false);
    setSelectedLedgerBroker(null);
  };

  const handleTransactionSuccess = (message, type = "success") => {
    setToast({ message, type });
    setShowAddTransactionModal(false);
    
    // Refresh page after toast
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading brokers...
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9FAFB" }}>
      <Navbar
        onSearch={handleSearch}
        brokers={brokers}
        refreshBrokers={refreshBrokers}
      />
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold" style={{ color: "#111827" }}>
            Brokers ({filteredBrokers.length})
          </h1>
          <button
            onClick={() => setShowAddTransactionModal(true)}
            className="px-4 py-2 rounded-lg font-medium text-white transition hover:opacity-90 flex items-center gap-2"
            style={{ backgroundColor: "#10B981" }}
          >
            <span className="text-xl">+</span>
            Add Transaction
          </button>
        </div>
        <BrokersTable
          brokers={filteredBrokers}
          onViewSaudas={handleViewSaudas}
          onViewLedger={handleViewLedger}
        />
      </div>

      {showDealsModal && selectedBroker && (
        <BrokerDealsModal
          brokerId={selectedBroker.broker_id}
          brokerName={selectedBroker.name}
          onClose={handleCloseModal}
        />
      )}

      {showLedgerModal && selectedLedgerBroker && (
        <BrokerLedgerModal
          brokerId={selectedLedgerBroker.broker_id}
          brokerName={selectedLedgerBroker.name}
          onClose={handleCloseLedgerModal}
        />
      )}

      {showAddTransactionModal && (
        <AddTransactionModal
          brokers={brokers}
          onClose={() => setShowAddTransactionModal(false)}
          onSuccess={handleTransactionSuccess}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
