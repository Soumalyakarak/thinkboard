import { useEffect, useState } from "react";
import { getAllCanvases, shareCanvas, deleteCanvas } from "../../utils/canvas";
import { Link, useNavigate } from "react-router-dom";

const CanvasList = () => {
  const [canvases, setCanvases] = useState([]);
  const [shareOpen, setShareOpen] = useState(null);
  const [email, setEmail] = useState("");
  const [shareLoading, setShareLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // canvasId
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCanvases()
      .then(setCanvases)
      .catch((err) => {
        if (err.status === 401) navigate("/login");
      });
  }, [navigate]);
  
  const handleShare = async (canvasId) => {
    if (!email) return alert("Enter an email");
    try {
      setShareLoading(true);
      await shareCanvas(canvasId, email);
      alert("Canvas shared successfully");
      setEmail("");
      setShareOpen(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setShareLoading(false);
    }
  };

  const handleDelete = async (canvasId) => {
    try {
      setDeleteLoading(true);
      await deleteCanvas(canvasId);
      setCanvases((prev) => prev.filter((c) => c._id !== canvasId));
      setDeleteConfirm(null);
    } catch (err) {
      alert(err.message || "Failed to delete canvas");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (canvases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        {/* Empty state illustration */}
        <div className="w-20 h-20 bg-[#EEEDFE] rounded-2xl flex items-center justify-center mb-4">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M8 12h8M12 8v8" />
          </svg>
        </div>
        <p className="text-[#3C3489] font-medium text-lg">No canvases yet</p>
        <p className="text-gray-400 text-sm mt-1">Create your first canvas to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {canvases.map((canvas) => (
        <div
          key={canvas._id}
          className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3 group relative"
        >
          {/* Top row: icon + title */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              {/* Canvas thumbnail icon */}
              <div className="w-10 h-10 flex-shrink-0 bg-[#f0eeff] rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <div className="min-w-0">
                <Link
                  to={`/canvas/${canvas._id}`}
                  className="block font-semibold text-[#26215C] hover:text-[#6c63ff] truncate transition-colors"
                >
                  {canvas.name || "Untitled Canvas"}
                </Link>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(canvas.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Delete button */}
            <button
              onClick={() => setDeleteConfirm(canvas._id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400"
              aria-label="Delete canvas"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-50" />

          {/* Bottom row: Open + Share */}
          <div className="flex items-center gap-2">
            <Link
              to={`/canvas/${canvas._id}`}
              className="flex-1 text-center text-xs font-medium text-[#6c63ff] bg-[#f0eeff] hover:bg-[#e8e4ff] py-1.5 rounded-lg transition-colors"
            >
              Open
            </Link>
            <button
              onClick={() => {
                setShareOpen(shareOpen === canvas._id ? null : canvas._id);
                setEmail("");
              }}
              className="flex-1 text-center text-xs font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 py-1.5 rounded-lg transition-colors"
            >
              Share
            </button>
          </div>

          {/* Share input (expanded) */}
          {shareOpen === canvas._id && (
            <div className="space-y-2 pt-1">
              <input
                type="email"
                placeholder="Enter email to share"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 px-3 py-1.5 text-sm rounded-lg focus:outline-none focus:border-[#6c63ff] focus:ring-1 focus:ring-[#6c63ff]"
              />
              <button
                onClick={() => handleShare(canvas._id)}
                disabled={shareLoading}
                className="w-full bg-[#6c63ff] text-white text-xs font-medium py-1.5 rounded-lg hover:bg-[#534AB7] disabled:opacity-60 transition-colors"
              >
                {shareLoading ? "Sharing..." : "Send Invite"}
              </button>
            </div>
          )}
        </div>
      ))}

      {/* ── Delete confirmation modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Delete canvas?</p>
                <p className="text-xs text-gray-400">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleteLoading}
                className="flex-1 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-60 rounded-lg transition-colors"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasList;