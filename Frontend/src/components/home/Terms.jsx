import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";

const Terms = () => {
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
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">

        <h1 className="text-3xl font-bold text-[#26215C] mb-2">Terms of Use</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: May 2026</p>

        <div className="space-y-10 text-gray-600 text-sm leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Thinkboard, you agree to be bound by these Terms of Use.
              If you do not agree with any part of these terms, please do not use the service.
              Thinkboard is a free, open-source online whiteboard tool available to anyone.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">2. Your Data & Content</h2>
            <p>
              You retain full ownership of any content you create on Thinkboard — including
              canvases, drawings, and notes. We do not claim any rights over your work.
              By using the service, you grant us a limited license to store and display
              your content solely for the purpose of providing the service to you.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">3. Acceptable Use</h2>
            <p>You agree not to use Thinkboard to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500">
              <li>Upload or share illegal, harmful, or offensive content</li>
              <li>Attempt to gain unauthorized access to other users' canvases</li>
              <li>Use the service for any commercial purpose without prior consent</li>
              <li>Interfere with or disrupt the integrity of the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">4. Service Availability</h2>
            <p>
              Thinkboard is provided "as is" without any warranties of any kind.
              We do not guarantee uninterrupted or error-free service. We reserve
              the right to modify, suspend, or discontinue any part of the service
              at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Thinkboard shall not be liable
              for any indirect, incidental, or consequential damages arising from your
              use of the service, including loss of data or canvas content.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">6. Privacy</h2>
            <p>
              We collect minimal personal information (name, email) solely to provide
              the service. We do not sell your data to third parties. Your canvas data
              is stored securely and only accessible to you and users you explicitly share with.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">7. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of Thinkboard
              after any changes constitutes acceptance of the new terms. We will always
              display the last updated date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">8. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes arising
              from the use of Thinkboard shall be subject to the jurisdiction of
              courts in West Bengal, India.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">9. Contact</h2>
            <p>
              If you have any questions about these terms, please reach out to us at{" "}
              <a href="mailto:support@thinkboard.com" className="text-[#6c63ff] hover:underline">
                support@thinkboard.com
              </a>
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16 py-6 text-center text-xs text-gray-400">
        © 2026 Thinkboard. All rights reserved.{" "}
        <Link to="/" className="text-[#6c63ff] hover:underline">Back to home</Link>
      </footer>
    </div>
  );
};

export default Terms;