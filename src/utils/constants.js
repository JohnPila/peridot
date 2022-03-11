import ReviewsIcon from '@mui/icons-material/Reviews';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

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
  {name: "Reviews", path: "/admin/reviews", icon: <ReviewsIcon/>},
];

export const USER_ROUTES = [
  {name: "Packages", path: "/packages", icon: <TravelExploreIcon/>},
  {name: "Reviews", path: "/reviews", icon: <ReviewsIcon/>},
];

export const DEFAULT_PACKAGE_DESCRIPTION = `
  <p><span style="font-size: 12px;">// describe it here...</span></p><h4><strong>Inclusive Of</strong></h4><ul><li><span style="font-size: 12px;">// list here...</span></li></ul><h4><strong>Not Inclusive Of</strong></h4><ul><li><span style="font-size: 12px;">// list here...</span></li></ul><h4><strong>Itinerary</strong></h4><ul><li><span style="font-size: 12px;">// list here...</span></li></ul><h4><strong>Eligibility</strong></h4><ul><li><span style="font-size: 12px;">// list here...</span></li></ul><h3><strong>Additional Information</strong></h3><h4><strong>What to Bring</strong></h4><ul><li><span style="font-size: 12px;">// list here...</span></li></ul>
`;

// https://psgc.gitlab.io/api/ or https://ph-locations-api.buonzz.com/v1/
export const LOCATION_BASE_URL = "https://psgc.gitlab.io/api";

export const DIALOG_TYPE = {
  CONFIRM: 1,
};

export const PAYMENT_METHOD = {
  GCASH: 1,
};