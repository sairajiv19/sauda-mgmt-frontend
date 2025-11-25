// import { useState } from "react";
// import { updateShipment } from "../api/shipments";
// import LotDetailsModalContainer from "./LotDetailsModalContainer";

// export default function EditShipmentModal({ dealId, shipment, lots, onClose, onSuccess }) {
//   const [formData, setFormData] = useState({
//     sent_bora_count: shipment.sent_bora_count || 0,
//     bora_date: shipment.bora_date ? shipment.bora_date.split("T")[0] : "",
//     bora_via: shipment.bora_via || "",
//     flap_sticker_date: shipment.flap_sticker_date ? shipment.flap_sticker_date.split("T")[0] : "",
//     flap_sticker_via: shipment.flap_sticker_via || "",
//     gate_pass_date: shipment.gate_pass_date ? shipment.gate_pass_date.split("T")[0] : "",
//     gate_pass_via: shipment.gate_pass_via || "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "number" ? parseInt(value) || 0 : value,
//     });
//   };

//   const cleanData = () => {
//     return {
//       sent_bora_count: formData.sent_bora_count ? formData.sent_bora_count : null,
//       bora_date: formData.bora_date ? new Date(formData.bora_date).toISOString() : null,
//       bora_via: formData.bora_via || null,
//       flap_sticker_date: formData.flap_sticker_date ? new Date(formData.flap_sticker_date).toISOString() : null,
//       flap_sticker_via: formData.flap_sticker_via || null,
//       gate_pass_date: formData.gate_pass_date ? new Date(formData.gate_pass_date).toISOString() : null,
//       gate_pass_via: formData.gate_pass_via || null,
//     };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const cleanedData = cleanData();
//       await updateShipment(shipment.public_id, cleanedData);
//       onSuccess();
//     } catch (error) {
//       console.error("Failed to update shipment:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <LotDetailsModalContainer onClose={onClose}>
//       <form onSubmit={handleSubmit} className="p-6 space-y-6 text-sm">
//         <div className="mb-4 p-3 rounded" style={{ backgroundColor: "#DBEAFE" }}>
//           <p style={{ color: "#1E40AF" }} className="text-sm font-medium">
//             Lot: {lots.find(l => l.public_id === shipment.lot_id)?.rice_lot_no || shipment.lot_id}
//           </p>
//         </div>

//         <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
//           <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Shipment Details</h3>
//           <div>
//             <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//               Sent Bora Count
//             </label>
//             <input
//               type="number"
//               name="sent_bora_count"
//               value={formData.sent_bora_count}
//               onChange={handleChange}
//               min="0"
//               className="w-full px-3 py-2 border rounded-lg"
//               style={{ borderColor: "#E5E7EB", color: "#111827" }}
//             />
//           </div>
//         </div>

//         <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
//           <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Bora Information</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Bora Date
//               </label>
//               <input
//                 type="date"
//                 name="bora_date"
//                 value={formData.bora_date}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Bora Via
//               </label>
//               <input
//                 type="text"
//                 name="bora_via"
//                 value={formData.bora_via}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty for null"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
//           <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Flap Sticker</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Flap Sticker Date
//               </label>
//               <input
//                 type="date"
//                 name="flap_sticker_date"
//                 value={formData.flap_sticker_date}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Flap Sticker Via
//               </label>
//               <input
//                 type="text"
//                 name="flap_sticker_via"
//                 value={formData.flap_sticker_via}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty for null"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
//           <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Gate Pass</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Gate Pass Date
//               </label>
//               <input
//                 type="date"
//                 name="gate_pass_date"
//                 value={formData.gate_pass_date}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Gate Pass Via
//               </label>
//               <input
//                 type="text"
//                 name="gate_pass_via"
//                 value={formData.gate_pass_via}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty for null"
//               />
//             </div>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 rounded-lg font-semibold text-white transition hover:opacity-90 mt-6"
//           style={{ backgroundColor: "#2563EB" }}
//         >
//           {loading ? "Updating..." : "Update Shipment"}
//         </button>
//       </form>
//     </LotDetailsModalContainer>
//   );
// }
import { useState } from "react";
import { updateShipment } from "../api/shipments";
import LotDetailsModalContainer from "./LotDetailsModalContainer";


