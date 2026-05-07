/**
 * seedNeighborhoods.js
 * -------------------------------------------------------
 * Seeds REAL Indian neighborhoods into the database by:
 * 1. Using a curated list of popular neighborhoods per city.
 * 2. Fetching exact coordinates from Google Geocoding API.
 * 3. Fetching real amenity counts from Google Places API.
 * 4. Calculating an initial score and saving everything.
 *
 * Usage: node server/src/scripts/seedNeighborhoods.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Area        = require('../models/Area.model');
const scoreService = require('../services/score.service');
const cacheService = require('../services/cache.service');

const GOOGLE_KEY = process.env.GOOGLE_PLACES_API_KEY;
const MONGO_URI = process.env.MONGO_URI;

// ─── Curated Neighborhood Database ───────────────────────────────────────────
// Each entry: { name, city, state }
const NEIGHBORHOODS = [
  // Bengaluru (Karnataka)
  { name: 'Koramangala',      city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Indiranagar',      city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Whitefield',       city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Jayanagar',        city: 'Bengaluru', state: 'Karnataka' },
  { name: 'HSR Layout',       city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Marathahalli',     city: 'Bengaluru', state: 'Karnataka' },
  { name: 'BTM Layout',       city: 'Bengaluru', state: 'Karnataka' },
  { name: 'Malleshwaram',     city: 'Bengaluru', state: 'Karnataka' },

  // Mumbai (Maharashtra)
  { name: 'Bandra West',      city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Andheri West',     city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Powai',            city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Juhu',             city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Worli',            city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Colaba',           city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Lower Parel',      city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Chembur',          city: 'Mumbai', state: 'Maharashtra' },

  // Delhi (Delhi)
  { name: 'Hauz Khas',        city: 'New Delhi', state: 'Delhi' },
  { name: 'Lajpat Nagar',     city: 'New Delhi', state: 'Delhi' },
  { name: 'Saket',            city: 'New Delhi', state: 'Delhi' },
  { name: 'Dwarka',           city: 'New Delhi', state: 'Delhi' },
  { name: 'Rohini',           city: 'New Delhi', state: 'Delhi' },
  { name: 'Vasant Kunj',      city: 'New Delhi', state: 'Delhi' },
  { name: 'Connaught Place',  city: 'New Delhi', state: 'Delhi' },
  { name: 'Nehru Place',      city: 'New Delhi', state: 'Delhi' },

  // Hyderabad (Telangana)
  { name: 'Banjara Hills',    city: 'Hyderabad', state: 'Telangana' },
  { name: 'Jubilee Hills',    city: 'Hyderabad', state: 'Telangana' },
  { name: 'Gachibowli',       city: 'Hyderabad', state: 'Telangana' },
  { name: 'Madhapur',         city: 'Hyderabad', state: 'Telangana' },
  { name: 'Kondapur',         city: 'Hyderabad', state: 'Telangana' },
  { name: 'Begumpet',         city: 'Hyderabad', state: 'Telangana' },

  // Chennai (Tamil Nadu)
  { name: 'Anna Nagar',       city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'T. Nagar',         city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Velachery',        city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Adyar',            city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Nungambakkam',     city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'OMR',              city: 'Chennai', state: 'Tamil Nadu' },

  // Pune (Maharashtra)
  { name: 'Koregaon Park',    city: 'Pune', state: 'Maharashtra' },
  { name: 'Baner',            city: 'Pune', state: 'Maharashtra' },
  { name: 'Hinjewadi',        city: 'Pune', state: 'Maharashtra' },
  { name: 'Viman Nagar',      city: 'Pune', state: 'Maharashtra' },
  { name: 'Kothrud',          city: 'Pune', state: 'Maharashtra' },
  { name: 'Aundh',            city: 'Pune', state: 'Maharashtra' },

  // Kolkata (West Bengal)
  { name: 'Salt Lake',        city: 'Kolkata', state: 'West Bengal' },
  { name: 'Park Street',      city: 'Kolkata', state: 'West Bengal' },
  { name: 'New Town',         city: 'Kolkata', state: 'West Bengal' },
  { name: 'Alipore',          city: 'Kolkata', state: 'West Bengal' },
  { name: 'Ballygunge',       city: 'Kolkata', state: 'West Bengal' },

  // Ahmedabad (Gujarat)
  { name: 'Navrangpura',      city: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Satellite',        city: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Prahlad Nagar',    city: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Bopal',            city: 'Ahmedabad', state: 'Gujarat' },
  { name: 'SG Highway',       city: 'Ahmedabad', state: 'Gujarat' },

  // Jaipur (Rajasthan)
  { name: 'Vaishali Nagar',   city: 'Jaipur', state: 'Rajasthan' },
  { name: 'Malviya Nagar',    city: 'Jaipur', state: 'Rajasthan' },
  { name: 'C-Scheme',         city: 'Jaipur', state: 'Rajasthan' },
  { name: 'Mansarovar',       city: 'Jaipur', state: 'Rajasthan' },
];

// ─── Helper: sleep ────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Main Seed Function ───────────────────────────────────────────────────────
const seedNeighborhoods = async () => {
  console.log('🔌 Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected.\n');

  let created = 0;
  let skipped = 0;
  let failed  = 0;

  for (const hood of NEIGHBORHOODS) {
    const { name, city, state } = hood;

    // Skip if already exists
    const exists = await Area.findOne({ name, city });
    if (exists) {
      console.log(`⏭  Skipping (exists): ${name}, ${city}`);
      skipped++;
      continue;
    }

    console.log(`\n📍 Processing: ${name}, ${city}...`);

    // ── Step 1: Geocode (MongoDB cache → Google → Nominatim) ─────────────────
    const coords = await cacheService.geocode(name, city);
    if (!coords) {
      console.log(`   ❌ Could not geocode. Skipping.`);
      failed++;
      continue;
    }
    console.log(`   📌 Coords: (${coords.lat}, ${coords.lon}) [via ${coords.source}]`);
    await sleep(300);

    // ── Step 2: Amenities (MongoDB cache → Google Places) ────────────────────
    console.log(`   🏥 Fetching amenities...`);
    const amenities = await cacheService.getAmenities(coords.lat, coords.lon);
    const schoolRating = amenities.schoolRating || 3.5;
    await sleep(300);

    // ── Step 3: Build metrics & calculate score ───────────────────────────────
    const defaultMetrics = {
      aqi:        { value: 3 },
      weather:    { temp: 28, condition: 'Clear' },
      crimeIndex: { value: 40, lastUpdated: new Date() },
      schoolRating,
    };
    const scoreResult = scoreService.calculateAreaScore(defaultMetrics, amenities);

    // ── Step 4: Save to MongoDB ───────────────────────────────────────────────
    await Area.create({
      name,
      city,
      state,
      location: {
        type: 'Point',
        coordinates: [coords.lon, coords.lat],
      },
      amenities: {
        hospitals:   amenities.hospitals,
        schools:     amenities.schools,
        transitHubs: amenities.transitHubs,
        parks:       amenities.parks,
      },
      metrics: {
        aqi:        defaultMetrics.aqi,
        weather:    defaultMetrics.weather,
        crimeIndex: defaultMetrics.crimeIndex,
      },
      score: scoreResult.total,
      scoreBreakdown: scoreResult.breakdown,
    });

    console.log(
      `   ✅ Saved: ${name} | Score: ${scoreResult.total} | ` +
      `🏥 ${amenities.hospitals} | 🏫 ${amenities.schools} | ` +
      `🚉 ${amenities.transitHubs} | 🌳 ${amenities.parks}`
    );
    created++;

    await sleep(500);
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`🎉 Seeding complete!`);
  console.log(`   ✅ Created : ${created}`);
  console.log(`   ⏭  Skipped : ${skipped}`);
  console.log(`   ❌ Failed  : ${failed}`);
  console.log(`${'─'.repeat(50)}`);
  process.exit(0);
};

seedNeighborhoods().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
