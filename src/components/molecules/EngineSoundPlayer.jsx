// src/components/molecules/EngineSoundPlayer.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const EngineSoundPlayer = ({ audioSrc }) => {
    const audioRef = useRef(new Audio());
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const animationFrameRef = useRef(null);
    const canvasRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);

    // Initialize AudioContext and AnalyserNode
    const initializeAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContextRef.current.createMediaElementSource(audioRef.current);
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;
            dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

            source.connect(analyserRef.current);
            analyserRef.current.connect(audioContextRef.current.destination);
        }
    }, []);

    // Draw the audio visualization
    const draw = useCallback(() => {
        if (!analyserRef.current || !canvasRef.current || !dataArrayRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const bufferLength = analyserRef.current.frequencyBinCount;
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArrayRef.current[i] / 2;

            const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
            gradient.addColorStop(0, '#E74C3C'); // Using hardcoded brand-red for simplicity here
            gradient.addColorStop(1, 'purple');

            ctx.fillStyle = gradient;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }

        animationFrameRef.current = requestAnimationFrame(draw);
    }, []);

    // Play/Pause handler
    const togglePlayPause = () => {
        if (!audioSrc) return; // Do nothing if no audio source

        initializeAudioContext(); // Ensure context is running on user interaction

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        } else {
            // If starting playback, set the source if it's not already set or has changed
            if (audioRef.current.src !== audioSrc) {
                audioRef.current.src = audioSrc;
                audioRef.current.load(); // Load the new audio
                setIsAudioLoaded(false); // Indicate loading
            }
            audioContextRef.current.resume().then(() => {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
                setIsPlaying(true);
                draw(); // Start visualization
            });
        }
    };

    // Effect to handle audio loading and initial play
    useEffect(() => {
        const audio = audioRef.current;

        const onCanPlayThrough = () => {
            setIsAudioLoaded(true);
            // Optionally, you can auto-play here, but usually requires user interaction first
            // if (!isPlaying) {
            //     audio.play().catch(e => console.error("Audio play failed on canplaythrough:", e));
            //     setIsPlaying(true);
            //     draw();
            // }
        };

        const onEnded = () => {
            setIsPlaying(false);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            // Reset audio to start for next play
            audioRef.current.currentTime = 0;
        };

        audio.addEventListener('canplaythrough', onCanPlayThrough);
        audio.addEventListener('ended', onEnded);

        // Set initial audio source when component mounts or audioSrc changes
        if (audioSrc) {
            audio.src = audioSrc;
            audio.load(); // Preload the audio
            setIsAudioLoaded(false);
        } else {
            audio.src = ''; // Clear source if no audioSrc
            setIsAudioLoaded(false);
        }
        setIsPlaying(false); // Reset playing state on audioSrc change
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }


        // Cleanup on component unmount
        return () => {
            audio.removeEventListener('canplaythrough', onCanPlayThrough);
            audio.removeEventListener('ended', onEnded);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            audio.pause();
            audio.src = '';
            setIsPlaying(false);
        };
    }, [audioSrc, draw]); // Dependency on audioSrc to reload audio when vehicle changes


    return (
        <div className="engine-sound-player">
            <h3>Engine Sound</h3>
            <div className="sound-controls">
                <button
                    className={`sound-button ${isPlaying ? 'playing' : ''}`}
                    onClick={togglePlayPause}
                    disabled={!audioSrc || (!isAudioLoaded && !isPlaying)} // Disable if no audio or still loading and not playing
                >
                    {isPlaying ? 'Pause' : 'Play'}
                    {/* Pause SVG Icon */}
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="play-pause-icon">
                            <path fillRule="evenodd" d="M6 5V19C6 19.5523 5.55228 20 5 20C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4C5.55228 4 6 4.44772 6 5ZM10 5V19C10 19.5523 9.55228 20 9 20C8.44772 20 8 19.5523 8 19V5C8 4.44772 8.44772 4 9 4C9.55228 4 10 4.44772 10 5ZM14 5V19C14 19.5523 13.5523 20 13 20C12.4477 20 12 19.5523 12 19V5C12 4.44772 12.4477 4 13 4C13.5523 4 14 4.44772 14 5ZM18 5V19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19V5C16 4.44772 16.4477 4 17 4C17.5523 4 18 4.44772 18 5Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        // Play SVG Icon
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="play-pause-icon">
                            <path fillRule="evenodd" d="M8.04264 5.95736C8.61864 5.28136 9.57791 5.13251 10.3707 5.55823L17.7533 9.55823C18.6652 10.0456 19.25 11.0267 19.25 12C19.25 12.9733 18.6652 13.9544 17.7533 14.4418L10.3707 18.4418C9.57791 18.8675 8.61864 18.7186 8.04264 18.0426C7.46665 17.3666 7.3178 16.4074 7.74352 15.6146L13.886 12L7.74352 8.38548C7.3178 7.59259 7.46665 6.63335 8.04264 5.95736Z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
            </div>
            <div className="audio-visualizer-container">
                <canvas ref={canvasRef} className="audio-visualizer"></canvas>
            </div>
            <audio ref={audioRef} preload="auto" loop={true} /> {/* Added loop attribute for continuous play */}
            {!isAudioLoaded && audioSrc && <p className="loading-audio-message">Loading audio...</p>}
            {!audioSrc && <p className="no-audio-message">No engine sound available for this vehicle.</p>}
        </div>
    );
};

EngineSoundPlayer.propTypes = {
    audioSrc: PropTypes.string, // audioSrc is now optional as some cars might not have it
};

export default EngineSoundPlayer;