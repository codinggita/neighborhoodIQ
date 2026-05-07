const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const Area        = require('../models/Area.model');
const GeoCache    = require('../models/GeoCache.model');
const PlacesCache = require('../models/PlacesCache.model');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const total        = await Area.countDocuments();
  const withCoords   = await Area.countDocuments({ 'location.coordinates.0': { $ne: 0 } });
  const withAqi      = await Area.countDocuments({ 'metrics.aqi.value': { $gt: 0 } });
  const withAmenities = await Area.countDocuments({ 'amenities.hospitals': { $gt: 0 } });
  const geoCached    = await GeoCache.countDocuments();
  const placesCached = await PlacesCache.countDocuments();

  console.log('');
  console.log('=== DATABASE STATUS ===');
  console.log('Areas total         :', total);
  console.log('With real coords    :', withCoords);
  console.log('With live AQI       :', withAqi);
  console.log('With amenities > 0  :', withAmenities);
  console.log('GeoCache entries    :', geoCached);
  console.log('PlacesCache entries :', placesCached);
  console.log('=======================');
  process.exit(0);
}).catch(e => { console.error(e.message); process.exit(1); });
