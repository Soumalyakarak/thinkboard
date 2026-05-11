import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left: narrow form panel ── */}
      <div className="w-full md:w-[380px] flex-shrink-0 bg-white flex flex-col justify-center px-10 py-12 shadow-lg z-10">

        {/* Brand */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 bg-[#6c63ff] rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <span className="text-[#26215C] font-semibold tracking-widest uppercase text-sm">
            Thinkboard
          </span>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Welcome back</h2>
        <p className="text-sm text-gray-400 mb-6">Log in to your account to continue</p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#6c63ff] focus:ring-1 focus:ring-[#6c63ff]"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password with eye toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2.5 border border-gray-200 rounded-lg text-sm pr-10 focus:outline-none focus:border-[#6c63ff] focus:ring-1 focus:ring-[#6c63ff]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-xs text-[#6c63ff] hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-[#6c63ff] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#534AB7] transition-colors"
          >
            Login
          </button>

          <p className="text-xs text-center text-gray-400 pt-1">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#6c63ff] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right: big illustration panel ── */}
      <div className="hidden md:flex flex-1 bg-[#f0eeff] flex-col items-center justify-center gap-8 relative overflow-hidden">

        {/* Large background circle decoration */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#e0dcff] opacity-50 -top-20 -right-20" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#d4cfff] opacity-40 bottom-10 -left-16" />

        {/* Big illustration SVG */}
        <svg width="420" height="360" viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
          {/* Whiteboard frame */}
          <rect x="36" y="24" width="348" height="252" rx="16" fill="white" stroke="#6c63ff" strokeWidth="2.2" />
          {/* Toolbar */}
          <rect x="36" y="24" width="348" height="40" rx="16" fill="#EEEDFE" />
          <rect x="36" y="50" width="348" height="14" fill="#EEEDFE" />
          <circle cx="60" cy="44" r="7" fill="#6c63ff" />
          <circle cx="80" cy="44" r="7" fill="#9FE1CB" />
          <circle cx="100" cy="44" r="7" fill="#FAC775" />
          <line x1="136" y1="44" x2="364" y2="44" stroke="#AFA9EC" strokeWidth="1.2" strokeDasharray="5 4" />

          {/* Sticky — Ideas (purple) */}
          <rect x="58" y="90" width="108" height="78" rx="10" fill="#EEEDFE" stroke="#6c63ff" strokeWidth="1.4" />
          <text x="112" y="120" textAnchor="middle" fontSize="13" fill="#3C3489" fontFamily="sans-serif" fontWeight="600">Ideas</text>
          <line x1="72" y1="136" x2="152" y2="136" stroke="#AFA9EC" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="72" y1="148" x2="140" y2="148" stroke="#AFA9EC" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="72" y1="160" x2="130" y2="160" stroke="#AFA9EC" strokeWidth="1.2" strokeDasharray="4 3" />

          {/* Sticky — Design (teal) */}
          <rect x="186" y="90" width="108" height="78" rx="10" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="1.4" />
          <text x="240" y="120" textAnchor="middle" fontSize="13" fill="#085041" fontFamily="sans-serif" fontWeight="600">Design</text>
          <line x1="200" y1="136" x2="280" y2="136" stroke="#9FE1CB" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="200" y1="148" x2="268" y2="148" stroke="#9FE1CB" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="200" y1="160" x2="255" y2="160" stroke="#9FE1CB" strokeWidth="1.2" strokeDasharray="4 3" />

          {/* Sticky — Build (amber) */}
          <rect x="314" y="90" width="54" height="78" rx="10" fill="#FAEEDA" stroke="#BA7517" strokeWidth="1.4" />
          <text x="341" y="120" textAnchor="middle" fontSize="11" fill="#633806" fontFamily="sans-serif" fontWeight="600">Build</text>
          <line x1="324" y1="136" x2="358" y2="136" stroke="#EF9F27" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="324" y1="148" x2="354" y2="148" stroke="#EF9F27" strokeWidth="1" strokeDasharray="3 2" />

          {/* Sticky — Ship (pink) — bottom center */}
          <rect x="122" y="196" width="176" height="60" rx="10" fill="#FBEAF0" stroke="#D4537E" strokeWidth="1.4" />
          <text x="210" y="232" textAnchor="middle" fontSize="15" fill="#993556" fontFamily="sans-serif" fontWeight="600">Ship it 🚀</text>

          {/* Connector lines */}
          <path d="M112 168 Q112 182 170 196" stroke="#AFA9EC" strokeWidth="1.5" strokeDasharray="5 4" fill="none" />
          <path d="M240 168 Q240 182 248 196" stroke="#AFA9EC" strokeWidth="1.5" strokeDasharray="5 4" fill="none" />

          {/* Floating tags */}
          <rect x="44" y="200" width="68" height="22" rx="6" fill="none" stroke="#D4537E" strokeWidth="1.2" />
          <text x="78" y="215" textAnchor="middle" fontSize="10" fill="#993556" fontFamily="sans-serif">collaborate</text>

          {/* <rect x="308" y="96" width="50" height="20" rx="6" fill="none" stroke="#378ADD" strokeWidth="1.1" /> */}
          {/* <text x="333" y="110" textAnchor="middle" fontSize="9.5" fill="#185FA5" fontFamily="sans-serif">share</text> */}

          <rect x="316" y="192" width="68" height="20" rx="6" fill="none" stroke="#D85A30" strokeWidth="1.1" />
          <text x="350" y="206" textAnchor="middle" fontSize="9.5" fill="#993C1D" fontFamily="sans-serif">brainstorm</text>

          {/* Pencil icon top right of board */}
          <g transform="translate(318,56) rotate(-30)">
            <rect x="0" y="0" width="9" height="28" rx="2" fill="#6c63ff" />
            <polygon points="0,28 9,28 4.5,38" fill="#FAEEDA" />
            <line x1="0" y1="25" x2="9" y2="25" stroke="white" strokeWidth="1.2" />
          </g>

          {/* Easel legs */}
          <line x1="120" y1="276" x2="100" y2="324" stroke="#6c63ff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="300" y1="276" x2="320" y2="324" stroke="#6c63ff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="88" y1="324" x2="116" y2="324" stroke="#6c63ff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="308" y1="324" x2="336" y2="324" stroke="#6c63ff" strokeWidth="2.5" strokeLinecap="round" />

          {/* Person 1 — drawing */}
          <circle cx="348" cy="292" r="10" fill="#EEEDFE" stroke="#6c63ff" strokeWidth="1.5" />
          <line x1="348" y1="302" x2="348" y2="322" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" />
          <line x1="338" y1="310" x2="358" y2="310" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" />
          <line x1="348" y1="322" x2="340" y2="336" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" />
          <line x1="348" y1="322" x2="356" y2="336" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" />
          <line x1="358" y1="310" x2="368" y2="300" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" />

          {/* Person 2 — watching */}
          <circle cx="72" cy="296" r="10" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="1.5" />
          <line x1="72" y1="306" x2="72" y2="326" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" />
          <line x1="62" y1="314" x2="82" y2="314" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" />
          <line x1="72" y1="326" x2="64" y2="340" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" />
          <line x1="72" y1="326" x2="80" y2="340" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" />
          <line x1="62" y1="314" x2="52" y2="306" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Text below illustration */}
        <div className="relative z-10 text-center">
          <p className="text-[#3C3489] text-2xl font-semibold leading-snug mb-2">
            Think visually.<br />Create freely.
          </p>
          <p className="text-[#534AB7] text-sm">
            Ideate, collaborate & share — simply.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;