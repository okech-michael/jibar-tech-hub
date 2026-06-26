import laptop1 from "@/assets/product-laptop1.jpg";
import laptop2 from "@/assets/product-laptop2.jpg";
import monitor from "@/assets/product-monitor.jpg";
import keyboard from "@/assets/product-keyboard.jpg";
import catLaptops from "@/assets/cat-laptops.jpg";
import catGaming from "@/assets/cat-gaming.jpg";
import catMonitors from "@/assets/cat-monitors.jpg";
import catDesktop from "@/assets/cat-desktop.jpg";
import catNetworking from "@/assets/cat-networking.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catArms from "@/assets/cat-arms.jpg";
import catHousehold from "@/assets/cat-household.jpg";

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  { slug: "laptops", name: "Laptops", description: "Ultrabooks, business & creator machines.", image: catLaptops },
  { slug: "gaming-pcs", name: "Gaming PCs", description: "High-performance rigs built to win.", image: catGaming },
  { slug: "desktops", name: "Desktop Computers", description: "Reliable workstations for any task.", image: catDesktop },
  { slug: "monitors", name: "Monitors", description: "Sharp displays from FHD to 4K.", image: catMonitors },
  { slug: "monitor-arms", name: "Monitor Arms", description: "Ergonomic mounts and stands.", image: catArms },
  { slug: "networking", name: "Networking", description: "Routers, switches and access points.", image: catNetworking },
  { slug: "accessories", name: "Accessories", description: "Keyboards, mice, audio and storage.", image: catAccessories },
  { slug: "household", name: "Household Electronics", description: "Modern essentials for the home.", image: catHousehold },
];

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  image: string;
  short: string;
  specs: { label: string; value: string }[];
  description: string;
  warranty: string;
};

