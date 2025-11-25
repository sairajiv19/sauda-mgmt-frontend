// import { useState } from "react";
// import { batchUpdateLots } from "../api/lots";
// import LotDetailsModalContainer from "./LotDetailsModalContainer";

// export default function BatchEditLotModal({ dealId, selectedLotIds, onClose, onSuccess }) {
//   const [formData, setFormData] = useState({
//     rice_pass_date: "",
//     rice_deposit_centre: "",
//     qtl: "",
//     rice_bags_quantity: "",
//     moisture_cut: "",
//     net_rice_bought: "",
//     qi_expense: "",
//     lot_dalali_expense: "",
//     other_expenses: "",
//     brokerage: "",
//     total_bora_count: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const updateData = {};

//       if (formData.rice_pass_date) updateData.rice_pass_date = new Date(formData.rice_pass_date).toISOString();
//       if (formData.rice_deposit_centre) updateData.rice_deposit_centre = formData.rice_deposit_centre;
//       if (formData.qtl) updateData.qtl = parseFloat(formData.qtl);
//       if (formData.rice_bags_quantity) updateData.rice_bags_quantity = parseInt(formData.rice_bags_quantity);
//       if (formData.moisture_cut !== "") updateData.moisture_cut = parseFloat(formData.moisture_cut);
//       if (formData.net_rice_bought !== "") updateData.net_rice_bought = parseFloat(formData.net_rice_bought);
//       if (formData.qi_expense !== "") updateData.qi_expense = parseFloat(formData.qi_expense);
//       if (formData.lot_dalali_expense !== "") updateData.lot_dalali_expense = parseFloat(formData.lot_dalali_expense);
//       if (formData.other_expenses !== "") updateData.other_expenses = parseFloat(formData.other_expenses);
//       if (formData.brokerage !== "") updateData.brokerage = parseFloat(formData.brokerage);
//       if (formData.total_bora_count !== "") updateData.total_bora_count = parseInt(formData.total_bora_count);

//       const batchUpdateData = {
//         public_lot_ids: Array.from(selectedLotIds),
//         update_data: updateData,
//       };

//       await batchUpdateLots(dealId, batchUpdateData);
//       onSuccess(`Batch updated ${selectedLotIds.size} lots successfully!`);
//       onClose();
//     } catch (error) {
//       onSuccess("Failed to batch update lots", "error");
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <LotDetailsModalContainer onClose={onClose}>
//       <form onSubmit={handleSubmit} className="p-6 space-y-6 text-sm">
//         <div className="mb-4 p-3 rounded" style={{ backgroundColor: "#DBEAFE" }}>
//           <p style={{ color: "#1E40AF" }} className="text-sm font-medium">
//             Updating {selectedLotIds.size} lot(s). Fill only the fields you want to update.
//           </p>
//         </div>

//         {/* Rice Info Section */}
//         <div>
//           <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Rice Information</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Rice Deposit Centre
//               </label>
//               <input
//                 type="text"
//                 name="rice_deposit_centre"
//                 value={formData.rice_deposit_centre}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty to skip"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Rice Pass Date
//               </label>
//               <input
//                 type="date"
//                 name="rice_pass_date"
//                 value={formData.rice_pass_date}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Quantity Section */}
//         <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
//           <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Quantity</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Total Bora Count
//               </label>
//               <input
//                 type="number"
//                 name="total_bora_count"
//                 value={formData.total_bora_count}
//                 onChange={handleChange}
//                 step="1"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty to skip"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 QTL (Quintals)
//               </label>
//               <input
//                 type="number"
//                 name="qtl"
//                 value={formData.qtl}
//                 onChange={handleChange}
//                 step="0.01"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty to skip"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Rice Bags Quantity
//               </label>
//               <input
//                 type="number"
//                 name="rice_bags_quantity"
//                 value={formData.rice_bags_quantity}
//                 onChange={handleChange}
//                 step="1"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty to skip"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Quality Section */}
//         <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
//           <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Quality</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Moisture Cut
//               </label>
//               <input
//                 type="number"
//                 name="moisture_cut"
//                 value={formData.moisture_cut}
//                 onChange={handleChange}
//                 step="0.01"
//                 min="0"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty to skip"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Net Rice Bought
//               </label>
//               <input
//                 type="number"
//                 name="net_rice_bought"
//                 value={formData.net_rice_bought}
//                 onChange={handleChange}
//                 step="0.01"
//                 min="0"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty to skip"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Expenses Section */}
//         <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
//           <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Expenses</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 QI Expense
//               </label>
//               <input
//                 type="number"
//                 name="qi_expense"
//                 value={formData.qi_expense}
//                 onChange={handleChange}
//                 step="0.01"
//                 min="0"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty to skip"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Dalali Expense
//               </label>
//               <input
//                 type="number"
//                 name="lot_dalali_expense"
//                 value={formData.lot_dalali_expense}
//                 onChange={handleChange}
//                 step="0.01"
//                 min="0"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty to skip"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Other Expenses
//               </label>
//               <input
//                 type="number"
//                 name="other_expenses"
//                 value={formData.other_expenses}
//                 onChange={handleChange}
//                 step="0.01"
//                 min="0"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty to skip"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
//                 Brokerage
//               </label>
//               <input
//                 type="number"
//                 name="brokerage"
//                 value={formData.brokerage}
//                 onChange={handleChange}
//                 step="0.01"
//                 min="0"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 style={{ borderColor: "#E5E7EB", color: "#111827" }}
//                 placeholder="Leave empty to skip"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 rounded-lg font-semibold text-white transition hover:opacity-90 mt-6"
//           style={{ backgroundColor: "#2563EB" }}
//         >
//           {loading ? "Updating..." : "Batch Update Lots"}
//         </button>
//       </form>
//     </LotDetailsModalContainer>
//   );
// }
import { useState } from "react";
import { batchUpdateLots } from "../api/lots";
import LotDetailsModalContainer from "./LotDetailsModalContainer";

