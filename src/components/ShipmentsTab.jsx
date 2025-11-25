// import { useEffect, useState } from "react";
// import { getDealShipments } from "../api/shipments";
// import AddShipmentModal from "./AddShipmentModal";
// import EditShipmentModal from "./EditShipmentModal";
// import BatchShipmentModal from "./BatchShipmentModal";
// import ConfirmationModal from "./ConfirmationModal";
// import { deleteShipment } from "../api/shipments";
// import Toast from "./Toast";

// export default function ShipmentsTab({ dealId, lots, onLotsUpdate }) {
//   const [shipments, setShipments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedShipmentIds, setSelectedShipmentIds] = useState(new Set());
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showBatchCreateModal, setShowBatchCreateModal] = useState(false);
//   const [showBatchUpdateModal, setShowBatchUpdateModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [editingShipment, setEditingShipment] = useState(null);
//   const [deleteShipmentId, setDeleteShipmentId] = useState(null);
//   const [deleteShipmentLotId, setDeleteShipmentLotId] = useState(null);
//   const [toast, setToast] = useState(null);

//   const loadShipments = async () => {
//     try {
//       setLoading(true);
//       const data = await getDealShipments(dealId);
//       // Handle both direct array and wrapped response
//       const shipmentsArray = data.response || data || [];
//       setShipments(Array.isArray(shipmentsArray) ? shipmentsArray : []);
//     } catch (error) {
//       console.error("Failed to load shipments:", error);
//       setShipments([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadShipments();
//   }, [dealId]);

//   const handleAddSuccess = () => {
//     setToast({ message: "Shipment created successfully!", type: "success" });
//     setShowAddModal(false);
//     loadShipments();
//     onLotsUpdate();
//   };

//   const handleEditSuccess = () => {
//     setToast({ message: "Shipment updated successfully!", type: "success" });
//     setShowEditModal(false);
//     loadShipments();
//     onLotsUpdate();
//   };

//   const handleBatchCreateSuccess = () => {
//     setToast({ message: "Shipments created successfully!", type: "success" });
//     setShowBatchCreateModal(false);
//     loadShipments();
//   };

//   const handleBatchUpdateSuccess = () => {
//     setToast({ message: "Shipments updated successfully!", type: "success" });
//     setShowBatchUpdateModal(false);
//     setSelectedShipmentIds(new Set());
//     loadShipments();
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await deleteShipment(dealId, deleteShipmentLotId, deleteShipmentId);
//       setToast({ message: "Shipment deleted successfully!", type: "success" });
//       setShowDeleteConfirm(false);
//       loadShipments();
//       onLotsUpdate();
//     } catch (error) {
//       setToast({ message: "Failed to delete shipment", type: "error" });
//     }
//   };

//   const handleSelectShipment = (shipmentId) => {
//     const newSelected = new Set(selectedShipmentIds);
//     if (newSelected.has(shipmentId)) {
//       newSelected.delete(shipmentId);
//     } else {
//       newSelected.add(shipmentId);
//     }
//     setSelectedShipmentIds(newSelected);
//   };

//   const handleSelectAll = () => {
//     if (selectedShipmentIds.size === shipments.length) {
//       setSelectedShipmentIds(new Set());
//     } else {
//       setSelectedShipmentIds(new Set(shipments.map(s => s.public_id)));
//     }
//   };

//   if (loading) {
//     return <div style={{ color: "#6B7280", padding: "2rem" }}>Loading shipments...</div>;
//   }

