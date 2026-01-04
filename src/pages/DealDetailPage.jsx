// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchAllDeals, updateDealStatus, deleteDeal } from "../api/deals";
// import { fetchDealLots } from "../api/lots";
// import LotCard from "../components/LotCard";
// import LotDetailsModal from "../components/LotDetailsModal";
// import BatchEditLotModal from "../components/BatchEditLotModal";
// import Navbar from "../components/Navbar";
// import Toast from "../components/Toast";
// import ConfirmationModal from "../components/ConfirmationModal";
// import ShipmentsTab from "../components/ShipmentsTab";
// import DeliveryCompleteModal from "../components/DeliveryCompleteModal";
// import CostEstimationModal from "../components/CostEstimationModal";
// import LotsTable from "../components/LotsTable";


// export default function DealDetailPage() {
//   const { dealId } = useParams();
//   const navigate = useNavigate();
//   const [deal, setDeal] = useState(null);
//   const [lots, setLots] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedLotId, setSelectedLotId] = useState(null);
//   const [selectedLotIds, setSelectedLotIds] = useState(new Set());
//   const [isBatchEditMode, setIsBatchEditMode] = useState(false);
//   const [isCostEstimationMode, setIsCostEstimationMode] = useState(false);
//   const [showBatchEditModal, setShowBatchEditModal] = useState(false);
//   const [toast, setToast] = useState(null);
//   const [showConfirmDelete, setShowConfirmDelete] = useState(false);
//   const [activeTab, setActiveTab] = useState("lots");
//   const [showDeliveryModal, setShowDeliveryModal] = useState(false);
//   const [showCostEstimationModal, setShowCostEstimationModal] = useState(false);
//   const [shipments, setShipments] = useState([]);

//   const refreshLots = async () => {
//     try {
//       const lotsData = await fetchDealLots(dealId);
//       setLots(lotsData || []);
//     } catch (error) {
//       console.error("Failed to refresh lots:", error);
//     }
//   };

//   useEffect(() => {
//     async function loadDealAndLotsAndShipments() {
//       try {
//         const dealsData = await fetchAllDeals();
//         const currentDeal = dealsData.find(d => d.public_id === dealId);
//         setDeal(currentDeal);

//         if (currentDeal) {
//           const lotsData = await fetchDealLots(dealId);
//           setLots(lotsData || []);
//           // Also fetch shipments here!
//           const shipmentsData = await fetchDealShipments(dealId);
//           setShipments(shipmentsData || []);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to load deal details:", error);
//         setLoading(false);
//       }
//     }
//     loadDealAndLotsAndShipments();
//   }, [dealId]);

//   const handleSelectLot = (lotId) => {
//     const newSelected = new Set(selectedLotIds);
//     if (newSelected.has(lotId)) {
//       newSelected.delete(lotId);
//     } else {
//       newSelected.add(lotId);
//     }
//     setSelectedLotIds(newSelected);
//   };

//   const handleSelectAll = () => {
//     if (selectedLotIds.size === lots.length) {
//       setSelectedLotIds(new Set());
//     } else {
//       setSelectedLotIds(new Set(lots.map(lot => lot.public_id)));
//     }
//   };

//   const handleBatchEditSuccess = (message, type = "success") => {
//     setToast({ message, type });
//     setIsBatchEditMode(false);
//     setShowBatchEditModal(false);
//     setSelectedLotIds(new Set());
//     refreshLots();
//   };

//   const handleCostEstimationSuccess = (message) => {
//     setToast({ message, type: "success" });
//     setShowCostEstimationModal(false);
//     setIsCostEstimationMode(false);
//     setSelectedLotIds(new Set());
//     refreshLots();
//   };

//   const handleDeliveryCompleteSuccess = () => {
//     setToast({ message: "Delivery data updated successfully!", type: "success" });
//     setShowDeliveryModal(false);
//     refreshLots();
//   };

//   const handleDeleteDeal = async () => {
//     try {
//       await deleteDeal(dealId);
//       setToast({ message: "Deal deleted successfully!", type: "success" });
//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     } catch (error) {
//       setToast({ message: "Failed to delete deal", type: "error" });
//     }
//     setShowConfirmDelete(false);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Loading deal details...
//       </div>
//     );
//   }

