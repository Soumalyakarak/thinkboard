import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCanvas } from "../../utils/canvas";

const CreateCanvas = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateCanvas = async () => {
    try {
      setLoading(true);
      const { canvas } = await createCanvas(name);
      navigate(`/canvas/${canvas.id}`);
    } catch (err) {
      console.error(err);
      if (err.status === 401) {
        navigate("/login");
      } else {
        alert(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Canvas name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCreateCanvas()}
        className="w-56 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#6c63ff] focus:ring-1 focus:ring-[#6c63ff] bg-white"
      />
      <button
        onClick={handleCreateCanvas}
        disabled={loading}
        className="flex items-center gap-2 bg-[#6c63ff] hover:bg-[#534AB7] disabled:opacity-60 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
      >
        {/* Plus icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        {loading ? "Creating..." : "New Canvas"}
      </button>
    </div>
  );
};

export default CreateCanvas;