export default function ConfirmationModal({ title, message, onConfirm, onCancel, confirmText = "Yes", cancelText = "No" }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6" style={{ backgroundColor: "#F9FAFB" }}>
        <h2 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
          {title}
        </h2>
        <p className="mb-6 text-sm" style={{ color: "#6B7280" }}>
          {message}
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "#10B981", color: "white" }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "#EF4444", color: "white" }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
