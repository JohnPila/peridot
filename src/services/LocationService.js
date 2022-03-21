import axios from "axios";
import { LOCATION_BASE_URL } from "../utils/constants";

export async function getCity(code) {
  try {
    const result = await axios.get(LOCATION_BASE_URL + 
      `/cities-municipalities/${code}.json`);
    return result.data;
  } catch (error) {
    console.error("Failed to get city.", error);
    throw error;
  }
}

export async function getBarangay(code) {
  try {
    const result = await axios.get(LOCATION_BASE_URL + 
      `/barangays/${code}.json`);
    return result.data;
  } catch (error) {
    console.error("Failed to get barangay.", error);
    throw error;
  }
}

export function getBaseUrl() {
  return window.location.protocol + '//' + window.location.host;
}

const defaults = {
  getCity,
  getBarangay,
  getBaseUrl,
};
export default defaults;