//   return (
//     <>
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold" style={{ color: "#111827" }}>
//             Shipments ({shipments.length})
//           </h2>
//           <div className="flex gap-3">
//             <button
//               onClick={() => setShowAddModal(true)}
//               className="px-4 py-2 rounded-lg text-sm font-medium text-white transition hover:shadow-md"
//               style={{ backgroundColor: "#2563EB" }}
//             >
//               + Add Shipment
//             </button>
//             <button
//               onClick={() => setShowBatchCreateModal(true)}
//               className="px-4 py-2 rounded-lg text-sm font-medium text-white transition hover:shadow-md"
//               style={{ backgroundColor: "#2563EB" }}
//             >
//               Batch Create
//             </button>
//             <button
//               onClick={() => setShowBatchUpdateModal(true)}
//               disabled={selectedShipmentIds.size === 0}
//               className="px-4 py-2 rounded-lg text-sm font-medium text-white transition hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//               style={{ backgroundColor: selectedShipmentIds.size === 0 ? "#D1D5DB" : "#2563EB" }}
//             >
//               Batch Update ({selectedShipmentIds.size})
//             </button>
//           </div>
//         </div>

//         {shipments.length === 0 ? (
//           <p style={{ color: "#6B7280" }}>No shipments found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm border-collapse">
//               <thead>
//                 <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "2px solid #E5E7EB" }}>
//                   <th className="p-3 text-left">
//                     <input
//                       type="checkbox"
//                       checked={selectedShipmentIds.size === shipments.length && shipments.length > 0}
//                       onChange={handleSelectAll}
//                       className="w-4 h-4"
//                     />
//                   </th>
//                   <th className="p-3 text-left" style={{ color: "#6B7280" }}>Lot No</th>
//                   <th className="p-3 text-left" style={{ color: "#6B7280" }}>Sent Bora</th>
//                   <th className="p-3 text-left" style={{ color: "#6B7280" }}>Bora Date</th>
//                   <th className="p-3 text-left" style={{ color: "#6B7280" }}>Bora Via</th>
//                   <th className="p-3 text-left" style={{ color: "#6B7280" }}>Flap Date</th>
//                   <th className="p-3 text-left" style={{ color: "#6B7280" }}>Flap Via</th>
//                   <th className="p-3 text-left" style={{ color: "#6B7280" }}>Gate Date</th>
//                   <th className="p-3 text-left" style={{ color: "#6B7280" }}>Gate Via</th>
//                   <th className="p-3 text-left" style={{ color: "#6B7280" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {shipments.map((shipment) => (
//                   <tr key={shipment.public_id} style={{ borderBottom: "1px solid #E5E7EB" }}>
//                     <td className="p-3">
//                       <input
//                         type="checkbox"
//                         checked={selectedShipmentIds.has(shipment.public_id)}
//                         onChange={() => handleSelectShipment(shipment.public_id)}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                     <td className="p-3" style={{ color: "#111827" }}>{shipment.rice_lot_no || "N/A"}</td>
//                     <td className="p-3" style={{ color: "#111827" }}>{shipment.sent_bora_count}</td>
//                     <td className="p-3" style={{ color: "#111827" }}>
//                       {shipment.bora_date ? new Date(shipment.bora_date).toLocaleDateString("en-GB") : "N/A"}
//                     </td>
//                     <td className="p-3" style={{ color: "#111827" }}>{shipment.bora_via || "N/A"}</td>
//                     <td className="p-3" style={{ color: "#111827" }}>
//                       {shipment.flap_sticker_date ? new Date(shipment.flap_sticker_date).toLocaleDateString("en-GB") : "N/A"}
//                     </td>
//                     <td className="p-3" style={{ color: "#111827" }}>{shipment.flap_sticker_via || "N/A"}</td>
//                     <td className="p-3" style={{ color: "#111827" }}>
//                       {shipment.gate_pass_date ? new Date(shipment.gate_pass_date).toLocaleDateString("en-GB") : "N/A"}
//                     </td>
//                     <td className="p-3" style={{ color: "#111827" }}>{shipment.gate_pass_via || "N/A"}</td>
//                     <td className="p-3 flex gap-2">
//                       <button
//                         onClick={() => {
//                           setEditingShipment(shipment);
//                           setShowEditModal(true);
//                         }}
//                         className="px-2 py-1 rounded text-xs font-medium text-white transition hover:opacity-90"
//                         style={{ backgroundColor: "#2563EB" }}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => {
//                           setDeleteShipmentId(shipment.public_id);
//                           setDeleteShipmentLotId(shipment.lot_id);
//                           setShowDeleteConfirm(true);
//                         }}
//                         className="px-2 py-1 rounded text-xs font-medium text-white transition hover:opacity-90"
//                         style={{ backgroundColor: "#EF4444" }}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {showAddModal && (
//         <AddShipmentModal
//           dealId={dealId}
//           lots={lots}
//           onClose={() => setShowAddModal(false)}
//           onSuccess={handleAddSuccess}
//         />
//       )}

