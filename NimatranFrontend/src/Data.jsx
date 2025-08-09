
const dummyCards = [
  {
    _id: "5f8d04b3b54764421b7156c1",
    title: "Royal Wedding Invitation",
    category: "wedding",
    categoryId: "cat_wed_01",
    description: "Elegant golden wedding invite with floral borders.",
    price: 399,
    isPopular: true,
    color: "gold",
    size: "A5",
    keywords: ["royal", "wedding", "golden", "traditional", "floral"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.8,
    reviewsCount: 145,
    deliveryInfo: "Get it by Aug 8 - Aug 10",
    returnPolicy: "7-day return policy for unused and undamaged items.",
    highlights: [
      "Premium textured cardstock with gold foil accents",
      "Intricate floral and mandala designs",
      "Includes matching envelope",
      "Customizable names and dates",
      "Eco-friendly ink used"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/elegant-wedding-invitation-card-with-golden-leaves_1017-28070.jpg",
      back: "https://img.freepik.com/free-vector/abstract-watercolor-wedding-invitation_52683-46431.jpg"
    },
    specifications: {
      material: "Premium Textured Cardstock",
      dimensions: "5.8 x 8.3 inches (A5)",
      printing: "Foiling + Digital Print",
      weight: "35g per card",
      color: "Gold with Ivory base",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 20
    }
  },
  {
    _id: "5f8d04b3b54764421b7156c2",
    title: "Traditional Haldi Ceremony Card",
    category: "wedding",
    categoryId: "cat_wed_01",
    description: "Vibrant yellow haldi function card with marigold theme.",
    price: 299,
    isPopular: false,
    color: "yellow",
    size: "A6",
    keywords: ["haldi", "ceremony", "marigold", "wedding", "traditional"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.3,
    reviewsCount: 62,
    deliveryInfo: "Get it by Aug 9 - Aug 12",
    returnPolicy: "7-day return policy",
    highlights: [
      "Bright yellow marigold floral design",
      "Matte finish cardstock",
      "Includes envelope",
      "Customizable text fields"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/hand-painted-haldi-ceremony-background_52683-45824.jpg",
      back: "https://img.freepik.com/free-vector/floral-haldi-invitation-template_52683-45825.jpg"
    },
    specifications: {
      material: "Matte Cardstock",
      dimensions: "4.1 x 5.8 inches (A6)",
      printing: "Digital Print",
      weight: "25g per card",
      color: "Yellow",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 30
    }
  },
  {
    _id: "5f8d04b3b54764421b7156c3",
    title: "Birthday Celebration Invite",
    category: "birthday",
    categoryId: "cat_bday_01",
    description: "Fun and colorful birthday invitation for kids & adults.",
    price: 199,
    isPopular: true,
    color: "multi",
    size: "A5",
    keywords: ["birthday", "celebration", "kids", "fun", "colorful"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.5,
    reviewsCount: 89,
    deliveryInfo: "Get it by Aug 7 - Aug 9",
    returnPolicy: "7-day return policy",
    highlights: [
      "Glossy finish with vibrant colors",
      "Themed designs (kids/adults)",
      "Envelope included",
      "Quick turnaround time"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/happy-birthday-card-design_1017-17746.jpg",
      back: "https://img.freepik.com/free-vector/colorful-confetti-background_52683-45795.jpg"
    },
    specifications: {
      material: "Glossy Cardstock",
      dimensions: "5.8 x 8.3 inches (A5)",
      printing: "Digital Print",
      weight: "30g per card",
      color: "Multicolor",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 15
    }
  },
  {
    _id: "5f8d04b3b54764421b7156c4",
    title: "Baby Shower Invitation",
    category: "babyshower",
    categoryId: "cat_baby_01",
    description: "Soft pink and blue card for baby shower events.",
    price: 249,
    isPopular: true,
    color: "pink-blue",
    size: "A5",
    keywords: ["baby", "shower", "cute", "newborn", "pastel"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.7,
    reviewsCount: 112,
    deliveryInfo: "Get it by Aug 8 - Aug 11",
    returnPolicy: "7-day return policy",
    highlights: [
      "Pastel pink/blue watercolor design",
      "Premium matte finish",
      "Includes envelope",
      "Customizable for gender reveal"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/cute-baby-shower-invitation-template_52683-45820.jpg",
      back: "https://img.freepik.com/free-vector/watercolor-baby-shower-background_52683-45821.jpg"
    },
    specifications: {
      material: "Matte Cardstock",
      dimensions: "5.8 x 8.3 inches (A5)",
      printing: "Digital Print",
      weight: "28g per card",
      color: "Pink & Blue",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 20
    }
  },
  {
    _id: "5f8d04b3b54764421b7156c5",
    title: "Diwali Party Card",
    category: "festival",
    categoryId: "cat_fest_01",
    description: "Gold-themed Diwali celebration invite.",
    price: 279,
    isPopular: false,
    color: "gold",
    size: "A6",
    keywords: ["diwali", "festival", "lights", "gold", "celebration"],
    brand: "TheNimantran",
    availability: "Low Stock",
    rating: 4.4,
    reviewsCount: 76,
    deliveryInfo: "Get it by Aug 10 - Aug 15",
    returnPolicy: "7-day return policy",
    highlights: [
      "Gold foil detailing",
      "Traditional diya/lantern motifs",
      "Includes envelope",
      "Festive color palette"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/diwali-festival-card-design_1017-27255.jpg",
      back: "https://img.freepik.com/free-vector/diwali-background-with-diya-lamps_52683-45797.jpg"
    },
    specifications: {
      material: "Textured Cardstock",
      dimensions: "4.1 x 5.8 inches (A6)",
      printing: "Foiling + Digital Print",
      weight: "26g per card",
      color: "Gold & Red",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 25
    }
  },
  {
    _id: "5f8d04b3b54764421b7156c6",
    title: "Corporate Event Invite",
    category: "corporate",
    categoryId: "cat_corp_01",
    description: "Professional and clean card for office events.",
    price: 319,
    isPopular: true,
    color: "blue-gray",
    size: "A4",
    keywords: ["corporate", "event", "professional", "clean", "office"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.6,
    reviewsCount: 54,
    deliveryInfo: "Get it by Aug 7 - Aug 9",
    returnPolicy: "7-day return policy",
    highlights: [
      "Minimalist professional design",
      "Premium linen texture",
      "Includes envelope",
      "Quick customization"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/modern-business-event-invitation-template_23-2147954052.jpg",
      back: "https://img.freepik.com/free-vector/abstract-geometric-background_52683-45822.jpg"
    },
    specifications: {
      material: "Linen Cardstock",
      dimensions: "8.3 x 11.7 inches (A4)",
      printing: "Digital Print",
      weight: "45g per card",
      color: "Blue & Gray",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 10
    }
  },
  {
    _id: "5f8d04b3b54764421b7156c7",
    title: "Engagement Invitation",
    category: "wedding",
    categoryId: "cat_wed_01",
    description: "Modern yet traditional card for engagement ceremonies.",
    price: 349,
    isPopular: false,
    color: "red-gold",
    size: "A5",
    keywords: ["engagement", "modern", "red", "traditional", "ceremony"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.5,
    reviewsCount: 93,
    deliveryInfo: "Get it by Aug 9 - Aug 12",
    returnPolicy: "7-day return policy",
    highlights: [
      "Red and gold foil combination",
      "Intricate paisley patterns",
      "Includes envelope",
      "Customizable names/date"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/engagement-invitation-card-with-floral-design_1017-28071.jpg",
      back: "https://img.freepik.com/free-vector/abstract-watercolor-wedding-invitation_52683-46431.jpg"
    },
    specifications: {
      material: "Textured Cardstock",
      dimensions: "5.8 x 8.3 inches (A5)",
      printing: "Foiling + Digital Print",
      weight: "32g per card",
      color: "Red & Gold",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 20
    }
  },
  {
    _id: "5f8d04b3b54764421b7156c8",
    title: "Navratri Garba Invite",
    category: "festival",
    categoryId: "cat_fest_01",
    description: "Colorful and energetic card for Navratri nights.",
    price: 229,
    isPopular: true,
    color: "multicolor",
    size: "A6",
    keywords: ["navratri", "garba", "colorful", "dandiya", "festival"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.7,
    reviewsCount: 118,
    deliveryInfo: "Get it by Aug 6 - Aug 8",
    returnPolicy: "7-day return policy",
    highlights: [
      "Vibrant dandiya/garba motifs",
      "Glossy finish",
      "Includes envelope",
      "Festive typography"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/navratri-garba-invitation-template_52683-45826.jpg",
      back: "https://img.freepik.com/free-vector/colorful-confetti-background_52683-45795.jpg"
    },
    specifications: {
      material: "Glossy Cardstock",
      dimensions: "4.1 x 5.8 inches (A6)",
      printing: "Digital Print",
      weight: "25g per card",
      color: "Multicolor",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 30
    }
  },
  {
    _id: "5f8d04b3b54764421b7156c9",
    title: "Anniversary Celebration Invite",
    category: "anniversary",
    categoryId: "cat_anni_01",
    description: "Elegant golden anniversary card for milestone celebrations.",
    price: 379,
    isPopular: true,
    color: "gold-white",
    size: "A5",
    keywords: ["anniversary", "golden", "milestone", "elegant", "celebration"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.9,
    reviewsCount: 132,
    deliveryInfo: "Get it by Aug 8 - Aug 10",
    returnPolicy: "7-day return policy",
    highlights: [
      "Premium pearlized cardstock",
      "Laser-cut floral designs",
      "Includes matching envelope with liner",
      "Customizable years (25th, 50th etc.)",
      "Gold foil accents"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/golden-anniversary-invitation-template_23-2148884567.jpg",
      back: "https://img.freepik.com/free-vector/abstract-watercolor-background_23-2148884568.jpg"
    },
    specifications: {
      material: "Pearlized Cardstock",
      dimensions: "5.8 x 8.3 inches (A5)",
      printing: "Laser Cut + Foiling",
      weight: 40,
      color: "Gold & White",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 15
    }
  },
  {
    _id: "5f8d04b3b54764421b7156ca",
    title: "Graduation Party Card",
    category: "graduation",
    categoryId: "cat_grad_01",
    description: "Modern graduation cap design for academic achievements.",
    price: 229,
    isPopular: false,
    color: "black-gold",
    size: "A6",
    keywords: ["graduation", "academic", "diploma", "celebration", "achievement"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.6,
    reviewsCount: 87,
    deliveryInfo: "Get it by Aug 9 - Aug 12",
    returnPolicy: "7-day return policy",
    highlights: [
      "Graduation cap and scroll motifs",
      "Matte black with gold foil",
      "Includes envelope",
      "Customizable degree/name"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/graduation-invitation-template_23-2148884569.jpg",
      back: "https://img.freepik.com/free-vector/abstract-geometric-background_23-2148884570.jpg"
    },
    specifications: {
      material: "Matte Cardstock",
      dimensions: "4.1 x 5.8 inches (A6)",
      printing: "Digital Print + Foiling",
      weight: 28,
      color: "Black & Gold",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 20
    }
  },
  {
    _id: "5f8d04b3b54764421b7156cb",
    title: "House Warming Invitation",
    category: "housewarming",
    categoryId: "cat_house_01",
    description: "Warm and inviting card for new home celebrations.",
    price: 269,
    isPopular: true,
    color: "brown-cream",
    size: "A5",
    keywords: ["house", "warming", "home", "new", "celebration"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.7,
    reviewsCount: 104,
    deliveryInfo: "Get it by Aug 7 - Aug 9",
    returnPolicy: "7-day return policy",
    highlights: [
      "House illustration with warm tones",
      "Textured cardstock",
      "Includes envelope",
      "Customizable address/date"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/house-warming-party-invitation_23-2148884571.jpg",
      back: "https://img.freepik.com/free-vector/abstract-watercolor-background_23-2148884572.jpg"
    },
    specifications: {
      material: "Textured Cardstock",
      dimensions: "5.8 x 8.3 inches (A5)",
      printing: "Digital Print",
      weight: 32,
      color: "Brown & Cream",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 15
    }
  },
  {
    _id: "5f8d04b3b54764421b7156cc",
    title: "Retirement Party Card",
    category: "retirement",
    categoryId: "cat_retire_01",
    description: "Celebratory card for retirement parties and farewells.",
    price: 289,
    isPopular: false,
    color: "blue-silver",
    size: "A5",
    keywords: ["retirement", "farewell", "party", "celebration", "professional"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.5,
    reviewsCount: 56,
    deliveryInfo: "Get it by Aug 10 - Aug 13",
    returnPolicy: "7-day return policy",
    highlights: [
      "Elegant blue and silver design",
      "Clock and sunset motifs",
      "Includes envelope",
      "Customizable name/years"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/retirement-party-invitation-template_23-2148884573.jpg",
      back: "https://img.freepik.com/free-vector/abstract-geometric-background_23-2148884574.jpg"
    },
    specifications: {
      material: "Linen Cardstock",
      dimensions: "5.8 x 8.3 inches (A5)",
      printing: "Digital Print",
      weight: 34,
      color: "Blue & Silver",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 10
    }
  },
  {
    _id: "5f8d04b3b54764421b7156cd",
    title: "Bridal Shower Invite",
    category: "wedding",
    categoryId: "cat_wed_01",
    description: "Feminine and floral card for bridal shower events.",
    price: 279,
    isPopular: true,
    color: "pink-gold",
    size: "A6",
    keywords: ["bridal", "shower", "floral", "feminine", "wedding"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.8,
    reviewsCount: 121,
    deliveryInfo: "Get it by Aug 6 - Aug 8",
    returnPolicy: "7-day return policy",
    highlights: [
      "Delicate floral watercolor design",
      "Gold foil accents",
      "Includes envelope with liner",
      "Customizable bride's name"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/bridal-shower-invitation-template_23-2148884575.jpg",
      back: "https://img.freepik.com/free-vector/abstract-watercolor-background_23-2148884576.jpg"
    },
    specifications: {
      material: "Watercolor Paper",
      dimensions: "4.1 x 5.8 inches (A6)",
      printing: "Digital Print + Foiling",
      weight: 26,
      color: "Pink & Gold",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 25
    }
  },
  {
    _id: "5f8d04b3b54764421b7156ce",
    title: "Holi Party Invitation",
    category: "festival",
    categoryId: "cat_fest_01",
    description: "Colorful and vibrant card for Holi celebrations.",
    price: 219,
    isPopular: true,
    color: "multicolor",
    size: "A6",
    keywords: ["holi", "festival", "color", "celebration", "spring"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.7,
    reviewsCount: 98,
    deliveryInfo: "Get it by Aug 7 - Aug 9",
    returnPolicy: "7-day return policy",
    highlights: [
      "Splatter paint effect design",
      "Glossy finish",
      "Includes envelope",
      "Customizable party details"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/holi-festival-invitation-template_23-2148884577.jpg",
      back: "https://img.freepik.com/free-vector/colorful-confetti-background_23-2148884578.jpg"
    },
    specifications: {
      material: "Glossy Cardstock",
      dimensions: "4.1 x 5.8 inches (A6)",
      printing: "Digital Print",
      weight: 24,
      color: "Multicolor",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 30
    }
  },
  {
    _id: "5f8d04b3b54764421b7156cf",
    title: "Product Launch Invite",
    category: "corporate",
    categoryId: "cat_corp_01",
    description: "Sleek and modern card for product launch events.",
    price: 349,
    isPopular: false,
    color: "black-white",
    size: "A5",
    keywords: ["product", "launch", "corporate", "modern", "professional"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.4,
    reviewsCount: 43,
    deliveryInfo: "Get it by Aug 9 - Aug 12",
    returnPolicy: "7-day return policy",
    highlights: [
      "Minimalist typographic design",
      "Premium matte black cardstock",
      "Includes envelope",
      "Customizable product details"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/product-launch-invitation-template_23-2148884579.jpg",
      back: "https://img.freepik.com/free-vector/abstract-geometric-background_23-2148884580.jpg"
    },
    specifications: {
      material: "Matte Cardstock",
      dimensions: "5.8 x 8.3 inches (A5)",
      printing: "Digital Print",
      weight: 38,
      color: "Black & White",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 10
    }
  },
  {
    _id: "5f8d04b3b54764421b7156d0",
    title: "Mehendi Ceremony Card",
    category: "wedding",
    categoryId: "cat_wed_01",
    description: "Intricate mehendi design invitation for pre-wedding functions.",
    price: 329,
    isPopular: true,
    color: "green-gold",
    size: "A5",
    keywords: ["mehendi", "ceremony", "henna", "wedding", "traditional"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.8,
    reviewsCount: 137,
    deliveryInfo: "Get it by Aug 8 - Aug 10",
    returnPolicy: "7-day return policy",
    highlights: [
      "Authentic mehendi patterns",
      "Gold foil detailing",
      "Includes matching envelope",
      "Customizable names/date"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/mehendi-ceremony-invitation-template_23-2148884581.jpg",
      back: "https://img.freepik.com/free-vector/abstract-henna-pattern-background_23-2148884582.jpg"
    },
    specifications: {
      material: "Textured Cardstock",
      dimensions: "5.8 x 8.3 inches (A5)",
      printing: "Foiling + Digital Print",
      weight: 36,
      color: "Green & Gold",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 20
    }
  },
  {
    _id: "5f8d04b3b54764421b7156d1",
    title: "New Year Party Card",
    category: "festival",
    categoryId: "cat_fest_01",
    description: "Glittery celebration card for New Year's Eve parties.",
    price: 249,
    isPopular: true,
    color: "black-gold",
    size: "A6",
    keywords: ["new year", "party", "celebration", "glitter", "eve"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.6,
    reviewsCount: 112,
    deliveryInfo: "Get it by Aug 7 - Aug 9",
    returnPolicy: "7-day return policy",
    highlights: [
      "Glitter accents",
      "Midnight clock motif",
      "Includes envelope",
      "Customizable venue/time"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/new-year-party-invitation-template_23-2148884583.jpg",
      back: "https://img.freepik.com/free-vector/glitter-confetti-background_23-2148884584.jpg"
    },
    specifications: {
      material: "Glossy Cardstock",
      dimensions: "4.1 x 5.8 inches (A6)",
      printing: "Digital Print + Glitter",
      weight: 27,
      color: "Black & Gold",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 25
    }
  },
  {
    _id: "5f8d04b3b54764421b7156d2",
    title: "Sangeet Night Invitation",
    category: "wedding",
    categoryId: "cat_wed_01",
    description: "Musical themed card for wedding sangeet functions.",
    price: 359,
    isPopular: false,
    color: "purple-silver",
    size: "A5",
    keywords: ["sangeet", "wedding", "music", "dance", "celebration"],
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.5,
    reviewsCount: 78,
    deliveryInfo: "Get it by Aug 10 - Aug 13",
    returnPolicy: "7-day return policy",
    highlights: [
      "Musical note motifs",
      "Silver foil detailing",
      "Includes envelope",
      "Customizable names/date"
    ],
    images: {
      front: "https://img.freepik.com/free-vector/sangeet-night-invitation-template_23-2148884585.jpg",
      back: "https://img.freepik.com/free-vector/abstract-musical-background_23-2148884586.jpg"
    },
    specifications: {
      material: "Pearlized Cardstock",
      dimensions: "5.8 x 8.3 inches (A5)",
      printing: "Foiling + Digital Print",
      weight: 37,
      color: "Purple & Silver",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 15
    }
  }
]

export default dummyCards;

