import axios from "axios";
import GeoapifyConfig from "../config/GeoapifyConfig";
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
  try {
    const result = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?` + 
      `text=${text}&filter=countrycode:ph&apiKey=${GeoapifyConfig.apiKey}`);
    return result.data;
  } catch (error) {
    console.error("Failed to search for places.", error);
    throw error;
  }
}

export async function getPlaceDetails(placeId) {
  try {
    const result = await axios.get(`https://api.geoapify.com/v2/place-details?` + 
      `id=${placeId}&apiKey=${GeoapifyConfig.apiKey}`);
    return result.data;
  } catch (error) {
    console.error("Failed to get place details.", error);
    throw error;
  }
}

export async function getRoute(from, to) {
  try {
    const result = await axios.get(`https://api.geoapify.com/v1/routing?` + 
      `waypoints=lonlat:${from.join(",")}|lonlat:${to.join(",")}&` + 
      `mode=drive&details=route_details&apiKey=${GeoapifyConfig.apiKey}`);
    return result.data;
  } catch (error) {
    console.error("Failed to get place details.", error);
    throw error;
  }
}

const defaults = {
  getCity,
  getBarangay,
  getBaseUrl,
  searchPlacesByText,
  getPlaceDetails,
  getRoute,
};
export default defaults;