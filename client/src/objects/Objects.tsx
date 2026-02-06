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

import PIC1 from "@/assets/products/pixelcut_1 (1).png"
import PIC2 from "@/assets/products/pixelcut_2 (1).png"
import PIC3 from "@/assets/products/pixelcut_2.png"
import PIC4 from "@/assets/products/pixelcut_3 (1).png"
import PIC5 from "@/assets/products/pixelcut_3.png"
import PIC6 from "@/assets/products/pixelcut_4 (1).png"
import PIC7 from "@/assets/products/pixelcut_4.png"
import PIC8 from "@/assets/products/pixelcut_5 (1).png"
import PIC9 from "@/assets/products/pixelcut_5.png"
import PIC10 from "@/assets/products/pixelcut_6 (1).png"
import PIC11 from "@/assets/products/pixelcut_6.png"
import PIC12 from "@/assets/products/pixelcut_9.png"
import PIC13 from "@/assets/products/pixelcut_10.png"
import PIC14 from "@/assets/products/pixelcut_11.png"
import PIC15 from "@/assets/products/pixelcut_12.png"
import PIC16 from "@/assets/products/pixelcut_13.png"
import PIC17 from "@/assets/products/pixelcut_14.png"
import PIC18 from "@/assets/products/pixelcut_15.png"
import PIC19 from "@/assets/products/pixelcut_16.png"
import PIC20 from "@/assets/products/pixelcut_17.png"
import PIC21 from "@/assets/products/pixelcut_18.png"
import PIC22 from "@/assets/products/pixelcut_19.png"
import PIC23 from "@/assets/products/pixelcut_8.png"
import PIC24 from "@/assets/products/pixelcut_7.png"
import PIC25 from "@/assets/products/pixelcut_1.png"

// Product Items Objects 
export const PRODUCTS_LIST = [
  // --- OUTERWEAR ---
  {
    id: "zy-01",
    title: "Minimalist Trench Coat",
    slug: "minimalist-trench-coat",
    category: "Outerwear",
    collection: "basics",
    price: 320,
    primaryImage: PIC1,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC2,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Slate", hex: "#708090" }, { name: "Neon", hex: "#CCFF00" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-03",
    title: "Sherpa Lined Denim Jacket",
    slug: "sherpa-denim-jacket",
    category: "Outerwear",
    collection: "",
    price: 210,
    primaryImage: PIC3,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Vintage Blue", hex: "#5D76A9" }],
    sizes: ["M", "L", "XL"],
    availability: "Limited Release"
  },
  {
    id: "zy-04",
    title: "Graphite Work Jacket",
    slug: "graphite-work-jacket",
    category: "Outerwear",
    collection: "",
    price: 240,
    primaryImage: PIC4,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Graphite", hex: "#383838" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-05",
    title: "WASTELAND HOODIE BLACK",
    slug: "wasteland-hoodie-black",
    category: "Wasteland",
    collection: "",
    price: 2500,
    primaryImage: PIC5,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Forest", hex: "#228B22" }, { name: "Onyx", hex: "#1A1A1A" }],
    sizes: ["L", "XL"],
    availability: "Limited Release"
  },
  {
    id: "zy-06",
    title: "Acid Wash Boxy Hoodie",
    slug: "acid-wash-hoodie",
    category: "Tops",
    price: 135,
    primaryImage: PIC6,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC7,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC8,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC9,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC10,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#000000" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-11",
    title: "Supima Cotton Pocket Tee",
    slug: "supima-pocket-tee",
    category: "Essentials",
    price: 45,
    primaryImage: PIC11,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC12,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Vintage Black", hex: "#2B2B2B" }, { name: "Khaki", hex: "#C3B091" }],
    sizes: ["S", "M", "L"],
    availability: "Limited Release"
  },
  {
    id: "zy-13",
    title: "Wide Leg Carpenter Pant",
    slug: "carpenter-pant",
    category: "Bottoms",
    price: 155,
    primaryImage: PIC13,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC14,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC15,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC16,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Heather Grey", hex: "#D3D3D3" }, { name: "Onyx", hex: "#1A1A1A" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-17",
    title: "Canvas Messenger Bag",
    slug: "canvas-messenger-bag",
    category: "Accessories",
    price: 140,
    primaryImage: PIC17,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC18,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC19,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Orange", hex: "#FF8C00" }, { name: "Black", hex: "#000000" }],
    sizes: ["OS"],
    availability: "In Stock"
  },
  {
    id: "zy-20",
    title: "Mohair Cardigan",
    slug: "mohair-cardigan",
    category: "Knitwear",
    price: 245,
    primaryImage: PIC20,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC21,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Cream", hex: "#FFFDD0" }, { name: "Grey", hex: "#808080" }],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-22",
    title: "Suede Chelsea Boot",
    slug: "suede-chelsea-boot",
    category: "Footwear",
    price: 280,
    primaryImage: PIC22,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC24,
    images: [PIC24, PIC22, PIC12],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "White/Gum", hex: "#FFFFFF" }],
    sizes: ["40", "41", "42", "43", "44", "45"],
    availability: "In Stock"
  },
  {
    id: "zy-24",
    title: "Relaxed Linen Trouser",
    slug: "linen-trouser",
    category: "Bottoms",
    price: 130,
    primaryImage: PIC25,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
    primaryImage: PIC23,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
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
      { name: "Contact Us", href: "/contact-us" },
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
    question: "Order Processing",
    answer: "Orders are processed within 1 business day after payment confirmation. Orders placed on weekends or public holidays will be processed on the next business day."
  },
  {
    id: "item-2",
    question: "Shipping Time",
    answer: "Inside valley: 1-2 business days. Outside valley: 2-3 business days. Delivery times may vary depending on location, courier services, or unforeseen delays. "
  },
  {
    id: "item-3",
    question: "Shipping Charges",
    answer: "Shipping charges are calculated at checkout based on order size and destination. Free shipping may be offered during special promotions."
  },
  {
    id: "item-4",
    question: "Order Tracking",
    answer: "Once your order has been dispatched, a tracking number will be provided if asked by customers."
  },
];
// return
export const RETURNFAQS = [
  {
    id: "return-1",
    question: "Returns",
    answer: "Returns are accepted within 24 hours days of receiving the product. Items must be unused, unwashed, and in original condition, with tags and packaging intact."
  },
  {
    id: "return-2",
    question: "Non-Returnable Items",
    answer: "Discounted or sale items. Gift cards. Customized or made-to-order products"
  },
  {
    id: "return-3",
    question: "Refunds",
    answer: "After we receive and inspect the returned item, we will notify you of the approval status. Approved refunds will be processed to the original payment method within 5–7 business days."
  },
  {
    id: "return-4",
    question: "Exchanges",
    answer: "Exchanges are only applicable for damaged or defective items. Please notify us within 24 hours of delivery with clear photos or videos."


  },
  {
    id: "return-5",
    question: "Return Shipping",
    answer: "Customers are responsible for return shipping costs unless the item received was damaged or incorrect."
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