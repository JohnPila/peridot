import ReviewsIcon from '@mui/icons-material/Reviews';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BookIcon from '@mui/icons-material/Book';

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const ROLE_IDS = {
  ADMIN: "1",
  USER: "2",
};

export const STORAGE_FOLDERS = {
  GLOBALS: "globals",
  PACKAGES: "packages",
};

export const ADMIN_ROUTES = [
  {name: "Packages", path: "/admin/packages", icon: <TravelExploreIcon/>},
  {name: "Bookings", path: "/bookings", icon: <ReviewsIcon/>},
];

export const USER_ROUTES = [
  {name: "Packages", path: "/packages", icon: <TravelExploreIcon/>},
  {name: "Bookings", path: "/bookings", icon: <BookIcon/>},
];

export const DEFAULT_PACKAGE_DESCRIPTION = `
  <p><span style="font-size: 12px;">// describe it here...</span></p><h4><strong>Inclusive Of</strong></h4><ul><li><span style="font-size: 12px;">// list here...</span></li></ul><h4><strong>Not Inclusive Of</strong></h4><ul><li><span style="font-size: 12px;">// list here...</span></li></ul><h4><strong>Itinerary</strong></h4><ul><li><span style="font-size: 12px;">// list here...</span></li></ul><h4><strong>Eligibility</strong></h4><ul><li><span style="font-size: 12px;">// list here...</span></li></ul><h3><strong>Additional Information</strong></h3><h4><strong>What to Bring</strong></h4><ul><li><span style="font-size: 12px;">// list here...</span></li></ul>
`;

// https://psgc.gitlab.io/api/ or https://ph-locations-api.buonzz.com/v1/
export const LOCATION_BASE_URL = "https://psgc.gitlab.io/api";

export const DIALOG_TYPE = {
  CONFIRM: 1,
};

export const DIALOG_TYPE_VARIANT = {
  INFO: 1,
  WARNING: 2,
  ERROR: 3,
  SUCCESS: 4,
};

export const PAYMENT_METHOD = {
  GCASH: 1,
};
export const PAYMENT_METHOD_LABEL = {
  [PAYMENT_METHOD.GCASH]: "GCash",
};

export const BOOKING_STATUS = {
  PENDING_PAYMENT: 1,
  PAID: 2,
  PAYMENT_FAILED: 3,
  PAYMENT_VERIFICATION: 4,
  CANCELLED: 5,
  DECLINED: 6,
  PENDING_CANCELLATION: 7,
};
export const BOOKING_STATUS_LABEL = {
  [BOOKING_STATUS.PENDING_PAYMENT]: "Pending payment",
  [BOOKING_STATUS.PAID]: "Paid",
  [BOOKING_STATUS.PAYMENT_FAILED]: "Payment failed",
  [BOOKING_STATUS.PAYMENT_VERIFICATION]: "Payment verification",
  [BOOKING_STATUS.CANCELLED]: "Cancelled",
  [BOOKING_STATUS.DECLINED]: "Declined",
  [BOOKING_STATUS.PENDING_CANCELLATION]: "Pending cancellation",
}