//   if (!deal) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Deal not found
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar onSearch={() => {}} />

//       <div className="min-h-screen p-6" style={{ backgroundColor: "#F9FAFB" }}>
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={() => navigate("/")}
//             className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
//             style={{ backgroundColor: "#2563EB", color: "white" }}
//           >
//             ← Back to Deals
//           </button>

//           {/* Batch Edit Mode */}
//           {isBatchEditMode && (
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setIsBatchEditMode(false);
//                   setSelectedLotIds(new Set());
//                 }}
//                 className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
//                 style={{ backgroundColor: "#EF4444", color: "white" }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => setShowBatchEditModal(true)}
//                 disabled={selectedLotIds.size === 0}
//                 className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//                 style={{ backgroundColor: selectedLotIds.size === 0 ? "#D1D5DB" : "#2563EB", color: "white" }}
//               >
//                 Batch Edit ({selectedLotIds.size})
//               </button>
//             </div>
//           )}

//           {/* Cost Estimation Mode */}
//           {isCostEstimationMode && (
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setIsCostEstimationMode(false);
//                   setSelectedLotIds(new Set());
//                 }}
//                 className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
//                 style={{ backgroundColor: "#EF4444", color: "white" }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => setShowCostEstimationModal(true)}
//                 disabled={selectedLotIds.size === 0}
//                 className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//                 style={{ backgroundColor: selectedLotIds.size === 0 ? "#D1D5DB" : "#F59E0B", color: "white" }}
//               >
//                 💰 Apply Cost Estimation ({selectedLotIds.size})
//               </button>
//             </div>
//           )}

//           {/* Normal Mode - All Action Buttons */}
//           {!isBatchEditMode && !isCostEstimationMode && (
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowDeliveryModal(true)}
//                 className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
//                 style={{ backgroundColor: "#10B981", color: "white" }}
//               >
//                 🚚 Delivery Complete
//               </button>
//               <button
//                 onClick={() => setIsCostEstimationMode(true)}
//                 className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
//                 style={{ backgroundColor: "#F59E0B", color: "white" }}
//               >
//                 💰 Cost Estimation
//               </button>
//               <button
//                 onClick={() => setIsBatchEditMode(true)}
//                 className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
//                 style={{ backgroundColor: "#2563EB", color: "white" }}
//               >
//                 Batch Edit
//               </button>
//               <button
//                 onClick={() => setShowConfirmDelete(true)}
//                 className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
//                 style={{ backgroundColor: "#EF4444", color: "white" }}
//               >
//                 Delete Deal
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6" style={{ backgroundColor: "#F9FAFB", borderTop: "4px solid #2563EB" }}>
//           <h1 className="text-3xl font-bold mb-6" style={{ color: "#111827" }}>{deal.name}</h1>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
//             <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
//               <span style={{ color: "#6B7280" }}>Party Name</span>
//               <span style={{ color: "#111827" }} className="font-medium">{deal.party_name}</span>
//             </div>
//             <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
//               <span style={{ color: "#6B7280" }}>Broker ID</span>
//               <span style={{ color: "#111827" }} className="font-medium">{deal.broker_id}</span>
//             </div>
//             <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
//               <span style={{ color: "#6B7280" }}>Rate</span>
//               <span style={{ color: "#2563EB" }} className="font-semibold">₹{deal.rate}</span>
//             </div>
//             <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
//               <span style={{ color: "#6B7280" }}>Status</span>
//               <span style={{ color: "#111827" }} className="font-medium">{deal.status}</span>
//             </div>
//             <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
//               <span style={{ color: "#6B7280" }}>Rice Type</span>
//               <span style={{ color: "#111827" }} className="font-medium">{deal.rice_type || "N/A"}</span>
//             </div>
//             <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
//               <span style={{ color: "#6B7280" }}>Agreement</span>
//               <span style={{ color: "#111827" }} className="font-medium">{deal.rice_agreement || "N/A"}</span>
//             </div>
//             <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
//               <span style={{ color: "#6B7280" }}>Purchase Date</span>
//               <span style={{ color: "#111827" }} className="font-medium">{new Date(deal.purchase_date).toLocaleDateString()}</span>
//             </div>
//             <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
//               <span style={{ color: "#6B7280" }}>Total Lots</span>
//               <span style={{ color: "#2563EB" }} className="font-semibold">{deal.total_lots}</span>
//             </div>
//           </div>
//         </div>

