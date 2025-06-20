import React from 'react';
import Button from '../atoms/Button'; // Assuming you have a reusable Button component
import AnimatedCounter from './AnimatedCounter'; // Import the new AnimatedCounter component

// --- SVG ICONS (Replaced with actual SVG paths) ---

// Money Icon (Material Design - Attach Money)
const MoneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f30000"><path d="M260-320q25 0 42.5-17.5T320-380q0-25-17.5-42.5T260-440q-25 0-42.5 17.5T200-380q0 25 17.5 42.5T260-320Zm360 0q20 0 36-12t21-31q-20-4-38-13.5T606-401l-25-25q-10 8-15.5 20t-5.5 26q0 25 17.5 42.5T620-320Zm-460 40v-200 200Zm40 80v40q0 17-11.5 28.5T160-120h-40q-17 0-28.5-11.5T80-160v-320l84-240q6-18 21.5-29t34.5-11h140v55q0 6 .5 12.5T362-680H234l-42 120h255l80 80H160v200h560v-81q22-2 42.5-11t37.5-25v237q0 17-11.5 28.5T760-120h-40q-17 0-28.5-11.5T680-160v-40H200Zm400-520q17 0 28.5-11.5T640-760q0-17-11.5-28.5T600-800q-17 0-28.5 11.5T560-760q0 17 11.5 28.5T600-720Zm62 262L458-662q-8-8-13-19.5t-5-23.5v-155q0-25 17.5-42.5T500-920h155q12 0 23.5 5t19.5 13l204 204q17 17 17 42.5T902-613L747-458q-17 17-42.5 17T662-458Zm43-70 127-127-185-185H520v127l185 185Zm-29-156Z"/></svg>
);

// Odometer Icon (Material Design - Speedometer)
const OdometerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f30000"><path d="M610-760q-21 0-35.5-14.5T560-810q0-21 14.5-35.5T610-860q21 0 35.5 14.5T660-810q0 21-14.5 35.5T610-760Zm0 660q-21 0-35.5-14.5T560-150q0-21 14.5-35.5T610-200q21 0 35.5 14.5T660-150q0 21-14.5 35.5T610-100Zm160-520q-21 0-35.5-14.5T720-670q0-21 14.5-35.5T770-720q21 0 35.5 14.5T820-670q0 21-14.5 35.5T770-620Zm0 380q-21 0-35.5-14.5T720-290q0-21 14.5-35.5T770-340q21 0 35.5 14.5T820-290q0 21-14.5 35.5T770-240Zm60-190q-21 0-35.5-14.5T780-480q0-21 14.5-35.5T830-530q21 0 35.5 14.5T880-480q0 21-14.5 35.5T830-430ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880v80q-134 0-227 93t-93 227q0 134 93 227t227 93v80Zm0-320q-33 0-56.5-23.5T400-480q0-5 .5-10.5T403-501l-83-83 56-56 83 83q4-1 21-3 33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Z"/></svg>
);

// Calendar Icon (Material Design - Calendar Today)
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f30000"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>
);

// Transmission Icon (Material Design - Gears)
const TransmissionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M160-120q-50 0-85-35t-35-85q0-39 22.5-70t57.5-43v-254q-35-12-57.5-43T40-720q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T200-607v87h240v-87q-35-12-57.5-43T360-720q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T520-607v87h200q17 0 28.5-11.5T760-560v-47q-35-12-57.5-43T680-720q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 70T840-607v47q0 50-35 85t-85 35H520v87q35 12 57.5 43t22.5 70q0 50-35 85t-85 35q-50 0-85-35t-35-85q0-39 22.5-70t57.5-43v-87H200v87q35 12 57.5 43t22.5 70q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T200-240q0-17-11.5-28.5T160-280q-17 0-28.5 11.5T120-240q0 17 11.5 28.5T160-200Zm0-480q17 0 28.5-11.5T200-720q0-17-11.5-28.5T160-760q-17 0-28.5 11.5T120-720q0 17 11.5 28.5T160-680Zm320 480q17 0 28.5-11.5T520-240q0-17-11.5-28.5T480-280q-17 0-28.5 11.5T440-240q0 17 11.5 28.5T480-200Zm0-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm320 0q17 0 28.5-11.5T840-720q0-17-11.5-28.5T800-760q-17 0-28.5 11.5T760-720q0 17 11.5 28.5T800-680ZM160-240Zm0-480Zm320 480Zm0-480Zm320 0Z"/></svg>
);

