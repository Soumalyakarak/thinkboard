import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCanvas from "../Canvas/CreateCanvas";
import CanvasList from "../Canvas/CanvasList";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fetch logged-in user info
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(console.error);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-[#f5f4ff]">

      {/* ── Navbar ── */}
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#6c63ff] rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <span className="text-[#26215C] font-semibold tracking-widest uppercase text-sm">Thinkboard</span>
        </div>

        {/* Avatar with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-9 h-9 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[#6c63ff] font-semibold text-sm hover:bg-[#dddaf9] transition-colors focus:outline-none"
          >
            {getInitials(user?.name)}
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">

              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-semibold text-[#26215C] truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-400 truncate mt-0.5">
                  {user?.email || ""}
                </p>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <button
                  onClick={() => { setDropdownOpen(false); navigate("/profile"); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="max-w-6xl mx-auto px-8 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#26215C]">My Canvases</h1>
            <p className="text-sm text-gray-400 mt-1">Pick up where you left off, or start something new.</p>
          </div>
          <CreateCanvas />
        </div>

        <CanvasList />
      </main>
    </div>
  );
};

export default Dashboard;