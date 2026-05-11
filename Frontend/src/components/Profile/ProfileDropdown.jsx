import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import { logout } from "../../utils/auth";

const ProfileDropdown = () => {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar */}
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full cursor-pointer font-semibold"
      >
        {user.name?.charAt(0).toUpperCase()}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 w-37 rounded-lg border bg-white shadow-lg z-50 overflow-hidden">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
