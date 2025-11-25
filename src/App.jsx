import { Routes, Route } from "react-router-dom";
import BrokersPage from "./pages/BrokersPage.jsx";
import DealDetailPage from "./pages/DealDetailPage.jsx";
import { useEffect, useState } from "react";
import DealCard from "./components/DealCard";
import Navbar from "./components/Navbar";
import AnalyticsCards from "./components/AnalyticsCards";
import { fetchAllDeals, updateDealStatus } from "./api/deals";
import { fetchAllBrokers } from "./api/brokers";


function DealsPage({ brokers, refreshBrokers }) {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDeals() {
      const data = await fetchAllDeals();
      setDeals(data);
      setFilteredDeals(data);
      setLoading(false);
    }
    loadDeals();
  }, []);

  const handleSearch = (query) => {
    const filtered = deals.filter((deal) =>
      deal.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDeals(filtered);
  };

  const handleStatusUpdate = async (publicId, newStatus) => {
    await updateDealStatus(publicId, newStatus);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading deals...
      </div>
    );
  }

  return (
    <>
      <Navbar onSearch={handleSearch} brokers={brokers} refreshBrokers={refreshBrokers} />
      
      <div className="p-6" style={{ backgroundColor: "#F9FAFB" }}>
        {/* Analytics Cards */}
        <AnalyticsCards />

        <h1 className="text-3xl font-bold mb-6" style={{ color: "#111827" }}>All Deals</h1>

        {filteredDeals.length === 0 ? (
          <p style={{ color: "#6B7280" }}>No deals found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredDeals.map((deal) => (
              <DealCard
                key={deal.public_id}
                deal={deal}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    async function loadBrokers() {
      try {
        const data = await fetchAllBrokers();
        setBrokers(data);
      } catch (error) {
        console.error("Failed to load brokers:", error);
      }
    }
    loadBrokers();
  }, []);

  const refreshBrokers = async () => {
    const data = await fetchAllBrokers();
    setBrokers(data);
  };

  return (
    <div style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <Routes>
        <Route path="/" element={<DealsPage brokers={brokers} refreshBrokers={refreshBrokers} />} />
        <Route path="/deals/:dealId" element={<DealDetailPage />} />
        <Route path="/brokers" element={<BrokersPage brokers={brokers} refreshBrokers={refreshBrokers} />} />
      </Routes>
    </div>
  );
}
