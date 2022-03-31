import { getBaseUrl } from "../services/LocationService";
import { PAYMENT_METHOD } from "../utils/constants";

const PUBLIC_KEY = "pk_13ae9814cb5debb7727dbcccc9fd2193";
const URL = "https://g.payx.ph/payment_request";
const PAYMENT_EXPIRY = 24;

class GCashConfig {

  get url() {
    return URL;
  }

  get fee() {
    return 0.02;
  }

  createFormData(paymentDetailsId, amount, additionalData = {}) {
    // const webhookUrl = getBaseUrl() + "/rest/api/payment-status?" + 
    //   "method=" + PAYMENT_METHOD.GCASH + 
    //   "&paymentDetailsId=" + paymentDetailsId;
    // const webhookUrl = "https://2058-49-147-194-204.ngrok.io/peridot-2b1d5/us-central1/paymentStatus?" + 
    //   "method=" + PAYMENT_METHOD.GCASH + 
    //   "&paymentDetailsId=" + paymentDetailsId;
    const form = new FormData();
    form.append("x-public-key", PUBLIC_KEY);
    form.append("amount", amount);
    form.append("expiry", PAYMENT_EXPIRY);
    // form.append("webhooksuccessurl", webhookUrl);
    // form.append("webhookfailurl", webhookUrl);
    for (const key in additionalData) {
      form.append(key, additionalData[key]);
    }
    return form;
  }

  parseResult(result) {
    return {
      success: "1" === result.success,
      message: result.response_message || result.response_advise,
      amount: parseFloat(result.amount),
      referenceNumber: result.reference,
      timestamp: result.timestamp,
    };
  }
}

export default new GCashConfig();