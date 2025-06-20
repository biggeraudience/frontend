import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ end, duration = 2000, isMoney = false }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let startTimestamp = null;
                    const animateCount = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        setCount(Math.floor(progress * end));

                        if (progress < 1) {
                            requestAnimationFrame(animateCount);
                        }
                    };
                    requestAnimationFrame(animateCount);
                    observer.disconnect(); // Stop observing once animation starts
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the component is visible
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [end, duration]);

    const formattedValue = isMoney ? count.toLocaleString() : count;

    return <span ref={ref} className="digital-7-font">{formattedValue}</span>;
};

export default AnimatedCounter;