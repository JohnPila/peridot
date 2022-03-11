import axios from "axios";
import GCashConfig from "../config/GCashConfig";

export async function getGcashPaymentLink(amount, additionalData = {}) {
  try {
    const result = await axios({
      method: "POST",
      url: GCashConfig.url, 
      data: GCashConfig.createFormData(amount, additionalData),
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result.data;
  } catch (error) {
    console.error("Failed to GCash payment link.", error);
    throw error;
  }
}