//         {/* Reports Banner */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//           {/* Total Cost Card */}
//           <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderTop: "4px solid #2563EB" }}>
//             <div className="flex items-center justify-between mb-2">
//               <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600" }}>Total Cost</span>
//               <span style={{ fontSize: "24px" }}>💰</span>
//             </div>
//             <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827" }}>
//               ₹{lots
//                 .filter(lot => lot.nett_amount && lot.nett_amount > 0)
//                 .reduce((sum, lot) => sum + (parseFloat(lot.nett_amount) || 0), 0)
//                 .toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//             </div>
//             <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>
//               From {lots.filter(lot => lot.nett_amount && lot.nett_amount > 0).length} lots
//             </div>
//           </div>
//           {/* Bora Progress Card */}
//           <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderTop: "4px solid #F59E0B" }}>
//             <div className="flex items-center justify-between mb-2">
//               <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600" }}>Bora Progress</span>
//               <span style={{ fontSize: "24px" }}>📦</span>
//             </div>
//             <div className="flex items-center gap-4">
//               {/* Circular Progress */}
//               <div style={{ position: "relative", width: "60px", height: "60px" }}>
//                 <svg width="60" height="60" style={{ transform: "rotate(-90deg)" }}>
//                   {/* Background circle */}
//                   <circle
//                     cx="30"
//                     cy="30"
//                     r="25"
//                     fill="none"
//                     stroke="#E5E7EB"
//                     strokeWidth="6"
//                   />
//                   {/* Progress circle */}
//                   <circle
//                     cx="30"
//                     cy="30"
//                     r="25"
//                     fill="none"
//                     stroke="#F59E0B"
//                     strokeWidth="6"
//                     strokeDasharray={`${
//                       (() => {
//                         const totalBora = lots.reduce((sum, lot) => sum + (lot.total_bora_count || 0), 0);
//                         const shippedBora = lots.reduce((sum, lot) => sum + (lot.shipped_bora_count || 0), 0);
//                         return totalBora > 0 ? (shippedBora / totalBora) * 157 : 0;
//                       })()
//                     } 157`}
//                     strokeLinecap="round"
//                   />
//                 </svg>
//                 <div style={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   fontSize: "12px",
//                   fontWeight: "700",
//                   color: "#111827"
//                 }}>
//                   {(() => {
//                     const totalBora = lots.reduce((sum, lot) => sum + (lot.total_bora_count || 0), 0);
//                     const shippedBora = lots.reduce((sum, lot) => sum + (lot.shipped_bora_count || 0), 0);
//                     return totalBora > 0 ? Math.round((shippedBora / totalBora) * 100) : 0;
//                   })()}%
//                 </div>
//               </div>
//               {/* Numbers */}
//               <div>
//                 <div style={{ fontSize: "16px", fontWeight: "700", color: "#111827" }}>
//                   {lots.reduce((sum, lot) => sum + (lot.shipped_bora_count || 0), 0)}
//                   <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: "400" }}>
//                     /{lots.reduce((sum, lot) => sum + (lot.total_bora_count || 0), 0)}
//                   </span>
//                 </div>
//                 <div style={{ fontSize: "12px", color: "#6B7280" }}>
//                   {lots.reduce((sum, lot) => sum + (lot.remaining_bora_count || 0), 0)} remaining
//                 </div>
//               </div>
//             </div>
//           </div> 
//         </div>

