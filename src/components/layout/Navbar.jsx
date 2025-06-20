import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Power3 } from "gsap/all";

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const closeRef = useRef(null);
  const searchRef = useRef(null);
  const contactRef = useRef(null);
  const logoRef = useRef(null);

  // GSAP animation for navbar entrance
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: Power3.easeOut, delay: 0.5 }
    );
  }, []);

  // GSAP animation for hamburger/close icon toggle
  useEffect(() => {
    if (isSidebarOpen) {
      gsap.to(hamburgerRef.current, { rotation: 90, opacity: 0, duration: 0.3, onComplete: () => {
        gsap.set(hamburgerRef.current, { display: "none" });
        gsap.fromTo(closeRef.current, { rotation: -90, opacity: 0, display: "none" }, { rotation: 0, opacity: 1, display: "block", duration: 0.3 });
      }});
    } else {
      gsap.to(closeRef.current, { rotation: -90, opacity: 0, duration: 0.3, onComplete: () => {
        gsap.set(closeRef.current, { display: "none" });
        gsap.fromTo(hamburgerRef.current, { rotation: 90, opacity: 0, display: "none" }, { rotation: 0, opacity: 1, display: "block", duration: 0.3 });
      }});
    }
  }, [isSidebarOpen]);

  // Micro-interactions for icons
  const createIconHoverAnimation = (ref) => {
    const iconPath = ref.current.querySelector("path");
    gsap.to(ref.current, {
      scale: 1.1,
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(iconPath, {
      fill: "#f30000",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const createIconLeaveAnimation = (ref) => {
    const iconPath = ref.current.querySelector("path");
    gsap.to(ref.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(iconPath, {
      fill: "#ffffff",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // Micro-interactions for logo
  const handleLogoHover = () => {
    gsap.to(logoRef.current, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(logoRef.current, {
      borderColor: "#f30000",
      backgroundColor: "#fff", // Keep background white on hover
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleLogoLeave = () => {
    gsap.to(logoRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(logoRef.current, {
      borderColor: "#f30000",
      backgroundColor: "#fff", // Keep background white on leave
      duration: 0.2,
      ease: "power2.out",
    });
  };


  return (
    <nav className="navbar" ref={navRef}>
      <div
        className="navbar__logo"
        ref={logoRef}
        onMouseEnter={handleLogoHover}
        onMouseLeave={handleLogoLeave}
        onClick={() => { /* Add navigation for logo if needed */ }}
      >
        MANGA AUTOMOBILES
      </div>
      <div className="navbar__icons">
        {/* Hamburger Icon */}
        <button
          className="navbar__icon-button navbar__hamburger"
          onClick={toggleSidebar}
          onMouseEnter={() => createIconHoverAnimation(hamburgerRef)}
          onMouseLeave={() => createIconLeaveAnimation(hamburgerRef)}
          ref={hamburgerRef}
          style={{ display: isSidebarOpen ? "none" : "block" }} // Initially visible
          aria-label="Open navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>

        {/* Close Icon */}
        <button
          className="navbar__icon-button navbar__close"
          onClick={toggleSidebar}
          onMouseEnter={() => createIconHoverAnimation(closeRef)}
          onMouseLeave={() => createIconLeaveAnimation(closeRef)}
          ref={closeRef}
          style={{ display: isSidebarOpen ? "block" : "none" }} // Initially hidden
          aria-label="Close navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
          >
            <path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z" />
          </svg>
        </button>

        {/* Search Icon */}
        <button
          className="navbar__icon-button navbar__search"
          onMouseEnter={() => createIconHoverAnimation(searchRef)}
          onMouseLeave={() => createIconLeaveAnimation(searchRef)}
          ref={searchRef}
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </button>

        {/* Contact Icon */}
        <button
          className="navbar__icon-button navbar__contact"
          onMouseEnter={() => createIconHoverAnimation(contactRef)}
          onMouseLeave={() => createIconLeaveAnimation(contactRef)}
          ref={contactRef}
          aria-label="Contact us"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
          >
            <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;