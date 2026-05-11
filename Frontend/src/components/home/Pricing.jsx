import { Link } from "react-router-dom";
import { Pencil, Check } from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#6c63ff] rounded-lg flex items-center justify-center">
            <Pencil color="white" size={16} />
          </div>
          <span className="text-[#26215C] font-semibold tracking-widest uppercase text-sm">
            Thinkboard
          </span>
        </Link>
        <Link
          to="/signup"
          className="bg-[#6c63ff] hover:bg-[#534AB7] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Get started free
        </Link>
      </header>

      {/* Hero */}
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-[#EEEDFE] text-[#6c63ff] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
          Pricing
        </div>
        <h1 className="text-4xl font-bold text-[#26215C] mb-4">
          Simple, honest pricing.
        </h1>
        <p className="text-gray-400 text-base max-w-md mx-auto">
          Thinkboard is free forever. No credit card. No hidden fees. No tricks.
        </p>

        {/* Pricing card */}
        <div className="mt-14 max-w-sm mx-auto bg-white rounded-2xl border border-[#6c63ff] shadow-lg overflow-hidden">

          {/* Card header */}
          <div className="bg-[#6c63ff] px-8 py-8 text-white text-center">
            <p className="text-sm font-medium uppercase tracking-widest opacity-80 mb-2">Free Forever</p>
            <div className="flex items-end justify-center gap-1">
              <span className="text-5xl font-bold">$0</span>
              <span className="text-sm opacity-70 mb-2">/ month</span>
            </div>
            <p className="text-xs opacity-70 mt-2">No credit card required</p>
          </div>

          {/* Features list */}
          <div className="px-8 py-8 text-left space-y-4">
            {[
              "Unlimited canvases",
              "Real-time collaboration",
              "Share with anyone via link",
              "Infinite canvas",
              "All drawing tools",
              "Export your work",
              "Secure cloud storage",
              "Open source forever",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EEEDFE] flex items-center justify-center flex-shrink-0">
                  <Check size={12} color="#6c63ff" strokeWidth={3} />
                </div>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="px-8 pb-8">
            <Link
              to="/signup"
              className="block w-full text-center bg-[#6c63ff] hover:bg-[#534AB7] text-white font-medium py-3 rounded-xl transition-colors text-sm"
            >
              Start drawing for free
            </Link>
          </div>
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-xs text-gray-400">
          Thinkboard is open source.{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6c63ff] hover:underline"
          >
            View on GitHub →
          </a>
        </p>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-8 py-6 text-center text-xs text-gray-400">
        © 2026 Thinkboard. All rights reserved.{" "}
        <Link to="/" className="text-[#6c63ff] hover:underline">Back to home</Link>
      </footer>
    </div>
  );
};

export default Pricing;