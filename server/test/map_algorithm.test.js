require('dotenv').config({ path: '.env.test' });
const distance = require('geo-coords-distance');
console.log(distance);

// const googleMapsClient = require('@google/maps').createClient({
//   key: process.env.API_KEY_1,
// });

describe('Test map algorithm', () => {
  it('Should describe locations', (done) => {
    // googleMapsClient.geocode({
    //   address: '1600 Amphitheatre Parkway, Mountain View, CA'
    // }, (err, response) => {
    //   if (!err) {
    //     console.log(JSON.stringify(response.json.results));
    //   }
    //   done();
    // });
    const firstPoint = { lat: -6.261580, lng: 106.782640 };
    const secondPoint = { lat: -6.260855, lng: 106.781728 };

    const result = distance.default(firstPoint, secondPoint);
    done();
    console.log(result);
  });
});