export const products: Product[] = [
  {
    slug: "elitebook-840-g10",
    name: "EliteBook 840 G10",
    brand: "HP",
    category: "laptops",
    price: 145000,
    oldPrice: 159000,
    inStock: true,
    image: laptop1,
    short: "14\" Intel Core i7, 16GB RAM, 512GB SSD",
    specs: [
      { label: "Processor", value: "Intel Core i7-1355U" },
      { label: "Memory", value: "16GB DDR5" },
      { label: "Storage", value: "512GB NVMe SSD" },
      { label: "Display", value: "14\" WUXGA IPS" },
      { label: "Graphics", value: "Intel Iris Xe" },
    ],
    description:
      "A refined business ultrabook engineered for professionals who demand performance, security and all-day battery in a remarkably thin chassis.",
    warranty: "1-year manufacturer warranty",
  },
  {
    slug: "legion-pro-7-rtx4080",
    name: "Legion Pro 7 RTX 4080",
    brand: "Lenovo",
    category: "gaming-pcs",
    price: 389000,
    inStock: true,
    image: laptop2,
    short: "16\" 240Hz, i9, 32GB, RTX 4080 12GB",
    specs: [
      { label: "Processor", value: "Intel Core i9-13900HX" },
      { label: "Memory", value: "32GB DDR5-5600" },
      { label: "Storage", value: "1TB NVMe Gen4" },
      { label: "Display", value: "16\" QHD+ 240Hz" },
      { label: "Graphics", value: "NVIDIA RTX 4080 12GB" },
    ],
    description:
      "Tournament-grade performance with a 240Hz QHD+ panel, vapor-chamber cooling and per-key RGB. Built for competitive gamers and creators.",
    warranty: "2-year manufacturer warranty",
  },
  {
    slug: "ultrasharp-u2723qe",
    name: "UltraSharp U2723QE 4K",
    brand: "Dell",
    category: "monitors",
    price: 92000,
    inStock: true,
    image: monitor,
    short: "27\" 4K IPS Black, USB-C 90W hub",
    specs: [
      { label: "Size", value: "27\"" },
      { label: "Resolution", value: "3840 × 2160" },
      { label: "Panel", value: "IPS Black, 2000:1" },
      { label: "Color", value: "100% sRGB, 98% DCI-P3" },
      { label: "Ports", value: "USB-C 90W, DP, HDMI, RJ45" },
    ],
    description:
      "A studio-grade 4K display with deeper blacks, lifelike color, and a single-cable USB-C dock that powers and connects your laptop.",
    warranty: "3-year premium panel exchange",
  },
  {
    slug: "mx-mechanical-mini",
    name: "MX Mechanical Mini",
    brand: "Logitech",
    category: "accessories",
    price: 18500,
    inStock: true,
    image: keyboard,
    short: "Wireless low-profile mechanical, backlit",
    specs: [
      { label: "Switches", value: "Low-profile tactile quiet" },
      { label: "Layout", value: "75% compact" },
      { label: "Connectivity", value: "Bluetooth + Logi Bolt" },
      { label: "Backlight", value: "Smart white LED" },
      { label: "Battery", value: "Up to 15 days" },
    ],
    description:
      "A premium compact mechanical keyboard tuned for professionals. Tactile, near-silent, and ready to flow between three devices.",
    warranty: "1-year manufacturer warranty",
  },
  {
    slug: "macbook-air-m3",
    name: "MacBook Air M3",
    brand: "Apple",
    category: "laptops",
    price: 175000,
    inStock: true,
    image: laptop1,
    short: "13.6\" Liquid Retina, 8GB, 256GB SSD",
    specs: [
      { label: "Chip", value: "Apple M3 8-core" },
      { label: "Memory", value: "8GB Unified" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Display", value: "13.6\" Liquid Retina" },
      { label: "Battery", value: "Up to 18 hours" },
    ],
    description:
      "Silent, fanless, and effortlessly fast. The MacBook Air M3 is the everyday laptop that quietly does it all.",
    warranty: "1-year Apple limited warranty",
  },
  {
    slug: "rog-strix-g16",
    name: "ROG Strix G16",
    brand: "ASUS",
    category: "gaming-pcs",
    price: 245000,
    oldPrice: 269000,
    inStock: true,
    image: laptop2,
    short: "16\" 165Hz, i7, 16GB, RTX 4060",
    specs: [
      { label: "Processor", value: "Intel Core i7-13650HX" },
      { label: "Memory", value: "16GB DDR5" },
      { label: "Storage", value: "1TB NVMe" },
      { label: "Display", value: "16\" QHD+ 165Hz" },
      { label: "Graphics", value: "NVIDIA RTX 4060 8GB" },
    ],
    description:
      "A balanced powerhouse with high refresh visuals, advanced cooling and a striking design language built for gamers.",
    warranty: "2-year manufacturer warranty",
  },
  {
    slug: "thinkvision-p27h",
    name: "ThinkVision P27h-30",
    brand: "Lenovo",
    category: "monitors",
    price: 58000,
    inStock: true,
    image: monitor,
    short: "27\" QHD IPS, USB-C, ergonomic stand",
    specs: [
      { label: "Size", value: "27\"" },
      { label: "Resolution", value: "2560 × 1440" },
      { label: "Panel", value: "IPS, 99% sRGB" },
      { label: "Ports", value: "USB-C 75W, DP, HDMI" },
      { label: "Stand", value: "Tilt / swivel / pivot / height" },
    ],
    description:
      "A reliable productivity monitor with accurate color, generous ports and a fully adjustable stand.",
    warranty: "3-year manufacturer warranty",
  },
  {
    slug: "ax6000-wifi-router",
    name: "Archer AX6000 Wi-Fi 6",
    brand: "TP-Link",
    category: "networking",
    price: 28500,
    inStock: true,
    image: keyboard,
    short: "Dual-band Wi-Fi 6, 2.5G WAN, 8 LAN",
    specs: [
      { label: "Standard", value: "Wi-Fi 6 (AX6000)" },
      { label: "Speed", value: "1148 + 4804 Mbps" },
      { label: "WAN", value: "2.5 Gbps" },
      { label: "LAN", value: "8 × Gigabit" },
      { label: "Security", value: "WPA3, HomeShield" },
    ],
    description:
      "Flagship Wi-Fi 6 router with eight high-gain antennas and a 2.5 Gbps WAN port — ideal for busy homes and small offices.",
    warranty: "1-year manufacturer warranty",
  },
];

export const brands = [
  "HP", "Dell", "Lenovo", "Apple", "ASUS", "Acer", "MSI", "Samsung", "LG", "Canon", "Epson",
];

export const formatKES = (n: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(n);

export const PHONE = "0790210629";
export const PHONE_INTL = "+254790210629";
export const WHATSAPP_URL = `https://wa.me/254790210629`;
