import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Pencil,
  Heart,
  Github,
  Linkedin,
  Youtube,
  Lightbulb,
  MessageSquare,
} from "lucide-react";
import "./index.css";
import AuthContext from "../../store/AuthContext";
import ProfileDropdown from "../Profile/ProfileDropdown";

export default function ThinkboardHomepage() {
  const { user, loading } = useContext(AuthContext);
  const ctaPath = user ? "/dashboard" : "/signup";
  const signinPath = user ? "/dashboard" : "/login";

  return (
    <>
      <div className="homepage">
        {/* Header */}
        <div className="container">
          <header className="header">
            <a href="/" className="logo">
              <div className="logo-icon">
                <Pencil color="white" size={20} />
              </div>
              <span className="logo-text">THINKBOARD</span>
            </a>
            <nav className="nav">
              <a href="#features" className="nav-link">
                Features
              </a>
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#community" className="nav-link">
                Community
              </a>
            </nav>
            <div className="nav-buttons">
              <a
                href="https://github.com/Soumalyakarak/thinkboard"
                target="_blank"
                rel="noopener noreferrer"
                className="github-stars"
              >
                Github
              </a>

              {loading ? null : user ? (
                <ProfileDropdown />
              ) : (
                <>
                  <Link to={signinPath} className="btn-signin">
                    Sign in
                  </Link>

                  <Link to={ctaPath} className="btn-primary">
                    Free whiteboard
                  </Link>
                </>
              )}
            </div>
          </header>

          {/* Hero Section */}
          <section className="hero">
            <div className="sketch-decorations">
              <div
                className="sketch-element"
                style={{
                  top: "5%",
                  left: "3%",
                  "--delay": "0s",
                  "--rotation": "-8deg",
                }}
              >
                <div className="sketch-box orange">knowledge</div>
              </div>
              <div
                className="sketch-element"
                style={{
                  top: "8%",
                  right: "5%",
                  "--delay": "0.5s",
                  "--rotation": "5deg",
                }}
              >
                <div className="sketch-box green">architecture</div>
              </div>
              <div
                className="sketch-element"
                style={{
                  top: "40%",
                  left: "8%",
                  "--delay": "1s",
                  "--rotation": "-12deg",
                }}
              >
                <div className="sketch-box blue">collaborate</div>
              </div>
              <div
                className="sketch-element"
                style={{
                  top: "45%",
                  right: "10%",
                  "--delay": "1.2s",
                  "--rotation": "8deg",
                }}
              >
                <div className="sketch-box purple">brainstorm</div>
              </div>
              <div
                className="sketch-element"
                style={{ bottom: "25%", left: "5%", "--delay": "1.5s" }}
              >
                <div className="sketch-circle"></div>
              </div>
              <div
                className="sketch-element"
                style={{ bottom: "20%", right: "8%", "--delay": "1.8s" }}
              >
                <Heart className="sketch-heart" />
              </div>
              <div
                className="sketch-element"
                style={{
                  top: "60%",
                  right: "15%",
                  "--delay": "2s",
                  "--rotation": "12deg",
                }}
              >
                <div className="sketch-note">free to use</div>
              </div>
            </div>

            <div className="hero-badge">🌟 knowledge</div>
            <h1 className="hero-title">
              Say hi to <span className="whiteboard-text">Thinkboard</span>
            </h1>
            <p className="hero-subtitle">
              <span className="badge-highlight">Free & Open source</span>
              <br />
              Ideate, Collaborate, Share. Simply with Thinkboard.
            </p>
            <div className="hero-cta">
              <Link to={ctaPath} className="btn-hero-primary">
                Start drawing
              </Link>

              <Link to={signinPath} className="btn-hero-secondary">
                Sign in
              </Link>
            </div>

            <p className="hero-note">start drawing for free.</p>
          </section>
        </div>

        {/* Create Section */}
        <section id="features" className="showcase-section">
          <div className="container">
            <div className="showcase-content">
              <div className="showcase-text">
                <div className="showcase-icon">
                  <Lightbulb size={32} color="#1e293b" />
                </div>
                <div className="showcase-badge">open-source</div>
                <h2 className="showcase-title">Create</h2>
                <p className="showcase-description">
                  Simply designed to create perfect results fast. Elementary
                  tools, advanced features and unlimited options with an
                  infinite canvas.
                </p>
              </div>
              <div className="showcase-visual">
                <div className="canvas-mockup">
                  <div className="canvas-toolbar">
                    <div className="tool-item active"></div>
                    <div className="tool-item"></div>
                    <div className="tool-item"></div>
                    <div className="tool-item"></div>
                    <div className="tool-item"></div>
                    <div className="tool-item"></div>
                  </div>
                  <div className="canvas-elements">
                    <div
                      className="canvas-box pink"
                      style={{ "--rotation": "-3deg", "--delay": "0s" }}
                    >
                      Ideas
                    </div>
                    <div
                      className="canvas-box cyan"
                      style={{ "--rotation": "2deg", "--delay": "0.2s" }}
                    >
                      Design
                    </div>
                    <div
                      className="canvas-box yellow"
                      style={{ "--rotation": "-2deg", "--delay": "0.4s" }}
                    >
                      Build
                    </div>
                    <div
                      className="canvas-box green"
                      style={{ "--rotation": "4deg", "--delay": "0.6s" }}
                    >
                      Ship
                    </div>
                    <div
                      className="canvas-box blue"
                      style={{ "--rotation": "-4deg", "--delay": "0.8s" }}
                    >
                      Test
                    </div>
                    <div
                      className="canvas-box purple"
                      style={{ "--rotation": "3deg", "--delay": "1s" }}
                    >
                      Launch
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collaborate Section */}
        <section className="showcase-section">
          <div className="container">
            <div className="showcase-content reverse">
              <div className="showcase-text">
                <div className="showcase-icon">
                  <MessageSquare size={32} color="#1e293b" />
                </div>
                <div className="showcase-badge">easy to use</div>
                <h2 className="showcase-title">Collaborate</h2>
                <p className="showcase-description">
                  Send link, get feedback and finish the idea together.
                  Real-time collaboration that feels natural and seamless.
                </p>
              </div>
              <div className="showcase-visual">
                <div className="gantt-mockup">
                  <div className="gantt-header">
                    <div>Tasks</div>
                    <div className="gantt-dates">
                      <div>10-16</div>
                      <div>17-23</div>
                    </div>
                  </div>
                  <div className="gantt-row">
                    <div className="gantt-task">Library Editor</div>
                    <div className="gantt-timeline">
                      <div className="gantt-bar green"></div>
                    </div>
                  </div>
                  <div className="gantt-row">
                    <div className="gantt-task">Library Auth</div>
                    <div className="gantt-timeline">
                      <div className="gantt-bar blue"></div>
                    </div>
                  </div>
                  <div className="gantt-row">
                    <div className="gantt-task">Library Sorting</div>
                    <div className="gantt-timeline">
                      <div className="gantt-bar yellow">
                        <span className="gantt-label">Milos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Online Whiteboard Section */}
        <section className="simple-section">
          <div className="container">
            <div className="simple-icon">
              <Pencil size={40} color="white" />
            </div>
            <h2 className="simple-title">
              Online <span className="whiteboard-text">whiteboard</span>
            </h2>
            <p className="simple-subtitle">
              Something on your mind? Simply start drawing!
            </p>
            <div className="cta-buttons">
              <Link to={signinPath} className="btn-hero-primary">
                Draw now
              </Link>
              <Link to={ctaPath} className="btn-hero-secondary">
                Try for free
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="about" className="testimonial-section">
          <div className="container">
            <h2 className="testimonial-title">Loved by individuals</h2>
            <p className="testimonial-subtitle">
              See what other people say about Thinkboard.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section id="community" className="cta-section">
          <div className="container">
            <h2 className="cta-title">
              Ready to start{" "}
              <span className="cta-tagline">thinking visually?</span>
            </h2>
            <p className="cta-subtitle">
              Join thousands of creators who are already using Thinkboard
            </p>
            <div className="cta-buttons">
              <Link to={ctaPath} className="btn-hero-primary">
                Get started free
              </Link>

              <Link to={signinPath} className="btn-hero-secondary">
                Explore features
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              {/* Brand */}
              <div className="footer-brand">
                <a href="/" className="footer-logo">
                  <div className="footer-logo-icon">
                    <Pencil color="white" size={20} />
                  </div>
                  <span className="footer-logo-text">THINKBOARD</span>
                </a>
                <p className="footer-tagline">
                  The simple, sketch-like whiteboard for visual thinkers. Free &
                  open source forever.
                </p>
                <div className="footer-social">
                  <button className="social-icon" aria-label="Github">
                    <Github size={20} color="#94a3b8" />
                  </button>
                  <button className="social-icon" aria-label="LinkedIn">
                    <Linkedin size={20} color="#94a3b8" />
                  </button>
                  <button className="social-icon" aria-label="YouTube">
                    <Youtube size={20} color="#94a3b8" />
                  </button>
                </div>
              </div>

              {/* Product column */}
              <div className="footer-column">
                <h4 className="footer-column-title">Product</h4>
                <a href="#features" className="footer-link">
                  Features
                </a>
                <a href="#community" className="footer-link">
                  Community
                </a>
                <a href="/pricing" className="footer-link">
                  Pricing
                </a>
              </div>

              {/* Contact column */}
              <div className="footer-column">
                <h4 className="footer-column-title">Contact us</h4>
                <a href="mailto:support@thinkboard.com" className="footer-link">
                  support@thinkboard.com
                </a>
                <a href="/terms" className="footer-link">
                  Terms of use
                </a>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
              <p className="footer-copyright">
                © 2026 Thinkboard. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
