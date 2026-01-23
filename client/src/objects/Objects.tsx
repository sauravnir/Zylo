// Navigation Menu Items
export const menuItems = [
  { title: "New", link: "/" },
  { title: "Basics", link: "/" },
  {
    title: "Shop",
    link: "#",
    children: [
      { title: "All Collections", link: "/" },
      { title: "Tees & Tops", link: "/" },
      { title: "Hoodies & Sweats", link: "/" },
      { title: "Outerwear", link: "/" },
      { title: "Bottoms", link: "/" },
      { title: "Accessories", link: "/" },
    ],
  },
];

// Navigation Call-To-Actions Items
export const cta = [
  {
    title: "Currencies",
    current: "Nepal",
    code: "NPR",
    symbol: "₨",
    link: "/",
    children: [

  { title: "Nepal", code: "NPR", symbol: "₨" },
  { title: "India", code: "INR", symbol: "₹" },
  
  // North America
  { title: "United States", code: "USD", symbol: "$" },
  { title: "Canada", code: "CAD", symbol: "$" },

  // Europe
  { title: "United Kingdom", code: "GBP", symbol: "£" },
  { title: "Europe", code: "EUR", symbol: "€" },
  { title: "Switzerland", code: "CHF", symbol: "CHf" },

  // Asia Pacific
  { title: "Japan", code: "JPY", symbol: "¥" },
  { title: "Australia", code: "AUD", symbol: "$" },
  { title: "South Korea", code: "KRW", symbol: "₩" },
  { title: "Singapore", code: "SGD", symbol: "$" },

  // Middle East
  { title: "United Arab Emirates", code: "AED", symbol: "د.إ" },
],
  },
  { title: "Search", link: "/" },
  { title: "Login", link: "/" },
  { title: "Cart", link: "/" },
];

