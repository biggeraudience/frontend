import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import VehicleCard from '../atoms/VehicleCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import McLarenSennaImage from '../../assets/images/McLaren_Senna.png';
import { useGetVehiclesQuery } from '../../../store/api'; // Corrected import path

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Mock data for featured auction vehicle (remains as is)
export const auctionVehicleData = {
  id: "au001",
  make: "McLaren",
  model: "Senna",
  year: 2021,
  imageUrl: McLarenSennaImage,
  openingBid: 850000,
  currentHighBid: 920000,
  auctionEndTime: Date.now() + (10 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000) + (30 * 60 * 1000),
};

// Helper for countdown (remains as is)
export const calculateTimeLeft = (endTime) => {
  const difference = endTime - Date.now();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

// Dummy SVG Icons for special features (remain as is)
const SVGGearbox = () => (
  <svg width="40" height="7" viewBox="0 0 40 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M39.9998 3.18771C40.0011 3.13784 39.9965 3.08804 39.9863 3.0415C39.9761 2.99495 39.9606 2.95267 39.9406 2.91737C39.9207 2.88207 39.8968 2.85452 39.8705 2.83649C39.8442 2.81845 39.8161 2.81032 39.788 2.81262H36.0117C35.9835 2.81032 35.9554 2.81845 35.9291 2.83649C35.9028 2.85452 35.879 2.88207 35.859 2.91737C35.8391 2.95267 35.8235 2.99495 35.8133 3.0415C35.8032 3.08804 35.7986 3.13784 35.7999 3.18771V3.75005C35.7969 3.85709 35.8172 3.9621 35.8566 4.04345C35.896 4.12481 35.9515 4.17631 36.0117 4.18735H38.3765C38.5177 4.18735 38.5177 4.31238 38.5177 4.62466V4.68448C38.5177 4.99675 38.5177 5.05957 38.3765 5.05957H33.5415C33.5133 5.06187 33.4852 5.05374 33.4589 5.0357C33.4326 5.01767 33.4087 4.99012 33.3888 4.95482C33.3689 4.91952 33.3533 4.87724 33.3431 4.8307C33.3329 4.78415 33.3284 4.73435 33.3296 4.68448V2.25029C33.3284 2.20042 33.3329 2.15062 33.3431 2.10407C33.3533 2.05752 33.3689 2.01525 33.3888 1.97995C33.4087 1.94465 33.4326 1.9171 33.4589 1.89907C33.4852 1.88103 33.5133 1.8729 33.5415 1.8752H39.7525C39.7807 1.8775 39.8088 1.86937 39.8351 1.85133C39.8614 1.8333 39.8852 1.80575 39.9052 1.77045C39.9251 1.73515 39.9406 1.69288 39.9508 1.64633C39.961 1.59978 39.9656 1.54998 39.9643 1.50011V0.562687C39.9656 0.512819 39.961 0.46302 39.9508 0.416471C39.9406 0.369922 39.9251 0.327647 39.9052 0.292348C39.8852 0.257048 39.8614 0.229501 39.8351 0.211465C39.8088 0.193428 39.7807 0.1853 39.7525 0.187599H32.0591C32.0309 0.185385 32.0028 0.193577 31.9766 0.211652C31.9504 0.229727 31.9265 0.257288 31.9066 0.292578C31.8867 0.327869 31.8712 0.370113 31.861 0.41662C31.8509 0.463126 31.8463 0.512872 31.8476 0.562687V6.62453C31.8463 6.67435 31.8509 6.72409 31.861 6.7706C31.8712 6.81711 31.8867 6.85935 31.9066 6.89464C31.9265 6.92993 31.9504 6.95749 31.9766 6.97557C32.0028 6.99364 32.0309 7.00183 32.0591 6.99962H39.7525C39.7807 7.00192 39.8088 6.99379 39.8351 6.97575C39.8614 6.95772 39.8852 6.93017 39.9052 6.89487C39.9251 6.85957 39.9406 6.8173 39.9508 6.77075C39.961 6.7242 39.9656 6.6744 39.9643 6.62453V3.18771M27.6831 4.8125C27.5963 4.95708 27.4844 5.04523 27.3656 5.06256H26.3774C26.2585 5.04536 26.1464 4.9572 26.0595 4.8125L24.1893 2.68759C24.0836 2.56256 23.9775 2.62478 23.9775 2.87484V6.43729C23.9788 6.48716 23.9742 6.53696 23.964 6.5835C23.9538 6.63005 23.9383 6.67233 23.9183 6.70763C23.8984 6.74292 23.8745 6.77047 23.8482 6.78851C23.8219 6.80655 23.7938 6.81468 23.7657 6.81238H22.7775C22.717 6.81769 22.6577 6.78176 22.6118 6.71198C22.5659 6.64221 22.5368 6.54389 22.5305 6.43729V0.375442C22.5305 0.125383 22.6363 0.000353846 22.7775 0.000353846H23.8363C23.9481 0.0246302 24.0561 0.0882951 24.1538 0.187599L26.695 3.1249C26.7408 3.18577 26.7965 3.21867 26.8538 3.21867C26.911 3.21867 26.9668 3.18577 27.0126 3.1249L29.5534 0.187599C29.6438 0.061461 29.7562 -0.0047718 29.8713 0.000353846H30.93C30.9582 -0.00185987 30.9863 0.006332 31.0125 0.0244067C31.0388 0.0424815 31.0626 0.0700428 31.0825 0.105333C31.1024 0.140623 31.1179 0.182868 31.1281 0.229374C31.1382 0.275881 31.1428 0.325627 31.1415 0.375442V6.43729C31.1428 6.4871 31.1382 6.53685 31.1281 6.58335C31.1179 6.62986 31.1024 6.67211 31.0825 6.7074C31.0626 6.74269 31.0388 6.77025 31.0125 6.78832C30.9863 6.8064 30.9582 6.81459 30.93 6.81238H29.9419C29.8814 6.81785 29.822 6.78199 29.776 6.7122C29.73 6.64241 29.7008 6.544 29.6946 6.43729V2.87484C29.6946 2.62478 29.624 2.56237 29.4828 2.68759L27.6831 4.8125ZM16.6722 1.81239C16.6016 1.81239 16.5665 1.87221 16.4959 2.00023L15.8959 3.37615C15.8604 3.50118 15.8959 3.5634 15.9297 3.5634H20.2705C20.4117 3.5634 20.4117 3.43837 20.4117 3.25112V2.3125C20.4117 2.00023 20.4117 1.8752 20.2705 1.8752H16.6722V1.81239ZM14.1314 6.87459H12.8595C12.8386 6.87509 12.8181 6.86591 12.7999 6.84796C12.7818 6.83002 12.7666 6.80393 12.7559 6.77232C12.7452 6.74071 12.7393 6.70468 12.7389 6.66783C12.7386 6.63097 12.7437 6.59459 12.7537 6.56232L15.4709 0.312628C15.5002 0.243164 15.5373 0.18512 15.5799 0.142104C15.6224 0.0990874 15.6695 0.0720165 15.7182 0.0625696H21.5765C21.646 0.0742492 21.7103 0.132585 21.7562 0.225595C21.8021 0.318606 21.8262 0.439229 21.8235 0.562687V6.4995C21.8248 6.54937 21.8202 6.59917 21.81 6.64572C21.7998 6.69227 21.7842 6.73454 21.7643 6.76984C21.7444 6.80514 21.7205 6.83269 21.6942 6.85072C21.6679 6.86876 21.6398 6.87689 21.6117 6.87459H20.6235C20.5953 6.87689 20.5672 6.86876 20.5409 6.85072C20.5146 6.83269 20.4908 6.80514 20.4708 6.76984C20.4509 6.73454 20.4353 6.69227 20.4251 6.64572C20.415 6.59917 20.4104 6.54937 20.4117 6.4995V5.62489C20.4117 5.37483 20.4117 5.31202 20.2705 5.31202H15.1195C15.0745 5.31359 15.0305 5.33796 14.993 5.38227C14.9555 5.42658 14.9259 5.48897 14.9077 5.56208V5.6219L14.5196 6.49651C14.421 6.70273 14.2826 6.83647 14.1314 6.8716V6.87459ZM11.5551 6.87459C11.6249 6.85627 11.692 6.8137 11.7526 6.74934C11.8131 6.68497 11.8658 6.60007 11.9078 6.4995L14.5547 0.437658C14.6608 0.187599 14.5885 0.000353846 14.4841 0.000353846H13.9547C13.9061 0.00987964 13.8591 0.0369888 13.8166 0.0800023C13.7741 0.123016 13.7371 0.181017 13.7078 0.250413L10.9902 6.4995C10.9802 6.53186 10.9751 6.56833 10.9755 6.60525C10.9759 6.64217 10.9818 6.67826 10.9925 6.70992C11.0032 6.74158 11.0185 6.7677 11.0367 6.78568C11.0549 6.80366 11.0755 6.81286 11.0963 6.81238H11.5551V6.87459ZM9.72 6.87459C9.78983 6.85621 9.85693 6.81362 9.91745 6.74925C9.97797 6.68489 10.0307 6.60002 10.0727 6.4995L12.7196 0.437658C12.8253 0.187599 12.7551 0.000353846 12.649 0.000353846H11.9078C11.8592 0.00987964 11.8121 0.0369888 11.7697 0.0800023C11.7272 0.123016 11.6901 0.181017 11.6608 0.250413L8.94333 6.4995C8.93328 6.53186 8.92821 6.56833 8.9286 6.60525C8.929 6.64217 8.93486 6.67826 8.94559 6.70992C8.95633 6.74158 8.97156 6.7677 8.98978 6.78568C9.00799 6.80366 9.02855 6.81286 9.0494 6.81238H9.72V6.87459ZM6.72006 6.87459C6.69925 6.87509 6.67873 6.86591 6.66054 6.84796C6.64236 6.83002 6.62716 6.80393 6.61646 6.77232C6.60575 6.74071 6.59992 6.70468 6.59955 6.66783C6.59917 6.63097 6.60427 6.59459 6.61432 6.56232L9.33183 0.312628C9.36111 0.243181 9.39814 0.185143 9.44062 0.142124C9.48311 0.0991055 9.53014 0.0720258 9.57878 0.0625696H10.6727C10.8139 0.0625696 10.8494 0.250412 10.7433 0.500472L8.09605 6.56232C8.05656 6.6671 8.00445 6.75508 7.94347 6.81994C7.88248 6.8848 7.81414 6.92491 7.74335 6.93741H6.71972L6.72006 6.87459ZM4.21437 6.87459C4.19356 6.87509 4.17303 6.86591 4.15485 6.84796C4.13667 6.83002 4.12147 6.80393 4.11077 6.77232C4.10006 6.74071 4.09423 6.70468 4.09385 6.66783C4.09348 6.63097 4.09857 6.59459 4.10863 6.56232L6.82614 0.312628C6.85544 0.243233 6.89249 0.185232 6.93497 0.142218C6.97745 0.0992045 7.02446 0.0720954 7.0731 0.0625696H8.52002C8.66124 0.0625696 8.69637 0.250412 8.59063 0.500472L5.94373 6.56232C5.9042 6.66717 5.85204 6.7552 5.791 6.82006C5.72995 6.88492 5.66154 6.925 5.59069 6.93741H4.21437V6.87459ZM0.120535 6.87459C0.0997222 6.87509 0.0791984 6.86591 0.0610171 6.84796C0.0428358 6.83002 0.0276342 6.80393 0.0169299 6.77232C0.00622561 6.74071 0.000393995 6.70468 1.92775e-05 6.66783C-0.00035544 6.63097 0.00473849 6.59459 0.0147932 6.56232L2.73231 0.312628C2.76161 0.243233 2.79865 0.185232 2.84113 0.142218C2.88361 0.0992045 2.93063 0.0720954 2.97926 0.0625696H6.19068C6.3319 0.0625696 6.36737 0.250412 6.26129 0.500472L3.61438 6.56232C3.57489 6.6671 3.52279 6.75508 3.4618 6.81994C3.40082 6.8848 3.33248 6.92491 3.26169 6.93741H0.11986L0.120535 6.87459Z" fill="black" />
  </svg>
);
const SVGElectric = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 16L7 12H5.5V9L3 13H4.5V16ZM2 7H8V2H2V7ZM2 16H8V9H2V16ZM0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H8C8.55 0 9.02083 0.195833 9.4125 0.5875C9.80417 0.979167 10 1.45 10 2V9H11.25C11.7333 9 12.1458 9.17083 12.4875 9.5125C12.8292 9.85417 13 10.2667 13 10.75V15.375C13 15.6583 13.1167 15.9167 13.35 16.15C13.5833 16.3833 13.8417 16.5 14.125 16.5C14.425 16.5 14.6875 16.3833 14.9125 16.15C15.1375 15.9167 15.25 15.6583 15.25 15.375V6H15C14.7167 6 14.4792 5.90417 14.2875 5.7125C14.0958 5.52083 14 5.28333 14 5V3H14.5V1.5H15.5V3H16.5V1.5H17.5V3H18V5C18 5.28333 17.9042 5.52083 17.7125 5.7125C17.5208 5.90417 17.2833 6 17 6H16.75V15.375C16.75 16.075 16.4958 16.6875 15.9875 17.2125C15.4792 17.7375 14.8583 18 14.125 18C13.4083 18 12.7917 17.7375 12.275 17.2125C11.7583 16.6875 11.5 16.075 11.5 15.375V10.75C11.5 10.6667 11.4792 10.6042 11.4375 10.5625C11.3958 10.5208 11.3333 10.5 11.25 10.5H10V18H0Z" fill="black" />
  </svg>
);
const SVGAWD = () => (
  <svg className="special-feature-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
    <path d="M2 17l10 5 10-5"></path>
    <path d="M2 12l10 5 10-5"></path>
  </svg>
);


