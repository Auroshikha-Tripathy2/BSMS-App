import {
  BellRing,
  BookCopy,
  ChartNoAxesColumn,
  Clock3,
  CreditCard,
  LayoutDashboard,
  PackageCheck,
  ScanSearch,
  Store,
  Truck,
  WalletCards,
} from "lucide-react";

export const readerFeatures = [
  {
    icon: BookCopy,
    title: "Smart reading shelf",
    text: "Save books into wishlist, cart, reading queue, and currently-reading lists in one place.",
  },
  {
    icon: ScanSearch,
    title: "Discover faster",
    text: "Browse by category, trending titles, and local shop availability without extra steps.",
  },
  {
    icon: BellRing,
    title: "Price and stock alerts",
    text: "Receive updates when favorite titles drop in price or return to stock.",
  },
  {
    icon: Clock3,
    title: "Reading activity",
    text: "Track books finished, books in progress, and what to read next from one view.",
  },
];

export const shopkeeperFeatures = [
  {
    icon: LayoutDashboard,
    title: "Store control center",
    text: "Check orders, book movement, and store performance from a single working dashboard.",
  },
  {
    icon: PackageCheck,
    title: "Inventory health",
    text: "See low-stock books, fast movers, and restock risk before they affect sales.",
  },
  {
    icon: CreditCard,
    title: "Revenue tracking",
    text: "Understand repeat customers, average order value, and category revenue clearly.",
  },
  {
    icon: Truck,
    title: "Fulfillment workflow",
    text: "Move orders from packing to dispatch with a cleaner operational flow.",
  },
];

export const perspectiveCards = [
  {
    id: "reader",
    eyebrow: "For Readers",
    title: "A discovery-first experience for users and customers",
    text: "Find books quickly, compare options, save favorites, and manage reading activity easily.",
    route: "/reader",
    cta: "Open Reader View",
    accent: "reader",
  },
  {
    id: "shopkeeper",
    eyebrow: "For Shopkeepers",
    title: "A business-first workflow for bookstore owners",
    text: "Manage inventory, process orders, and track business performance from a stronger retail view.",
    route: "/shopkeeper",
    cta: "Open Shopkeeper View",
    accent: "shopkeeper",
  },
];

export const readerMetrics = [
  { label: "Books Wishlisted", value: "24" },
  { label: "Currently Reading", value: "3" },
  { label: "Price Alerts", value: "8" },
  { label: "Orders Delivered", value: "19" },
];

export const shopkeeperMetrics = [
  { label: "Orders Today", value: "42" },
  { label: "Books in Stock", value: "2,184" },
  { label: "Low Stock Alerts", value: "17" },
  { label: "Repeat Buyers", value: "63%" },
];

export const shopkeeperTasks = [
  "Restock fast-moving exam titles",
  "Approve 6 new preorder requests",
  "Dispatch 14 packed orders before 6 PM",
  "Review top-performing fiction bundles",
];

export const readerActions = [
  { icon: WalletCards, title: "Continue current reads" },
  { icon: ScanSearch, title: "Browse recommended books" },
  { icon: Store, title: "Check nearby shop stock" },
  { icon: Clock3, title: "Track active orders" },
];

export const businessInsights = [
  {
    title: "Demand pulse",
    value: "+18%",
    note: "Weekend fiction demand is rising across partner shops.",
  },
  {
    title: "Best category",
    value: "Self Growth",
    note: "Atomic Habits and Deep Work are driving repeat visits.",
  },
  {
    title: "Restock priority",
    value: "Exam Guides",
    note: "High intent searches are outpacing current inventory.",
  },
];

export const readerInsights = [
  {
    title: "Mood-based picks",
    value: "Feel-good",
    note: "Readers like you are saving uplifting fiction and reflective nonfiction.",
  },
  {
    title: "Best nearby deal",
    value: "\u20B9299",
    note: "Ikigai is currently the strongest value pick in your city.",
  },
  {
    title: "Reading streak",
    value: "12 days",
    note: "A strong week to add one more title to your personal shelf.",
  },
];