//       {showEditModal && editingShipment && (
//         <EditShipmentModal
//           dealId={dealId}
//           shipment={editingShipment}
//           lots={lots}
//           onClose={() => {
//             setShowEditModal(false);
//             setEditingShipment(null);
//           }}
//           onSuccess={handleEditSuccess}
//         />
//       )}

//       {showBatchCreateModal && (
//         <BatchShipmentModal
//           dealId={dealId}
//           lots={lots}
//           mode="create"
//           onClose={() => setShowBatchCreateModal(false)}
//           onSuccess={handleBatchCreateSuccess}
//         />
//       )}

//       {showBatchUpdateModal && (
//         <BatchShipmentModal
//           dealId={dealId}
//           lots={lots}
//           mode="update"
//           selectedShipmentIds={selectedShipmentIds}
//           shipments={shipments}
//           onClose={() => setShowBatchUpdateModal(false)}
//           onSuccess={handleBatchUpdateSuccess}
//         />
//       )}

//       {showDeleteConfirm && (
//         <ConfirmationModal
//           title="Delete Shipment"
//           message="Are you sure you want to delete this shipment?"
//           onConfirm={handleDeleteConfirm}
//           onCancel={() => setShowDeleteConfirm(false)}
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
//     </>
//   );
// }

import { useState } from "react";
import { getDealShipments, deleteShipment } from "../api/shipments";
import AddShipmentModal from "./AddShipmentModal";
import EditShipmentModal from "./EditShipmentModal";
import BatchShipmentModal from "./BatchShipmentModal";
import ConfirmationModal from "./ConfirmationModal";
import Toast from "./Toast";

