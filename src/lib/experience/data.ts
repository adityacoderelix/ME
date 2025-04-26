export const experienceData = {
  title: "Get Hooked on Fishing",
  location: "Entire rental unit in North Goa, India",
  images: [
    {
      id: "main",
      url: "/experience1.png",
      alt: "Fishing",
    },
    {
      id: "bedroom1",
      url: "/experience2.png",
      alt: "Master bedroom",
    },
    {
      id: "bedroom2",
      url: "/experience3.png",
      alt: "Second bedroom",
    },
    {
      id: "pool",
      url: "/experience4.png",
      alt: "Swimming pool view",
    },
    {
      id: "kitchen",
      url: "/experience5.png",
      alt: "Kitchen area",
    },
  ],
};

export const descriptionData = {
  title: "Experiences descriptions",
  details: [
    "As your host and lifelong fishing enthusiast, I'm excited to share my family's favorite fishing spots with you. For over 20 years, I've been helping guests discover the joy of landing their first catch and mastering the art of fishing in our pristine waters. Let me guide you through an unforgettable day on the water.",
    "",
    "",
    "Your Day with Us",
    "",
    "",
    "5:30 AM - Rise & Shine Meet at our lakeside cabin for fresh coffee and homemade breakfast sandwiches. We'll review weather conditions and plan our approach while gearing up for the day",
    "6:00 AM - On the Water We'll take our fully-equipped boat to my secret morning spots where the bass are most active. I'll show you the exact techniques that have worked for decades in these waters",
    "6:00 AM - On the Water We'll take our fully-equipped boat to my secret morning spots where the bass are most active. I'll show you the exact techniques that have worked for decades in these waters",
    "6:00 AM - On the Water We'll take our fully-equipped boat to my secret morning spots where the bass are most active. I'll show you the exact techniques that have worked for decades in these waters",
    "6:00 AM - On the Water We'll take our fully-equipped boat to my secret morning spots where the bass are most active. I'll show you the exact techniques that have worked for decades in these waters",
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
    platformFees: 200,
    serviceFees: 500,
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

export const hostData = {
  name: "Samuel Francis",
  profileImage: "/profile.jpeg",
  isVerified: true,
  rating: 5.0,
  reviews: 40,
  stays: 12,
  description:
    "After 20 years of finding the perfect spots in these waters, I'm here to share our local treasures with you. Whether you're casting your first line or seeking that trophy catch, we'll spend a day creating memories...",
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
        "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
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