//         <div className="flex gap-4 mb-6 border-b" style={{ borderColor: "#E5E7EB" }}>
//           <button
//             onClick={() => setActiveTab("lots")}
//             className={`px-4 py-3 font-semibold transition ${
//               activeTab === "lots"
//                 ? "border-b-2"
//                 : ""
//             }`}
//             style={{
//               color: activeTab === "lots" ? "#2563EB" : "#6B7280",
//               borderBottomColor: activeTab === "lots" ? "#2563EB" : "transparent",
//             }}
//           >
//             Lots
//           </button>
//           <button
//             onClick={() => setActiveTab("shipments")}
//             className={`px-4 py-3 font-semibold transition ${
//               activeTab === "shipments"
//                 ? "border-b-2"
//                 : ""
//             }`}
//             style={{
//               color: activeTab === "shipments" ? "#2563EB" : "#6B7280",
//               borderBottomColor: activeTab === "shipments" ? "#2563EB" : "transparent",
//             }}
//           >
//             Shipments
//           </button>
//         </div>

//         {/* {activeTab === "lots" && (
//           <>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold" style={{ color: "#111827" }}>
//                 Lots ({lots.length})
//               </h2>
//               {(isBatchEditMode || isCostEstimationMode) && (
//                 <button
//                   onClick={handleSelectAll}
//                   className="text-sm font-medium px-3 py-1 rounded transition hover:shadow-sm"
//                   style={{ backgroundColor: "#E5E7EB", color: "#111827" }}
//                 >
//                   {selectedLotIds.size === lots.length ? "Deselect All" : "Select All"}
//                 </button>
//               )}
//             </div>

//             {lots.length === 0 ? (
//               <p style={{ color: "#6B7280" }}>No lots found for this deal.</p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                 {lots.map((lot) => (
//                   <LotCard
//                     key={lot.public_id}
//                     lot={lot}
//                     onClick={() => setSelectedLotId(lot.public_id)}
//                     isBatchEditMode={isBatchEditMode || isCostEstimationMode}
//                     isSelected={selectedLotIds.has(lot.public_id)}
//                     onSelectChange={() => handleSelectLot(lot.public_id)}
//                   />
//                 ))}
//               </div>
//             )}
//           </>
//         )} */}
//         {activeTab === "lots" && (
//           <>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold" style={{ color: "#111827" }}>
//                 Lots ({lots.length})
//               </h2>
//               {(isBatchEditMode || isCostEstimationMode) && (
//                 <button
//                   onClick={handleSelectAll}
//                   className="text-sm font-medium px-3 py-1 rounded transition hover:shadow-sm"
//                   style={{ backgroundColor: "#E5E7EB", color: "#111827" }}
//                 >
//                   {selectedLotIds.size === lots.length ? "Deselect All" : "Select All"}
//                 </button>
//               )}
//             </div>

//             <LotsTable
//               lots={lots}
//               isBatchEditMode={isBatchEditMode}
//               isCostEstimationMode={isCostEstimationMode}
//               selectedLotIds={selectedLotIds}
//               onSelectLot={handleSelectLot}
//               onLotClick={setSelectedLotId}
//               onSelectAll={handleSelectAll}
//             />
//           </>
//         )}

//         {activeTab === "shipments" && <ShipmentsTab dealId={dealId} lots={lots} shipments={shipments} onLotsUpdate={refreshLots}/>}
//       </div>

//       {selectedLotId && !isBatchEditMode && !isCostEstimationMode && (
//         <LotDetailsModal
//           dealId={dealId}
//           lotId={selectedLotId}
//           onClose={() => setSelectedLotId(null)}
//         />
//       )}

//       {showBatchEditModal && (
//         <BatchEditLotModal
//           dealId={dealId}
//           selectedLotIds={selectedLotIds}
//           onClose={() => setShowBatchEditModal(false)}
//           onSuccess={handleBatchEditSuccess}
//         />
//       )}

//       {showConfirmDelete && (
//         <ConfirmationModal
//           title="Delete Deal"
//           message="Are you sure you want to delete this deal? This action cannot be undone."
//           onConfirm={handleDeleteDeal}
//           onCancel={() => setShowConfirmDelete(false)}
//           confirmText="Delete"
//           cancelText="Cancel"
//         />
//       )}