export default function BatchEditLotModal({ dealId, selectedLotIds, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    rice_pass_date: "",
    rice_deposit_centre: "",
    qtl: "",
    rice_bags_quantity: "",
    moisture_cut: "",
    net_rice_bought: "",
    qi_expense: "",
    lot_dalali_expense: "",
    other_expenses: "",
    brokerage: "",
    total_bora_count: "",
  });
  const [riceLotNumbers, setRiceLotNumbers] = useState("");
  const [lotNumbersError, setLotNumbersError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate rice lot numbers ONLY if provided
    const trimmedInput = riceLotNumbers.trim();
    let numberArr = [];
    
    if (trimmedInput) {
      numberArr = trimmedInput.split(/\s+/).filter(num => num);
      
      // If user entered something, validate count
      if (numberArr.length !== selectedLotIds.size) {
        setLotNumbersError(`Please enter exactly ${selectedLotIds.size} lot numbers or leave empty.`);
        setLoading(false);
        return;
      }
      
      // Check for uniqueness
      if (new Set(numberArr).size !== selectedLotIds.size) {
        setLotNumbersError("Lot numbers must be unique.");
        setLoading(false);
        return;
      }
    }

    try {
      const updateData = {};

      if (formData.rice_pass_date) updateData.rice_pass_date = new Date(formData.rice_pass_date).toISOString();
      if (formData.rice_deposit_centre) updateData.rice_deposit_centre = formData.rice_deposit_centre;
      if (formData.qtl) updateData.qtl = parseFloat(formData.qtl);
      if (formData.rice_bags_quantity) updateData.rice_bags_quantity = parseInt(formData.rice_bags_quantity);
      if (formData.moisture_cut !== "") updateData.moisture_cut = parseFloat(formData.moisture_cut);
      if (formData.net_rice_bought !== "") updateData.net_rice_bought = parseFloat(formData.net_rice_bought);
      if (formData.qi_expense !== "") updateData.qi_expense = parseFloat(formData.qi_expense);
      if (formData.lot_dalali_expense !== "") updateData.lot_dalali_expense = parseFloat(formData.lot_dalali_expense);
      if (formData.other_expenses !== "") updateData.other_expenses = parseFloat(formData.other_expenses);
      if (formData.brokerage !== "") updateData.brokerage = parseFloat(formData.brokerage);
      if (formData.total_bora_count !== "") updateData.total_bora_count = parseInt(formData.total_bora_count);

      const batchUpdateData = {
        public_lot_ids: Array.from(selectedLotIds),
        update_data: updateData,
      };

      // Only add rice_lot_no if user provided values
      if (numberArr.length > 0) {
        batchUpdateData.rice_lot_no = numberArr;
      }

      await batchUpdateLots(dealId, batchUpdateData);
      onSuccess(`Batch updated ${selectedLotIds.size} lots successfully!`);
      onClose();
    } catch (error) {
      onSuccess("Failed to batch update lots", "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <LotDetailsModalContainer onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-6 text-sm">
        <div className="mb-4 p-3 rounded" style={{ backgroundColor: "#DBEAFE" }}>
          <p style={{ color: "#1E40AF" }} className="text-sm font-medium">
            Updating {selectedLotIds.size} lot(s). Fill only the fields you want to update.
          </p>
        </div>

        {/* Lot Numbers Section */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "#6B7280" }}>
            Rice Lot Numbers <span style={{ color: "#EF4444" }}>*</span>
          </label>
          <input
            type="text"
            name="rice_lot_numbers"
            value={riceLotNumbers}
            onChange={e => {
              setRiceLotNumbers(e.target.value);
              setLotNumbersError("");
            }}
            className="w-full px-3 py-2 border rounded-lg"
            style={{ borderColor: lotNumbersError ? "#EF4444" : "#E5E7EB", color: "#111827" }}
            placeholder={`Enter ${selectedLotIds.size} lot numbers (space separated, e.g., 14120 14121 14122)`}
          />
          {lotNumbersError && (
            <p style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px" }}>{lotNumbersError}</p>
          )}
          <p style={{ color: "#6B7280", fontSize: "12px", marginTop: "4px" }}>
            Leave empty to skip, or enter exactly {selectedLotIds.size} unique lot numbers separated by spaces
          </p>
        </div>

        {/* Rice Info Section */}
        <div>
          <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Rice Information</h3>
          <div className="grid grid-cols-2 gap-4">
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
                placeholder="Leave empty to skip"
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
                placeholder="Leave empty to skip"
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
                placeholder="Leave empty to skip"
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
                placeholder="Leave empty to skip"
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
                placeholder="Leave empty to skip"
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
                placeholder="Leave empty to skip"
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
                placeholder="Leave empty to skip"
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
                placeholder="Leave empty to skip"
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
                placeholder="Leave empty to skip"
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
                placeholder="Leave empty to skip"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white transition hover:opacity-90 mt-6"
          style={{ backgroundColor: loading ? "#9CA3AF" : "#2563EB", cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Updating..." : "Batch Update Lots"}
        </button>
      </form>
    </LotDetailsModalContainer>
  );
}
