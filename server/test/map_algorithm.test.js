require('dotenv').config({ path: '.env.test' });

console.log(process.env.API_KEY_1);

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.API_KEY_1,
});

describe('Test map algorithm', () => {
  it('Should describe locations', (done) => {
    googleMapsClient.geocode({
      address: '1600 Amphitheatre Parkway, Mountain View, CA'
    }, (err, response) => {
      if (!err) {
        console.log(JSON.stringify(response.json.results));
      }
      done();
    });
  });
});
