import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const StartScreen = ({ onStart }) => {
  const [fade, setFade] = useState(false);
  const scrRef = useRef(null);
  const btnRef = useRef(null);

  useGSAP(() => {
    gsap.to(btnRef.current, {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(243,0,0,0.8)",
      duration: 1,
      yoyo: true,
      repeat: -1
    });
    if (fade) {
      gsap.to(scrRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: onStart
      });
    }
  }, [fade]);

  return (
    <div
      ref={scrRef}
      className="start-screen"
      style={{ opacity: fade ? 0 : 1 }}
      onClick={() => setFade(true)}
    >
      <div ref={btnRef} className="start-button">
        <span className="start-button-text">START</span>
      </div>
    </div>
  );
};

export default StartScreen;
