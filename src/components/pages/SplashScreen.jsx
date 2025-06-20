import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import montageVideo from "../../assets/videos/manga-motors-montage.mp4";
import staticImage from "../../assets/images/Splash-static-image_.jpg";

const SplashScreen = ({ onAnimationComplete }) => {
  const splashRef  = useRef(null);
  const videoRef   = useRef(null);
  const overlayRef = useRef(null);
  const logoBox    = useRef(null);
  const logoText   = useRef(null);
  const tagRef     = useRef(null);

  const [ready, setReady]       = useState(false);
  const [duration, setDuration] = useState(0);

  useGSAP(() => {
    if (!ready) return;
    const vidLen = duration || 19;
    const tl = gsap.timeline({ paused: true, onComplete: onAnimationComplete });

    tl.to(overlayRef.current, { opacity: 0.2, duration: 1.5 }, 0)
      .to(videoRef.current, { opacity: 1, duration: 1.5 }, 0)
      .fromTo(
        logoBox.current,
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1, ease: "back.out(1.7)" },
        1.5
      )
      .fromTo(
        logoText.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: vidLen - 3.5 },
        2.5
      )
      .to(videoRef.current, { opacity: 0, duration: 0.5 }, vidLen - 1)
      .fromTo(
        tagRef.current,
        { x: "-100%", autoAlpha: 0 },
        { x: "0%", autoAlpha: 1, duration: 1, ease: "elastic.out(1,0.7)" },
        vidLen - 1
      )
      .to(
        splashRef.current,
        {
          opacity: 0,
          duration: 2.5,
          ease: "power2.inOut",
          onComplete: () => splashRef.current.style.display = "none"
        },
        vidLen
      )
      .play();
  }, [ready, duration]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => {
      setDuration(v.duration);
      v.play().catch(() => {}).finally(() => {
        v.muted  = false;
        v.volume = 0.5;
        setReady(true);
      });
    };
    v.currentTime = 0;
    v.muted       = true;
    v.volume      = 0;
    v.addEventListener("canplaythrough", onReady);
    v.addEventListener("loadeddata", onReady);
    if (v.readyState >= 3) onReady();
    return () => {
      v.removeEventListener("canplaythrough", onReady);
      v.removeEventListener("loadeddata", onReady);
    };
  }, []);

  return (
    <div ref={splashRef} className="splash-screen">
      <img src={staticImage} alt="hero" className="static-image" />
      <video
        ref={videoRef}
        className="montage-video"
        src={montageVideo}
        preload="auto"
        playsInline
      />
      <div ref={overlayRef} className="overlay" />
      <div className="content-container">
        <div ref={logoBox} className="logo-box">
          <span ref={logoText} className="logo-text">
            MANGA AUTOMOBILES
          </span>
        </div>
        <div ref={tagRef} className="tagline">
          The Art of Curated Performance
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
