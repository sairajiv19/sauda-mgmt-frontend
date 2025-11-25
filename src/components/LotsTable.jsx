import { useState } from "react";

export default function LotsTable({ 
  lots, 
  isBatchEditMode, 
  isCostEstimationMode,
  selectedLotIds, 
  onSelectLot, 
  onLotClick,
  onSelectAll 
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedLots = [...lots].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key] || 0;
    const bValue = b[sortConfig.key] || 0;
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const isInSelectionMode = isBatchEditMode || isCostEstimationMode;

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <span style={{ color: "#6B7280", fontSize: "12px" }}>⇅</span>;
    }
    return (
      <span style={{ color: "#2563EB", fontSize: "12px" }}>
        {sortConfig.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const getRowBackgroundColor = (lot, isSelected) => {
    if (isInSelectionMode) {
      if (isSelected) {
        return "#FEF3C7"; // Selected - light yellow
      }
      return "#F3F4F6"; // Unselected - light gray
    }
    return "#FFFFFF"; // White background for all rows
  };


  return (
    <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "#E5E7EB" }}>
      <table className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
        <thead style={{ backgroundColor: "#F9FAFB", borderBottom: "2px solid #E5E7EB" }}>
          <tr>
            {isInSelectionMode && (
              <th className="px-4 py-3 text-left" style={{ width: "50px" }}>
                <input
                  type="checkbox"
                  checked={selectedLotIds.size === lots.length && lots.length > 0}
                  onChange={onSelectAll}
                  className="w-5 h-5 cursor-pointer"
                  style={{ accentColor: "#2563EB" }}
                />
              </th>
            )}
            <th 
              className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-gray-100 transition"
              style={{ color: "#111827" }}
              onClick={() => handleSort('rice_lot_no')}
            >
              <div className="flex items-center gap-2">
                Lot Number
                <SortIcon columnKey="rice_lot_no" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-gray-100 transition"
              style={{ color: "#111827" }}
              onClick={() => handleSort('rice_pass_date')}
            >
              <div className="flex items-center gap-2">
                Pass Date
                <SortIcon columnKey="rice_pass_date" />
              </div>
            </th>
            <th className="px-4 py-3 text-left font-semibold" style={{ color: "#111827" }}>
              Shipment Center
            </th>
            <th 
              className="px-4 py-3 text-right font-semibold cursor-pointer hover:bg-gray-100 transition"
              style={{ color: "#111827" }}
              onClick={() => handleSort('total_bora_count')}
            >
              <div className="flex items-center justify-end gap-2">
                Bora Count
                <SortIcon columnKey="total_bora_count" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-right font-semibold cursor-pointer hover:bg-gray-100 transition"
              style={{ color: "#111827" }}
              onClick={() => handleSort('qtl')}
            >
              <div className="flex items-center justify-end gap-2">
                Rice Qty (QTL)
                <SortIcon columnKey="qtl" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-right font-semibold cursor-pointer hover:bg-gray-100 transition"
              style={{ color: "#111827" }}
              onClick={() => handleSort('moisture_cut')}
            >
              <div className="flex items-center justify-end gap-2">
                Moisture Cut
                <SortIcon columnKey="moisture_cut" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-right font-semibold cursor-pointer hover:bg-gray-100 transition"
              style={{ color: "#111827" }}
              onClick={() => handleSort('qi_expense')}
            >
              <div className="flex items-center justify-end gap-2">
                QI Expense
                <SortIcon columnKey="qi_expense" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-right font-semibold cursor-pointer hover:bg-gray-100 transition"
              style={{ color: "#111827" }}
              onClick={() => handleSort('lot_dalali_expense')}
            >
              <div className="flex items-center justify-end gap-2">
                Dalali Expense
                <SortIcon columnKey="lot_dalali_expense" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-right font-semibold cursor-pointer hover:bg-gray-100 transition"
              style={{ color: "#111827" }}
              onClick={() => handleSort('other_expenses')}
            >
              <div className="flex items-center justify-end gap-2">
                Other Expenses
                <SortIcon columnKey="other_expenses" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-right font-semibold cursor-pointer hover:bg-gray-100 transition"
              style={{ color: "#111827" }}
              onClick={() => handleSort('brokerage')}
            >
              <div className="flex items-center justify-end gap-2">
                Brokerage
                <SortIcon columnKey="brokerage" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-right font-semibold cursor-pointer hover:bg-gray-100 transition"
              style={{ color: "#111827" }}
              onClick={() => handleSort('nett_amount')}
            >
              <div className="flex items-center justify-end gap-2">
                Net Amount
                <SortIcon columnKey="nett_amount" />
              </div>
            </th>
            <th className="px-4 py-3 text-center font-semibold" style={{ color: "#111827", width: "100px" }}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedLots.map((lot, index) => {
            const isSelected = selectedLotIds.has(lot.public_id);
            const rowBgColor = getRowBackgroundColor(lot, isSelected);

            return (
              <tr
                key={lot.public_id}
                className="transition hover:shadow-sm"
                style={{
                  backgroundColor: rowBgColor,
                  borderBottom: index !== sortedLots.length - 1 ? "1px solid #E5E7EB" : "none",
                  opacity: isInSelectionMode && !isSelected ? 0.6 : 1,
                  cursor: isInSelectionMode ? "pointer" : "default"
                }}
                onClick={() => {
                  if (isInSelectionMode) {
                    onSelectLot(lot.public_id);
                  }
                }}
              >
                {isInSelectionMode && (
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation();
                        onSelectLot(lot.public_id);
                      }}
                      className="w-5 h-5 cursor-pointer"
                      style={{ accentColor: "#2563EB" }}
                    />
                  </td>
                )}
                <td className="px-4 py-3 font-medium" style={{ color: "#111827" }}>
                  {lot.rice_lot_no || "N/A"}
                </td>
                <td className="px-4 py-3" style={{ color: "#111827" }}>
                  {lot.rice_pass_date ? new Date(lot.rice_pass_date).toLocaleDateString("en-GB") : "N/A"}
                </td>
                <td className="px-4 py-3" style={{ color: "#111827" }}>
                  {lot.rice_deposit_centre || "N/A"}
                </td>
                <td className="px-4 py-3 text-right" style={{ color: "#111827" }}>
                  {lot.total_bora_count || 0}
                </td>
                <td className="px-4 py-3 text-right" style={{ color: "#111827" }}>
                  {lot.qtl ? parseFloat(lot.qtl).toFixed(2) : "0.00"}
                </td>
                <td className="px-4 py-3 text-right" style={{ color: "#111827" }}>
                  {lot.moisture_cut || 0}
                </td>
                <td className="px-4 py-3 text-right" style={{ color: "#111827" }}>
                  ₹{lot.qi_expense ? parseFloat(lot.qi_expense).toLocaleString('en-IN') : "0"}
                </td>
                <td className="px-4 py-3 text-right" style={{ color: "#111827" }}>
                  ₹{lot.lot_dalali_expense ? parseFloat(lot.lot_dalali_expense).toLocaleString('en-IN') : "0"}
                </td>
                <td className="px-4 py-3 text-right" style={{ color: "#111827" }}>
                  ₹{lot.other_expenses ? parseFloat(lot.other_expenses).toLocaleString('en-IN') : "0"}
                </td>
                <td className="px-4 py-3 text-right" style={{ color: "#111827" }}>
                  ₹{lot.brokerage || 0}
                </td>
                <td className="px-4 py-3 text-right font-semibold" style={{ color: "#2563EB" }}>
                  ₹{lot.nett_amount ? parseFloat(lot.nett_amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isInSelectionMode) {
                        onLotClick(lot.public_id);
                      }
                    }}
                    disabled={isInSelectionMode}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "#2563EB",
                      color: "#FFFFFF"
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>
      {lots.length === 0 && (
        <div className="text-center py-8" style={{ color: "#6B7280" }}>
          No lots found for this deal.
        </div>
      )}
    </div>
  );
}
