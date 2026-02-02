// Navigation Menu Items
export const menuItems = [
  { title: "New", link: "/collections/new" },
  { title: "Basics", link: "/collections/basics" },
  {
    title: "Shop",
    link: "#",
    children: [
      { title: "Shop All", link: "/collections/shop-all" },
      { title: "Tees & Tops", link: "/collections/tops" },
      { title: "Hoodies & Sweats", link: "/collections/hoodies" },
      { title: "Outerwear", link: "/collections/outerwear" },
      { title: "Bottoms", link: "/collections/bottoms" },
      { title: "Accessories", link: "/collections/accessories" },
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
    // South Asia
    { title: "Nepal", code: "NPR", symbol: "₨" },
    { title: "India", code: "INR", symbol: "₹" },
    { title: "Pakistan", code: "PKR", symbol: "₨" },
    { title: "Sri Lanka", code: "LKR", symbol: "₨" },

    // North America
    { title: "United States", code: "USD", symbol: "$" },
    { title: "Canada", code: "CAD", symbol: "$" },
    { title: "Mexico", code: "MXN", symbol: "$" },

    // Europe & UK
    { title: "United Kingdom", code: "GBP", symbol: "£" },
    { title: "Europe", code: "EUR", symbol: "€" },
    { title: "Switzerland", code: "CHF", symbol: "CHf" },
    { title: "Sweden", code: "SEK", symbol: "kr" },
    { title: "Norway", code: "NOK", symbol: "kr" },
    { title: "Denmark", code: "DKK", symbol: "kr" },

    // Asia Pacific
    { title: "Japan", code: "JPY", symbol: "¥" },
    { title: "Australia", code: "AUD", symbol: "$" },
    { title: "New Zealand", code: "NZD", symbol: "$" },
    { title: "South Korea", code: "KRW", symbol: "₩" },
    { title: "Singapore", code: "SGD", symbol: "$" },
    { title: "Hong Kong", code: "HKD", symbol: "$" },
    { title: "Thailand", code: "THB", symbol: "฿" },
    { title: "Malaysia", code: "MYR", symbol: "RM" },

    // Middle East & Africa
    { title: "United Arab Emirates", code: "AED", symbol: "د.إ" },
    { title: "Saudi Arabia", code: "SAR", symbol: "﷼" },
    { title: "Qatar", code: "QAR", symbol: "﷼" },
    { title: "South Africa", code: "ZAR", symbol: "R" },

    // South America
    { title: "Brazil", code: "BRL", symbol: "R$" },
    { title: "Argentina", code: "ARS", symbol: "$" },
  ],
},
  { title: "Search", link: "/" },
  // { title: "Login", link: "/" },
  { title: "Cart", link: "#" },
];
// Product Items Objects 
export const PRODUCTS_LIST = [
  // --- OUTERWEAR ---
  {
    id: "zy-01",
    title: "Minimalist Trench Coat",
    slug: "minimalist-trench-coat",
    category: "Outerwear",
    collection:"basics",
    price: 320,
    primaryImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800"
    ],
    description: "Structured silhouette crafted from waterproof gabardine. Features a hidden button placket and adjustable waist belt.",
    productCare: "Professional dry clean only.",
    colors: [{ name: "Beige", hex: "#D2B48C" }, { name: "Onyx", hex: "#1A1A1A" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-02",
    title: "Technical Windbreaker",
    slug: "technical-windbreaker",
    category: "Outerwear",
    price: 185,
    primaryImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800",
      "https://images.unsplash.com/photo-1504198266287-18594d6d9518?q=80&w=800",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=800"
    ],
    description: "Ultra-lightweight ripstop nylon with heat-sealed seams and reflective branding.",
    productCare: "Machine wash cold. Do not iron.",
    colors: [{ name: "Slate", hex: "#708090" }, { name: "Neon", hex: "#CCFF00" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-03",
    title: "Sherpa Lined Denim Jacket",
    slug: "sherpa-denim-jacket",
    category: "Outerwear",
    collection : "",
    price: 210,
    primaryImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800",
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=800",
      "https://images.unsplash.com/photo-1479064560452-959d74d51622?q=80&w=800"
    ],
    description: "Heavyweight 14oz denim with high-pile faux sherpa lining for winter warmth.",
    productCare: "Wash cold, hang dry.",
    colors: [{ name: "Vintage Blue", hex: "#5D76A9" }],
    sizes: ["M", "L", "XL"],
    availability: "Limited Release"
  },
  {
    id: "zy-04",
    title: "Graphite Work Jacket",
    slug: "graphite-work-jacket",
    category: "Outerwear",
    collection : "",
    price: 240,
    primaryImage: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=800",
      "https://images.unsplash.com/photo-1598808503742-dd34bd854147?q=80&w=800",
      "https://images.unsplash.com/photo-1523199455310-87b16c0eda11?q=80&w=800"
    ],
    description: "Rugged canvas shell with a cropped modern fit. Brass hardware details.",
    productCare: "Spot clean only.",
    colors: [{ name: "Graphite", hex: "#383838" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-05",
    title: "Technical Puffer Jacket",
    slug: "technical-puffer",
    category: "Tops",
    collection:"basics",
    price: 350,
    primaryImage: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=800",
      "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?q=80&w=800",
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800"
    ],
    description: "700-fill power recycled down. Matte nylon water-repellent shell.",
    productCare: "Professional down cleaning.",
    colors: [{ name: "Forest", hex: "#228B22" }, { name: "Onyx", hex: "#1A1A1A" }],
    sizes: ["M", "L", "XL"],
    availability: "Limited Release"
  },

  // --- TOPS / HOODIES ---
  {
    id: "zy-06",
    title: "Acid Wash Boxy Hoodie",
    slug: "acid-wash-hoodie",
    category: "Tops",
    price: 135,
    primaryImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800"
    ],
    description: "Unique mineral wash finish. 400GSM cotton fleece with dropped shoulders.",
    productCare: "Wash inside out. Color may fade over time.",
    colors: [{ name: "Charcoal", hex: "#36454F" }, { name: "Stone", hex: "#8E9294" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    availability: "In Stock"
  },
  {
    id: "zy-07",
    title: "Graphic Logo Crewneck",
    slug: "graphic-logo-crewneck",
    category: "Tops",
    collection: "",
    price: 95,
    primaryImage: "https://images.unsplash.com/photo-1509948943821-395709971944?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1509948943821-395709971944?q=80&w=800",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800"
    ],
    description: "Premium loopback terry with high-density silicone logo print.",
    productCare: "Machine wash cold. Do not iron print.",
    colors: [{ name: "Navy", hex: "#000080" }, { name: "White", hex: "#FFFFFF" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-08",
    title: "Oversized Flannel Shirt",
    slug: "oversized-flannel-shirt",
    category: "Tops",
    price: 85,
    primaryImage: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=800",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800"
    ],
    description: "Heavyweight brushed cotton flannel. Features dual chest pockets.",
    productCare: "Tumble dry low.",
    colors: [{ name: "Grey Plaid", hex: "#A9A9A9" }, { name: "Green Plaid", hex: "#2E8B57" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-09",
    title: "Quarter-Zip Pullover",
    slug: "quarter-zip-pullover",
    category: "Tops",
    price: 110,
    primaryImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800",
      "https://images.unsplash.com/photo-1509948943821-395709971944?q=80&w=800"
    ],
    description: "Custom steel hardware zipper with high-neck ribbing.",
    productCare: "Machine wash delicate.",
    colors: [{ name: "Melange Grey", hex: "#BEBEBE" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "Sold Out"
  },
  {
    id: "zy-10",
    title: "Heavyweight Pocket Longsleeve",
    slug: "pocket-longsleeve",
    category: "Tops",
    collection: "basics",
    price: 75,
    primaryImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800",
      "https://images.unsplash.com/photo-1554568212-3c16f5c75051?q=80&w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800"
    ],
    description: "300GSM organic cotton with a structured fit.",
    productCare: "Wash inside out.",
    colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#000000" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },

  // --- ESSENTIALS (TEES) ---
  {
    id: "zy-11",
    title: "Supima Cotton Pocket Tee",
    slug: "supima-pocket-tee",
    category: "Essentials",
    price: 45,
    primaryImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800"
    ],
    description: "Silky-smooth Supima cotton with a reinforced pocket.",
    productCare: "Machine wash warm.",
    colors: [{ name: "Bone", hex: "#F5F5F0" }, { name: "Black", hex: "#000000" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-12",
    title: "Vintage Box Tee",
    slug: "vintage-box-tee",
    category: "Essentials",
    price: 50,
    primaryImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800",
      "https://images.unsplash.com/photo-1554568212-3c16f5c75051?q=80&w=800",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800"
    ],
    description: "Cropped length with an extra-wide chest for a modern silhouette.",
    productCare: "Cold wash only.",
    colors: [{ name: "Vintage Black", hex: "#2B2B2B" }, { name: "Khaki", hex: "#C3B091" }],
    sizes: ["S", "M", "L"],
    availability: "Limited Release"
  },

  // --- BOTTOMS ---
  {
    id: "zy-13",
    title: "Wide Leg Carpenter Pant",
    slug: "carpenter-pant",
    category: "Bottoms",
    price: 155,
    primaryImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800"
    ],
    description: "12oz cotton duck canvas with hammer loop and utility pockets.",
    productCare: "Machine wash cold.",
    colors: [{ name: "Duck Brown", hex: "#A0522D" }, { name: "Black", hex: "#000000" }],
    sizes: ["30", "32", "34", "36"],
    availability: "In Stock"
  },
  {
    id: "zy-14",
    title: "Nylon Track Pant",
    slug: "nylon-track-pant",
    category: "Bottoms",
    collection: "basics",
    price: 110,
    primaryImage: "https://images.unsplash.com/photo-1552664199-fd31f7431a55?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1552664199-fd31f7431a55?q=80&w=800",
      "https://images.unsplash.com/photo-1580487234397-130580d4810a?q=80&w=800",
      "https://images.unsplash.com/photo-1495364141860-b0d03eaa104c?q=80&w=800"
    ],
    description: "Waterproof crinkle nylon with mesh lining and adjustable bungees.",
    productCare: "Cold wash, air dry.",
    colors: [{ name: "Olive", hex: "#556B2F" }, { name: "Navy", hex: "#000080" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "Sold Out"
  },
  {
    id: "zy-15",
    title: "Distressed Straight Denim",
    slug: "distressed-denim",
    category: "Bottoms",
    price: 195,
    primaryImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800",
      "https://images.unsplash.com/photo-1515434126000-961d90ff09db?q=80&w=800",
      "https://images.unsplash.com/photo-1552664199-fd31f7431a55?q=80&w=800"
    ],
    description: "Japanese selvedge denim with hand-distressed knees.",
    productCare: "Dry clean only.",
    colors: [{ name: "Light Wash", hex: "#ADD8E6" }],
    sizes: ["28", "30", "32", "34", "36"],
    availability: "In Stock"
  },
  {
    id: "zy-16",
    title: "Raw Edge Sweatshort",
    slug: "raw-edge-shorts",
    category: "Bottoms",
    price: 70,
    primaryImage: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800",
      "https://images.unsplash.com/photo-1565041496146-12fec0b8ce8d?q=80&w=800",
      "https://images.unsplash.com/photo-1515434126000-961d90ff09db?q=80&w=800"
    ],
    description: "Heavyweight French Terry with a raw, frayed hem finish.",
    productCare: "Machine wash warm.",
    colors: [{ name: "Heather Grey", hex: "#D3D3D3" }, { name: "Onyx", hex: "#1A1A1A" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },

  // --- ACCESSORIES ---
  {
    id: "zy-17",
    title: "Canvas Messenger Bag",
    slug: "canvas-messenger-bag",
    category: "Accessories",
    price: 140,
    primaryImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800",
      "https://images.unsplash.com/photo-1473187983345-80033f1baf5f?q=80&w=800"
    ],
    description: "Heavy-duty canvas with leather trim and padded laptop sleeve.",
    productCare: "Spot clean only.",
    colors: [{ name: "Tan", hex: "#D2B48C" }, { name: "Black", hex: "#000000" }],
    sizes: ["OS"],
    availability: "In Stock"
  },
  {
    id: "zy-18",
    title: "Wool 6-Panel Cap",
    slug: "wool-cap",
    category: "Accessories",
    price: 55,
    primaryImage: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800",
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800"
    ],
    description: "Melton wool construction with a leather strapback closure.",
    productCare: "Brush clean.",
    colors: [{ name: "Forest Green", hex: "#013220" }, { name: "Navy", hex: "#000080" }],
    sizes: ["OS"],
    availability: "In Stock"
  },
  {
    id: "zy-19",
    title: "Embroidered Beanie",
    slug: "embroidered-beanie",
    category: "Accessories",
    price: 40,
    primaryImage: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800",
      "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=800"
    ],
    description: "Soft acrylic knit with tonal logo embroidery.",
    productCare: "Hand wash only.",
    colors: [{ name: "Orange", hex: "#FF8C00" }, { name: "Black", hex: "#000000" }],
    sizes: ["OS"],
    availability: "In Stock"
  },

  // --- KNITWEAR ---
  {
    id: "zy-20",
    title: "Mohair Cardigan",
    slug: "mohair-cardigan",
    category: "Knitwear",
    price: 245,
    primaryImage: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800"
    ],
    description: "Hairy mohair blend with a vintage argyle pattern.",
    productCare: "Dry clean only. Store flat.",
    colors: [{ name: "Chocolate", hex: "#3D2B1F" }],
    sizes: ["S", "M", "L"],
    availability: "Limited Release"
  },
  {
    id: "zy-21",
    title: "Ribbed Mock Neck Sweater",
    slug: "mock-neck-sweater",
    category: "Knitwear",
    price: 160,
    primaryImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=800"
    ],
    description: "Heavyweight wool-cashmere blend. High-ribbed cuffs.",
    productCare: "Hand wash cold.",
    colors: [{ name: "Cream", hex: "#FFFDD0" }, { name: "Grey", hex: "#808080" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },

  // --- FOOTWEAR ---
  {
    id: "zy-22",
    title: "Suede Chelsea Boot",
    slug: "suede-chelsea-boot",
    category: "Footwear",
    price: 280,
    primaryImage: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800"
    ],
    description: "Italian calf suede with a crepe sole.",
    productCare: "Use suede protector spray.",
    colors: [{ name: "Sand", hex: "#C2B280" }, { name: "Tobacco", hex: "#734A12" }],
    sizes: ["40", "41", "42", "43", "44"],
    availability: "In Stock"
  },
  {
    id: "zy-23",
    title: "Court Leather Sneaker",
    slug: "court-sneaker",
    category: "Footwear",
    price: 220,
    primaryImage: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800"
    ],
    description: "Full-grain Nappa leather with a margom rubber cupsole.",
    productCare: "Wipe with damp cloth.",
    colors: [{ name: "White/Gum", hex: "#FFFFFF" }],
    sizes: ["40", "41", "42", "43", "44", "45"],
    availability: "In Stock"
  },

  // --- FINAL ITEMS ---
  {
    id: "zy-24",
    title: "Relaxed Linen Trouser",
    slug: "linen-trouser",
    category: "Bottoms",
    price: 130,
    primaryImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800"
    ],
    description: "Breathable linen-cotton blend with a drawstring waist.",
    productCare: "Machine wash cold.",
    colors: [{ name: "Natural", hex: "#E3D9C6" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-25",
    title: "Technical Puffer Vest",
    slug: "puffer-vest",
    category: "Outerwear",
    price: 195,
    primaryImage: "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?q=80&w=800",
      "https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=800",
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800"
    ],
    description: "Water-repellent nylon shell with recycled down filling.",
    productCare: "Wipe with damp cloth.",
    colors: [{ name: "Onyx", hex: "#1A1A1A" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  }
];
// Footer Object
export const FOOTER_LINKS = [
  {
    title: "Help",
    links: [
      { name: "Shipping", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "FAQs", href: "/faqs" },
      { name: "Terms and Condition", href: "/terms" },
      { name: "Privacy Policy", href: "/policy" },
    ],
  },
  {
    title: "More",
    links: [
      { name: "Contact Us", href: "/" },
      { name: "New", href: "/collections/new" },
      { name: "Best Seller", href: "/collections/basics" },
      { name: "Shop All", href: "/collections/shop-all" },
    ],
  },
  {
    title: "Socials",
    links: [
      { name: "Instagram", href: "https://www.instagram.com/zylo.studios/" },
    ],
  },
];

// Delivery Location
export const DELIVERY_LOCATIONS = [
  { city: "Kathmandu", area: "Inside Ringroad", rate: 100 },
  { city: "Lalitpur", area: "Inside Ringroad", rate: 100 },
  { city: "Bhaktapur", area: "Inside Ringroad", rate: 100 },
  { city: "Kirtipur", area: "Valley Suburb", rate: 120 },
  { city: "Budhanilkantha", area: "Valley Suburb", rate: 120 },
  { city: "Bhaisepati", area: "Valley Suburb", rate: 120 },
  { city: "Jorpati", area: "Valley Suburb", rate: 120 },
  { city: "Tokha", area: "Valley Suburb", rate: 120 },
  { city: "Thankot", area: "Valley West", rate: 150 },
  { city: "Suryabinayak", area: "Bhaktapur East", rate: 120 },
  { city: "Pokhara", area: "Kaski", rate: 150 },
  { city: "Butwal", area: "Rupandehi", rate: 150 },
  { city: "Chitwan", area: "Narayangarh/Bharatpur", rate: 150 },
  { city: "Biratnagar", area: "Morang", rate: 150 },
  { city: "Itahari", area: "Sunsari", rate: 150 },
  { city: "Dharan", area: "Sunsari", rate: 150 },
  { city: "Nepalgunj", area: "Banke", rate: 150 },
  { city: "Birtamod", area: "Jhapa", rate: 150 },
  { city: "Hetauda", area: "Makwanpur", rate: 150 },
  { city: "Bhairahawa", area: "Rupandehi", rate: 150 },
  { city: "Dhangadhi", area: "Kailali", rate: 150 },
  { city: "Banepa", area: "Kavre", rate: 150 },
  { city: "Damak", area: "Jhapa", rate: 150 },
  { city: "Birgunj", area: "Parsa", rate: 150 },
  { city: "Surkhet", area: "Birendranagar", rate: 200 },
  { city: "Tulsipur", area: "Dang", rate: 200 },
  { city: "Ghorahi", area: "Dang", rate: 200 },
  { city: "Lahan", area: "Siraha", rate: 200 },
  { city: "Janakpur", area: "Dhanusa", rate: 200 },
  { city: "Rajbiraj", area: "Saptari", rate: 200 },
  { city: "Baglung", area: "Baglung Bazaar", rate: 200 },
  { city: "Tansen", area: "Palpa", rate: 200 },
  { city: "Gulmi", area: "Tamghas", rate: 200 },
  { city: "Gorkha", area: "Gorkha Bazaar", rate: 200 },
  { city: "Dhankuta", area: "Dhankuta Bazaar", rate: 200 },
  { city: "Ilam", area: "Ilam Bazaar", rate: 200 },
  { city: "Jumla", area: "Karnali", rate: 300 },
  { city: "Mustang", area: "Jomsom", rate: 350 },
  { city: "Solukhumbu", area: "Lukla/Salleri", rate: 350 },
  { city: "Manang", area: "Chame", rate: 350 },
  { city: "Darchula", area: "Far West", rate: 300 }
];

// Shipping
export const SHIPPINGFAQS = [
  {
    id: "item-1",
    question: "Delivery Timeline",
    answer: "For orders within Kathmandu Valley, we deliver within 24-48 hours. For outside valley orders, please allow 3-5 business days depending on your location."
  },
  {
    id: "item-2",
    question: "Shipping Rates",
    answer: "We offer a flat shipping rate of Rs. 150 within Kathmandu. Outside valley shipping is calculated at checkout based on your specific district and package weight."
  },
  {
    id: "item-3",
    question: "Cash on Delivery (COD) Policy",
    answer: "We offer COD for all orders. However, for high-value orders or remote locations, our team may call you for a quick verification before dispatching your package."
  },
  {
    id: "item-4",
    question: "Order Tracking",
    answer: "Once your order is verified and dispatched, you will receive an SMS with your tracking details. You can use this to check the real-time status of your delivery."
  },
  {
    id: "item-5",
    question: "Exchange & Returns",
    answer: "If the fit isn't right, we offer a 7-day exchange policy. Items must be unworn, unwashed, and have the original Zylo tags attached. Delivery charges for exchanges are borne by the customer."
  }
];
// return
export const RETURNFAQS = [
  {
    id: "return-1",
    question: "7-Day Return Policy",
    answer: "We accept returns and exchanges within 7 days of delivery. The item must be in its original condition: unworn, unwashed, and with all Zylo tags and original packaging intact."
  },
  {
    id: "return-2",
    question: "How to Initiate a Return",
    answer: "To start a return, please contact our support team via WhatsApp or Instagram DM with your Order ID and photos of the item. Once approved, you can send the item back to our central hub."
  },
  {
    id: "return-3",
    question: "Refund Method",
    answer: "For Cash on Delivery orders, we offer refunds via eSewa, Khalti, or Bank Transfer within 3-5 business days after we receive and inspect the returned item."
  },
  {
    id: "return-4",
    question: "Exchange Shipping Costs",
    answer: "If you received a defective or wrong item, Zylo covers all shipping costs. For size exchanges or change-of-mind returns, the customer is responsible for the return shipping fee."
  },
  {
    id: "return-5",
    question: "Non-Returnable Items",
    answer: "For hygiene reasons, innerwear, socks, and items purchased during 'Final Clearance' sales are not eligible for return or exchange."
  }
];
// FAQS
export const FAQS = [
  {
    id: "faq-1",
    question: "How long does delivery take?",
    answer: "Inside Kathmandu Valley, we deliver within 24-48 hours. For outside valley orders, it typically takes 3-5 business days depending on your location."
  },
  {
    id: "faq-2",
    question: "How do I know my size?",
    answer: "Our fits are generally 'Streetwear Oversized.' We recommend checking the Size Chart on the product page or ordering your standard size for that relaxed look. If you're between sizes, size down for a more standard fit."
  },
  {
    id: "faq-3",
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes, we offer COD nationwide. However, for high-value orders or certain remote locations, our team might reach out for a small commitment advance via eSewa/Khalti."
  },
  {
    id: "faq-4",
    question: "Can I return an item if it doesn't fit?",
    answer: "Absolutely. We have a 7-day exchange policy. The item must be unworn with all Zylo tags attached. Note that the customer handles the return shipping costs for size exchanges."
  },
  {
    id: "faq-5",
    question: "Are your drops limited edition?",
    answer: "Most of our seasonal collections are 'One-Time Drops.' Once a specific design is sold out, we rarely restock it to maintain the exclusivity of the piece."
  },
  {
    id: "faq-6",
    question: "How should I wash my Zylo gear?",
    answer: "To preserve the print and fabric quality, we recommend washing inside out in cold water and hanging to dry. Avoid direct sunlight and never iron directly over the graphics."
  }
];