export default function ShipmentsTab({ 
  dealId, 
  lots, 
  shipments,
  setShipments,
  onLotsUpdate 
}) {
  const [selectedShipmentIds, setSelectedShipmentIds] = useState(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBatchCreateModal, setShowBatchCreateModal] = useState(false);
  const [showBatchUpdateModal, setShowBatchUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingShipment, setEditingShipment] = useState(null);
  const [deleteShipmentId, setDeleteShipmentId] = useState(null);
  const [deleteShipmentLotId, setDeleteShipmentLotId] = useState(null);
  const [toast, setToast] = useState(null);

  // ✅ Sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <span style={{ color: "#6B7280", fontSize: "12px" }}>⇅</span>;
    }
    return (
      <span style={{ color: "#2563EB", fontSize: "12px" }}>
        {sortConfig.direction === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const handleSort = (columnKey) => {
    let direction = "asc";

    if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key: columnKey, direction });
  };

  // ✅ Sorted output
  const sortedShipments = [...shipments].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Check if any shipment has FRK enabled
  const hasFRKShipments = shipments.some(shipment => shipment.frk === true);

  const refreshShipments = async () => {
    try {
      const data = await getDealShipments(dealId);
      const shipmentsArray = data.response || data || [];
      setShipments(Array.isArray(shipmentsArray) ? shipmentsArray : []);
    } catch (error) {
      console.error("Failed to load shipments:", error);
      setShipments([]);
    }
  };

  const handleAddSuccess = () => {
    setToast({ message: "Shipment created successfully!", type: "success" });
    setShowAddModal(false);
    refreshShipments();
    onLotsUpdate();
  };

  const handleEditSuccess = () => {
    setToast({ message: "Shipment updated successfully!", type: "success" });
    setShowEditModal(false);
    refreshShipments();
    onLotsUpdate();
  };

  const handleBatchCreateSuccess = () => {
    setToast({ message: "Shipments created successfully!", type: "success" });
    setShowBatchCreateModal(false);
    refreshShipments();
  };

  const handleBatchUpdateSuccess = () => {
    setToast({ message: "Shipments updated successfully!", type: "success" });
    setShowBatchUpdateModal(false);
    setSelectedShipmentIds(new Set());
    refreshShipments();
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteShipment(dealId, deleteShipmentLotId, deleteShipmentId);
      setToast({ message: "Shipment deleted successfully!", type: "success" });
      setShowDeleteConfirm(false);
      refreshShipments();
      onLotsUpdate();
    } catch (error) {
      setToast({ message: "Failed to delete shipment", type: "error" });
    }
  };

  const handleSelectShipment = (shipmentId) => {
    const newSelected = new Set(selectedShipmentIds);
    if (newSelected.has(shipmentId)) {
      newSelected.delete(shipmentId);
    } else {
      newSelected.add(shipmentId);
    }
    setSelectedShipmentIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedShipmentIds.size === shipments.length) {
      setSelectedShipmentIds(new Set());
    } else {
      setSelectedShipmentIds(new Set(shipments.map(s => s.public_id)));
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: "#111827" }}>
            Shipments ({shipments.length})
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition hover:shadow-md"
              style={{ backgroundColor: "#2563EB" }}
            >
              + Add Shipment
            </button>
            <button
              onClick={() => setShowBatchCreateModal(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition hover:shadow-md"
              style={{ backgroundColor: "#2563EB" }}
            >
              Batch Create
            </button>
            <button
              onClick={() => setShowBatchUpdateModal(true)}
              disabled={selectedShipmentIds.size === 0}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: selectedShipmentIds.size === 0 ? "#D1D5DB" : "#2563EB" }}
            >
              Batch Update ({selectedShipmentIds.size})
            </button>
          </div>
        </div>

        {shipments.length === 0 ? (
          <p style={{ color: "#6B7280" }}>No shipments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "2px solid #E5E7EB" }}>
                  <th className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedShipmentIds.size === shipments.length && shipments.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4"
                    />
                  </th>

                  {/* ✅ LOT NO WITH SORTING */}
                  <th
                    className="p-3 text-left cursor-pointer select-none"
                    style={{ color: "#6B7280" }}
                    onClick={() => handleSort("rice_lot_no")}
                  >
                    <div className="flex items-center gap-1">
                      Lot No <SortIcon columnKey="rice_lot_no" />
                    </div>
                  </th>

                  <th className="p-3 text-left" style={{ color: "#6B7280" }}>Sent Bora</th>
                  <th className="p-3 text-left" style={{ color: "#6B7280" }}>Bora Date</th>
                  <th className="p-3 text-left" style={{ color: "#6B7280" }}>Bora Via</th>
                  <th className="p-3 text-left" style={{ color: "#6B7280" }}>Flap Date</th>
                  <th className="p-3 text-left" style={{ color: "#6B7280" }}>Flap Via</th>
                  <th className="p-3 text-left" style={{ color: "#6B7280" }}>Gate Date</th>
                  <th className="p-3 text-left" style={{ color: "#6B7280" }}>Gate Via</th>

                  {hasFRKShipments && (
                    <>
                      <th className="p-3 text-left" style={{ color: "#6B7280" }}>FRK Date</th>
                      <th className="p-3 text-left" style={{ color: "#6B7280" }}>FRK Qty/Via</th>
                    </>
                  )}

                  <th className="p-3 text-left" style={{ color: "#6B7280" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedShipments.map((shipment) => (
                  <tr key={shipment.public_id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedShipmentIds.has(shipment.public_id)}
                        onChange={() => handleSelectShipment(shipment.public_id)}
                        className="w-4 h-4"
                      />
                    </td>

                    <td className="p-3" style={{ color: "#111827" }}>
                      {shipment.rice_lot_no || "N/A"}
                    </td>

                    <td className="p-3" style={{ color: "#111827" }}>
                      {shipment.sent_bora_count || "N/A"}
                    </td>

                    <td className="p-3" style={{ color: "#111827" }}>
                      {shipment.bora_date ? new Date(shipment.bora_date).toLocaleDateString("en-GB") : "N/A"}
                    </td>

                    <td className="p-3" style={{ color: "#111827" }}>
                      {shipment.bora_via || "N/A"}
                    </td>

                    <td className="p-3" style={{ color: "#111827" }}>
                      {shipment.flap_sticker_date ? new Date(shipment.flap_sticker_date).toLocaleDateString("en-GB") : "N/A"}
                    </td>

                    <td className="p-3" style={{ color: "#111827" }}>
                      {shipment.flap_sticker_via || "N/A"}
                    </td>

                    <td className="p-3" style={{ color: "#111827" }}>
                      {shipment.gate_pass_date ? new Date(shipment.gate_pass_date).toLocaleDateString("en-GB") : "N/A"}
                    </td>

                    <td className="p-3" style={{ color: "#111827" }}>
                      {shipment.gate_pass_via || "N/A"}
                    </td>

                    {hasFRKShipments && (
                      <>
                        <td className="p-3" style={{ color: "#111827" }}>
                          {shipment.frk && shipment.frk_bheja?.frk_date 
                            ? new Date(shipment.frk_bheja.frk_date).toLocaleDateString("en-GB") 
                            : "N/A"}
                        </td>

                        <td className="p-3" style={{ color: "#111827" }}>
                          {shipment.frk && shipment.frk_bheja?.frk_qty && shipment.frk_bheja?.frk_via
                            ? `${shipment.frk_bheja.frk_qty} / ${shipment.frk_bheja.frk_via}`
                            : "N/A"}
                        </td>
                      </>
                    )}

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingShipment(shipment);
                          setShowEditModal(true);
                        }}
                        className="px-2 py-1 rounded text-xs font-medium text-white transition hover:opacity-90"
                        style={{ backgroundColor: "#2563EB" }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setDeleteShipmentId(shipment.public_id);
                          setDeleteShipmentLotId(shipment.lot_id);
                          setShowDeleteConfirm(true);
                        }}
                        className="px-2 py-1 rounded text-xs font-medium text-white transition hover:opacity-90"
                        style={{ backgroundColor: "#EF4444" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* All Modals */}
      {showAddModal && (
        <AddShipmentModal
          dealId={dealId}
          lots={lots}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      {showEditModal && editingShipment && (
        <EditShipmentModal
          dealId={dealId}
          shipment={editingShipment}
          lots={lots}
          onClose={() => {
            setShowEditModal(false);
            setEditingShipment(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}

      {showBatchCreateModal && (
        <BatchShipmentModal
          dealId={dealId}
          lots={lots}
          mode="create"
          onClose={() => setShowBatchCreateModal(false)}
          onSuccess={handleBatchCreateSuccess}
        />
      )}

      {showBatchUpdateModal && (
        <BatchShipmentModal
          dealId={dealId}
          lots={lots}
          mode="update"
          selectedShipmentIds={selectedShipmentIds}
          shipments={shipments}
          onClose={() => setShowBatchUpdateModal(false)}
          onSuccess={handleBatchUpdateSuccess}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmationModal
          title="Delete Shipment"
          message="Are you sure you want to delete this shipment?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteConfirm(false)}
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
    </>
  );
}
