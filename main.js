const axios = require('axios').default;
const say = require('say');

const interval = 20 * 1000;

// replace xUrlcode with the value of the x-urlcode header
const xUrlcode = 'LEY7H9RM1U2GC9J7';

const areTestSitesAvailable = () =>
  axios({
    method: 'post',
    url: 'https://ads-prd-gov-1-sp.test-for-coronavirus.service.gov.uk/testcentres/availabilityquery',
    headers: { 'x-urlcode': xUrlcode, 'Content-Type': 'application/json' },
    data: { // replace this with the payload from the calls made in the browser
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
          if (distance <= 10) {
            say.speak(`SUCCESS. ${centre.testCentre.displayName} ${distance} miles away`);
            console.log(`SUCCESS. ${centre.testCentre.displayName} ${distance} miles away`);
          } else if (distance > 10 && distance <= 30) {
            say.speak(` ${centre.testCentre.displayName}, ${distance} miles away`);
            console.log(` ${distance} miles  ${centre.testCentre.displayName}`);
          } else if (distance > 30) {
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
