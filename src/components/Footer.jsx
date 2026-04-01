import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

export default function Footer({ sidebarOpen }) {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  return (
    <footer
      className={`footer ${
        user
          ? `${sidebarOpen ? "sidebar-open" : "sidebar-closed"} logged-in`
          : ""
      }`}
    >
      {user ? (
        <Container className="text-center">
          <p>© 2026 TravelEase Agency. All rights reserved</p>
        </Container>
      ) : (
        <Container>
          <Row className="footer-content">
            <Col lg={4} md={6} className="footer-section">
              <h3>TravelEase</h3>
              <p>
                Your one-stop destination for all travel needs. Book flights,
                hotels, and cabs with best prices guaranteed.
              </p>
            </Col>

            <Col lg={2} md={6} className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/press">Press</Link></li>
              </ul>
            </Col>

            <Col lg={2} md={6} className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/cancellation">Cancellation</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/faq">FAQs</Link></li>
              </ul>
            </Col>

            <Col lg={4} md={6} className="footer-section">
              <h4>Follow Us</h4>

              <div className="social-links">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>

              <div className="contact-info mt-3">
                <p>
                  <FontAwesomeIcon icon={faPhone} /> +91 1234567890
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} /> info@travelease.com
                </p>
              </div>
            </Col>

          </Row>

          <div className="footer-bottom">
            <p>© 2026 TravelEase Agency. All rights reserved</p>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </Container>
      )}
    </footer>
  );
}