const Showroom = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Fetch vehicles using RTK Query
  const { data: vehicles = [], isLoading, isError } = useGetVehiclesQuery();

  // Filter states (controlled by user input)
  const [makeFilter, setMakeFilter] = useState('');
  const [priceRangeFilter, setPriceRangeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [mileageFilter, setMileageFilter] = useState('');
  const [bodyTypeFilter, setBodyTypeFilter] = useState('');
  const [transmissionFilter, setTransmissionFilter] = useState('');
  const [fuelTypeFilter, setFuelTypeFilter] = useState('');

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Auction countdown state (remains in local state as it's not from API)
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(auctionVehicleData.auctionEndTime));

  // Refs for GSAP animations
  const vehicleGridRef = useRef(null);
  const filterBarRef = useRef(null);
  const featuredAuctionRef = useRef(null); // This ref is for a "featured auction" section that isn't in this specific snippet's return.

  // Memoized unique filter options, derived from fetched 'vehicles' data
  const uniqueMakes = useMemo(() => {
    if (isLoading || isError) return [];
    return [...new Set(vehicles.map(v => v.make))].filter(Boolean); // Filter out any undefined/null makes
  }, [vehicles, isLoading, isError]);

  const uniqueYears = useMemo(() => {
    if (isLoading || isError) return [];
    return [...new Set(vehicles.map(v => v.year))].filter(Boolean).sort((a, b) => b - a);
  }, [vehicles, isLoading, isError]);

  const uniqueBodyTypes = useMemo(() => {
    if (isLoading || isError) return [];
    return [...new Set(vehicles.map(v => v.bodyType || 'Other'))].filter(Boolean);
  }, [vehicles, isLoading, isError]);

  const uniqueTransmissions = useMemo(() => {
    if (isLoading || isError) return [];
    return [...new Set(vehicles.map(v => v.transmission))].filter(Boolean);
  }, [vehicles, isLoading, isError]);

  const uniqueFuelTypes = useMemo(() => {
    if (isLoading || isError) return [];
    return [...new Set(vehicles.map(v => v.fuelType))].filter(Boolean);
  }, [vehicles, isLoading, isError]);


  // --- useEffect for initial URL param setup ---
  // This effect should only set filters once on initial load or if URL changes.
  useEffect(() => {
    if (!isLoading && !isError && vehicles.length > 0) {
      const urlMake = searchParams.get('filter');
      if (urlMake && uniqueMakes.includes(urlMake)) { // Remove `urlMake !== makeFilter` if it's causing re-renders
        setMakeFilter(urlMake);
      }
      // Consider setting other filters from URL here too if applicable
    }
  }, [searchParams, uniqueMakes, isLoading, isError, vehicles.length]); // Removed `makeFilter` from dependency array

  // --- Main Filtering Logic using useMemo ---
  // This memoizes the filtered vehicles array. It will only re-run when
  // `vehicles` data or any of the filter states change.
  const filteredVehicles = useMemo(() => {
    // If data is still loading or there's an error, return empty array to prevent issues
    if (isLoading || isError) {
      return [];
    }

    let currentVehicles = [...vehicles];

    currentVehicles = currentVehicles.filter(vehicle => {
      // Ensure vehicle properties exist before accessing them
      if (makeFilter && vehicle.make !== makeFilter) return false;

      if (priceRangeFilter) {
        const [min, max] = priceRangeFilter.split('-').map(Number);
        if (vehicle.price < min || (max && vehicle.price > max)) return false;
      }
      if (yearFilter) {
        const [minYear, maxYear] = yearFilter.split('-').map(Number);
        if (vehicle.year < minYear || (maxYear && vehicle.year > maxYear)) return false;
      }
      if (mileageFilter) {
        const vehicleMileageNum = parseInt(String(vehicle.mileage || '0').replace(/,/g, ''), 10); // Default to '0' if mileage is missing
        if (mileageFilter === '0-10000' && vehicleMileageNum > 10000) return false;
        if (mileageFilter === '10001-50000' && (vehicleMileageNum <= 10000 || vehicleMileageNum > 50000)) return false;
        if (mileageFilter === '50001+' && vehicleMileageNum <= 50000) return false;
      }
      if (bodyTypeFilter && (vehicle.bodyType || 'Other') !== bodyTypeFilter) return false;
      if (transmissionFilter && vehicle.transmission !== transmissionFilter) return false;
      if (fuelTypeFilter && vehicle.fuelType !== fuelTypeFilter) return false;
      return true;
    });

    return currentVehicles;
  }, [makeFilter, priceRangeFilter, yearFilter, mileageFilter, bodyTypeFilter, transmissionFilter, fuelTypeFilter, vehicles, isLoading, isError]);


  // Effect for animating vehicle cards when filteredVehicles changes
  useEffect(() => {
    if (vehicleGridRef.current && filteredVehicles.length > 0) {
      gsap.fromTo(vehicleGridRef.current.children,
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [filteredVehicles]); // Dependency on filteredVehicles directly


  // Auction countdown timer effect (no changes needed)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(auctionVehicleData.auctionEndTime));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // GSAP animations for initial load
  useEffect(() => {
    if (!isLoading && !isError) {
      if (filterBarRef.current) {
        gsap.fromTo(
          filterBarRef.current,
          { autoAlpha: 0, y: -50 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );
      }
      // This ref seems to be for a section not present in the current JSX.
      // If `featuredAuctionRef` refers to something outside this component's scope
      // or to a part that's conditionally rendered, its animation might not play.
      // Keeping it for now assuming it exists elsewhere or will be added.
      if (featuredAuctionRef.current) {
        gsap.fromTo(
          featuredAuctionRef.current,
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
        );
      }
    }
  }, [isLoading, isError]); // Depend on isLoading and isError to trigger animation once data is ready


  const handleViewDetails = (id) => {
    navigate(`/vehicle/${id}`);
  };

  const handleClearFilters = () => {
    setMakeFilter('');
    setPriceRangeFilter('');
    setYearFilter('');
    setMileageFilter('');
    setBodyTypeFilter('');
    setTransmissionFilter('');
    setFuelTypeFilter('');
    navigate('/showroom', { replace: true });
  };

  const renderTimeComponent = (time, label) => {
    const timeStr = String(time).padStart(2, '0');
    return (
      <span className="time-component">
        {timeStr}
        <span className="time-label">{label.charAt(0)}</span>
      </span>
    );
  };

  const getSpecialFeatureSVG = (vehicle) => {
    if (vehicle.make === 'Mercedes-Benz' && vehicle.model && vehicle.model.includes('AMG')) return <SVGGearbox />;
    if (vehicle.fuelType === 'Electric') return <SVGElectric />;
    if (vehicle.features && vehicle.features.includes('All-Wheel Drive')) return <SVGAWD />;
    if (vehicle.transmission === 'Manual') return <SVGGearbox />;
    return null;
  };

  if (isLoading) {
    return (
        <div className="showroom-page flex justify-center items-center h-screen">
            <p className="text-xl text-gray-700">Loading vehicles...</p>
        </div>
    );
  }

  if (isError) {
    return (
        <div className="showroom-page flex justify-center items-center h-screen">
            <p className="text-xl text-red-700">Error loading vehicles. Please try again later.</p>
        </div>
    );
  }

  return (
    <div className="showroom-page">
      <div className="page-header">
        <h1>The Apex Collection</h1>
        <p>Explore our curated selection of high-performance and luxury automobiles, meticulously inspected for discerning enthusiasts.</p>
      </div>

      {/* Mobile Filter Button */}
      <div className="mobile-filter-button-wrapper only-on-mobile">
        <button className="button primary-button" onClick={() => setMobileFiltersOpen(true)}>
          Filters
        </button>
      </div>

      {/* Filter Bar */}
      <div ref={filterBarRef} className="filter-bar-container">
        <div className="top-filters">
          <div className="filter-group">
            <label htmlFor="make">Make</label>
            <select id="make" value={makeFilter} onChange={(e) => setMakeFilter(e.target.value)}>
              <option value="">All Makes</option>
              {uniqueMakes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="price">Price Range</label>
            <select id="price" value={priceRangeFilter} onChange={(e) => setPriceRangeFilter(e.target.value)}>
              <option value="">All Prices</option>
              <option value="0-50000">₦0 - ₦50,000</option>
              <option value="50001-100000">₦50,001 - ₦100,000</option>
              <option value="100001-200000">₦100,001 - ₦200,000</option>
              <option value="200001-9999999">₦200,001+</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="year">Year</label>
            <select id="year" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
              <option value="">All Years</option>
              {uniqueYears.map(year => (
                <option key={year} value={`${year}-${year}`}>{year}</option>
              ))}
              <option value="2020-2025">2020-Present</option>
              <option value="2015-2019">2015-2019</option>
              <option value="2010-2014">2010-2014</option>
              <option value="0-2009">Pre-2010</option>
            </select>
          </div>
        </div>

        <button
          className="more-filters-toggle"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          {showAdvancedFilters ? 'Hide Advanced Filters' : 'More Filters'}
        </button>

        <div className={`advanced-filters ${showAdvancedFilters ? 'visible' : 'hidden'}`}>
          <div className="filter-group">
            <label htmlFor="mileage">Mileage</label>
            <select id="mileage" value={mileageFilter} onChange={(e) => setMileageFilter(e.target.value)}>
              <option value="">Any Mileage</option>
              <option value="0-10000">0 - 10,000 miles</option>
              <option value="10001-50000">10,001 - 50,000 miles</option>
              <option value="50001+">50,001+ miles</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="body-type">Body Type</label>
            <select id="body-type" value={bodyTypeFilter} onChange={(e) => setBodyTypeFilter(e.target.value)}>
              <option value="">All Body Types</option>
              {uniqueBodyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="transmission">Transmission</label>
            <select id="transmission" value={transmissionFilter} onChange={(e) => setTransmissionFilter(e.target.value)}>
              <option value="">Any Transmission</option>
              {uniqueTransmissions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="fuel-type">Fuel Type</label>
            <select id="fuel-type" value={fuelTypeFilter} onChange={(e) => setFuelTypeFilter(e.target.value)}>
              <option value="">Any Fuel Type</option>
              {uniqueFuelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Vehicle Grid */}
      <section className="showroom-vehicle-grid" ref={vehicleGridRef}>
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={{
                ...vehicle,
                bodyType: vehicle.bodyType || (vehicle.make === 'Rolls-Royce' ? 'SUV' : (vehicle.make === 'Mercedes-Benz' && vehicle.model && vehicle.model.includes('G 63') ? 'SUV' : (['911', '488 GTB', 'Huracán EVO', 'R8'].some(m => vehicle.model && vehicle.model.includes(m)) ? 'Coupe' : 'Sedan')))
              }}
              onViewDetails={() => handleViewDetails(vehicle.id)}
              specialFeatureSVG={getSpecialFeatureSVG(vehicle)}
            />
          ))
        ) : (
          <p className="no-results-message">No vehicles match your current filters. Please adjust your criteria.</p>
        )}
      </section>

      {/* Load More Button */}
      {filteredVehicles.length < (vehicles ? vehicles.length : 0) && ( // Added null check for 'vehicles'
        <div className="load-more-container">
          <button className="button secondary-button">Load More Vehicles</button>
        </div>
      )}

      {/* Mobile Filter Overlay */}
      <div className={`mobile-filter-overlay ${mobileFiltersOpen ? 'open' : ''}`}>
        {mobileFiltersOpen && (
          <div className={`mobile-filter-content ${mobileFiltersOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={() => setMobileFiltersOpen(false)}>&times;</button>
            <h3>Filter Vehicles</h3>

            <div className="filter-group">
              <label htmlFor="mobile-make">Make</label>
              <select id="mobile-make" value={makeFilter} onChange={(e) => setMakeFilter(e.target.value)}>
                <option value="">All Makes</option>
                {uniqueMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="mobile-price">Price Range</label>
              <select id="mobile-price" value={priceRangeFilter} onChange={(e) => setPriceRangeFilter(e.target.value)}>
                <option value="">All Prices</option>
                <option value="0-50000">₦0 - ₦50,000</option>
                <option value="50001-100000">₦50,001 - ₦100,000</option>
                <option value="100001-200000">₦100,001 - ₦200,000</option>
                <option value="200001-9999999">₦200,001+</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="mobile-year">Year</label>
              <select id="mobile-year" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
                <option value="">All Years</option>
                {uniqueYears.map(year => (
                    <option key={year} value={`${year}-${year}`}>{year}</option>
                ))}
                <option value="2020-2025">2020-Present</option>
                <option value="2015-2019">2015-2019</option>
                <option value="2010-2014">2010-2014</option>
                <option value="0-2009">Pre-2010</option>
              </select>
            </div>

            <button
              className="more-filters-toggle"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              {showAdvancedFilters ? 'Hide Advanced Filters' : 'More Filters'}
            </button>

            <div className={`advanced-filters ${showAdvancedFilters ? 'visible' : 'hidden'}`}>
              <div className="filter-group">
                <label htmlFor="mobile-mileage">Mileage</label>
                <select id="mobile-mileage" value={mileageFilter} onChange={(e) => setMileageFilter(e.target.value)}>
                  <option value="">Any Mileage</option>
                  <option value="0-10000">0 - 10,000 miles</option>
                  <option value="10001-50000">10,001 - 50,000 miles</option>
                  <option value="50001+">50,001+ miles</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="mobile-body-type">Body Type</label>
                <select id="mobile-body-type" value={bodyTypeFilter} onChange={(e) => setBodyTypeFilter(e.target.value)}>
                  <option value="">All Body Types</option>
                  {uniqueBodyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="mobile-transmission">Transmission</label>
                <select id="mobile-transmission" value={transmissionFilter} onChange={(e) => setTransmissionFilter(e.target.value)}>
                  <option value="">Any Transmission</option>
                  {uniqueTransmissions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="mobile-fuel-type">Fuel Type</label>
                <select id="mobile-fuel-type" value={fuelTypeFilter} onChange={(e) => setFuelTypeFilter(e.target.value)}>
                  <option value="">Any Fuel Type</option>
                  {uniqueFuelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-actions">
              <button className="button secondary-button" onClick={handleClearFilters}>Clear Filters</button>
              <button className="button primary-button" onClick={() => setMobileFiltersOpen(false)}>Apply Filters</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Showroom;
