/**
 * PlacesCache.model.js
 * Caches Google Places API results (amenity counts) per location + type.
 * Key: "lat_lon_type" → count
 * TTL: 30 days (amenities don't change daily)
 */
const mongoose = require('mongoose');

const placesCacheSchema = new mongoose.Schema(
  {
    // Rounded to 3 decimal places (~111m precision) to allow nearby lookups
    lat:   { type: Number, required: true },
    lon:   { type: Number, required: true },
    type:  { type: String, required: true }, // 'hospital', 'school', etc.
    count: { type: Number, required: true, default: 0 },
    avgRating: { type: Number },             // for schools
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      index: { expires: 0 }, // MongoDB TTL index: auto-delete when expiresAt passes
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for fast cache lookups
placesCacheSchema.index({ lat: 1, lon: 1, type: 1 }, { unique: true });

const PlacesCache = mongoose.model('PlacesCache', placesCacheSchema);
module.exports = PlacesCache;