// Electric Icon (Material Design - Flash On/Thunderbolt)
const ElectricIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m340-200 100-160h-60v-120L280-320h60v120ZM240-560h240v-200H240v200Zm0 360h240v-280H240v280Zm-80 80v-640q0-33 23.5-56.5T240-840h240q33 0 56.5 23.5T560-760v280h50q29 0 49.5 20.5T680-410v185q0 17 14 31t31 14q18 0 31.5-14t13.5-31v-375h-10q-17 0-28.5-11.5T720-640v-80h20v-60h40v60h40v-60h40v60h20v80q0 17-11.5 28.5T840-600h-10v375q0 42-30.5 73.5T725-120q-43 0-74-31.5T620-225v-185q0-5-2.5-7.5T610-420h-50v300H160Zm320-80H240h240Z"/></svg>
);


const MercedesLogo = () => (
<svg fill="#000000" version="1.1" id="svg3544" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 80 80" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M58.6,4.5C53,1.6,46.7,0,40,0c-6.7,0-13,1.6-18.6,4.5v0C8.7,11.2,0,24.6,0,40c0,15.4,8.7,28.8,21.5,35.5 C27,78.3,33.3,80,40,80c6.7,0,12.9-1.7,18.5-4.6C71.3,68.8,80,55.4,80,40C80,24.6,71.3,11.2,58.6,4.5z M4,40 c0-13.1,7-24.5,17.5-30.9v0C26.6,6,32.5,4.2,39,4l-4.5,32.7L21.5,46.8v0L8.3,57.1C5.6,52,4,46.2,4,40z M58.6,70.8 C53.1,74.1,46.8,76,40,76c-6.8,0-13.2-1.9-18.6-5.2c-4.9-2.9-8.9-6.9-11.9-11.7l11.9-4.9v0L40,46.6l18.6,7.5v0l12,4.9 C67.6,63.9,63.4,67.9,58.6,70.8z M58.6,46.8L58.6,46.8l-12.9-10L41.1,4c6.3,0.2,12.3,2,17.4,5.1v0C69,15.4,76,26.9,76,40 c0,6.2-1.5,12-4.3,17.1L58.6,46.8z"></path> </g></svg>);


const AmgLogo = () => (
<svg viewBox="0 0 192.756 192.756" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"> <path fill="#ffffff00" d="M0 0h192.756v192.756H0V0z"></path> <path d="M2.834 105.467h20.235L33.66 87.368H13.505L2.834 105.467zM43.54 87.368h-8.22l-10.671 18.099h8.3L43.54 87.368zM34.925 105.467h5.533l10.591-18.099h-5.533l-10.591 18.099zM43.145 105.467h4.031l10.749-18.099h-4.189l-10.591 18.099zM64.407 87.368h-3.399l-10.591 18.099h3.398l10.592-18.099zM189.922 91.636v-4.347h-35.094v18.1h35.094V94.165h-20.945v4.347h15.175v2.371h-23.476v-9.247h29.246zM142.576 91.873v13.516h5.85v-18.1h-8.615l-11.856 8.141-12.252-8.141h-8.299v18.1h5.85V91.873l11.459 8.379h5.93l11.933-8.379zM103.215 105.389l-9.722-18.1H70.018l-10.67 18.1h6.639l2.292-3.873h26.478l2.055 3.873h6.403zm-13.2-13.753l2.451 5.216H70.651l2.845-5.216h16.519z"></path> </g> </g></svg>);

const LexusLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-5.4 12.8c1.39 2.1 3.86 3.5 6.4 3.5 2.54 0 5.01-1.4 6.4-3.5H6.6zM12 5c-2.42 0-4.38 1.41-5.4 3.5h10.8c-1.02-2.09-2.98-3.5-5.4-3.5z"/>
    </svg>
);

const BmwLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5c4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5-8.5-3.813-8.5-8.5S7.313 3.5 12 3.5zm0 1.63L8.88 12.88 12 16.12 15.12 12.88z"/>
    </svg>
);

const TeslaLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5c4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5-8.5-3.813-8.5-8.5S7.313 3.5 12 3.5zm-2 5.5l-2 10h10l-2-10h-6zM10.5 7h3L12 9.5 10.5 7z"/>
    </svg>
);

// --- END SVG ICONS ---


const VehicleCard = ({ vehicle, onViewDetails }) => {
    // Helper to render brand/tuner/engine specific elements
    const renderBadge = (type, value) => {
        switch (type) {
            case 'brand':
                // Dynamically select brand logo based on make
                if (vehicle.make === 'Mercedes-Benz') return <MercedesLogo />;
                if (vehicle.make === 'Lexus') return <LexusLogo />;
                if (vehicle.make === 'BMW') return <BmwLogo />;
                if (vehicle.make === 'Tesla') return <TeslaLogo />;
                // Add more cases for other brands if needed
                return null;
            case 'tuner':
                // Check for AMG explicitly
                if (value === 'AMG') {
                    return <AmgLogo />;
                }
                return null;
            case 'engine':
                if (value && value.includes('V')) { // Check for V6, V8, V12 etc.
                    return <span className="v-engine-text">{value}</span>;
                } else if (value === 'Electric') {
                    return <ElectricIcon className="electric-icon" />;
                }
                return null;
            case 'transmission':
                return (
                    <>
                        <TransmissionIcon /> {/* Example for generic auto icon */}
                        <span>auto</span>
                    </>
                );
            default:
                return null;
        }
    };

    // Extract numeric mileage for animation
    const numericMileage = parseInt(vehicle.mileage.replace(/[^0-9]/g, ''), 10);

    return (
        <div className="vehicle-card-container">
            {/* Car Name/Model (Top) */}
            <h3 className="vehicle-card-title">{vehicle.make} {vehicle.model}</h3>

            {/* Car Image */}
            <div className="vehicle-card-image-wrapper">
                <img src={vehicle.imageUrl} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} className="vehicle-card-image" />
            </div>

            <div className="vehicle-card-content">
                {/* Badges (Brand Logo, Brand Tuner, Transmission, Engine) */}
                <div className="vehicle-card-badges">
                    <div className="badge-item brand-logo">
                        {renderBadge('brand')} {/* No value needed, it uses vehicle.make */}
                    </div>
                    {vehicle.tuner && ( // Only render if tuner exists (e.g., 'AMG')
                        <div className="badge-item tuner">
                            {renderBadge('tuner', vehicle.tuner)}
                        </div>
                    )}
                    <div className="badge-item transmission">
                        {renderBadge('transmission')} {/* No value needed, renders 'auto' */}
                    </div>
                    {vehicle.engineType && ( // Only render if engine type exists (e.g., 'V8', 'Electric')
                        <div className="badge-item engine">
                            {renderBadge('engine', vehicle.engineType)}
                        </div>
                    )}
                </div>

                {/* Car Statistics (Price, Mileage, Year) */}
                <div className="vehicle-stats">
                    <div className="stat-item price-item">
                        <MoneyIcon />
                        <p className="vehicle-card-price">
                            ₦<AnimatedCounter end={vehicle.price} duration={1500} isMoney={true} />
                        </p>
                    </div>
                    <div className="stat-item">
                        <OdometerIcon />
                        <AnimatedCounter end={numericMileage} duration={1500} /> km
                    </div>
                    <div className="stat-item">
                        <CalendarIcon />
                        <AnimatedCounter end={vehicle.year} duration={1500} />
                    </div>
                </div>

                {/* "VIEW" Button (Bottom Right) */}
                <Button className="showroom-button" onClick={onViewDetails}>
                    VIEW
                </Button>
            </div>
        </div>
    );
};

export default VehicleCard;