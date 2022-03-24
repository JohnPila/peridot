import axios from "axios";
import GCashConfig from "../config/GCashConfig";

export async function getGcashPaymentLink(paymentDetailsId, amount, additionalData = {}) {
  try {
    const result = await axios({
      method: "POST",
      url: GCashConfig.url, 
      data: GCashConfig.createFormData(paymentDetailsId, amount, additionalData),
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (result.data.error) {
      throw new Error(result.data.error);
    }
    return result.data;
  } catch (error) {
    console.error("Failed to GCash payment link.", error);
    throw error;
  }
}