//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       {showDeliveryModal && (
//         <DeliveryCompleteModal
//           dealId={dealId}
//           onClose={() => setShowDeliveryModal(false)}
//           onSuccess={handleDeliveryCompleteSuccess}
//         />
//       )}
      
//       {showCostEstimationModal && (
//         <CostEstimationModal
//         dealId={dealId}
//           selectedLotIds={selectedLotIds}
//           onClose={() => setShowCostEstimationModal(false)}
//           onSuccess={handleCostEstimationSuccess}
//         />
//       )}
//     </>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllDeals, updateDealStatus, deleteDeal } from "../api/deals";
import { fetchDealLots } from "../api/lots";
import { getDealShipments } from "../api/shipments";
import LotDetailsModal from "../components/LotDetailsModal";
import BatchEditLotModal from "../components/BatchEditLotModal";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import ConfirmationModal from "../components/ConfirmationModal";
import ShipmentsTab from "../components/ShipmentsTab";
import DeliveryCompleteModal from "../components/DeliveryCompleteModal";
import CostEstimationModal from "../components/CostEstimationModal";
import LotsTable from "../components/LotsTable";

export default function DealDetailPage() {
  const { dealId } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [lots, setLots] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLotId, setSelectedLotId] = useState(null);
  const [selectedLotIds, setSelectedLotIds] = useState(new Set());
  const [isBatchEditMode, setIsBatchEditMode] = useState(false);
  const [isCostEstimationMode, setIsCostEstimationMode] = useState(false);
  const [showBatchEditModal, setShowBatchEditModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [activeTab, setActiveTab] = useState("lots");
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showCostEstimationModal, setShowCostEstimationModal] = useState(false);

  const refreshLots = async () => {
    try {
      const lotsData = await fetchDealLots(dealId);
      setLots(lotsData || []);
    } catch (error) {
      console.error("Failed to refresh lots:", error);
    }
  };

  useEffect(() => {
    async function loadDealAndLotsAndShipments() {
      try {
        const dealsData = await fetchAllDeals();
        const currentDeal = dealsData.find(d => d.public_id === dealId);
        setDeal(currentDeal);

        if (currentDeal) {
          const lotsData = await fetchDealLots(dealId);
          setLots(lotsData || []);
          const shipmentsData = await getDealShipments(dealId);
          const shipmentsArr = shipmentsData.response || shipmentsData || [];
          setShipments(Array.isArray(shipmentsArr) ? shipmentsArr : []);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load deal details:", error);
        setLoading(false);
      }
    }
    loadDealAndLotsAndShipments();
  }, [dealId]);
  
  // Helper function to check if ANY shipment has FRK enabled
  const hasFRKLots = () => {
    return shipments.some(shipment => shipment.frk === true);
  };

  // UPDATED: Bora Progress - Original logic using total_bora_count and shipped_bora_count
  const calculateBoraProgress = () => {
    const totalBora = lots.reduce((sum, lot) => sum + (lot.total_bora_count || 0), 0);
    const shippedBora = lots.reduce((sum, lot) => sum + (lot.shipped_bora_count || 0), 0);
    
    return {
      completed: shippedBora,
      total: totalBora,
      remaining: totalBora - shippedBora,
      percentage: totalBora > 0 ? Math.round((shippedBora / totalBora) * 100) : 0
    };
  };

  // Calculate Flap Sticker Progress (flap_sticker_date, flap_sticker_via both present)
  const calculateFlapProgress = () => {
    const completedLots = shipments.filter(shipment => 
      shipment.flap_sticker_date && 
      shipment.flap_sticker_via
    ).length;
    
    return {
      completed: completedLots,
      total: lots.length,
      percentage: lots.length > 0 ? Math.round((completedLots / lots.length) * 100) : 0
    };
  };

  // Calculate Gate Pass Progress (gate_pass_date, gate_pass_via both present)
  const calculateGatePassProgress = () => {
    const completedLots = shipments.filter(shipment => 
      shipment.gate_pass_date && 
      shipment.gate_pass_via
    ).length;
    
    return {
      completed: completedLots,
      total: lots.length,
      percentage: lots.length > 0 ? Math.round((completedLots / lots.length) * 100) : 0
    };
  };

  // Calculate FRK Progress (frk_qty, frk_via, frk_date all present when frk=true)
  const calculateFRKProgress = () => {
    const frkShipments = shipments.filter(shipment => shipment.frk === true);
    const completedFRK = frkShipments.filter(shipment => 
      shipment.frk_bheja?.frk_qty &&
      shipment.frk_bheja?.frk_via &&
      shipment.frk_bheja?.frk_date
    ).length;
    
    return {
      completed: completedFRK,
      total: lots.length,
      percentage: lots.length > 0 ? Math.round((completedFRK / lots.length) * 100) : 0
    };
  };

  const boraProgress = calculateBoraProgress();
  const flapProgress = calculateFlapProgress();
  const gatePassProgress = calculateGatePassProgress();
  const frkProgress = calculateFRKProgress();

  const handleSelectLot = (lotId) => {
    const newSelected = new Set(selectedLotIds);
    if (newSelected.has(lotId)) {
      newSelected.delete(lotId);
    } else {
      newSelected.add(lotId);
    }
    setSelectedLotIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedLotIds.size === lots.length) {
      setSelectedLotIds(new Set());
    } else {
      setSelectedLotIds(new Set(lots.map(lot => lot.public_id)));
    }
  };

  const handleBatchEditSuccess = (message, type = "success") => {
    setToast({ message, type });
    setIsBatchEditMode(false);
    setShowBatchEditModal(false);
    setSelectedLotIds(new Set());
    refreshLots();
  };

  const handleCostEstimationSuccess = (message) => {
    setToast({ message, type: "success" });
    setShowCostEstimationModal(false);
    setIsCostEstimationMode(false);
    setSelectedLotIds(new Set());
    refreshLots();
  };

  const handleDeliveryCompleteSuccess = () => {
    setToast({ message: "Delivery data updated successfully!", type: "success" });
    setShowDeliveryModal(false);
    refreshLots();
  };

  const handleDeleteDeal = async () => {
    try {
      await deleteDeal(dealId);
      setToast({ message: "Deal deleted successfully!", type: "success" });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setToast({ message: "Failed to delete deal", type: "error" });
    }
    setShowConfirmDelete(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading deal details...
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Deal not found
      </div>
    );
  }

    return (
    <>
      <Navbar dealName={deal?.name} onSearch={() => {}} />

      <div className="min-h-screen p-6" style={{ backgroundColor: "#F9FAFB" }}>
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
            style={{ backgroundColor: "#1d39a0ff", color: "white" }}
          >
            ← Back to Deals
          </button>

          {/* Batch Edit Mode */}
          {isBatchEditMode && (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsBatchEditMode(false);
                  setSelectedLotIds(new Set());
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
                style={{ backgroundColor: "#EF4444", color: "white" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowBatchEditModal(true)}
                disabled={selectedLotIds.size === 0}
                className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: selectedLotIds.size === 0 ? "#D1D5DB" : "#1d39a0ff", color: "white" }}
              >
                Batch Edit ({selectedLotIds.size})
              </button>
            </div>
          )}

          {/* Cost Estimation Mode */}
          {isCostEstimationMode && (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsCostEstimationMode(false);
                  setSelectedLotIds(new Set());
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
                style={{ backgroundColor: "#EF4444", color: "white" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCostEstimationModal(true)}
                disabled={selectedLotIds.size === 0}
                className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: selectedLotIds.size === 0 ? "#D1D5DB" : "#5a78e5ff", color: "white" }}
              >
                💰 Apply Cost Estimation ({selectedLotIds.size})
              </button>
            </div>
          )}

          {/* Normal Mode - All Action Buttons */}
          {!isBatchEditMode && !isCostEstimationMode && (
            <div className="flex gap-3">
              {/* <button
                onClick={() => setShowDeliveryModal(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
                style={{ backgroundColor: "#10B981", color: "white" }}
              >
                🚚 Delivery Complete
              </button> */}
              <button
                onClick={() => setIsCostEstimationMode(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
                style={{ backgroundColor: "#112d93ff", color: "white" }}
              >
                💰 Cost Estimation
              </button>
              <button
                onClick={() => setIsBatchEditMode(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
                style={{ backgroundColor: "#112d93ff", color: "white" }}
              >
                Batch Edit
              </button>
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition hover:shadow-md"
                style={{ backgroundColor: "#EF4444", color: "white" }}
              >
                Delete Deal
              </button>
            </div>
          )}
        </div>

        {/* Deal Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6" style={{ backgroundColor: "#F9FAFB", borderTop: "4px solid #5a78e5ff" }}>
          <h1 className="text-3xl font-bold mb-6" style={{ color: "#111827" }}>{deal.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
              <span style={{ color: "#6B7280" }}>Party Name</span>
              <span style={{ color: "#111827" }} className="font-medium">{deal.party_name}</span>
            </div>
            <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
              <span style={{ color: "#6B7280" }}>Broker ID</span>
              <span style={{ color: "#111827" }} className="font-medium">{deal.broker_id}</span>
            </div>
            <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
              <span style={{ color: "#6B7280" }}>Rate</span>
              <span style={{ color: "#2563EB" }} className="font-semibold">₹{deal.rate}</span>
            </div>
            <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
              <span style={{ color: "#6B7280" }}>Status</span>
              <span style={{ color: "#111827" }} className="font-medium">{deal.status}</span>
            </div>
            <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
              <span style={{ color: "#6B7280" }}>Rice Type</span>
              <span style={{ color: "#111827" }} className="font-medium">{deal.rice_type || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
              <span style={{ color: "#6B7280" }}>Agreement</span>
              <span style={{ color: "#111827" }} className="font-medium">{deal.rice_agreement || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
              <span style={{ color: "#6B7280" }}>Purchase Date</span>
              <span style={{ color: "#111827" }} className="font-medium">{new Date(deal.purchase_date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b" style={{ borderColor: "#E5E7EB" }}>
              <span style={{ color: "#6B7280" }}>Total Lots</span>
              <span style={{ color: "#2563EB" }} className="font-semibold">{deal.total_lots}</span>
            </div>
          </div>
        </div>

        {/* Reports Banner - Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Total Cost Card */}
          <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderTop: "4px solid #5a78e5ff" }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600" }}>Total Cost</span>
              <span style={{ fontSize: "24px" }}>💰</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827" }}>
              ₹{lots
                .filter(lot => lot.nett_amount && lot.nett_amount > 0)
                .reduce((sum, lot) => sum + (parseFloat(lot.nett_amount) || 0), 0)
                .toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>
              From {lots.filter(lot => lot.nett_amount && lot.nett_amount > 0).length} lots
            </div>
          </div>

          {/* Bora Progress Card */}
          <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderTop: "4px solid #5a78e5ff" }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600" }}>Bora Progress</span>
              <span style={{ fontSize: "24px" }}>📦</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827" }}>
              {boraProgress.completed}
              <span style={{ color: "#6B7280", fontSize: "20px", fontWeight: "400" }}>
                /{boraProgress.total}
              </span>
            </div>
            <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
              {boraProgress.remaining} remaining
            </div>
          </div>

          {/* Flap Sticker Progress Card */}
          <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderTop: "4px solid #5a78e5ff" }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600" }}>Flap Sticker</span>
              <span style={{ fontSize: "24px" }}>🏷️</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827" }}>
              {flapProgress.completed}
              <span style={{ color: "#6B7280", fontSize: "20px", fontWeight: "400" }}>
                /{flapProgress.total}
              </span>
            </div>
            <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
              {flapProgress.total - flapProgress.completed} remaining
            </div>
          </div>

          {/* Gate Pass Progress Card */}
          <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderTop: "4px solid #5a78e5ff" }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600" }}>Gate Pass</span>
              <span style={{ fontSize: "24px" }}>🚪</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827" }}>
              {gatePassProgress.completed}
              <span style={{ color: "#6B7280", fontSize: "20px", fontWeight: "400" }}>
                /{gatePassProgress.total}
              </span>
            </div>
            <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
              {gatePassProgress.total - gatePassProgress.completed} remaining
            </div>
          </div>

          {/* FRK Progress Card - Conditional */}
          {hasFRKLots() && (
            <div className="bg-white rounded-lg shadow-sm p-6" style={{ borderTop: "4px solid #5a78e5ff" }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600" }}>FRK Progress</span>
                <span style={{ fontSize: "24px" }}>🌾</span>
              </div>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827" }}>
                {frkProgress.completed}
                <span style={{ color: "#6B7280", fontSize: "20px", fontWeight: "400" }}>
                  /{frkProgress.total}
                </span>
              </div>
              <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
                {frkProgress.total - frkProgress.completed} remaining
              </div>
            </div>
          )}
        </div>
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b" style={{ borderColor: "#E5E7EB" }}>
          <button
            onClick={() => setActiveTab("lots")}
            className={`px-4 py-3 font-semibold transition ${activeTab === "lots" ? "border-b-2" : ""}`}
            style={{
              color: activeTab === "lots" ? "#1d39a0ff" : "#6B7280",
              borderBottomColor: activeTab === "lots" ? "#1d39a0ff" : "transparent",
            }}
          >
            Lots
          </button>
          <button
            onClick={() => setActiveTab("shipments")}
            className={`px-4 py-3 font-semibold transition ${activeTab === "shipments" ? "border-b-2" : ""}`}
            style={{
              color: activeTab === "shipments" ? "#2563EB" : "#6B7280",
              borderBottomColor: activeTab === "shipments" ? "#2563EB" : "transparent",
            }}
          >
            Shipments
          </button>
        </div>

        {/* Lots Tab */}
        {activeTab === "lots" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold" style={{ color: "#111827" }}>
                Lots ({lots.length})
              </h2>
              {(isBatchEditMode || isCostEstimationMode) && (
                <button
                  onClick={handleSelectAll}
                  className="text-sm font-medium px-3 py-1 rounded transition hover:shadow-sm"
                  style={{ backgroundColor: "#E5E7EB", color: "#111827" }}
                >
                  {selectedLotIds.size === lots.length ? "Deselect All" : "Select All"}
                </button>
              )}
            </div>
            <LotsTable
              lots={lots}
              isBatchEditMode={isBatchEditMode}
              isCostEstimationMode={isCostEstimationMode}
              selectedLotIds={selectedLotIds}
              onSelectLot={handleSelectLot}
              onLotClick={setSelectedLotId}
              onSelectAll={handleSelectAll}
            />
          </>
        )}

        {/* Shipments Tab */}
        {activeTab === "shipments" && (
          <ShipmentsTab
            dealId={dealId}
            lots={lots}
            shipments={shipments}
            setShipments={setShipments}
            onLotsUpdate={refreshLots}
          />
        )}
      </div>

      {/* Modals */}
      {selectedLotId && !isBatchEditMode && !isCostEstimationMode && (
        <LotDetailsModal
          dealId={dealId}
          lotId={selectedLotId}
          onClose={() => setSelectedLotId(null)}
        />
      )}

      {showBatchEditModal && (
        <BatchEditLotModal
          dealId={dealId}
          selectedLotIds={selectedLotIds}
          onClose={() => setShowBatchEditModal(false)}
          onSuccess={handleBatchEditSuccess}
        />
      )}

      {showConfirmDelete && (
        <ConfirmationModal
          title="Delete Deal"
          message="Are you sure you want to delete this deal? This action cannot be undone."
          onConfirm={handleDeleteDeal}
          onCancel={() => setShowConfirmDelete(false)}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {showDeliveryModal && (
        <DeliveryCompleteModal
          dealId={dealId}
          onClose={() => setShowDeliveryModal(false)}
          onSuccess={handleDeliveryCompleteSuccess}
        />
      )}
      
      {showCostEstimationModal && (
        <CostEstimationModal
          brokerId={deal.broker_id}
          dealId={dealId}
          selectedLotIds={selectedLotIds}
          onClose={() => setShowCostEstimationModal(false)}
          onSuccess={handleCostEstimationSuccess}
        />
      )}
    </>
  );
}