export default function EditShipmentModal({ dealId, shipment, lots, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    sent_bora_count: shipment.sent_bora_count || 0,
    bora_date: shipment.bora_date ? shipment.bora_date.split("T")[0] : "",
    bora_via: shipment.bora_via || "",
    flap_sticker_date: shipment.flap_sticker_date ? shipment.flap_sticker_date.split("T")[0] : "",
    flap_sticker_via: shipment.flap_sticker_via || "",
    gate_pass_date: shipment.gate_pass_date ? shipment.gate_pass_date.split("T")[0] : "",
    gate_pass_via: shipment.gate_pass_via || "",
    // NEW: Initialize FRK fields from existing shipment data
    frk: shipment.frk || false,
    frk_qty: shipment.frk_bheja?.frk_qty || "",
    frk_via: shipment.frk_bheja?.frk_via || "",
    frk_date: shipment.frk_bheja?.frk_date ? shipment.frk_bheja.frk_date.split("T")[0] : "",
  });
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "number" ? parseInt(value) || 0 : value,
      });
    }
  };


  const cleanData = () => {
    const baseData = {
      sent_bora_count: formData.sent_bora_count ? formData.sent_bora_count : null,
      bora_date: formData.bora_date ? new Date(formData.bora_date).toISOString() : null,
      bora_via: formData.bora_via || null,
      flap_sticker_date: formData.flap_sticker_date ? new Date(formData.flap_sticker_date).toISOString() : null,
      flap_sticker_via: formData.flap_sticker_via || null,
      gate_pass_date: formData.gate_pass_date ? new Date(formData.gate_pass_date).toISOString() : null,
      gate_pass_via: formData.gate_pass_via || null,
      frk: formData.frk,  // Always include FRK boolean
    };

    // Only include frk_bheja if FRK is enabled
    if (formData.frk) {
      baseData.frk_bheja = {
        frk_qty: formData.frk_qty ? parseFloat(formData.frk_qty) : null,
        frk_via: formData.frk_via || null,
        frk_date: formData.frk_date ? new Date(formData.frk_date).toISOString() : null,
      };
    }

    return baseData;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanedData = cleanData();
      await updateShipment(shipment.public_id, cleanedData);
      onSuccess();
    } catch (error) {
      console.error("Failed to update shipment:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <LotDetailsModalContainer onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-6 text-sm">
        <div className="mb-4 p-3 rounded" style={{ backgroundColor: "#DBEAFE" }}>
          <p style={{ color: "#1E40AF" }} className="text-sm font-medium">
            Lot: {lots.find(l => l.public_id === shipment.lot_id)?.rice_lot_no || shipment.lot_id}
          </p>
        </div>


        <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
          <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Shipment Details</h3>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
              Sent Bora Count
            </label>
            <input
              type="number"
              name="sent_bora_count"
              value={formData.sent_bora_count}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border rounded-lg"
              style={{ borderColor: "#E5E7EB", color: "#111827" }}
            />
          </div>
        </div>


        <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
          <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Bora Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Bora Date
              </label>
              <input
                type="date"
                name="bora_date"
                value={formData.bora_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Bora Via
              </label>
              <input
                type="text"
                name="bora_via"
                value={formData.bora_via}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
                placeholder="Leave empty for null"
              />
            </div>
          </div>
        </div>


        <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
          <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Flap Sticker</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Flap Sticker Date
              </label>
              <input
                type="date"
                name="flap_sticker_date"
                value={formData.flap_sticker_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Flap Sticker Via
              </label>
              <input
                type="text"
                name="flap_sticker_via"
                value={formData.flap_sticker_via}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
                placeholder="Leave empty for null"
              />
            </div>
          </div>
        </div>


        <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
          <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Gate Pass</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Gate Pass Date
              </label>
              <input
                type="date"
                name="gate_pass_date"
                value={formData.gate_pass_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                Gate Pass Via
              </label>
              <input
                type="text"
                name="gate_pass_via"
                value={formData.gate_pass_via}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#111827" }}
                placeholder="Leave empty for null"
              />
            </div>
          </div>
        </div>


        {/* NEW: FRK Section */}
        <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              name="frk"
              checked={formData.frk}
              onChange={handleChange}
              className="w-4 h-4"
              style={{ accentColor: "#2563EB" }}
            />
            <label className="font-semibold" style={{ color: "#111827" }}>
              FRK (Fortified Rice Kernel)
            </label>
          </div>

          {/* Conditional FRK fields */}
          {formData.frk && (
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                  FRK Quantity
                </label>
                <input
                  type="number"
                  name="frk_qty"
                  value={formData.frk_qty}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-lg"
                  style={{ borderColor: "#E5E7EB", color: "#111827" }}
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                  FRK Via
                </label>
                <input
                  type="text"
                  name="frk_via"
                  value={formData.frk_via}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  style={{ borderColor: "#E5E7EB", color: "#111827" }}
                  placeholder="Enter via"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
                  FRK Date
                </label>
                <input
                  type="date"
                  name="frk_date"
                  value={formData.frk_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  style={{ borderColor: "#E5E7EB", color: "#111827" }}
                />
              </div>
            </div>
          )}
        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white transition hover:opacity-90 mt-6"
          style={{ backgroundColor: "#2563EB" }}
        >
          {loading ? "Updating..." : "Update Shipment"}
        </button>
      </form>
    </LotDetailsModalContainer>
  );
}
