// frontend/src/data/vehiclesData.js

import porsche911Gt3Image from '../assets/images/porsche-911-gt3.png';
import mercedesAmgG63Image  from '../assets/images/mercedes-benz-g63.png';
import ferrari488GtbImage   from '../assets/images/ferrari-488-gtb.png';
import rollsRoyceCullinanImage from '../assets/images/rolls-royce-cullinan.png';
import lamborghiniHuracanEvoImage from '../assets/images/lamborghini-urus.png';
import audiR8Image          from '../assets/images/audi-r8.png';

import porsche911Gt3Sound from '../assets/audio/porsche-911-gt3-sound.mp3';
import mercedesG63Sound   from '../assets/audio/mercedes-g63-sound.mp3';

export const vehicles = [
  {
    id: "v001",
    make: "Porsche",
    model: "911 GT3",
    year: 2023,
    price: 210000,
    mileage: "5,000 miles",
    description: "Ultimate track weapon, refined for the road.",
    imageUrl: porsche911Gt3Image,
    engineSound: porsche911Gt3Sound,
    status: "available",
    isFeatured: false,
    lastUpdated: "2025-06-20T12:00:00Z",
    // ADD THIS LINE:
    features: ["Carbon Ceramic Brakes", "GT3 Wing", "Sport Exhaust System", "Alcantara Interior"]
  },
  {
    id: "v002",
    make: "Mercedes-Benz",
    model: "AMG G 63",
    year: 2022,
    price: 185000,
    mileage: "12,000 miles",
    description: "Iconic off-roader with luxurious edge.",
    imageUrl: mercedesAmgG63Image,
    engineSound: mercedesG63Sound,
    status: "auctioning",
    isFeatured: true,
    lastUpdated: "2025-06-18T09:30:00Z",
    // ADD THIS LINE:
    features: ["Burmester Surround Sound", "G Manufaktur Interior Package", "Night Package", "360-degree Camera"]
  },
  {
    id: "v003",
    make: "Ferrari",
    model: "488 GTB",
    year: 2018,
    price: 250000,
    mileage: "8,000 miles",
    description: "A masterpiece of Italian engineering.",
    imageUrl: ferrari488GtbImage,
    engineSound: "path/to/ferrari-sound.mp3",
    status: "sold",
    isFeatured: false,
    lastUpdated: "2025-05-27T15:45:00Z",
    // ADD THIS LINE:
    features: ["Carbon Fibre Racing Seats", "Front Suspension Lifter", "Scuderia Ferrari Shields"]
  },
  {
    id: "v004",
    make: "Rolls-Royce",
    model: "Cullinan",
    year: 2021,
    price: 380000,
    mileage: "6,500 miles",
    description: "Pinnacle of luxury SUVs.",
    imageUrl: rollsRoyceCullinanImage,
    engineSound: "path/to/cullinan-sound.mp3",
    status: "pending_inspection",
    isFeatured: true,
    lastUpdated: "2025-06-10T11:20:00Z",
    // ADD THIS LINE:
    features: ["Starlight Headliner", "Rear Entertainment System", "Picnic Tables", "Signature Gold Spirit of Ecstasy"]
  },
  {
    id: "v005",
    make: "Lamborghini",
    model: "Huracán EVO",
    year: 2020,
    price: 295000,
    mileage: "3,500 miles",
    description: "Thrill of a supercar with cutting-edge tech.",
    imageUrl: lamborghiniHuracanEvoImage,
    engineSound: "path/to/huracan-sound.mp3",
    status: "available",
    isFeatured: false,
    lastUpdated: "2025-06-15T08:00:00Z",
    // ADD THIS LINE:
    features: ["LDVI System", "Magnetorheological Suspension", "Forged Carbon Fibre Details"]
  },
  {
    id: "v006",
    make: "Audi",
    model: "R8 V10 Performance",
    year: 2022,
    price: 190000,
    mileage: "7,200 miles",
    description: "Everyday usability meets supercar performance.",
    imageUrl: audiR8Image,
    engineSound: "path/to/r8-sound.mp3",
    status: "available",
    isFeatured: false,
    lastUpdated: "2025-06-12T14:10:00Z",
    // ADD THIS LINE:
    features: ["Laser Headlights", "Virtual Cockpit", "Sport Exhaust", "Bang & Olufsen Sound System"]
  }
];