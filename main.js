const axios = require('axios').default;
const say = require('say');

const INTERVAL = 10 * 1000;

// replace X_URLCODE with the value of the x-urlcode header
const X_URLCODE = 'LEY7H9RM1U2GC9J7';
// do not get alerted for anything above XX miles
const MAX_DISTANCE_IN_MILES = 20;
// ideal max distance in miles, make sure it's less than the max one above
const IDEAL_DISTANCE = 8;


const areTestSitesAvailable = () =>
  axios({
    method: 'post',
    url: 'https://ads-prd-gov-1-sp.test-for-coronavirus.service.gov.uk/testcentres/availabilityquery',
    headers: { 'x-urlcode': X_URLCODE, 'Content-Type': 'application/json' },
    // replace this with the payload from the calls made in the browser
    data: {
      topLevelTestCentreId: 'CVD19',
      postcode: 'TR2 5ER',
      testCentreGroupIds: ['GR_RTS', 'GR_STS', 'GR_MTU'],
      startDate: '2020-09-12T00:00:00',
      numberOfDays: 5,
      appointmentTypeCode: 'ATCOM05',
      paging: { currentPage: 1, pageSize: 3 },
    },
  })
    .then(function(response) {
      if (response.data.testCentres && response.data.testCentres.length) {
        response.data.testCentres.map(centre => {
          const distance = Math.ceil(centre.geolocation.distance);
          if (distance <= IDEAL_DISTANCE) {
            // this is GREAT, within ideal distance
            say.speak(`SUCCESS. ${centre.testCentre.displayName} ${distance} miles away`);
            console.log(`SUCCESS. ${centre.testCentre.displayName} ${distance} miles away`);
          } else if (distance > IDEAL_DISTANCE && distance <= MAX_DISTANCE_IN_MILES) {
            // this is an acceptable, if not ideal, distance
            say.speak(` ${centre.testCentre.displayName}, ${distance} miles away`);
            console.log(` ${distance} miles  ${centre.testCentre.displayName}`);
          } else if (distance > MAX_DISTANCE_IN_MILES) {
            console.log(`Way too far. ${centre.testCentre.displayName}`);
          }
        });
      } else {
        console.log(response.data.testCentres);
      }
    })
    .catch(function(error) {
      say.speak(error.response.status);
    });;


setInterval(() => areTestSitesAvailable(), interval);