// Product Items Objects 
export const PRODUCTS_LIST = [
  {
    id: "sc-01",
    title: "Heavyweight Boxy Hoodie",
    slug: "heavyweight-boxy-hoodie",
    category: "Core Collection",
    price: 145,
    primaryImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800",
      "https://images.unsplash.com/photo-1509948943821-395709971944?q=80&w=800"
    ],
    description: "Constructed from 450GSM French Terry cotton. Features a drop shoulder silhouette, double-lined hood, and kangaroo pocket. Pre-shrunk for a permanent fit.",
    productCare: "Machine wash cold. Hang dry to maintain structure. Do not bleach.",
    colors: [
      { name: "Onyx", hex: "#1A1A1A" },
      { name: "Slate", hex: "#708090" },
      { name: "Sand", hex: "#D2B48C" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    availability: "In Stock"
  },
  {
    id: "sc-02",
    title: "Premium Oversized Tee",
    slug: "premium-oversized-tee",
    category: "Essentials",
    price: 65,
    primaryImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800",
      "https://images.unsplash.com/photo-1509948943821-395709971944?q=80&w=800",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800"
    ],
    description: "A refined basic crafted from 280GSM organic cotton. Tight-knit neck ribbing and a clean, straight hem for a structured drape.",
    productCare: "Wash inside out. Tumble dry low. Iron on low heat if needed.",
    colors: [
      { name: "Bone", hex: "#F5F5F0" },
      { name: "Onyx", hex: "#1A1A1A" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    availability: "Limited Release"
  },
  {
    id: "sc-03",
    title: "Tapered Cargo Trouser",
    slug: "tapered-cargo-trouser",
    category: "Bottoms",
    price: 180,
    primaryImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800"
    ],
    description: "Functional streetwear meets luxury tailoring. Ripstop cotton blend featuring six-pocket styling and adjustable ankle toggles.",
    productCare: "Cold delicate cycle. Do not tumble dry. Professional dry clean recommended.",
    colors: [
      { name: "Olive", hex: "#3B3F30" },
      { name: "Onyx", hex: "#1A1A1A" }
    ],
    sizes: ["28", "30", "32", "34", "36"],
    availability: "In Stock"
  },
  {
    id: "sc-04",
    title: "Quarter-Zip Pullover",
    slug: "quarter-zip-pullover",
    category: "Knitwear",
    price: 125,
    primaryImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800"
    ],
    description: "A versatile layering piece. High-neck design with a custom brushed-steel zipper and subtle tonal embroidery on the chest.",
    productCare: "Hand wash only. Dry flat. Store folded to prevent stretching.",
    colors: [
      { name: "Melange Grey", hex: "#BEBEBE" },
      { name: "Navy", hex: "#000080" }
    ],
    sizes: ["S", "M", "L", "XL"],
    availability: "Sold Out"
  },
  {
    id: "sc-05",
    title: "Graphite Work Jacket",
    slug: "graphite-work-jacket",
    category: "Outerwear",
    price: 210,
    primaryImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800",
      "https://images.unsplash.com/photo-1479064560452-959d74d51622?q=80&w=800"
    ],
    description: "Heavy-duty 14oz canvas duck fabric. Cropped fit with internal quilted lining for insulation. Features a contrast corduroy collar and custom branded hardware.",
    productCare: "Spot clean only. Professional dry clean for deep stains. Do not iron hardware.",
    colors: [
      { name: "Graphite", hex: "#383838" },
      { name: "Tobacco", hex: "#734A12" }
    ],
    sizes: ["S", "M", "L", "XL"],
    availability: "Limited Release"
  },
  {
    id: "sc-06",
    title: "Relaxed French Terry Jogger",
    slug: "relaxed-french-terry-jogger",
    category: "Bottoms",
    price: 115,
    primaryImage: "https://images.unsplash.com/photo-1552664199-fd31f7431a55?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1552664199-fd31f7431a55?q=80&w=800",
      "https://images.unsplash.com/photo-1580487234397-130580d4810a?q=80&w=800"
    ],
    description: "Matches our Heavyweight Hoodie. 450GSM loopback cotton with an elasticated waistband and hidden drawstrings. Tapered at the ankle for a clean silhouette.",
    productCare: "Machine wash cold with similar colors. Dry flat to avoid shrinkage.",
    colors: [
      { name: "Onyx", hex: "#1A1A1A" },
      { name: "Slate", hex: "#708090" },
      { name: "Heather", hex: "#D3D3D3" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    availability: "In Stock"
  },
  {
    id: "sc-08",
    title: "Technical Puffer Vest",
    slug: "technical-puffer-vest",
    category: "Outerwear",
    price: 195,
    primaryImage: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=800",
      "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?q=80&w=800"
    ],
    description: "Water-repellent nylon shell with recycled down filling. Features an adjustable hem toggle and hidden internal tech pocket.",
    productCare: "Wipe with damp cloth. Professional down cleaning only.",
    colors: [
      { name: "Forest", hex: "#228B22" },
      { name: "Onyx", hex: "#1A1A1A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    availability: "Coming Soon"
  },
  {
    id: "sc-09",
    title: "Structured Beanie",
    slug: "structured-beanie",
    category: "Accessories",
    price: 45,
    primaryImage: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800"
    ],
    description: "Double-layered merino wool blend. Features a tight rib-knit construction that holds its shape. Tonal 'Collective' embroidery on the cuff.",
    productCare: "Hand wash cold. Dry flat.",
    colors: [
      { name: "Onyx", hex: "#1A1A1A" },
      { name: "Sand", hex: "#D2B48C" },
      { name: "Slate", hex: "#708090" }
    ],
    sizes: ["XL"],
    availability: "In Stock"
  },
  {
    id: "sc-10",
    title: "Nylon Utility Short",
    slug: "nylon-utility-short",
    category: "Bottoms",
    price: 90,
    primaryImage: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800",
      "https://images.unsplash.com/photo-1565041496146-12fec0b8ce8d?q=80&w=800"
    ],
    description: "Crinkle-finish technical nylon. Lightweight and quick-drying with an integrated belt system and zip-secure cargo pockets.",
    productCare: "Machine wash cold. Cool iron if needed. Do not tumble dry.",
    colors: [
      { name: "Storm", hex: "#4F5D75" },
      { name: "Onyx", hex: "#1A1A1A" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    availability: "Sold Out"
  },
  {
    id: "sc-16",
    title: "Heritage Varsity Jacket",
    slug: "heritage-varsity-jacket",
    category: "Outerwear",
    price: 285,
    primaryImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=800",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800"
    ],
    description: "Wool-blend body with premium vegan leather sleeves. Features chenille 'C' patch and custom striped rib-knit cuffs. Interior is satin-lined with a hidden chest pocket.",
    productCare: "Professional leather clean only. Do not wash.",
    colors: [
      { name: "Forest/Cream", hex: "#2D392B" },
      { name: "Onyx/White", hex: "#1A1A1A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    availability: "Limited Release"
  },
  {
    id: "sc-18",
    title: "Double-Layered Mesh Shorts",
    slug: "double-layered-mesh-shorts",
    category: "Bottoms",
    price: 75,
    primaryImage: "https://images.unsplash.com/photo-1515434126000-961d90ff09db?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1515434126000-961d90ff09db?q=80&w=800",
      "https://images.unsplash.com/photo-1565041496146-12fec0b8ce8d?q=80&w=800",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800"
    ],
    description: "Heavyweight double-layer mesh construction. Features an oversized fit, extra-long waxed drawstrings, and deep side pockets. Designed for maximum breathability.",
    productCare: "Machine wash cold. Hang dry to maintain drawstring wax.",
    colors: [
      { name: "Cream", hex: "#F5F5F0" },
      { name: "Onyx", hex: "#1A1A1A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "sc-19",
    title: "Symmetry Graphic Tee",
    slug: "symmetry-graphic-tee",
    category: "Essentials",
    price: 55,
    primaryImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800",
      "https://images.unsplash.com/photo-1554568212-3c16f5c75051?q=80&w=800",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800"
    ],
    description: "300GSM heavy combed cotton. Features a high-density puff print graphic on the center chest and a small screen-printed logo on the back neck.",
    productCare: "Wash inside out to protect print. Do not iron directly on graphic.",
    colors: [
      { name: "Onyx", hex: "#1A1A1A" },
      { name: "Bone", hex: "#F5F5F0" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    availability: "Limited Release"
  }
];

export const FOOTER_LINKS = [
  {
    title: "Help",
    links: [
      { name: "Shipping", href: "/" },
      { name: "Returns", href: "/" },
      { name: "FAQs", href: "/" },
      { name: "Terms and Condition", href: "/" },
      { name: "Privacy Policy", href: "/" },
    ],
  },
  {
    title: "More",
    links: [
      { name: "Early Access", href: "/" },
      { name: "Contact Us", href: "/" },
      { name: "Blog", href: "/" },
      { name: "New", href: "/" },
      { name: "Best Seller", href: "/" },
      { name: "Shop All", href: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { name: "Instagram", href: "https://www.instagram.com/zylo.studios/" },
      { name: "Facebook", href: "/" },
      { name: "YouTube", href: "/" },
    ],
  },
];