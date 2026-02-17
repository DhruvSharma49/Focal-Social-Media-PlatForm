import { useState } from "react";

export default function Help() {
  const reports = [
    { title: "Follow Request Issue", desc: "Unable to send or accept follow requests." },
    { title: "Notification Problem", desc: "Notifications are not appearing properly." },
    { title: "Privacy Setting Bug", desc: "Account privacy not updating correctly." },
    { title: "Login / Authentication Error", desc: "Facing login or session related problems." },
  ];

  const [selectedReport, setSelectedReport] = useState(null);
  const [customIssue, setCustomIssue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendReport = (text) => {
    if (!text.trim()) return;
    setMessage("Your report has been submitted successfully ✅");
    setShowModal(true);
    setSelectedReport(null);
    setCustomIssue("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-10 border-b border-gray-300 dark:border-gray-700 pb-4">
          Help & Support Center
        </h1>

        {/* -------- PREDEFINED REPORTS -------- */}
        <h2 className="text-xl font-semibold mb-6">Quick Report</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 rounded-xl p-6 hover:border-blue-500 transition"
            >
              <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{report.desc}</p>

              {selectedReport === index ? (
                <button
                  onClick={() => handleSendReport(report.title)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                  Send Report
                </button>
              ) : (
                <button
                  onClick={() => setSelectedReport(index)}
                  className="bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-black dark:text-white px-5 py-2 rounded-lg transition"
                >
                  Report This
                </button>
              )}
            </div>
          ))}
        </div>

        {/* -------- CUSTOM ISSUE SECTION -------- */}
        <div className="mt-16 bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Describe Your Own Issue</h2>

          <textarea
            value={customIssue}
            onChange={(e) => setCustomIssue(e.target.value)}
            placeholder="Explain the problem you are facing..."
            rows="4"
            className="w-full p-4 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-black dark:text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
          />

          <button
            onClick={() => handleSendReport(customIssue)}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            Send Custom Report
          </button>
        </div>

      </div>

      {/* -------- CONFIRMATION MODAL -------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-8 rounded-xl text-center w-96 transition-colors duration-300">
            <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">Thank You!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
