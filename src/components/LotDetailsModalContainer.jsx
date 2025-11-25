export default function LotDetailsModalContainer({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 border-b flex justify-between items-center p-4" style={{ backgroundColor: "#2563EB", borderColor: "#1E40AF" }}>
        <div className="w-8"></div>
        {title && (
          <h2 className="text-lg font-bold text-center flex-1" style={{ color: "#FFFFFF" }}>
            {title}
          </h2>
        )}
        {!title && <div className="flex-1"></div>}
        <button
          onClick={onClose}
          className="text-2xl font-bold hover:opacity-70 transition"
          style={{ color: "#FFFFFF" }}
        >
          ×
        </button>
      </div>
        {children}
      </div>
    </div>
  );
}
