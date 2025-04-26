export const propertyData = {
  title: "Casa Belo - Chic 1BHK Serviced apt | Pool + Gym",
  location: "Entire rental unit in North Goa, India",
  images: [
    {
      id: "main",
      url: "/image1.png",
      alt: "Living room with balcony view",
    },
    {
      id: "bedroom1",
      url: "/image2.png",
      alt: "Master bedroom",
    },
    {
      id: "bedroom2",
      url: "/image3.png",
      alt: "Second bedroom",
    },
    {
      id: "pool",
      url: "/image4.png",
      alt: "Swimming pool view",
    },
    {
      id: "kitchen",
      url: "/image5.png",
      alt: "Kitchen area",
    },
  ],
};

export const priceData = {
  pricePerNight: 1891,
  stayDetails: {
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1.5,
  },
  fees: {
    platformFee: 200,
    serviceFee: 500,
    discount: 10,
  },
  defaultDates: {
    checkIn: "2024-10-29",
    checkOut: "2024-11-08",
  },
  maxGuests: 6,
};

export type priceData = {
  pricePerNight: number;
  defaultDates: {
    checkIn: string;
    checkOut: string;
  };
  fees: {
    platformFee: number;
    serviceFee: number;
    discount: number;
  };
  stayDetails: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  maxGuests: number;
};

export const infoData = {
  title: "Stay information",
  details: [
    "Providing Pool views, Entire rental unit in North Goa, provides accommodation, an outdoor swimming pool, a bar, a shared lounge, a garden and barbecue facilities. Complimentary WiFi is provided.",
    "There is a private bathroom with bidet in all units, along with a hairdryer and free toiletries.",
    "The Casa Bella offers a terrace.",
    "Both a bicycle rental service and a car rental service are available at the accommodation, while cycling can be enjoyed nearby.",
  ],
};

export const facilityData = {
  title: "Amenities",
  description: "About the property's amenities and services",
  totalAmenities: 20,
  amenities: [
    {
      name: "Wifi",
      icon: "wifi",
    },
    {
      name: "Television",
      icon: "tv",
    },
    {
      name: "Harmony",
      icon: "air-vent",
    },
    {
      name: "Shampoo, conditioner",
      icon: "shower-head",
    },
    {
      name: "Towel",
      icon: "shirt",
    },
    {
      name: "Toothpaste",
      icon: "toothbrush",
    },
    {
      name: "Soap",
      icon: "droplets",
    },
    {
      name: "Dryer",
      icon: "fan",
    },
    {
      name: "Internet",
      icon: "wifi",
    },
  ],
};

export const hostData = {
  name: "Samuel Francis",
  profileImage: "/profile.jpeg",
  isVerified: true,
  rating: 5.0,
  reviews: 40,
  stays: 12,
  description:
    "Providing pool views, The Casa Belo in North Goa provides accommodation, an outdoor swimming pool, a bar, a shared lounge, a garden and barbecue facilities...",
  joinDate: "Nov 2024",
  responseRate: 100,
  responseTime: "within a few hours",
};

export const reviewsData = {
  totalReviews: 40,
  displayedReviews: 3,
  remainingReviews: 37,
  reviews: [
    {
      id: 1,
      user: "Cody Fisher",
      date: "Nov 20, 2024",
      content:
        "There's no stopping the tech giant. Apple now opens its 100th store in China.There's no stopping the tech giant.",
      rating: 4,
      avatar: "/profile.jpeg",
    },
    {
      id: 2,
      user: "Cody Fisher",
      date: "Nov 20, 2024",
      content:
        "There's no stopping the tech giant. Apple now opens its 100th store in China.There's no stopping the tech giant.",
      rating: 4,
      avatar: "/profile.jpeg",
    },
    {
      id: 3,
      user: "Cody Fisher",
      date: "Nov 20, 2024",
      content:
        "There's no stopping the tech giant. Apple now opens its 100th store in China.There's no stopping the tech giant.",
      rating: 4,
      avatar: "/profile.jpeg",
    },
  ],
};

export const locationData = {
  title: "Location",
  location: "North Goa, Goa, India",
  latitude: 15.5,
  longitude: 73.8,
};

export interface Attraction {
  title: string;
  description: string;
  imageUrl: string;
}

export const attractions: Attraction[] = [
  {
    title: "Fort Aguada",
    description:
      "Perched on Sinquerim Beach, this majestic 17th-century Portuguese fort provides panoramic views of the Arabian Sea. Built in 1612, it features an ancient lighthouse, massive water storage tank, and well-preserved ramparts.",
    imageUrl: "/home1.png",
  },
  {
    title: "Calangute Beach",
    description:
      "Known as the 'Queen of Beaches,' Calangute stretches over 4 kilometers with golden sand and crystal-clear waters. Famous for its vibrant beach shacks, water sports activities, and bustling shopping streets, ideal for both relaxation and adventure, with excellent seafood restaurants.",
    imageUrl: "/home2.png",
  },
  {
    title: "Basilica of Bom Jesus",
    description:
      "A UNESCO World Heritage site in Old Goa, this 16th-century church is a masterpiece of baroque architecture. Home to the mortal remains of St. Francis Xavier, its intricate gilded altars and detailed artwork make it one of India's most celebrated churches. A must-visit for its historical significance.",
    imageUrl: "/home3.png",
  },
];

export interface Property {
  id: string;
  name: string;
  location: string;
  availability: string;
  price: number;
  rating: number;
  images: string[];
}

export const properties: Property[] = [
  {
    id: "1",
    name: "Palmeira De Saligao",
    location: "Saligao, Goa",
    availability: "10 - 15 Nov",
    price: 100000,
    rating: 5,
    images: ["/villa1.png", "/home1.png"],
  },
  {
    id: "2",
    name: "Cardozo House",
    location: "Candolim, North Goa",
    availability: "10 - 15 Nov",
    price: 70000,
    rating: 4,
    images: ["/villa2.png", "/home2.png"],
  },
  {
    id: "3",
    name: "Trails Villa Eterna",
    location: "Saligao, North Goa",
    availability: "10 - 15 Nov",
    price: 62172,
    rating: 5,
    images: ["/villa3.png", "/home3.png"],
  },
  {
    id: "4",
    name: "Trails 70 Vale",
    location: "Vagator, North Goa",
    availability: "10 - 15 Nov",
    price: 60000,
    rating: 5,
    images: ["/villa4.png", "/image1.png"],
  },
];
