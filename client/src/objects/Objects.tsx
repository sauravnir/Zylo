// Navigation Menu Items
export const menuItems = [
  { title: "New", link: "/collections/new" },
  { title: "Basics", link: "/collections/basics" },
  {
    title: "Shop",
    link: "#",
    children: [
      { title: "Shop All", link: "/collections/shop-all" },
      { title: "Graphic Tees", link: "/collections/Graphic Tees" },
      { title: "Basic Hoodies", link: "/collections/Basic Hoodies" },
      { title: "Wasteland", link: "/collections/Wasteland" },
      { title: "Basic Tees", link: "/collections/Basic Tees" },
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
import PIC17 from "@/assets/products/pixelcut_14.png"
import PIC18 from "@/assets/products/pixelcut_15.png"
import PIC19 from "@/assets/products/pixelcut_16.png"
import PIC20 from "@/assets/products/pixelcut_17.png"
import PIC21 from "@/assets/products/pixelcut_18.png"
import PIC22 from "@/assets/products/pixelcut_19.png"
import PIC23 from "@/assets/products/pixelcut_8.png"
import PIC24 from "@/assets/products/pixelcut_7.png"
import PIC25 from "@/assets/products/pixelcut_1.png"
import PIC26 from "@/assets/products/brent_faiyaz_white.png"

// Product Items Objects 
export const PRODUCTS_LIST = [
  // --- OUTERWEAR ---
  {
    id: "zy-01",
    title: "Bone Puff",
    slug: "bone-puff",
    category: "Graphic Tees",
    collection: "",
    price: 1250,
    primaryImage: PIC1,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Black", hex: "#000000" }],
    sizes: [ "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-02",
    title: "SKULL SIREN",
    slug: "skull-siren",
    category: "Graphic Tees",
    price: 1250,
    primaryImage: PIC2,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors:  [{ name: "Black", hex: "#000000" }],
    sizes: ["M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-03",
    title: "TOO LATE TO DIE YOUNG",
    slug: "too-late-to-die-young",
    category: "Graphic Tees",
    collection: "",
    price: 1800,
    primaryImage: PIC3,
    images: [PIC3, PIC17 ],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Vivid", hex: "#875D4C" },{ name: "Static", hex: "#6E6E6E" } ],
    sizes: ["M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-04",
    title: "BRENT FAIYAZ",
    slug: "brent-faiyaz",
    category: "Graphic Tees",
    collection: "",
    price: 1500,
    primaryImage: PIC4,
    images: [PIC4 ,PIC26],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Black", hex: "#000000"} , {name:"White", hex:"#ffffff"}],
    sizes: ["M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-05",
    title: "WASTELAND HOODIE BLACK",
    slug: "wasteland-hoodie-black",
    category: "Wasteland",
    collection: "",
    price: 3500,
    primaryImage: PIC5,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Black", hex: "#000000" }],
    sizes: ["L", "XL"],
    availability: "Limited Release"
  },
  {
    id: "zy-06",
    title: "Tommie",
    slug: "tommie",
    category: "Graphic Tees",
    price: 1500,
    primaryImage: PIC6,
    images: [PIC6 ,PIC8],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Black", hex: "#000000"} , {name:"White", hex:"#ffffff"}],
    sizes: ["M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-07",
    title: "VOID LIPS",
    slug: "void-lips",
    category: "Graphic Tees",
    collection: "",
    price: 1250,
    primaryImage: PIC7,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Black", hex: "#000000"}],
    sizes: ["M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-09",
    title: "Control",
    slug: "control",
    category: "Graphis Tees",
    price: 1500,
    primaryImage: PIC9,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors:[{ name: "Black", hex: "#000000"}],
    sizes: ["M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-10",
    title: "Wasteland Album Cover",
    slug: "wasteland-album-cover",
    category: "Wasteland",
    collection: "",
    price: 1500,
    primaryImage: PIC10,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Black", hex: "#000000" }],
    sizes: ["M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-11",
    title: "Sonder",
    slug: "sonder",
    category: "Graphic Tees",
    collection:"",
    price: 1500,
    primaryImage: PIC11,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "White", hex: "#ffffff" }],
    sizes: ["M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-12",
    title: "THE 'FTW' TEE",
    slug: "the-ftw-tee",
    category: "Essentials",
    price: 1500,
    primaryImage: PIC12,
    images: [PIC12,PIC13],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#ffffff" }],
    sizes: ["M", "L" , "XL"],
    availability: "Limited Release"
  },
  {
    id: "zy-14",
    title: "SONDER INTO",
    slug: "sonder-into",
    category: "Graphic Tees",
    collection: "",
    price: 1800,
    primaryImage: PIC14,
    images: [PIC14,PIC15],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [ { name: "White", hex: "#ffffff" },{ name: "Black", hex: "#000000" }],
    sizes: [ "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-19",
    title: "SONDER SON",
    slug: "sonder-son",
    category: "Graphic Tees",
    price: 2000,
    primaryImage: PIC19,
    images: [PIC19,PIC18],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Maroon", hex: "#9A1319" }, { name: "White", hex: "#ffffff" }],
    sizes: ["M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-20",
    title: "BRENT FAIYAZ V2",
    slug: "brent-faiyaz-v2",
    category: "Graphic Tees",
    price: 1500,
    primaryImage: PIC20,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "White", hex: "#ffffff" }],
    sizes: ["M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-21",
    title: "BRENT STAMP",
    slug: "brent-stamp",
    category: "Graphic Tees",
    price: 1500,
    primaryImage: PIC21,
    images: [PIC21, PIC22],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "White", hex: "#ffffff" }, { name: "Black", hex: "#000000" }],
    sizes: ["M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-24",
    title: "WHAT YOU HEARD",
    slug: "what-you-heard",
    category: "Graphic Tees",
    price: 2000,
    primaryImage: PIC25,
    images: [],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Black", hex: "#000000" }],
    sizes: [ "M", "L", "XL"],
    availability: "In Stock"
  },
  {
    id: "zy-25",
    title: "ONE NIGHT ONLY",
    slug: "one-night-onlt",
    category: "Graphic Tees",
    price: 1800,
    primaryImage: PIC23,
    images: [PIC23,PIC24],
    description: "100% Heavyweight Cotton.Pre-shrunk garment.Tonal embroidery.Boxy, Cropped, Oversized Fit.Made in Nepal | Designed by Zylo Studios.",
    productCare: "Hand wash or machine wash on cold.Hang dry inside or a cool place.Do not use tumble dryer or any type of heat/sun drying.Do not bleach",
    colors: [{ name: "Vivid", hex: "#875D4C" },{ name: "Static", hex: "#6E6E6E" } ],
    sizes: ["M", "L", "XL"],
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