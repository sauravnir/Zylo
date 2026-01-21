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