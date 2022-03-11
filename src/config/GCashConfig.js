const PUBLIC_KEY = "pk_13ae9814cb5debb7727dbcccc9fd2193";
const URL = "https://g.payx.ph/payment_request";

class GCashConfig {

  get url() {
    return URL;
  }

  get fee() {
    return 0.02;
  }

  createFormData(amount, additionalData = {}) {
    const form = new FormData();
    form.append("x-public-key", PUBLIC_KEY);
    form.append("amount", amount);
    form.append("expiry", 24);
    for (const key in additionalData) {
      form.append(key, additionalData[key]);
    }
    return form;
  }
}

export default new GCashConfig();