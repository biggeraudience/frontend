// src/components/pages/BiddingPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { vehicles } from '../../data/vehiclesData'; // Your existing vehicle data
import Button from '../atoms/Button'; // Assuming you have a Button component
import AnimatedCounter from '../atoms/AnimatedCounter'; // Assuming you have an AnimatedCounter
import { gsap } from 'gsap';

const BiddingPage = () => {
    const { id } = useParams(); // Get vehicle ID from URL if using dynamic routes
    const [currentBid, setCurrentBid] = useState(150000); // Example initial bid
    const [timeRemaining, setTimeRemaining] = useState(3600 * 24); // 24 hours in seconds
    const [bidHistory, setBidHistory] = useState([]); // To store bid activity
    const [newBidAmount, setNewBidAmount] = useState('');
    const bidInputRef = useRef(null);
    const bidHistoryRef = useRef(null);

    // For demonstration, use a specific vehicle or find by ID
    const vehicle = vehicles.find(v => v.id === id) || vehicles[0]; // Fallback to first vehicle

    useEffect(() => {
        // Countdown timer logic
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Scroll to bottom of bid history and animate new bids
        if (bidHistoryRef.current) {
            gsap.to(bidHistoryRef.current, {
                scrollTop: bidHistoryRef.current.scrollHeight,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    }, [bidHistory]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handlePlaceBid = () => {
        const bid = parseFloat(newBidAmount);
        if (isNaN(bid) || bid <= currentBid) {
            alert('Please enter a valid bid higher than the current bid.');
            return;
        }

        // Simulate bid placement
        const newHistoryEntry = {
            amount: bid,
            bidder: `Bidder ${Math.floor(Math.random() * 1000)}`, // Anonymous bidder
            time: new Date().toLocaleTimeString()
        };
        setBidHistory(prev => [...prev, newHistoryEntry]);
        setCurrentBid(bid);
        setNewBidAmount('');

        // Implement "Last Minute Rush" extension
        if (timeRemaining > 0 && timeRemaining < 120) { // If less than 2 minutes remain
            setTimeRemaining(prev => prev + 120); // Add 2 more minutes
        }
    };

    const handleQuickBid = (increment) => {
        const newBid = currentBid + increment;
        setNewBidAmount(newBid.toString());
        // Optionally, automatically place the bid after a quick bid click
        // handlePlaceBid();
    };

    if (!vehicle) {
        return <div className="bidding-page loading">Vehicle not found.</div>;
    }

    return (
        <div className="bidding-page">
            <div className="bidding-hero">
                <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="bidding-hero-image" />
                <div className="bidding-hero-overlay">
                    <h1 className="orbitron-font">{vehicle.make} {vehicle.model}</h1>
                    <p className="urbanist-font">{vehicle.year} - {vehicle.mileage}</p>
                    <div className="bid-info-live">
                        <div className="info-block">
                            <span className="label orbitron-font">Current Bid</span>
                            <span className="value digital-7-font">₦<AnimatedCounter end={currentBid} duration={1000} isMoney={true} /></span>
                        </div>
                        <div className="info-block">
                            <span className="label orbitron-font">Time Remaining</span>
                            <span className="value digital-7-font">{formatTime(timeRemaining)}</span>
                        </div>
                        <div className="info-block">
                            <span className="label orbitron-font">Bidders</span>
                            <span className="value digital-7-font">{bidHistory.length + 1}</span> {/* +1 for the initial bidder */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bidding-content">
                <div className="bidding-main">
                    <section className="vehicle-details-section">
                        <h2 className="orbitron-font">Vehicle Details</h2>
                        <div className="details-grid urbanist-font">
                            <div><strong>Engine:</strong> {vehicle.engine}</div>
                            <div><strong>Transmission:</strong> {vehicle.transmission}</div>
                            <div><strong>Exterior Color:</strong> {vehicle.exteriorColor}</div>
                            <div><strong>Interior Color:</strong> {vehicle.interiorColor}</div>
                            <div><strong>Fuel Type:</strong> {vehicle.fuelType}</div>
                            <div><strong>Description:</strong> {vehicle.description}</div>
                        </div>
                        <div className="features-list">
                            <h3 className="orbitron-font">Key Features:</h3>
                            <ul>
                                {vehicle.features.map((feature, index) => (
                                    <li key={index} className="urbanist-font">{feature}</li>
                                ))}
                            </ul>
                        </div>
                        {/* More detailed info and image gallery here */}
                        <div className="media-gallery">
                            {/* You can add more images here in a grid or carousel */}
                            {/* For now, reuse the hero image for demonstration */}
                            <img src={vehicle.imageUrl} alt="Vehicle Detail" className="gallery-thumbnail" />
                            {/* Add more <img> tags for additional vehicle images */}
                        </div>
                    </section>
                </div>

                <div className="bidding-sidebar">
                    <section className="place-bid-section">
                        <h2 className="orbitron-font">Place Your Bid</h2>
                        <div className="current-bid-display">
                            <span className="label urbanist-font">Current High Bid:</span>
                            <span className="value digital-7-font">₦{currentBid.toLocaleString()}</span>
                        </div>
                        <div className="bid-input-group">
                            <input
                                type="number"
                                placeholder="Enter your bid"
                                className="bid-input urbanist-font"
                                value={newBidAmount}
                                onChange={(e) => setNewBidAmount(e.target.value)}
                                ref={bidInputRef}
                                min={currentBid + 1}
                            />
                            <Button className="primary-button" onClick={handlePlaceBid}>
                                Place Bid
                            </Button>
                        </div>
                        <div className="quick-bid-options">
                            <Button className="secondary-button small-button" onClick={() => handleQuickBid(1000)}>+₦1,000</Button>
                            <Button className="secondary-button small-button" onClick={() => handleQuickBid(5000)}>+₦5,000</Button>
                            <Button className="secondary-button small-button" onClick={() => handleQuickBid(10000)}>+₦10,000</Button>
                        </div>
                    </section>

                    <section className="bid-history-section">
                        <h2 className="orbitron-font">Bid History</h2>
                        <div className="bid-history-list urbanist-font" ref={bidHistoryRef}>
                            {bidHistory.length === 0 ? (
                                <p className="no-bids">No bids yet. Be the first!</p>
                            ) : (
                                bidHistory.map((bid, index) => (
                                    <div key={index} className="bid-item">
                                        <span className="bidder">{bid.bidder}</span>
                                        <span className="bid-amount digital-7-font">₦{bid.amount.toLocaleString()}</span>
                                        <span className="bid-time">{bid.time}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BiddingPage;