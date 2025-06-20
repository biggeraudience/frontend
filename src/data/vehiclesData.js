// src/data/vehiclesData.js

// Import all vehicle images directly
import porsche911Gt3Image from '../assets/images/porsche-911-gt3.png'; // Assuming this path and filename for your Porsche image
import mercedesAmgG63Image from '../assets/images/mercedes-benz-g63.png'; // Corrected path and filename for Mercedes G63
import ferrari488GtbImage from '../assets/images/ferrari-488-gtb.png'; // Assuming this path and filename for Ferrari
import rollsRoyceCullinanImage from '../assets/images/rolls-royce-cullinan.png'; // Assuming this path and filename for Rolls-Royce
import lamborghiniHuracanEvoImage from '../assets/images/lamborghini-urus.png'; // Assuming this path and filename for Lamborghini
import audiR8Image from '../assets/images/audi-r8.png'; // Assuming this path and filename for Audi R8


export const vehicles = [
  {
    id: "v001",
    make: "Porsche",
    model: "911 GT3",
    year: 2023,
    price: 210000,
    imageUrl: porsche911Gt3Image, // Use the imported image variable
    description: "The ultimate track weapon, refined for the road. Low mileage, perfect condition.",
    mileage: "5,000 miles",
    exteriorColor: "Shark Blue",
    interiorColor: "Black with GT Silver stitching",
    engine: "4.0L Naturally Aspirated Flat-Six",
    transmission: "7-speed PDK",
    fuelType: "Gasoline",
    features: ["Carbon Ceramic Brakes", "Bose Surround Sound", "Full Bucket Seats"]
  },
  {
    id: "v002",
    make: "Mercedes-Benz",
    model: "AMG G 63",
    year: 2022,
    price: 185000,
    imageUrl: mercedesAmgG63Image, // Use the imported image variable
    description: "Iconic off-roader with a luxurious and powerful edge. Impeccable interior.",
    mileage: "12,000 miles",
    exteriorColor: "Obsidian Black Metallic",
    interiorColor: "Designo Nappa Leather - Classic Red",
    engine: "4.0L Biturbo V8",
    transmission: "AMG SPEEDSHIFT TCT 9G",
    fuelType: "Gasoline",
    features: ["Burmester Surround Sound", "AMG Ride Control", "360-degree Camera"]
  },
  {
    id: "v003",
    make: "Ferrari",
    model: "488 GTB",
    year: 2018,
    price: 250000,
    imageUrl: ferrari488GtbImage, // Use the imported image variable
    description: "A true masterpiece of Italian engineering, combining breathtaking performance with stunning design.",
    mileage: "8,000 miles",
    exteriorColor: "Rosso Corsa",
    interiorColor: "Nero with Red stitching",
    engine: "3.9L Twin-Turbo V8",
    transmission: "7-speed Dual-Clutch F1",
    fuelType: "Gasoline",
    features: ["Carbon Fibre Racing Seats", "Front Suspension Lifter", "Scuderia Ferrari Shields"]
  },
  {
    id: "v004",
    make: "Rolls-Royce",
    model: "Cullinan",
    year: 2021,
    price: 380000,
    imageUrl: rollsRoyceCullinanImage, // Use the imported image variable
    description: "The pinnacle of luxury SUVs, offering an unparalleled ride and supreme comfort.",
    mileage: "6,500 miles",
    exteriorColor: "Dark Emerald",
    interiorColor: "Pistachio Green and Arctic White",
    engine: "6.75L Twin-Turbo V12",
    transmission: "8-speed Automatic",
    fuelType: "Gasoline",
    features: ["Starlight Headliner", "Rear Entertainment System", "Picnic Tables"]
  },
  {
    id: "v005",
    make: "Lamborghini",
    model: "Huracán EVO",
    year: 2020,
    price: 295000,
    imageUrl: lamborghiniHuracanEvoImage, // Use the imported image variable
    description: "Experience the thrill of a supercar with cutting-edge technology and a visceral driving experience.",
    mileage: "3,500 miles",
    exteriorColor: "Arancio Borealis",
    interiorColor: "Nero Ade with Arancio Dryope stitching",
    engine: "5.2L Naturally Aspirated V10",
    transmission: "7-speed Dual-Clutch",
    fuelType: "Gasoline",
    features: ["LDS (Lamborghini Dynamic Steering)", "Magneto-rheological Suspension", "Sensonum Sound System"]
  },
  {
    id: "v006",
    make: "Audi",
    model: "R8 V10 Performance",
    year: 2022,
    price: 190000,
    imageUrl: audiR8Image, // Use the imported image variable
    description: "Everyday usability meets supercar performance. A stunning example with low miles.",
    mileage: "7,200 miles",
    exteriorColor: "Kemora Gray Metallic",
    interiorColor: "Black with Express Red stitching",
    engine: "5.2L Naturally Aspirated V10",
    transmission: "7-speed S tronic",
    fuelType: "Gasoline",
    features: ["Audi Virtual Cockpit", "Carbon Fiber Exterior Package", "Sport Exhaust System"]
  }
];
