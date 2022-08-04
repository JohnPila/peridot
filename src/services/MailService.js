import GeoapifyConfig from "../config/GeoapifyConfig";
import { BOOKING_TYPE, PERIDOT_EMAIL } from "../utils/constants";
import { getPlaceDetails } from "./LocationService";

export async function sendMail(to, name, subject, body) {
  try {
    if (!window.Email) {
      console.error("Email service can't be found!");
      return;
    }

    await window.Email.send({
      Host: "smtp.elasticemail.com",
      Username: PERIDOT_EMAIL,
      Password: "6FB3FCCABD4AB5D979F3891EB27C41CA6EF4",
      To: to,
      From: `Peridot Team <${PERIDOT_EMAIL}>`,
      Subject: `[Peridot] - ${subject}`,
      Body: bodyLayout(name, body)
    });
  } catch (error) {
    console.error('An error occurred while sending email to ' + to + '. ERR:', error)
    throw error;
  }
}

function bodyLayout(name, body) {
  return `
    <head>
      <style text="text/css">
        /* latin-ext */
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v12/6xK3dSBYKcSV-LCoeQqfX1RYOo3qNq7lqDY.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v12/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7l.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        body {
          font-family: 'Source Sans Pro', sans-serif;
        }
        .text-muted {
          color: #6c757d !important;
        }
      </style>
    </head>
    <body>
      <p>Hi ${name},</p>
      ${body}
      <p class="text-muted">This is an automated message. Please do not reply.</p>
      <p>
        Best Regards,<br>
        Peridot Team
      </p>
    </body>
  `
}

export async function sendBookingOrderNotification(to, name, data, toAdmin) {
  const {
    type,
    id: bookingId,
  } = data;

  let product = "";
  let body = "";
  switch (type) {
    case BOOKING_TYPE.PACKAGE: {
      const {
        otherData: packageData,
        packageOptions,
      } = data;
      const total = packageOptions.reduce((acc, opt) => acc + (opt.price * opt.quantity), 0);
      const paragraph = toAdmin ? 
        `You have a booking order for <b>${packageData.name}</b> package.` : 
        `Please see your booking details for <b>${packageData.name}</b> package.`;
      product = "Package";
      body = `
        <p>${paragraph}</p>
        <table border cellpadding="5" cellspacing="1">
          <tr>
            <th>Package Option</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          ${packageOptions.map(opt => 
            `<tr>
              <td>${opt.name}</td>
              <td>${opt.quantity}</td>
              <td>₱${opt.price}</td>
              <td>₱${opt.price * opt.quantity}</td>
            </tr>`)}
          <tfoot>
            <tr>
              <th colspan="3">Total</th>
              <td>₱${total}</td>
            </tr>
          </tfoot>
        </table>
      `;
    }
    break;
    case BOOKING_TYPE.AIRPORT_TRANSFER: {
      const {
        otherData: transferData,
      } = data;
      const {
        routeData,
      } = transferData;
      const pickupData = await getPlaceDetails(data.pickupLocation);
      const dropoffData = await getPlaceDetails(data.dropoffLocation);
      const total = GeoapifyConfig.computeCost(
        routeData.features[0].properties.distance);
      const paragraph = toAdmin ? 
        `You have a booking order for airport transfer.` : 
        `Please see your booking details for airport transfer.`;
      product = "Airport Transfer";
      body = `
        <p>${paragraph}</p>
        <table border cellpadding="5" cellspacing="1">
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Distance</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
          <tr>
            <td>${pickupData.features[0].properties.formatted}</td>
            <td>${dropoffData.features[0].properties.formatted}</td>
            <td>${routeData.features[0].properties.distance / 1000} km</td>
            <td>₱${GeoapifyConfig.farePerKilometer}/km</td>
            <td>₱${GeoapifyConfig.farePerKilometer * Math.ceil(routeData.features[0].properties.distance / 1000)}</td>
          </tr>
          <tfoot>
            <tr>
              <th colspan="4">Base Fare</th>
              <td>₱${GeoapifyConfig.baseFare}</td>
            </tr>
            <tr>
              <th colspan="4">Total</th>
              <td>₱${total}</td>
            </tr>
          </tfoot>
        </table>
      `;
    }
    break;
    case BOOKING_TYPE.CAR_RENTAL: {
      const {
        otherData: carData,
        rateOptions,
      } = data;
      const total = rateOptions.reduce((acc, opt) => acc + (opt.rate * opt.quantity), 0);
      const paragraph = toAdmin ? 
        `You have a booking order for <b>${carData.make} ${carData.model}</b> car rental.` : 
        `Please see your booking details for <b>${carData.make} ${carData.model}</b> car rental.`;
      product = "Car Rental";
      body = `
        <p>${paragraph}</p>
        <table border cellpadding="5" cellspacing="1">
          <tr>
            <th>Rate Option</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          ${rateOptions.map(opt => 
            `<tr>
              <td>${opt.duration}</td>
              <td>${opt.quantity}</td>
              <td>₱${opt.rate}</td>
              <td>₱${opt.rate * opt.quantity}</td>
            </tr>`)}
          <tfoot>
            <tr>
              <th colspan="3">Total</th>
              <td>₱${total}</td>
            </tr>
          </tfoot>
        </table>
      `;
    }
    break;
    default:
      console.warn("Unsupported type of " + type + " for sending mail.");
      return;
  }

  await sendMail(to, //'stevenpilafour169@gmail.com', 
    name, `${product} Booking Order #${bookingId}`, body)
}

// export function sendServiceBookingRequestNotification (to, data, successCallback, errorCallback) {
//   const body = `
//     <p>You have a service booking request from <b>${data.requester.fullName}</b>. Please see details below.</p>
//     <p>
//       Booking #: <b>${data.id}</b><br>
//       Date Booked: <b>${data.dateRequested}</b> 
//     </p>
//     <p>
//       Scheduled Date: <b>${data.scheduledDate}</b><br>
//       Preferred Time: <b>${data.preferredTime}</b><br>
//       Description: <br>
//       <span class="text-muted">${data.description}</span>
//     </p>
//   `
//   sendMail(to, //'stevenpilafour169@gmail.com', 
//     data.servicer.fullName, 'Service Booking Notification', body, 
//     successCallback, 
//     errorCallback)
// }

const defaults = {
  sendMail,
  sendBookingOrderNotification,
};
export default defaults; 