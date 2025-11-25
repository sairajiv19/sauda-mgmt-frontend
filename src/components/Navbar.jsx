// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import AddSaudaModal from "./AddSaudaModal";
// import AddBrokerModal from "./AddBrokerModal";
// import Toast from "./Toast";

// export default function Navbar({ onSearch, brokers, refreshBrokers }) {
//   const location = useLocation();
//   const currentPage = location.pathname;
//   const [showSaudaModal, setShowSaudaModal] = useState(false);
//   const [showBrokerModal, setShowBrokerModal] = useState(false);
//   const [toast, setToast] = useState(null);

//   const getTitle = () => {
//     switch (currentPage) {
//       case "/brokers":
//         return "Broker Dashboard";
//       default:
//         return "Sauda Dashboard";
//     }
//   };

//   const handleSaudaSuccess = (message, type = "success") => {
//     setToast({ message, type });
//     window.location.reload();
//   };

//   const handleBrokerSuccess = (message, type = "success") => {
//     setToast({ message, type });
//     refreshBrokers();
//   };

//   return (
//     <>
//       <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex justify-between items-center">
//             {/* Left: Home Button + Title */}
//             <div className="flex items-center gap-4">
//               <a
//                 href="/"
//                 className="text-white hover:text-blue-100 transition"
//                 title="Home"
//               >
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//                 </svg>
//               </a>
//               <h1 className="text-2xl font-bold text-white tracking-tight">
//                 {getTitle()}
//               </h1>
//             </div>
//             {/* Middle: Search bar (on deals and brokers pages) */}
//             {(currentPage === "/" || currentPage === "/brokers") && (
//               <div className="relative w-96">
//                 <input
//                   type="text"
//                   placeholder={currentPage === "/" ? "Search Sauda by name..." : "Search Brokers by name..."}
//                   onChange={(e) => onSearch(e.target.value)}
//                   className="w-full px-4 py-2.5 pl-10 rounded-lg bg-white/90 backdrop-blur-sm border border-blue-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white text-gray-800 placeholder-gray-500 transition"
//                 />
//                 <svg
//                   className="absolute left-3 top-3 h-5 w-5 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>
//             )}

//             {/* Right: Links + Add Button */}
//             <div className="flex gap-4 items-center">
//               <div className="flex gap-8">
//                 <a
//                   href="/"
//                   className={`relative px-1 py-2 text-sm font-semibold transition-colors ${
//                     currentPage === "/"
//                       ? "text-white"
//                       : "text-blue-100 hover:text-white"
//                   }`}
//                 >
//                   Deals
//                   {currentPage === "/" && (
//                     <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full" />
//                   )}
//                 </a>
//                 <a
//                   href="/brokers"
//                   className={`relative px-1 py-2 text-sm font-semibold transition-colors ${
//                     currentPage === "/brokers"
//                       ? "text-white"
//                       : "text-blue-100 hover:text-white"
//                   }`}
//                 >
//                   Brokers
//                   {currentPage === "/brokers" && (
//                     <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full" />
//                   )}
//                 </a>
//               </div>

//               <button
//                 onClick={() => {
//                   if (currentPage === "/brokers") {
//                     setShowBrokerModal(true);
//                   } else {
//                     setShowSaudaModal(true);
//                   }
//                 }}
//                 className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
//               >
//                 + Add {currentPage === "/brokers" ? "Broker" : "Sauda"}
//               </button>
//             </div>

//           </div>
//         </div>
//       </nav>

//       {showSaudaModal && (
//         <AddSaudaModal
//           onClose={() => setShowSaudaModal(false)}
//           onSuccess={handleSaudaSuccess}
//           brokers={brokers || []}
//         />
//       )}

//       {showBrokerModal && (
//         <AddBrokerModal
//           onClose={() => setShowBrokerModal(false)}
//           onSuccess={handleBrokerSuccess}
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
import { useLocation } from "react-router-dom";
import AddSaudaModal from "./AddSaudaModal";
import AddBrokerModal from "./AddBrokerModal";
import Toast from "./Toast";

export default function Navbar({ dealName, onSearch, brokers, refreshBrokers }) {
  const location = useLocation();
  const currentPage = location.pathname;
  const [showSaudaModal, setShowSaudaModal] = useState(false);
  const [showBrokerModal, setShowBrokerModal] = useState(false);
  const [toast, setToast] = useState(null);

  const showSearch = currentPage === "/" || currentPage === "/brokers";
  const showAddButton = currentPage === "/" || currentPage === "/brokers";

  const handleSaudaSuccess = (message, type = "success") => {
    setToast({ message, type });
    window.location.reload();
  };

  const handleBrokerSuccess = (message, type = "success") => {
    setToast({ message, type });
    refreshBrokers && refreshBrokers();
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Home icon + Title */}
            <div className="flex items-center gap-4 min-w-0">
              <a
                href="/"
                className="text-white hover:text-blue-100 transition flex-shrink-0"
                title="Home"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </a>
              <h1 className="text-xl font-bold text-white tracking-tight whitespace-nowrap">
                {dealName
                  ? dealName
                  : currentPage === "/brokers"
                  ? "Broker Management Dashboard"
                  : "Deal Management Dashboard"}
              </h1>
            </div>

            {/* Center: Search bar (only on main/brokers pages) */}
            {showSearch && (
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder={currentPage === "/" ? "Search Sauda by name..." : "Search Brokers by name..."}
                  onChange={(e) => onSearch && onSearch(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 rounded-lg bg-white/90 backdrop-blur-sm border border-blue-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white text-gray-800 placeholder-gray-500 transition"
                />
                <svg
                  className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            )}

            {/* Right: Navigation links + Add button */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="flex gap-6">
                <a
                  href="/"
                  className={`relative px-1 py-2 text-sm font-semibold transition-colors ${
                    currentPage === "/"
                      ? "text-white"
                      : "text-blue-100 hover:text-white"
                  }`}
                >
                  Deals
                  {currentPage === "/" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full" />
                  )}
                </a>
                <a
                  href="/brokers"
                  className={`relative px-1 py-2 text-sm font-semibold transition-colors ${
                    currentPage === "/brokers"
                      ? "text-white"
                      : "text-blue-100 hover:text-white"
                  }`}
                >
                  Brokers
                  {currentPage === "/brokers" && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full" />
                  )}
                </a>
              </div>
              {showAddButton && (
                <button
                  onClick={() => {
                    if (currentPage === "/brokers") {
                      setShowBrokerModal(true);
                    } else {
                      setShowSaudaModal(true);
                    }
                  }}
                  className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition whitespace-nowrap"
                >
                  + Add {currentPage === "/brokers" ? "Broker" : "Deal"}
                </button>
              )}
              {/* Deal Buddy button - white box with blue text */}
                  <a
                    href="http://localhost:9003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-blue-600 border border-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition whitespace-nowrap"
                    title="Deal Buddy (AI Agent)"
                  >
                    Deal Buddy
                  </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      {showSaudaModal && (
        <AddSaudaModal
          onClose={() => setShowSaudaModal(false)}
          onSuccess={handleSaudaSuccess}
          brokers={brokers || []}
        />
      )}
      {showBrokerModal && (
        <AddBrokerModal
          onClose={() => setShowBrokerModal(false)}
          onSuccess={handleBrokerSuccess}
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
