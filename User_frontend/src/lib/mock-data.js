export const customer = {
  name: "Ahmad Faiz",
  email: "ahmad.faiz@email.com",
  package: "Unifi 500Mbps",
  billingStatus: "paid",
  billingDate: "15 Jun 2026",
  openTickets: 1,
}

export const devices = [
  {
    id: "FTH-WIFI-A1B2",
    name: "Main Router",
    address: "12, Jalan SS15/4, Subang Jaya, Selangor",
    status: "online",
    signal: "strong",
  },
  {
    id: "FTH-EXT-C3D4",
    name: "Mesh Extender",
    address: "12, Jalan SS15/4, Subang Jaya, Selangor",
    status: "online",
    signal: "medium",
  },
]

export const tickets = [
  {
    id: "TKT-001",
    deviceId: "FTH-WIFI-A1B2",
    deviceName: "Main Router",
    category: "No Internet",
    description: "Internet connection dropped at 2pm and hasn't recovered since.",
    status: "open",
    eta: "28 May",
    createdAt: "25 May 2026",
    updatedAt: "26 May 2026",
  },
]

export const promotions = [
  {
    id: 1,
    title: "Free Speed Boost",
    description: "Enjoy double your current speed for the next 3 months at no extra cost.",
    badge: "New",
    color: "primary",
  },
  {
    id: 2,
    title: "Refer & Earn",
    description: "Refer a friend and get RM50 off your next bill.",
    badge: "Popular",
    color: "secondary",
  },
  {
    id: 3,
    title: "Loyalty Reward",
    description: "You've been with us for 2 years! Claim your free mesh extender.",
    badge: "Reward",
    color: "success",
  },
]

export const complaintCategories = [
  "No Internet",
  "Slow Speed",
  "Device Offline",
  "Billing Issue",
  "Others",
]
