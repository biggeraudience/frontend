// src/components/layout/Footer.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Assuming you want internal links
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // For scroll-triggered animation
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Example icons, install if not present
 
import '../../styles/components/_footer.scss'; // Link to our SCSS file

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const sectionsRef = useRef([]); // To hold refs for each footer section
  const copyrightRef = useRef(null);

  useEffect(() => {
    // GSAP Animation for the footer
    if (footerRef.current) {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%', // When the top of the footer is 85% down the viewport
            end: 'top 70%',
            scrub: 0.5, // Smoothly animate on scroll
            // markers: true, // Uncomment for debugging scroll trigger
          },
        }
      );

      // Stagger animation for footer sections
      gsap.fromTo(sectionsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15, // Stagger animation for each section
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 75%',
            // markers: true,
          },
        }
      );

      // Fade in copyright
      gsap.fromTo(copyrightRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5, // Delay slightly after sections start
          scrollTrigger: {
            trigger: copyrightRef.current,
            start: 'top 95%',
            // markers: true,
          },
        }
      );
    }
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footerInner">
        {/* Brand Section */}
        <div className="footerSection footerBrand" ref={el => sectionsRef.current[0] = el}>
          <Link to="/" className="footerLogoLink">
            <span className="footerBrandText">Manga Automobiles</span>
          </Link>
          <p className="footerMotto">Drive the Future. Today.</p>
        </div>

        {/* Quick Links Section */}
        <div className="footerSection footerLinks" ref={el => sectionsRef.current[1] = el}>
          <h3 className="footerHeading">Quick Links</h3>
          <ul>
            <li><Link to="/" className="footerLink">Home</Link></li>
            <li><Link to="/showroom" className="footerLink">Showroom</Link></li>
            <li><Link to="/about" className="footerLink">About Us</Link></li>
            <li><Link to="/contact" className="footerLink">Contact</Link></li>
            <li><Link to="/privacy" className="footerLink">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="footerSection footerContact" ref={el => sectionsRef.current[2] = el}>
          <h3 className="footerHeading">Contact Us</h3>
          <p>
            Email: <a href="mailto:info@mangaautomobiles.com" className="footerLink">info@mangaautomobiles.com</a>
          </p>
          <p>
            Phone: <a href="tel:+2348012345678" className="footerLink">+234 801 234 5678</a>
          </p>
          <p>
            Address: 123 Auto Lane, Abuja, FCT, Nigeria
          </p>
        </div>

        {/* Social Media Section */}
        <div className="footerSection footerSocial" ref={el => sectionsRef.current[3] = el}>
          <h3 className="footerHeading">Follow Us</h3>
          <div className="socialIcons">
            <a href="https://facebook.com/mangaautomobiles" target="_blank" rel="noopener noreferrer" className="socialLink">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/mangaautomobiles" target="_blank" rel="noopener noreferrer" className="socialLink">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/mangaautomobiles" target="_blank" rel="noopener noreferrer" className="socialLink">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/company/mangaautomobiles" target="_blank" rel="noopener noreferrer" className="socialLink">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footerBottom" ref={copyrightRef}>
        <p className="footerCopyright">
          &copy; {new Date().getFullYear()} Manga Automobiles. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;



