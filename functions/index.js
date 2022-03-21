const functions = require("firebase-functions");
const app = require('firebase-admin');

const PAYMENT_METHOD = {
  GCASH: 1,
};

app.initializeApp({
  credential: app.credential.applicationDefault(),
});
const db = app.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.paymentStatus = functions.https.onRequest(async (request, response) => {
  functions.logger.debug("[ENTRY] paymentStatus [query: " + 
    JSON.stringify(request.query) + ", body: " + 
    JSON.stringify(request.body) + "]", 
    {structuredData: true});
  const method = parseInt(request.query.method);
  const paymentDetailsId = request.query.paymentDetailsId;
  const doc = await db.collection("PaymentDetails").doc(paymentDetailsId).get();
  if (doc.exists) {
    switch (method) {
      case PAYMENT_METHOD.GCASH: 
        try {
          functions.logger.debug("Storing gcash payment details...", {structuredData: true});
          const ret = await doc.ref.update({
            result: request.body,
          });
          functions.logger.debug("Stored details. " + JSON.stringify(ret), {structuredData: true});
          functions.logger.info("Successfully saved payment details.", {structuredData: true});
        } catch (err) {
          functions.logger.error("Failed to add payment details. " + err, {structuredData: true});
        }
        break;
      default:
        break;
    }
  } else {
    functions.logger.error("Payment detail ID [" + paymentDetailsId + "] doesn't exist.", {structuredData: true});
  }
  functions.logger.debug("[EXIT] paymentStatus", {structuredData: true});
  response.status(204).send();
});
