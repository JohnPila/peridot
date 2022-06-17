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

export async function searchPlacesByText(text) {
  const API_KEY = "4687a77640a44100b4740e60780ffe5b";
  try {
    const result = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?` + 
      `text=${text}&apiKey=${API_KEY}`);
    return result.data;
  } catch (error) {
    console.error("Failed to search for places.", error);
    throw error;
  }
}

const defaults = {
  getCity,
  getBarangay,
  getBaseUrl,
  searchPlacesByText,
};
export default defaults;