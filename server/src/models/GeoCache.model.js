/**
 * GeoCache.model.js
 * Caches geocoding results to avoid repeated Google API calls.
 * Saves: query string → { lat, lon, source }
 */
const mongoose = require('mongoose');

const geoCacheSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // normalize: "Bandra West, Mumbai" === "bandra west, mumbai"
    },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    source: {
      type: String,
      enum: ['google', 'nominatim', 'manual'],
      default: 'nominatim',
    },
  },
  {
    timestamps: true,
  }
);

const GeoCache = mongoose.model('GeoCache', geoCacheSchema);
module.exports = GeoCache;
